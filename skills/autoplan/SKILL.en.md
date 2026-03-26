---
name: autoplan
description: |
  Auto-review pipeline. One command, rough plan in, fully reviewed plan out.
  Runs CEO → Design → Eng review sequentially with auto-decisions using 6 principles.
  Surfaces taste decisions at a final approval gate. Each phase dispatches a persona subagent.
  Trigger when user says "autoplan", "auto review", "make the decisions for me".
---

# /autoplan — Auto-Review Pipeline

One command. Rough plan in, fully reviewed plan out.

## The 6 Decision Principles

These rules auto-answer every intermediate question:

1. **Choose completeness** — Ship the whole thing. Pick the approach that covers more edge cases.
2. **Boil lakes** — Fix everything in the blast radius. Auto-approve expansions in blast radius AND < 1 day effort.
3. **Pragmatic** — Two options fix the same thing? Pick the cleaner one. 5 seconds choosing, not 5 minutes.
4. **DRY** — Duplicates existing functionality? Reject. Reuse what exists.
5. **Explicit over clever** — 10-line obvious fix > 200-line abstraction.
6. **Bias toward action** — Merge > review cycles > stale deliberation.

## Decision Classification

**Mechanical** — one clearly right answer. Auto-decide silently.
**Taste** — reasonable people could disagree. Auto-decide but surface at final gate.

## Sequential Execution — MANDATORY

CEO → Design → Eng. Each phase MUST complete before the next.

## Phase 1: CEO Review

Dispatch Jobs persona subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-pm-jobs content]</persona>

    You are performing the CEO review phase of the auto-review pipeline.

    Subject: [plan/design]

    Use principles 1 (completeness) and 2 (boil lakes) to auto-decide.
    Mark taste decisions but don't stop — auto-choose and record reasoning.

    Focus:
    - Scope appropriate? Should it expand or shrink?
    - Will users care? If not, cut it
    - Missing edge cases?
    - Aligned with product direction?

    Output:
    - Mechanical decisions: [auto-decided]
    - Taste decisions: [what you chose + why, for final gate]
    - Scope adjustment suggestions
    - Pass/adjust/reject
```

## Phase 2: Design Review

Dispatch Rams persona subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-designer-rams content]</persona>

    Design review phase of auto-review pipeline.

    Subject: [plan/design + Phase 1 adjustments]

    Use principles 5 (explicit over clever) and 1 (completeness) to auto-decide.

    Focus:
    - UI follows subtraction principle?
    - Interaction flow intuitive?
    - Edge states handled?
    - Mobile adapted?

    Output: taste decisions + mechanical decisions + design adjustments
```

## Phase 3: Eng Review

Dispatch Fowler persona subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler content]</persona>

    Engineering review phase of auto-review pipeline.

    Subject: [plan/design + Phase 1-2 adjustments]

    Use principles 5 (explicit over clever) and 3 (pragmatic) to auto-decide.

    Focus:
    - Architecture sound? Module boundaries clear?
    - Reinventing the wheel? (DRY)
    - Simplest correct solution?
    - Test strategy in place?

    Output: taste decisions + mechanical decisions + engineering adjustments
```

## Phase 4: Final Gate

Present all taste decisions to user in one batch:
- List each taste decision, auto-chosen result, reasoning
- Only taste decisions reach here — mechanical ones auto-decided
- Wait for user confirmation or adjustment

⏸️ **Full stop. Wait for user approval.**
