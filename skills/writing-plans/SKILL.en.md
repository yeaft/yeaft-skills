<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: writing-plans
description: |
  Write implementation plans. Use when you have a spec or requirements for a multi-step
  task, before touching code. Assumes the engineer has zero context — document every file,
  code change, and test. DRY, YAGNI, TDD, frequent commits.
  Trigger when user says "write a plan", "create implementation plan".
---

# Writing Plans

## Overview

Write comprehensive implementation plans assuming the engineer has zero context. Document everything they need: which files to touch, code, testing, docs to check, how to verify. Break into bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume a skilled developer who knows almost nothing about our toolset or problem domain.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

## Scope Check

If the spec covers multiple independent subsystems, suggest breaking into separate plans — one per subsystem. Each plan should produce working, testable software on its own.

## File Structure

Before defining tasks, map out which files will be created or modified and what each one is responsible for.

- Design units with clear boundaries and well-defined interfaces. One file, one responsibility.
- Prefer smaller, focused files over large ones.
- Files that change together should live together. Split by responsibility, not layer.
- In existing codebases, follow established patterns.

## Bite-Sized Task Granularity

**Each step is one action (2-5 minutes):**
- "Write the failing test" — step
- "Run it to make sure it fails" — step
- "Write minimal code to pass" — step
- "Run tests to verify" — step
- "Commit" — step

## Plan Document Header

**Every plan MUST start with:**

```markdown
# [Feature Name] Implementation Plan

> **For agentic workers:** Use yeaft:subagent-development (recommended) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** [One sentence]

**Architecture:** [2-3 sentences]

**Tech Stack:** [Key technologies]

---
```

## Task Structure

````markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.js`
- Modify: `exact/path/to/existing.js:123-145`
- Test: `test/exact/path/to/test.js`

- [ ] **Step 1: Write the failing test**

```javascript
test('specific behavior', () => {
    const result = func(input);
    expect(result).toBe(expected);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test test/path/test.js`
Expected: FAIL

- [ ] **Step 3: Write minimal implementation**

```javascript
function func(input) {
    return expected;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test test/path/test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add test/path/test.js src/path/file.js
git commit -m "feat: add specific feature"
```
````

## No Placeholders

Every step must contain actual content. These are **plan failures**:
- "TBD", "TODO", "implement later"
- "Add appropriate error handling" / "add validation"
- "Write tests for the above" (without actual test code)
- "Similar to Task N" (repeat the code)
- Steps that describe what without showing how

## Self-Review

After writing the complete plan:

1. **Spec coverage:** Skim each requirement. Can you point to a task? List gaps.
2. **Placeholder scan:** Search for red flags from the "No Placeholders" section. Fix them.
3. **Type consistency:** Do types and method names match across tasks?

Fix issues inline. No need to re-review.

## Execution Handoff

After saving the plan:

**"Plan complete and saved. Two execution options:**

**1. Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks

**2. Inline Execution** — execute tasks in this session with checkpoints

**Which approach?"**

If Subagent-Driven chosen → invoke `yeaft:subagent-development` skill
