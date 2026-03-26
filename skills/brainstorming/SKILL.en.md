<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: brainstorming
description: |
  Creative brainstorming. Use before any creative work — new features, architecture design,
  product direction. Explores user intent, requirements, and design through dialogue.
  Supports multi-persona brainstorm (dispatches independent subagents each with a different
  persona, truly isolated to prevent anchoring bias).
  Trigger when user says "brainstorm", "let's discuss", "think about this from multiple angles".
---

# Brainstorming — Turn Ideas Into Designs

Help turn ideas into fully formed designs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design and get user approval.

<HARD-GATE>
Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it. This applies to EVERY project regardless of perceived simplicity.
</HARD-GATE>

## Anti-Pattern: "This Is Too Simple To Need A Design"

Every project goes through this process. A todo list, a single-function utility, a config change — all of them. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short (a few sentences for truly simple projects), but you MUST present it and get approval.

## Checklist

Complete these steps in order:

1. **Explore project context** — check files, docs, recent commits
2. **Ask clarifying questions** — one at a time, understand purpose/constraints/success criteria
3. **Propose 2-3 approaches** — with trade-offs and your recommendation
4. **Present design** — in sections scaled to complexity, get user approval after each section
5. **Write design doc** — save and commit
6. **Spec self-review** — check for placeholders, contradictions, ambiguity, scope
7. **User reviews written spec** — ask user to review before proceeding
8. **Transition to implementation** — invoke `yeaft:writing-plans` skill to create implementation plan

## The Process

**Understanding the idea:**

- Check out the current project state first (files, docs, recent commits)
- Assess scope: if the request describes multiple independent subsystems, flag this immediately and help decompose
- Ask questions one at a time to refine the idea
- Prefer multiple choice questions when possible
- Focus on: purpose, constraints, success criteria

**Exploring approaches:**

- Propose 2-3 different approaches with trade-offs
- Lead with your recommended option and explain why
- Present options conversationally

**Presenting the design:**

- Once you believe you understand what you're building, present the design
- Scale each section to its complexity — a few sentences if straightforward, up to 200-300 words if nuanced
- Ask after each section whether it looks right so far
- Cover: architecture, components, data flow, error handling, testing
- Be ready to go back and clarify

**Working in existing codebases:**

- Explore the current structure before proposing changes. Follow existing patterns.
- Where existing code has problems that affect the work, include targeted improvements
- Don't propose unrelated refactoring

## Multi-Persona Brainstorm Mode (Optional)

When the problem benefits from multiple perspectives, dispatch parallel subagents each with a different persona to brainstorm independently:

### Trigger
User says "I want multiple perspectives" or the problem crosses domains (product + engineering + design).

### Flow

1. State the problem clearly
2. Dispatch 2-3 subagents IN PARALLEL, each with a different persona:

   **Subagent A (Jobs perspective):**
   ```
   Task tool:
     prompt: |
       <persona>[yeaft:persona-pm-jobs content]</persona>
       Brainstorm this problem from your perspective:
       [problem statement]
       Output: 3-5 key points + your recommendation
       Do NOT consider other perspectives — stay in your lane.
   ```

   **Subagent B (Torvalds perspective):**
   ```
   Task tool:
     prompt: |
       <persona>[yeaft:persona-dev-torvalds content]</persona>
       Brainstorm this problem from your perspective:
       [problem statement]
       Output: 3-5 key points + your recommendation
       Do NOT consider other perspectives.
   ```

   **Subagent C (Rams perspective):**
   ```
   Task tool:
     prompt: |
       <persona>[yeaft:persona-designer-rams content]</persona>
       Brainstorm this problem from your perspective:
       [problem statement]
       Output: 3-5 key points + your recommendation
   ```

3. Collect all subagent outputs
4. Synthesize (controller, no persona — neutral):
   - Where do they agree?
   - Where do they disagree?
   - What did nobody think of?
5. Present synthesis to user for decision

**Difference from Board Meeting**: This dispatches truly independent subagents (truly isolated). They don't know each other exists, genuinely preventing anchoring bias.

## After the Design

- Save design document to appropriate location and commit
- Spec self-review: scan for placeholders, internal contradictions, scope drift, ambiguity — fix inline
- Ask user to review the written spec
- Once approved, invoke `yeaft:writing-plans` to create implementation plan

## Key Principles

- **One question at a time** — don't overwhelm with multiple questions
- **Multiple choice preferred** — easier to answer than open-ended
- **YAGNI ruthlessly** — remove unnecessary features from all designs
- **Explore alternatives** — always propose 2-3 approaches before settling
- **Incremental validation** — present design, get approval before moving on
- **Be flexible** — go back and clarify when something doesn't make sense
