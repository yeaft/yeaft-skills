---
name: code-review
description: |
  Code review. Two-pass review: Pass 1 architecture review (Fowler persona),
  Pass 2 code quality review (Torvalds persona). Supports fix-first principle
  and scope drift detection.
  Trigger when user says "review code", "review this PR", "code review".
---

# Code Review

Two-pass review, each dispatching an independent persona subagent.

## Core Principles

- **Fix-first**: If a bug can be fixed directly, fix it — don't just report it
- **Scope drift detection**: Flag changes outside the stated scope
- **Two passes mandatory**: Architecture review ensures direction, code quality ensures implementation

## Process

### Step 1: Gather Change Info

```bash
git diff main...HEAD --stat
git log main..HEAD --oneline
```

Confirm: what files changed? How large? Clean commit history?

### Step 2: Understand Context

- Read PR description or commit messages
- Understand what changed and why
- Find related requirements/design docs

### Step 3: Pass 1 — Architecture Review (Fowler Persona)

Dispatch subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler content]</persona>

    You are performing an architecture-level code review.

    Changes: [git diff output]
    Description: [PR description]

    Review focus:
    1. Are module boundaries clear? Dependency direction correct?
    2. Abstraction level appropriate? Over/under-engineered?
    3. Consistent with existing architecture?
    4. Any unnecessary coupling introduced?
    5. Scope drift: changes that don't belong in this PR?

    Output:
    - ✅ Pass / ❌ Issues found
    - Issues (with file:line references)
    - Scope drift warnings (if any)
    - Architecture suggestions
```

### Step 4: Pass 2 — Code Quality Review (Torvalds Persona)

Dispatch subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-dev-torvalds content]</persona>

    You are performing a code quality review.

    Changes: [git diff output]

    Review focus:
    1. Code clean and simple? Unnecessary complexity?
    2. Names clear? Can you tell what it does from the name?
    3. Error handling complete? Boundary conditions?
    4. Performance? Unnecessary loops, memory leaks?
    5. Debug code left behind?

    Fix-first: provide fix code for directly fixable issues.

    Output:
    - Strengths
    - Issues: Critical / Important / Minor
    - Direct fixes: [with code]
    - Verdict: ✅ Pass | ❌ Changes needed
```

### Step 5: Combined Report

Collect both review results:
- Architecture findings
- Code quality findings
- Direct fixes (with code)
- Scope drift warnings
- Final verdict: ✅ APPROVED / ❌ CHANGES_REQUESTED

## Scope Drift Detection

Flag as scope drift:
- Files changed unrelated to PR goal
- "While I'm here" refactoring of unrelated code
- Features beyond requirements
- Tests changed that shouldn't be

Scope drift doesn't automatically reject — but must be flagged for author confirmation.
