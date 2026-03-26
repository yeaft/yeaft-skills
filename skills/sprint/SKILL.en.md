---
name: sprint
description: |
  Full sprint pipeline. From requirements to delivery, each phase dispatches a dedicated
  persona subagent: Step 1 Requirements (Jobs) → Step 2 Architecture (Fowler) →
  Step 3 Implementation (Torvalds) → Step 4 Testing (Beck) → Step 5 Final Review (Fowler).
  Trigger when user says "sprint", "build this feature end to end", "full dev process".
---

# Sprint — Full Development Pipeline

Complete pipeline from requirements analysis to code delivery. Each phase dispatches a dedicated persona subagent, ensuring the right "person" for every step.

## Pipeline Overview

```
Step 1: Requirements Analysis (Jobs)
    ↓
Step 2: Architecture Design (Fowler)
    ↓
Step 3: Implementation (Torvalds × N tasks)
    ↓
Step 4: Testing (Beck)
    ↓
Step 5: Final Review (Fowler)
    ↓
Done → finishing-branch
```

## Step 1: Requirements Analysis (Jobs Persona)

Dispatch subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-pm-jobs content]</persona>

    You are performing the requirements analysis phase of a sprint.

    User request: [what user said]
    Project context: [current state]

    Your job:
    1. What does the user actually need? (not what they said)
    2. What's the MVP? Minimum WOW experience
    3. P0/P1/P2 priority ranking
    4. What should be cut?
    5. Acceptance criteria (specific, testable)

    Output: Requirements document (concise, one page max)
```

⏸️ **Present requirements to user for confirmation.** Continue after approval.

## Step 2: Architecture Design (Fowler Persona)

Dispatch subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler content]</persona>

    You are performing the architecture design phase of a sprint.

    Requirements: [Step 1 output]
    Existing codebase: [relevant code]

    Your job:
    1. Analyze which files need changes
    2. Design module boundaries and interfaces
    3. Identify dependencies and risks
    4. Break into independent implementation tasks
    5. Define clear input/output for each task

    Output: Implementation plan (task list + files/code/tests per task)

    Follow yeaft:writing-plans format requirements.
```

## Step 3: Implementation (Torvalds Persona × N Tasks)

Use `yeaft:subagent-development` workflow to execute tasks sequentially:
- Each implementation task dispatches Torvalds persona subagent
- Two-stage review after each task (Fowler spec + Torvalds quality)
- Sequential execution, no parallel (avoid conflicts)

## Step 4: Testing Verification (Beck Persona)

After all implementation tasks complete, dispatch testing subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-tester-beck content]</persona>

    You are performing the testing verification phase of a sprint.

    Implemented features: [summary of all tasks]
    Acceptance criteria: [from Step 1]

    Your job:
    1. Run existing tests to confirm no regression
    2. Verify all acceptance criteria are met
    3. Check boundary conditions and error handling
    4. Add tests where coverage is insufficient
    5. Verify empty states, extreme inputs, concurrent scenarios

    Output:
    - Test pass/fail report
    - Issues found (if any)
    - Additional test cases added
```

If issues found → return to Step 3 to fix.

## Step 5: Final Review (Fowler Persona)

Dispatch final review subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler content]</persona>

    You are performing the final review of a sprint.

    All changes: [git diff main...HEAD]
    Requirements: [Step 1 output]

    Review focus:
    1. All requirements implemented?
    2. Architecture consistency: changes harmonize with existing system?
    3. Any missed edge cases?
    4. Code quality up to standard?
    5. Any scope drift?

    Output: ✅ Pass / ❌ Needs fixes + specific issues
```

## Completion

After final review passes, invoke `yeaft:finishing-branch` skill to wrap up.

## When to Use

- Building a feature from start to finish
- Need the full development process (requirements → design → implement → test → review)
- Want every step guarded by the right persona
- Small to medium features (1-5 days of work)
