<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: subagent-development
description: |
  Subagent-driven development. Use when executing implementation plans with independent tasks.
  Dispatches a fresh subagent per task (with persona), two-stage review after each
  (spec compliance + code quality). Controller coordinates, subagents execute.
  Trigger when user says "start implementing", "execute the plan", "use subagent development".
---

# Subagent-Driven Development

Execute plan by dispatching fresh subagent per task, with two-stage review after each: spec compliance review first, then code quality review.

**Why subagents:** You delegate tasks to specialized agents with isolated context. By precisely crafting their instructions and context, you ensure they stay focused and succeed. They never inherit your session's context — you construct exactly what they need. This preserves your own context for coordination.

**Core principle:** Fresh subagent per task + two-stage review = high quality, fast iteration

## Persona Selection for Subagents

Before dispatching any subagent, select the appropriate persona.

### Step 1: Load the persona skill
Use `Skill` tool to load the persona. This gives you the full persona content.

### Step 2: Embed persona in subagent prompt
Insert the persona content in a `<persona>` block at the TOP of the subagent's dispatch prompt, BEFORE the task instructions.

### Selection Rules

| Task Type | Persona | Why |
|-----------|---------|-----|
| Code implementation | `yeaft:persona-dev-torvalds` | Data structures first, simple solutions, "show me the code" |
| Architecture decisions | `yeaft:persona-architect-fowler` | Module boundaries, dependency direction, YAGNI |
| Spec compliance review | `yeaft:persona-architect-fowler` | Rigorous verification against requirements |
| Code quality review | `yeaft:persona-dev-torvalds` | Performance, simplicity, code as documentation |
| Test writing | `yeaft:persona-tester-beck` | Edge cases, boundary conditions, TDD discipline |
| UI/frontend | `yeaft:persona-designer-rams` | Subtraction default, pixel-level judgment |
| Product/requirements | `yeaft:persona-pm-jobs` | User pain points, kill features, simplify |
| Security review | `yeaft:persona-security-expert` | Threat modeling, paranoid scanning |

### Persona Override
User can override persona selection:
- "Use Torvalds for the tests too" → dispatch test task with Torvalds
- "I want Jobs to review the architecture" → dispatch arch review with Jobs
User instructions always take precedence.

### When NOT to Use a Persona
- Mechanical tasks (file moves, config changes) → no persona needed
- When user says "just do it, no persona" → respect the instruction

## The Process

1. Read plan, extract all tasks with full text and context
2. For each task:
   a. Select persona based on task type
   b. Load persona skill (`Skill` tool)
   c. Dispatch implementer subagent (`./implementer-prompt.md`)
      - `<persona>` block at top of prompt
      - Then task description and context
   d. Handle subagent status (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED)
   e. Dispatch spec-reviewer subagent (`./spec-reviewer-prompt.md`) — Fowler persona
   f. After spec passes, dispatch code-quality-reviewer (`./code-quality-reviewer-prompt.md`) — Torvalds persona
   g. Both reviews pass → mark task complete
3. After all tasks, dispatch final code reviewer
4. Use `yeaft:finishing-branch` skill to wrap up

## Handling Implementer Status

**DONE:** Proceed to spec compliance review.

**DONE_WITH_CONCERNS:** Read concerns. If about correctness/scope, address before review. If observational, note and proceed.

**NEEDS_CONTEXT:** Provide missing context, re-dispatch.

**BLOCKED:** Assess:
1. Context problem → provide more context, re-dispatch same model
2. Needs more reasoning → re-dispatch with more capable model
3. Task too large → break into smaller pieces
4. Plan is wrong → escalate to human

**Never** ignore an escalation. If the subagent said it's stuck, something needs to change.

## Prompt Templates

- `./implementer-prompt.md` — Dispatch implementer subagent
- `./spec-reviewer-prompt.md` — Dispatch spec compliance reviewer
- `./code-quality-reviewer-prompt.md` — Dispatch code quality reviewer

## Red Flags

**Never:**
- Skip reviews (spec compliance OR code quality)
- Proceed with unfixed issues
- Dispatch multiple implementation subagents in parallel
- Make subagent read plan file (provide full text)
- Ignore subagent questions
- Start code quality review before spec compliance is approved

**If reviewer finds issues:**
- Implementer fixes them
- Reviewer reviews again
- Repeat until approved

## Integration

**Required skills:**
- `yeaft:writing-plans` — Creates the plan this skill executes
- `yeaft:finishing-branch` — Complete development after all tasks

**Subagents should use:**
- `yeaft:tdd` — Test-driven development for each task
