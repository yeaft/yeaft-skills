---
name: board-meeting
description: |
  Multi-perspective deliberation protocol. Prevents groupthink by running independent
  contributions (isolated, no cross-pollination) before synthesis. 6-phase protocol.
  Phase 2 dispatches parallel persona subagents (truly isolated).
  Trigger when user says "board meeting", "multiple perspectives", "I need different viewpoints".
---

# Board Meeting Protocol

Multi-role independent deliberation to prevent groupthink.

Core principle: each role thinks independently, uninfluenced by others. Achieved through dispatching independent subagents with true isolation.

## Phase 1: Context

State the decision clearly. Identify which perspectives are needed.

Format:
```
## Decision Topic
[One sentence describing what decision needs to be made]

## Background
[Relevant context, constraints, history]

## Participating Roles
[Select 2-4 roles based on the problem's nature]
```

Default role combinations:
- **Product decisions**: Jobs + Torvalds + Rams
- **Architecture decisions**: Fowler + Torvalds + Beck
- **Strategic decisions**: Jobs + Fowler + CTO Advisor
- **Comprehensive deliberation**: Jobs + Torvalds + Fowler + Rams

## Phase 2: Independent Contributions (ISOLATED)

Dispatch an independent subagent for each role, execute IN PARALLEL.

Each subagent uses a different reasoning technique:

**Product (Jobs)** — Tree of Thought: 3 possible futures
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-pm-jobs content]</persona>

    Decision topic: [problem description]
    Background: [context]

    Use Tree of Thought reasoning — envision 3 possible futures.
    Think independently. Do NOT consider other perspectives.

    Output format:
    ## [ROLE] — Analysis
    Key points (max 5):
    - [Finding] — confidence: High/Medium/Low
    Recommendation: [clear position]
    What would change my mind: [specific condition]
```

**Engineering (Torvalds)** — ReAct: research → analyze → act
**Architecture (Fowler)** — First Principles: derive from base assumptions
**Design (Rams)** — Subtraction: what to cut

## Phase 3: Critic Analysis

Review ALL perspectives simultaneously:
- Where did perspectives agree too easily? (suspicious consensus)
- What assumptions are shared but unvalidated?
- What perspective is missing?
- What risk has nobody mentioned?

## Phase 4: Synthesis

- Decision required (one sentence)
- Where they agree / disagree
- Critic's uncomfortable truth
- Recommended decision + action items

## Phase 5: Human Review

⏸️ **Full stop. Wait for user approval.**

Options: ✅ Approve | ✏️ Modify | ❌ Reject | ❓ Follow-up

## Phase 6: Execution

After user approval, based on decision type:
- Needs design → invoke `yeaft:brainstorming`
- Needs plan → invoke `yeaft:writing-plans`
- Needs implementation → invoke `yeaft:subagent-development`

## When to Use

- Facing a strategic decision
- Need multi-perspective review
- Decision feels too one-dimensional
- Preventing confirmation bias
- Major technical/product direction choices
