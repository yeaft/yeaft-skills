import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

/**
 * Tests for PR #3 (yeaft-skills repo): 13 Workflow Skills.
 *
 * Test approach: file existence + content verification (frontmatter, bilingual files,
 * persona references, MIT attribution, prompt templates, cross-references, language purity).
 *
 * Since yeaft-skills has no test runner, we run these via claude-web-chat's vitest.
 * Reads from the dev-3 worktree where the PR branch is checked out.
 */

// dev-3 worktree has the workflow skills; main branch has personas
const SKILLS_ROOT = '/home/azureuser/projects/yeaft-skills/.worktrees/dev-3/skills';
const PERSONAS_ROOT = '/home/azureuser/projects/yeaft-skills/skills/personas';

// =====================================================================
// Expected data
// =====================================================================

const WORKFLOW_SKILLS = [
  'brainstorming',
  'writing-plans',
  'subagent-development',
  'code-review',
  'office-hours',
  'ceo-review',
  'design-review',
  'autoplan',
  'board-meeting',
  'tdd',
  'systematic-debugging',
  'finishing-branch',
  'sprint'
];

// Skills adapted from Superpowers that must have MIT attribution
const MIT_REQUIRED_SKILLS = [
  'brainstorming',
  'writing-plans',
  'subagent-development',
  'tdd',
  'systematic-debugging',
  'finishing-branch'
];

// Known persona names that exist in skills/personas/
const KNOWN_PERSONAS = [
  'pm-jobs',
  'dev-torvalds',
  'architect-fowler',
  'tester-beck',
  'designer-rams',
  'cto-advisor',
  'security-expert',
  'growth-marketer'
];

// Expected cross-references (skill → references these other skills)
const CROSS_REFERENCES = {
  'sprint': ['finishing-branch', 'writing-plans', 'subagent-development'],
  'brainstorming': ['writing-plans'],
  'subagent-development': ['finishing-branch', 'writing-plans'],
  'board-meeting': ['brainstorming', 'writing-plans', 'subagent-development'],
  'writing-plans': ['subagent-development'],
  'office-hours': ['brainstorming']
};

// Prompt templates in subagent-development
const PROMPT_TEMPLATES = [
  'implementer-prompt.md',
  'spec-reviewer-prompt.md',
  'code-quality-reviewer-prompt.md'
];

// =====================================================================
// File content cache
// =====================================================================

const files = {};
let personaDirs = [];

beforeAll(() => {
  // Load all workflow skill files
  for (const skill of WORKFLOW_SKILLS) {
    const zhPath = resolve(SKILLS_ROOT, skill, 'SKILL.md');
    const enPath = resolve(SKILLS_ROOT, skill, 'SKILL.en.md');
    files[`${skill}/zh`] = existsSync(zhPath) ? readFileSync(zhPath, 'utf-8') : null;
    files[`${skill}/en`] = existsSync(enPath) ? readFileSync(enPath, 'utf-8') : null;
  }

  // Load prompt templates
  for (const tmpl of PROMPT_TEMPLATES) {
    const p = resolve(SKILLS_ROOT, 'subagent-development', tmpl);
    files[`template/${tmpl}`] = existsSync(p) ? readFileSync(p, 'utf-8') : null;
  }

  // Load persona directory listing
  if (existsSync(PERSONAS_ROOT)) {
    personaDirs = readdirSync(PERSONAS_ROOT).filter(d => {
      const p = resolve(PERSONAS_ROOT, d);
      try { return require('fs').statSync(p).isDirectory(); }
      catch { return false; }
    });
  }
});

// Helper: extract YAML frontmatter from markdown
// Handles files starting with HTML comments (e.g. MIT attribution) before the ---
function parseFrontmatter(content) {
  if (!content) return null;
  const match = content.match(/(?:^|\n)---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const yaml = match[1];
  const result = {};
  // Simple YAML key extraction (handles multi-line | values)
  let currentKey = null;
  for (const line of yaml.split('\n')) {
    const keyMatch = line.match(/^(\w+):\s*(.*)/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const val = keyMatch[2].trim();
      result[currentKey] = val === '|' ? '' : val;
    } else if (currentKey && line.match(/^\s+/)) {
      result[currentKey] += (result[currentKey] ? ' ' : '') + line.trim();
    }
  }
  return result;
}

// Helper: extract all persona references from content
function extractPersonaRefs(content) {
  if (!content) return [];
  const matches = content.match(/yeaft:persona-[a-z-]+/g) || [];
  return [...new Set(matches)].map(ref => ref.replace('yeaft:persona-', ''));
}

// Helper: check for Chinese characters
function hasChinese(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

// =====================================================================
// 1. Frontmatter validation
// =====================================================================
describe('Frontmatter validation — all 26 SKILL files must have name + description', () => {
  for (const skill of WORKFLOW_SKILLS) {
    it(`${skill}/SKILL.md should have valid frontmatter with name and description`, () => {
      const content = files[`${skill}/zh`];
      expect(content, `${skill}/SKILL.md should exist`).not.toBeNull();
      const fm = parseFrontmatter(content);
      expect(fm, `${skill}/SKILL.md frontmatter should parse`).not.toBeNull();
      expect(fm.name, `${skill}/SKILL.md should have name`).toBeTruthy();
      expect(fm.description, `${skill}/SKILL.md should have description`).toBeTruthy();
    });

    it(`${skill}/SKILL.en.md should have valid frontmatter with name and description`, () => {
      const content = files[`${skill}/en`];
      expect(content, `${skill}/SKILL.en.md should exist`).not.toBeNull();
      const fm = parseFrontmatter(content);
      expect(fm, `${skill}/SKILL.en.md frontmatter should parse`).not.toBeNull();
      expect(fm.name, `${skill}/SKILL.en.md should have name`).toBeTruthy();
      expect(fm.description, `${skill}/SKILL.en.md should have description`).toBeTruthy();
    });
  }
});

// =====================================================================
// 2. Bilingual file completeness
// =====================================================================
describe('Bilingual completeness — 13 skills × 2 languages = 26 files', () => {
  it('should have exactly 13 skill directories', () => {
    const dirs = readdirSync(SKILLS_ROOT).filter(d => {
      try { return require('fs').statSync(resolve(SKILLS_ROOT, d)).isDirectory(); }
      catch { return false; }
    });
    expect(dirs.length).toBe(13);
  });

  for (const skill of WORKFLOW_SKILLS) {
    it(`${skill} should have SKILL.md (Chinese)`, () => {
      expect(existsSync(resolve(SKILLS_ROOT, skill, 'SKILL.md'))).toBe(true);
    });

    it(`${skill} should have SKILL.en.md (English)`, () => {
      expect(existsSync(resolve(SKILLS_ROOT, skill, 'SKILL.en.md'))).toBe(true);
    });
  }

  it('should have 26 SKILL files total', () => {
    let count = 0;
    for (const skill of WORKFLOW_SKILLS) {
      if (existsSync(resolve(SKILLS_ROOT, skill, 'SKILL.md'))) count++;
      if (existsSync(resolve(SKILLS_ROOT, skill, 'SKILL.en.md'))) count++;
    }
    expect(count).toBe(26);
  });
});

// =====================================================================
// 3. Persona reference validation
// =====================================================================
describe('Persona references — all referenced personas must exist', () => {
  it('should have persona directories available for validation', () => {
    expect(personaDirs.length).toBeGreaterThan(0);
  });

  for (const skill of WORKFLOW_SKILLS) {
    it(`${skill}/SKILL.md persona references should all be valid`, () => {
      const content = files[`${skill}/zh`];
      if (!content) return; // file existence tested separately
      const refs = extractPersonaRefs(content);
      for (const ref of refs) {
        expect(personaDirs, `persona "${ref}" referenced in ${skill}/SKILL.md`).toContain(ref);
      }
    });

    it(`${skill}/SKILL.en.md persona references should all be valid`, () => {
      const content = files[`${skill}/en`];
      if (!content) return;
      const refs = extractPersonaRefs(content);
      for (const ref of refs) {
        expect(personaDirs, `persona "${ref}" referenced in ${skill}/SKILL.en.md`).toContain(ref);
      }
    });
  }
});

// =====================================================================
// 4. MIT attribution for adapted skills
// =====================================================================
describe('MIT attribution — adapted-from-Superpowers skills must have attribution', () => {
  const MIT_COMMENT = 'Adapted from github.com/obra/superpowers';

  for (const skill of MIT_REQUIRED_SKILLS) {
    it(`${skill}/SKILL.md should have MIT attribution comment`, () => {
      const content = files[`${skill}/zh`];
      expect(content).not.toBeNull();
      expect(content).toContain(MIT_COMMENT);
    });

    it(`${skill}/SKILL.en.md should have MIT attribution comment`, () => {
      const content = files[`${skill}/en`];
      expect(content).not.toBeNull();
      expect(content).toContain(MIT_COMMENT);
    });
  }

  it('non-adapted skills should NOT have MIT attribution', () => {
    const nonMitSkills = WORKFLOW_SKILLS.filter(s => !MIT_REQUIRED_SKILLS.includes(s));
    for (const skill of nonMitSkills) {
      const zh = files[`${skill}/zh`];
      const en = files[`${skill}/en`];
      if (zh) expect(zh).not.toContain(MIT_COMMENT);
      if (en) expect(en).not.toContain(MIT_COMMENT);
    }
  });
});

// =====================================================================
// 5. Prompt template validation
// =====================================================================
describe('Prompt templates — subagent-development has 3 templates with <persona>', () => {
  for (const tmpl of PROMPT_TEMPLATES) {
    it(`${tmpl} should exist`, () => {
      expect(files[`template/${tmpl}`]).not.toBeNull();
    });

    it(`${tmpl} should contain <persona> placeholder`, () => {
      const content = files[`template/${tmpl}`];
      expect(content).not.toBeNull();
      expect(content).toContain('<persona>');
      expect(content).toContain('</persona>');
    });
  }
});

// =====================================================================
// 6. Cross-reference validation
// =====================================================================
describe('Cross-references — skill-to-skill references use correct names', () => {
  for (const [skill, refs] of Object.entries(CROSS_REFERENCES)) {
    for (const ref of refs) {
      it(`${skill}/SKILL.md should reference ${ref}`, () => {
        const content = files[`${skill}/zh`];
        expect(content).not.toBeNull();
        // Check for yeaft:skill-name or just skill-name in context
        expect(content).toContain(ref);
      });

      it(`${skill}/SKILL.en.md should reference ${ref}`, () => {
        const content = files[`${skill}/en`];
        expect(content).not.toBeNull();
        expect(content).toContain(ref);
      });
    }
  }
});

// =====================================================================
// 7. Language purity — ZH no English body, EN no Chinese
// =====================================================================
describe('Language purity — ZH files Chinese-dominant, EN files no Chinese', () => {
  for (const skill of WORKFLOW_SKILLS) {
    it(`${skill}/SKILL.en.md should not contain Chinese characters (outside frontmatter technical terms)`, () => {
      const content = files[`${skill}/en`];
      if (!content) return;
      // Strip frontmatter and code blocks (which may contain Chinese examples)
      const body = content
        .replace(/^---[\s\S]*?---/, '')     // Remove frontmatter
        .replace(/```[\s\S]*?```/g, '')      // Remove code blocks
        .replace(/<persona>[\s\S]*?<\/persona>/g, '')  // Remove persona blocks (may have Chinese refs)
        .replace(/`[^`]*`/g, '')             // Remove inline code
        .replace(/<!--[\s\S]*?-->/g, '');    // Remove HTML comments
      expect(hasChinese(body), `${skill}/SKILL.en.md body should not have Chinese chars`).toBe(false);
    });

    it(`${skill}/SKILL.md should contain Chinese characters (ZH is Chinese-dominant)`, () => {
      const content = files[`${skill}/zh`];
      if (!content) return;
      const body = content.replace(/^---[\s\S]*?---/, '');
      expect(hasChinese(body), `${skill}/SKILL.md should have Chinese content`).toBe(true);
    });
  }
});

// =====================================================================
// 8. Frontmatter name consistency
// =====================================================================
describe('Frontmatter name consistency — ZH and EN have same skill name', () => {
  for (const skill of WORKFLOW_SKILLS) {
    it(`${skill} ZH and EN should have the same frontmatter name`, () => {
      const zhFm = parseFrontmatter(files[`${skill}/zh`]);
      const enFm = parseFrontmatter(files[`${skill}/en`]);
      if (!zhFm || !enFm) return;
      expect(zhFm.name).toBe(enFm.name);
    });

    it(`${skill} frontmatter name should match directory name`, () => {
      const fm = parseFrontmatter(files[`${skill}/zh`]);
      if (!fm) return;
      expect(fm.name).toBe(skill);
    });
  }
});
