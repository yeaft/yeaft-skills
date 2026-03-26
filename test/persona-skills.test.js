import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Tests for PR #2 (yeaft-skills repo): 8 Persona Skills + cognitive patterns library.
 *
 * Test approach: file existence + content verification (markdown structure, frontmatter,
 * cognitive pattern counts, bilingual consistency, gstack attribution).
 *
 * Since yeaft-skills has no test runner, we run these tests via claude-web-chat's vitest.
 */

const SKILLS_ROOT = '/home/azureuser/projects/yeaft-skills/skills';

// =====================================================================
// Expected data
// =====================================================================

const PERSONAS = [
  'pm-jobs',
  'dev-torvalds',
  'architect-fowler',
  'tester-beck',
  'designer-rams',
  'cto-advisor',
  'security-expert',
  'growth-marketer'
];

// Expected cognitive pattern counts per persona (from design doc section 5.3)
const EXPECTED_PATTERN_COUNTS = {
  'pm-jobs': 5,
  'dev-torvalds': 4,
  'architect-fowler': 4,
  'tester-beck': 3,
  'designer-rams': 4,
  'cto-advisor': 4,
  'security-expert': 3,
  'growth-marketer': 3
};

// Required ZH section headers (in order)
const ZH_SECTIONS = [
  '## 身份与记忆',
  '## 认知模式',
  '## 核心使命',
  '## 决策框架',
  '## 沟通风格',
  '## 何时使用此 Persona',
  '## 工作流'
];

// Required EN section headers (in order)
const EN_SECTIONS = [
  '## Identity & Memory',
  '## Cognitive Patterns',
  '## Core Mission',
  '## Decision Framework',
  '## Communication Style',
  '## When to Use This Persona',
  '## Workflow'
];

// =====================================================================
// File content cache
// =====================================================================

const files = {};

beforeAll(() => {
  // Load all 19 files
  for (const p of PERSONAS) {
    const zhPath = resolve(SKILLS_ROOT, `personas/${p}/SKILL.md`);
    const enPath = resolve(SKILLS_ROOT, `personas/${p}/SKILL.en.md`);
    files[`${p}/zh`] = existsSync(zhPath) ? readFileSync(zhPath, 'utf-8') : null;
    files[`${p}/en`] = existsSync(enPath) ? readFileSync(enPath, 'utf-8') : null;
  }
  files['patterns/zh'] = (() => {
    const p = resolve(SKILLS_ROOT, 'cognitive-patterns/SKILL.md');
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  })();
  files['patterns/en'] = (() => {
    const p = resolve(SKILLS_ROOT, 'cognitive-patterns/SKILL.en.md');
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  })();
  files['readme'] = (() => {
    const p = resolve(SKILLS_ROOT, 'personas/README.md');
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  })();
});

// =====================================================================
// 1. All 19 files exist and are readable
// =====================================================================

describe('file existence', () => {
  for (const p of PERSONAS) {
    it(`${p}/SKILL.md exists`, () => {
      expect(existsSync(resolve(SKILLS_ROOT, `personas/${p}/SKILL.md`))).toBe(true);
    });
    it(`${p}/SKILL.en.md exists`, () => {
      expect(existsSync(resolve(SKILLS_ROOT, `personas/${p}/SKILL.en.md`))).toBe(true);
    });
  }

  it('cognitive-patterns/SKILL.md exists', () => {
    expect(existsSync(resolve(SKILLS_ROOT, 'cognitive-patterns/SKILL.md'))).toBe(true);
  });

  it('cognitive-patterns/SKILL.en.md exists', () => {
    expect(existsSync(resolve(SKILLS_ROOT, 'cognitive-patterns/SKILL.en.md'))).toBe(true);
  });

  it('personas/README.md exists', () => {
    expect(existsSync(resolve(SKILLS_ROOT, 'personas/README.md'))).toBe(true);
  });
});

// =====================================================================
// 2. Frontmatter validation — name and description
// =====================================================================

describe('frontmatter', () => {
  /** Extract frontmatter between --- delimiters */
  function extractFrontmatter(content) {
    if (!content) return null;
    // Handle optional HTML comment before frontmatter
    const stripped = content.replace(/^<!--[^>]*-->\s*\n/, '');
    const match = stripped.match(/^---\n([\s\S]*?)\n---/);
    return match ? match[1] : null;
  }

  for (const p of PERSONAS) {
    it(`${p}/SKILL.md has frontmatter with name and description`, () => {
      const fm = extractFrontmatter(files[`${p}/zh`]);
      expect(fm).not.toBeNull();
      expect(fm).toContain(`name: persona-${p}`);
      expect(fm).toContain('description:');
    });

    it(`${p}/SKILL.en.md has matching frontmatter name`, () => {
      const fm = extractFrontmatter(files[`${p}/en`]);
      expect(fm).not.toBeNull();
      expect(fm).toContain(`name: persona-${p}`);
      expect(fm).toContain('description:');
    });
  }

  it('cognitive-patterns/SKILL.md has frontmatter', () => {
    const fm = extractFrontmatter(files['patterns/zh']);
    expect(fm).not.toBeNull();
    expect(fm).toContain('name: cognitive-patterns');
    expect(fm).toContain('description:');
  });

  it('cognitive-patterns/SKILL.en.md has frontmatter', () => {
    const fm = extractFrontmatter(files['patterns/en']);
    expect(fm).not.toBeNull();
    expect(fm).toContain('name: cognitive-patterns');
    expect(fm).toContain('description:');
  });
});

// =====================================================================
// 3. Cognitive pattern counts — per persona + full library
// =====================================================================

describe('cognitive pattern counts', () => {
  /** Count `- **pattern-name**` lines between the cognitive patterns section and next section */
  function countPatternsInSection(content, sectionStart) {
    if (!content) return 0;
    const lines = content.split('\n');
    let inSection = false;
    let count = 0;
    for (const line of lines) {
      if (line.startsWith(sectionStart)) {
        inSection = true;
        continue;
      }
      if (inSection && line.startsWith('## ') && !line.startsWith(sectionStart)) {
        break; // next section
      }
      if (inSection && /^- \*\*/.test(line)) {
        count++;
      }
    }
    return count;
  }

  for (const p of PERSONAS) {
    const expected = EXPECTED_PATTERN_COUNTS[p];

    it(`${p}/SKILL.md has ${expected} cognitive patterns`, () => {
      const count = countPatternsInSection(files[`${p}/zh`], '## 认知模式');
      expect(count).toBe(expected);
    });

    it(`${p}/SKILL.en.md has ${expected} cognitive patterns`, () => {
      const count = countPatternsInSection(files[`${p}/en`], '## Cognitive Patterns');
      expect(count).toBe(expected);
    });
  }

  it('cognitive-patterns/SKILL.md has 18 patterns', () => {
    const content = files['patterns/zh'];
    const count = (content.match(/^\d+\. \*\*/gm) || []).length;
    expect(count).toBe(18);
  });

  it('cognitive-patterns/SKILL.en.md has 18 patterns', () => {
    const content = files['patterns/en'];
    const count = (content.match(/^\d+\. \*\*/gm) || []).length;
    expect(count).toBe(18);
  });
});

// =====================================================================
// 4. ZH/EN structure consistency — same number of ## sections, matching titles
// =====================================================================

describe('bilingual structure consistency', () => {
  for (const p of PERSONAS) {
    it(`${p} ZH has all 7 required section headers`, () => {
      const content = files[`${p}/zh`];
      for (const section of ZH_SECTIONS) {
        expect(content).toContain(section);
      }
    });

    it(`${p} EN has all 7 required section headers`, () => {
      const content = files[`${p}/en`];
      for (const section of EN_SECTIONS) {
        expect(content).toContain(section);
      }
    });

    it(`${p} ZH and EN have same number of ## sections`, () => {
      const zhSections = (files[`${p}/zh`].match(/^## /gm) || []).length;
      const enSections = (files[`${p}/en`].match(/^## /gm) || []).length;
      expect(zhSections).toBe(enSections);
    });
  }

  it('cognitive-patterns ZH and EN have same number of category sections', () => {
    const zhSections = (files['patterns/zh'].match(/^## /gm) || []).length;
    const enSections = (files['patterns/en'].match(/^## /gm) || []).length;
    expect(zhSections).toBe(enSections);
  });

  it('cognitive-patterns ZH section titles correspond to EN', () => {
    // ZH: 决策, 聚焦, 人与组织, 设计与体验, 工程与系统
    // EN: Decision-Making, Focus, People & Organization, Design & Experience, Engineering & Systems
    expect(files['patterns/zh']).toContain('## 决策');
    expect(files['patterns/zh']).toContain('## 聚焦');
    expect(files['patterns/zh']).toContain('## 人与组织');
    expect(files['patterns/zh']).toContain('## 设计与体验');
    expect(files['patterns/zh']).toContain('## 工程与系统');

    expect(files['patterns/en']).toContain('## Decision-Making');
    expect(files['patterns/en']).toContain('## Focus');
    expect(files['patterns/en']).toContain('## People & Organization');
    expect(files['patterns/en']).toContain('## Design & Experience');
    expect(files['patterns/en']).toContain('## Engineering & Systems');
  });
});

// =====================================================================
// 5. gstack attribution header in cognitive-patterns files
// =====================================================================

describe('gstack attribution', () => {
  it('cognitive-patterns/SKILL.md has gstack MIT attribution', () => {
    expect(files['patterns/zh']).toContain('garrytan/gstack');
    expect(files['patterns/zh']).toContain('MIT License');
  });

  it('cognitive-patterns/SKILL.en.md has gstack MIT attribution', () => {
    expect(files['patterns/en']).toContain('garrytan/gstack');
    expect(files['patterns/en']).toContain('MIT License');
  });

  it('gstack attribution is an HTML comment on the first line', () => {
    expect(files['patterns/zh'].startsWith('<!-- Patterns adapted from')).toBe(true);
    expect(files['patterns/en'].startsWith('<!-- Patterns adapted from')).toBe(true);
  });
});

// =====================================================================
// 6. README.md lists all 8 personas
// =====================================================================

describe('README.md persona table', () => {
  it('README contains all 8 persona names', () => {
    const readme = files['readme'];
    for (const p of PERSONAS) {
      expect(readme).toContain(`persona-${p}`);
    }
  });

  it('README has a markdown table with at least 8 data rows', () => {
    const readme = files['readme'];
    // Table rows start with `| `
    const tableRows = readme.split('\n').filter(l => l.startsWith('|') && !l.includes('---'));
    // Subtract header row
    const dataRows = tableRows.filter(l => !l.includes('Persona') || l.includes('persona-'));
    expect(dataRows.length).toBeGreaterThanOrEqual(8);
  });

  it('README mentions cognitive patterns library', () => {
    const readme = files['readme'];
    expect(readme).toContain('cognitive-patterns');
  });

  it('README mentions bilingual support', () => {
    const readme = files['readme'];
    expect(readme).toMatch(/SKILL\.en\.md|英文版|bilingual|双语/i);
  });
});
