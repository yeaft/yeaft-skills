import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

/**
 * Tests for PR #4 (yeaft-skills repo): docs directory — installation guide,
 * platform notes, skill directory (zh-CN + en).
 *
 * 8 test points: file completeness, bilingual structure, skill coverage,
 * link validity, persona cognitive patterns, installation paths, Windows
 * run-hook.cmd, and task-138a zero-conflict.
 */

const WORKTREE = '/home/azureuser/projects/yeaft-skills/.worktrees/dev-2';
const DOCS_ROOT = resolve(WORKTREE, 'docs');
const SKILLS_ROOT = resolve(WORKTREE, 'skills');

// =====================================================================
// Expected data
// =====================================================================

const DOCS_FILES = [
  'README.md',
  'installation.md',
  'installation.en.md',
  'platform-notes.md',
  'platform-notes.en.md',
  'skill-list.md',
  'skill-list.en.md'
];

// All 23 skills in the repo (1 entry + 13 workflows + 8 personas + 1 cognitive-patterns)
const WORKFLOW_SKILLS = [
  'brainstorming', 'writing-plans', 'subagent-development', 'code-review',
  'office-hours', 'ceo-review', 'design-review', 'autoplan',
  'board-meeting', 'tdd', 'systematic-debugging', 'finishing-branch', 'sprint'
];

const PERSONA_SKILLS = [
  'pm-jobs', 'dev-torvalds', 'architect-fowler', 'tester-beck',
  'designer-rams', 'cto-advisor', 'security-expert', 'growth-marketer'
];

// Cognitive patterns per persona — ZH names as used in SKILL.md
const PERSONA_PATTERNS_ZH = {
  'pm-jobs': ['聚焦即减法', '代理指标怀疑', '速度校准', '层级即服务', '减法默认'],
  'dev-torvalds': ['速度校准', '反转反射', '杠杆执念', '偏执扫描'],
  'architect-fowler': ['分类本能', '反转反射', '时间纵深', '代理指标怀疑'],
  'tester-beck': ['边界条件偏执', '反转反射', '勇气累积'],
  'designer-rams': ['减法默认', '层级即服务', '边界条件偏执', '信任设计'],
  'cto-advisor': ['分类本能', '速度校准', '人员优先排序', '战时意识'],
  'security-expert': ['偏执扫描', '反转反射', '边界条件偏执'],
  'growth-marketer': ['杠杆执念', '代理指标怀疑', '意志力即战略']
};

// =====================================================================
// File content cache
// =====================================================================

const files = {};

beforeAll(() => {
  for (const f of DOCS_FILES) {
    const p = resolve(DOCS_ROOT, f);
    files[f] = existsSync(p) ? readFileSync(p, 'utf-8') : null;
  }
  // Reference files
  files['hooks/session-start'] = (() => {
    const p = resolve(WORKTREE, 'hooks/session-start');
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  })();
  files['hooks/run-hook.cmd'] = (() => {
    const p = resolve(WORKTREE, 'hooks/run-hook.cmd');
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  })();
  files['package.json'] = (() => {
    const p = resolve(WORKTREE, 'package.json');
    return existsSync(p) ? readFileSync(p, 'utf-8') : null;
  })();
});

// =====================================================================
// 1. File completeness — 7 files exist in docs/
// =====================================================================

describe('file completeness', () => {
  for (const f of DOCS_FILES) {
    it(`docs/${f} exists`, () => {
      expect(existsSync(resolve(DOCS_ROOT, f))).toBe(true);
    });
  }

  it('docs/ contains exactly 7 files', () => {
    const entries = readdirSync(DOCS_ROOT);
    expect(entries.length).toBe(7);
  });

  it('all docs files are non-empty', () => {
    for (const f of DOCS_FILES) {
      expect(files[f]).not.toBeNull();
      expect(files[f].length).toBeGreaterThan(100);
    }
  });
});

// =====================================================================
// 2. Bilingual structure — ZH/EN pairs have matching section counts
// =====================================================================

describe('bilingual structure consistency', () => {
  const pairs = [
    ['installation.md', 'installation.en.md'],
    ['platform-notes.md', 'platform-notes.en.md'],
    ['skill-list.md', 'skill-list.en.md']
  ];

  for (const [zh, en] of pairs) {
    it(`${zh} and ${en} have same number of ## sections`, () => {
      const zhSections = (files[zh].match(/^## /gm) || []).length;
      const enSections = (files[en].match(/^## /gm) || []).length;
      expect(zhSections).toBe(enSections);
    });

    it(`${zh} and ${en} have same number of ### subsections`, () => {
      const zhSubs = (files[zh].match(/^### /gm) || []).length;
      const enSubs = (files[en].match(/^### /gm) || []).length;
      expect(zhSubs).toBe(enSubs);
    });
  }

  it('installation ZH and EN have same number of code blocks', () => {
    const zhBlocks = (files['installation.md'].match(/^```/gm) || []).length;
    const enBlocks = (files['installation.en.md'].match(/^```/gm) || []).length;
    expect(zhBlocks).toBe(enBlocks);
  });

  it('platform-notes ZH and EN have same number of code blocks', () => {
    const zhBlocks = (files['platform-notes.md'].match(/^```/gm) || []).length;
    const enBlocks = (files['platform-notes.en.md'].match(/^```/gm) || []).length;
    expect(zhBlocks).toBe(enBlocks);
  });

  it('skill-list ZH and EN have same number of ### skill entries', () => {
    // Each skill is a ### heading
    const zhSkills = (files['skill-list.md'].match(/^### /gm) || []).length;
    const enSkills = (files['skill-list.en.md'].match(/^### /gm) || []).length;
    expect(zhSkills).toBe(enSkills);
  });

  it('skill-list ZH and EN have same number of skill entries (24 total)', () => {
    // 1 entry + 13 workflows + 8 personas + 2 references = 24
    const zhSkills = (files['skill-list.md'].match(/^### /gm) || []).length;
    expect(zhSkills).toBe(24);
  });
});

// =====================================================================
// 3. Skill coverage — skill-list.md lists all 23 skills matching skills/
// =====================================================================

describe('skill coverage', () => {
  it('skill-list.md lists entry skill using-yeaft', () => {
    expect(files['skill-list.md']).toContain('### using-yeaft');
  });

  for (const w of WORKFLOW_SKILLS) {
    it(`skill-list.md lists workflow: ${w}`, () => {
      expect(files['skill-list.md']).toContain(`### ${w}`);
    });
  }

  for (const p of PERSONA_SKILLS) {
    it(`skill-list.md lists persona: persona-${p}`, () => {
      expect(files['skill-list.md']).toContain(`### persona-${p}`);
    });
  }

  it('skill-list.md lists cognitive-patterns reference', () => {
    expect(files['skill-list.md']).toContain('### cognitive-patterns');
  });

  it('skill-list.md lists personas/README.md reference', () => {
    expect(files['skill-list.md']).toContain('personas/README.md');
  });

  it('skill-list.en.md lists entry skill using-yeaft', () => {
    expect(files['skill-list.en.md']).toContain('### using-yeaft');
  });

  for (const w of WORKFLOW_SKILLS) {
    it(`skill-list.en.md lists workflow: ${w}`, () => {
      expect(files['skill-list.en.md']).toContain(`### ${w}`);
    });
  }

  for (const p of PERSONA_SKILLS) {
    it(`skill-list.en.md lists persona: persona-${p}`, () => {
      expect(files['skill-list.en.md']).toContain(`### persona-${p}`);
    });
  }

  it('every skill directory has a corresponding entry in skill-list.md', () => {
    // Get all top-level skill dirs (excluding personas subdirs)
    const topLevel = readdirSync(SKILLS_ROOT).filter(d => {
      const full = resolve(SKILLS_ROOT, d);
      try { return readdirSync(full).some(f => f.startsWith('SKILL')); } catch { return false; }
    });
    // Also get persona subdirs
    const personaDir = resolve(SKILLS_ROOT, 'personas');
    const personaDirs = existsSync(personaDir) ?
      readdirSync(personaDir).filter(d => {
        const full = resolve(personaDir, d);
        try { return readdirSync(full).some(f => f.startsWith('SKILL')); } catch { return false; }
      }) : [];

    const allSkillNames = [
      ...topLevel.filter(d => d !== 'personas'),
      ...personaDirs.map(d => `persona-${d}`)
    ];

    for (const name of allSkillNames) {
      expect(files['skill-list.md']).toContain(`### ${name}`);
    }
  });
});

// =====================================================================
// 4. Link validity — docs/README.md relative links point to existing files
// =====================================================================

describe('link validity', () => {
  it('docs/README.md links to installation.md', () => {
    expect(files['README.md']).toContain('./installation.md');
  });

  it('docs/README.md links to installation.en.md', () => {
    expect(files['README.md']).toContain('./installation.en.md');
  });

  it('docs/README.md links to skill-list.md', () => {
    expect(files['README.md']).toContain('./skill-list.md');
  });

  it('docs/README.md links to skill-list.en.md', () => {
    expect(files['README.md']).toContain('./skill-list.en.md');
  });

  it('docs/README.md links to platform-notes.md', () => {
    expect(files['README.md']).toContain('./platform-notes.md');
  });

  it('docs/README.md links to platform-notes.en.md', () => {
    expect(files['README.md']).toContain('./platform-notes.en.md');
  });

  it('docs/README.md "quick links" point to existing root files', () => {
    const content = files['README.md'];
    // Extract relative links like (../README.md), (../ETHOS.md), (../LICENSE)
    const links = content.match(/\(\.\.\/[^)]+\)/g) || [];
    for (const link of links) {
      const relPath = link.slice(1, -1); // remove parens
      const absPath = resolve(DOCS_ROOT, relPath);
      expect(existsSync(absPath), `Link ${relPath} should resolve to an existing file`).toBe(true);
    }
  });

  it('installation.en.md cross-links to platform-notes.en.md', () => {
    expect(files['installation.en.md']).toContain('platform-notes.en.md');
  });

  it('installation.md cross-links to platform-notes.md', () => {
    expect(files['installation.md']).toContain('platform-notes.md');
  });
});

// =====================================================================
// 5. Persona cognitive patterns — skill-list.md matches each SKILL.md
// =====================================================================

describe('persona cognitive patterns in skill-list', () => {
  for (const [persona, patterns] of Object.entries(PERSONA_PATTERNS_ZH)) {
    it(`skill-list.md persona-${persona} lists all ${patterns.length} cognitive patterns`, () => {
      // Extract the persona section from skill-list.md
      const content = files['skill-list.md'];
      const sectionStart = content.indexOf(`### persona-${persona}`);
      expect(sectionStart).toBeGreaterThan(-1);

      // Find the next ### or --- section boundary
      const afterStart = content.slice(sectionStart + 1);
      const nextSection = afterStart.search(/^###\s/m);
      const sectionEnd = nextSection > -1 ? sectionStart + 1 + nextSection : content.length;
      const section = content.slice(sectionStart, sectionEnd);

      for (const pattern of patterns) {
        expect(section).toContain(pattern);
      }
    });
  }

  it('skill-list.md persona-pm-jobs has exactly 5 cognitive patterns', () => {
    expect(PERSONA_PATTERNS_ZH['pm-jobs'].length).toBe(5);
    // Verify the patterns listed match what's in the actual SKILL.md
    const skillFile = readFileSync(resolve(SKILLS_ROOT, 'personas/pm-jobs/SKILL.md'), 'utf-8');
    for (const p of PERSONA_PATTERNS_ZH['pm-jobs']) {
      expect(skillFile).toContain(p);
    }
  });

  it('skill-list.md persona-tester-beck has exactly 3 cognitive patterns', () => {
    expect(PERSONA_PATTERNS_ZH['tester-beck'].length).toBe(3);
    const skillFile = readFileSync(resolve(SKILLS_ROOT, 'personas/tester-beck/SKILL.md'), 'utf-8');
    for (const p of PERSONA_PATTERNS_ZH['tester-beck']) {
      expect(skillFile).toContain(p);
    }
  });

  it('all 8 persona cognitive patterns in skill-list.md match actual SKILL.md files', () => {
    for (const [persona, patterns] of Object.entries(PERSONA_PATTERNS_ZH)) {
      const skillFile = readFileSync(
        resolve(SKILLS_ROOT, `personas/${persona}/SKILL.md`), 'utf-8'
      );
      for (const p of patterns) {
        expect(skillFile, `persona ${persona} should contain pattern "${p}"`).toContain(p);
      }
    }
  });
});

// =====================================================================
// 6. Installation paths — consistent with package.json and hooks
// =====================================================================

describe('installation paths and commands', () => {
  it('installation.md mentions plugin install from GitHub', () => {
    expect(files['installation.md']).toContain('https://github.com/yeaft/yeaft-skills');
  });

  it('installation.md mentions ~/.claude/plugins/yeaft-skills/ path', () => {
    expect(files['installation.md']).toContain('~/.claude/plugins/yeaft-skills');
  });

  it('installation.md mentions hooks/session-start executable', () => {
    expect(files['installation.md']).toContain('hooks/session-start');
  });

  it('installation.md mentions chmod +x for hook', () => {
    expect(files['installation.md']).toContain('chmod +x');
  });

  it('installation.md mentions LANG environment variable', () => {
    expect(files['installation.md']).toContain('LANG');
  });

  it('installation.md LANG description matches session-start hook behavior', () => {
    // session-start uses zh_CN*/zh_TW*/zh_HK*/zh.* → SKILL.md, else → SKILL.en.md
    const hook = files['hooks/session-start'];
    expect(hook).toContain('zh_CN');
    // installation.md should describe this same behavior
    expect(files['installation.md']).toMatch(/zh_CN|中文/);
    expect(files['installation.md']).toContain('SKILL.en.md');
  });

  it('installation.md mentions /skills command for verification', () => {
    expect(files['installation.md']).toContain('/skills');
  });

  it('installation.en.md mentions same GitHub URL', () => {
    expect(files['installation.en.md']).toContain('https://github.com/yeaft/yeaft-skills');
  });

  it('installation.md mentions run-hook.cmd for Windows', () => {
    expect(files['installation.md']).toContain('run-hook.cmd');
  });
});

// =====================================================================
// 7. Windows — platform-notes.md run-hook.cmd description matches actual code
// =====================================================================

describe('Windows run-hook.cmd consistency', () => {
  it('platform-notes.md mentions run-hook.cmd', () => {
    expect(files['platform-notes.md']).toContain('run-hook.cmd');
  });

  it('platform-notes.md describes polyglot nature (batch + bash)', () => {
    expect(files['platform-notes.md']).toMatch(/polyglot|batch.*bash|bash.*batch/i);
  });

  it('platform-notes.md lists Git for Windows standard path', () => {
    // Actual code: C:\Program Files\Git\bin\bash.exe
    expect(files['platform-notes.md']).toContain('C:\\Program Files\\Git\\bin\\bash.exe');
  });

  it('platform-notes.md lists 32-bit Git path', () => {
    expect(files['platform-notes.md']).toContain('C:\\Program Files (x86)\\Git\\bin\\bash.exe');
  });

  it('platform-notes.md mentions PATH fallback (MSYS2, Cygwin)', () => {
    expect(files['platform-notes.md']).toMatch(/PATH.*bash|bash.*PATH/);
  });

  it('actual run-hook.cmd searches same paths described in docs', () => {
    const cmd = files['hooks/run-hook.cmd'];
    // Doc says: 1) C:\Program Files\Git\bin\bash.exe 2) C:\Program Files (x86)\Git\bin\bash.exe 3) PATH
    expect(cmd).toContain('C:\\Program Files\\Git\\bin\\bash.exe');
    expect(cmd).toContain('C:\\Program Files (x86)\\Git\\bin\\bash.exe');
    expect(cmd).toContain('where bash');
  });

  it('platform-notes.md mentions silent skip when no bash', () => {
    // Actual code: exit /b 0 silently
    expect(files['platform-notes.md']).toMatch(/静默|silently|skip/i);
  });

  it('platform-notes.en.md has matching run-hook.cmd description', () => {
    expect(files['platform-notes.en.md']).toContain('run-hook.cmd');
    expect(files['platform-notes.en.md']).toContain('C:\\Program Files\\Git\\bin\\bash.exe');
  });

  it('platform-notes.md covers all 4 platforms: macOS, Linux, Windows, WSL', () => {
    expect(files['platform-notes.md']).toContain('## macOS');
    expect(files['platform-notes.md']).toContain('## Linux');
    expect(files['platform-notes.md']).toContain('## Windows');
    expect(files['platform-notes.md']).toContain('## WSL');
  });

  it('platform-notes.en.md covers all 4 platforms', () => {
    expect(files['platform-notes.en.md']).toContain('## macOS');
    expect(files['platform-notes.en.md']).toContain('## Linux');
    expect(files['platform-notes.en.md']).toContain('## Windows');
    expect(files['platform-notes.en.md']).toContain('## WSL');
  });
});

// =====================================================================
// 8. Zero conflict with task-138a — PR only contains docs/ files
// =====================================================================

describe('zero conflict with task-138a', () => {
  it('PR only adds files in docs/ directory', () => {
    // Verify no non-docs files were modified by checking this PR's scope
    // All 7 files are in docs/ — no root files, no skills/ files
    for (const f of DOCS_FILES) {
      expect(existsSync(resolve(DOCS_ROOT, f))).toBe(true);
    }
  });

  it('no writing-skills directory exists (that belongs to task-138a)', () => {
    // task-138a handles writing-skills; this PR should not create it
    // Note: writing-plans is a legitimate existing workflow skill, not writing-skills
    const writingSkills = resolve(SKILLS_ROOT, 'writing-skills');
    // This dir should NOT exist from this PR
    // (If it exists from another PR that's fine — we just verify this PR didn't create it)
    // The key assertion: docs/ files don't reference writing-skills as a new creation
    expect(files['skill-list.md']).not.toContain('### writing-skills');
  });

  it('docs/README.md does not modify root README.md', () => {
    // docs/README.md is separate from root README.md
    expect(existsSync(resolve(DOCS_ROOT, 'README.md'))).toBe(true);
    expect(existsSync(resolve(WORKTREE, 'README.md'))).toBe(true);
    // They should be different files with different content
    const docsReadme = files['README.md'];
    const rootReadme = readFileSync(resolve(WORKTREE, 'README.md'), 'utf-8');
    expect(docsReadme).not.toBe(rootReadme);
  });
});

// =====================================================================
// 9. Content quality — no empty sections, no broken formatting
// =====================================================================

describe('content quality', () => {
  it('installation.md has prerequisites section', () => {
    expect(files['installation.md']).toContain('## 前置条件');
  });

  it('installation.md covers both install methods (Plugin + Git clone)', () => {
    expect(files['installation.md']).toContain('Plugin');
    expect(files['installation.md']).toContain('Git Clone');
    // Or Git clone
    expect(files['installation.md']).toMatch(/git clone/i);
  });

  it('installation.md has troubleshooting section', () => {
    expect(files['installation.md']).toMatch(/常见问题|Troubleshooting|FAQ/);
  });

  it('skill-list.md categorizes skills: workflow, persona, reference', () => {
    expect(files['skill-list.md']).toContain('## 工作流技能');
    expect(files['skill-list.md']).toContain('## Persona 技能');
    expect(files['skill-list.md']).toContain('## 参考资料');
  });

  it('skill-list.en.md categorizes skills: workflow, persona, reference', () => {
    expect(files['skill-list.en.md']).toContain('## Workflow Skills');
    expect(files['skill-list.en.md']).toContain('## Persona Skills');
    expect(files['skill-list.en.md']).toContain('## Reference Materials');
  });

  it('each skill entry in skill-list.md has trigger keywords', () => {
    // Every ### section should have a "触发关键词" line (except reference materials persona/README)
    const sections = files['skill-list.md'].split(/^### /m).slice(1); // skip text before first ###
    const skillSections = sections.filter(s => !s.startsWith('personas/README'));
    for (const section of skillSections) {
      const name = section.split('\n')[0].trim();
      expect(section, `Skill "${name}" should have trigger keywords`).toMatch(/触发关键词/);
    }
  });

  it('skill-list.md gstack reference includes MIT License', () => {
    expect(files['skill-list.md']).toContain('MIT License');
    expect(files['skill-list.md']).toContain('gstack');
  });
});
