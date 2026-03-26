---
name: writing-skills
description: Use when creating new skills for yeaft-skills, editing existing skills, or learning the SKILL.md format specification
---

# Writing Skills

## Overview

**Writing skills IS TDD applied to process documentation.** You write test scenarios (pressure tests), watch them fail (baseline behavior), write the skill (documentation), watch tests pass (agent compliance), and refactor (close loopholes).

## What is a Skill

A **skill** is a reference guide for proven techniques, patterns, or tools.

**Skills are:** Reusable techniques, patterns, tools, reference guides
**Skills are NOT:** Narratives about how you solved a problem once

## SKILL.md Format Specification

### Frontmatter (YAML, Required)

```yaml
---
name: skill-name-with-hyphens
description: Use when encountering XXX situation...
---
```

**Rules:**
- `name`: Only letters, numbers, and hyphens. No parentheses or special characters
- `description`: Max 1024 characters, third person
- description describes only **when to use**, not **what it does**
- Start with "Use when..."

**Why can't description summarize the workflow?** Testing revealed that when a description summarizes the skill's workflow, Claude may follow the description instead of reading the full skill content. When description only states triggering conditions, Claude properly reads the entire skill.

```yaml
# ❌ BAD: Summarizes workflow — Claude may follow this instead of reading skill
description: Use when executing plans — dispatches subagent per task with code review between tasks

# ✅ GOOD: Just triggering conditions
description: Use when executing implementation plans with independent tasks
```

### File Structure

```markdown
---
name: my-skill
description: Use when encountering XXX situation...
---

# Skill Name

## Overview
What is this? Core principle in 1-2 sentences.

## When to Use
- Triggering conditions (symptoms, scenarios)
- When NOT to use

## Core Process
Steps and methodology.

## Common Mistakes
What goes wrong + fixes.
```

### Directory Structure

```
skills/
  skill-name/
    SKILL.md              # Chinese version (required)
    SKILL.en.md           # English version (required)
    supporting-file.*     # Supporting files (only when needed)
```

## Bilingual Requirements

Every skill must provide two files:
- `SKILL.md` — Chinese version (primary)
- `SKILL.en.md` — English version (translation)

**Rules:**
- Both files must have the same frontmatter `name` field
- Content must be consistent (full translation, not summary)
- Keep technical terms in English (e.g., TDD, subagent, frontmatter)

## Skill Types

### Workflow Skill

Reusable workflow processes. Directory: `skills/<skill-name>/`

```yaml
name: code-review
description: Use when reviewing code changes or preparing pre-landing review
```

### Persona Skill

Character cognitive frameworks. Directory: `skills/personas/<persona-name>/`

**Must include 7 sections:**

| Section | Description |
|---------|-------------|
| Identity & Memory | Role, personality traits, key experiences |
| Cognitive Patterns | Select 3-5 from the 18 patterns, **inline** in the file |
| Core Mission | Role's core objectives (2-3 items) |
| Decision Framework | Judgment logic for making decisions |
| Communication Style | Catchphrases, principles, standards |
| When to Use | List of applicable scenarios |
| Workflows | At least 2 concrete workflows |

**Cognitive patterns must be inline:** Claude Code's Skill tool loads SKILL.md independently — it cannot simultaneously load referenced files. Each persona needs only 3-5 patterns, so inline is practical.

### Reference Skill

Knowledge bases and reference materials. Directory: `skills/<skill-name>/`

## Persona × Subagent Integration

When a workflow skill needs to dispatch subagents, embed a persona:

```markdown
## Subagent Dispatch

1. Use Skill tool to load the corresponding persona (e.g., `yeaft:persona-dev-torvalds`)
2. Place persona content in a `<persona>` block at the TOP of the subagent prompt
3. Place task instructions below the persona block

The subagent is "born as" that character.
```

### Persona Selection Rules

| Task Type | Persona |
|-----------|---------|
| Code implementation | `yeaft:persona-dev-torvalds` |
| Architecture decisions | `yeaft:persona-architect-fowler` |
| Test writing | `yeaft:persona-tester-beck` |
| UI/frontend | `yeaft:persona-designer-rams` |
| Product/requirements | `yeaft:persona-pm-jobs` |
| Security review | `yeaft:persona-security-expert` |

## Good Skill vs Bad Skill

### ✅ Good Skill

```markdown
---
name: systematic-debugging
description: Use when encountering complex bugs, after multiple failed fix attempts, or when systematic investigation is needed
---

# Systematic Debugging

## Overview
Hypothesis-driven debugging. Not random trial-and-error, but the scientific method.

## Core Process
1. Collect symptoms
2. Form hypotheses (max 3)
3. Design minimal experiments to verify each hypothesis
4. Binary search to narrow scope
...
```

**Why it's good:** description only states triggers, process is clear, has concrete steps.

### ❌ Bad Skill

```markdown
---
name: debug
description: Debugging skill. First collect symptoms, then form hypotheses, then binary search, then fix.
---

# Debugging

Last time there was a bug, I looked at the logs, then found it was a race condition...
```

**Why it's bad:**
- `name` too short and generic
- `description` summarizes the entire workflow (Claude will follow it and skip the body)
- Content is a narrative story, not a reusable guide

## Search Optimization (CSO)

Help Claude find your skill:

- **Use triggering conditions in description:** symptoms, scenarios, error messages
- **Keyword coverage:** error messages, symptom synonyms, tool names
- **Verb-based naming:** `systematic-debugging` not `debug-skill`

## Pre-submission Checklist

Verify before submitting:

- [ ] Both SKILL.md and SKILL.en.md exist
- [ ] Frontmatter has `name` and `description`
- [ ] `name` contains only letters, numbers, hyphens
- [ ] `description` starts with triggering conditions, doesn't describe process
- [ ] Chinese and English content is consistent
- [ ] If Persona skill, includes all 7 required sections
- [ ] Cognitive patterns are inline (not referencing external files)
- [ ] No narrative storytelling, only reusable guides
