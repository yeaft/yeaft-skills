---
name: office-hours
description: |
  Requirements discovery and feasibility analysis. Uses Jobs persona for requirements
  analysis (what does the user actually need) and Torvalds persona for technical
  feasibility. Use before designing new features.
  Trigger when user says "discuss requirements", "is this feasible", "office hours".
---

# Office Hours — Requirements Discovery

Like a startup's office hours — dig deep into what the user actually needs, judge technical feasibility.

## Process

### Phase 1: Requirements Discovery (Jobs Persona)

Dispatch subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-pm-jobs content]</persona>

    You are doing requirements discovery — help the user figure out what they actually need.

    User's initial request: [what user said]
    Project context: [current project state]

    Your job:
    1. What do they SAY they want? What do they ACTUALLY need? (Rarely the same)
    2. What pain point does this solve? Real pain, or engineers entertaining themselves?
    3. Can you describe the user journey in one sentence? If not, too complex
    4. What's the MVP? Not minimum feature set — minimum WOW experience
    5. What's P0? What's noise?

    Output:
    - Core need (one sentence)
    - User pain point analysis
    - P0/P1/P2 priority ranking
    - Features to kill
    - Questions needing clarification
```

### Phase 2: Technical Feasibility (Torvalds Persona)

Dispatch subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-dev-torvalds content]</persona>

    You are doing a technical feasibility assessment.

    Requirements: [Phase 1 output]
    Project codebase: [relevant code paths]

    Your job:
    1. Technically feasible? What limitations?
    2. What's the simplest correct solution?
    3. Impact on existing code? Will it break anything?
    4. Effort estimate (small/medium/large)
    5. Technical risks or dependencies?

    Output:
    - Feasibility: ✅ Feasible / ⚠️ Risky / ❌ Not feasible
    - Recommended approach (one paragraph)
    - Impact scope
    - Effort estimate
    - Risks and dependencies
```

### Phase 3: Synthesis

Collect both subagent outputs, present combined:
- Requirements analysis results
- Technical feasibility conclusion
- Recommended next steps
- Decisions needed from user

## When to Use

- New feature proposals
- User feedback needing translation to requirements
- "Can we do this?" questions
- Decisions requiring both product and technical perspective

## Next Steps

After office hours, based on conclusions:
- Requirements clear + technically feasible → invoke `yeaft:brainstorming` for detailed design
- Need more info → list questions, wait for user
- Not feasible → propose alternatives
