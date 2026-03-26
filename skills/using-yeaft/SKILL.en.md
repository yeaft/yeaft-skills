---
name: using-yeaft
description: Use when starting any conversation — establishes available skills and personas
---

<EXTREMELY_IMPORTANT>
You have yeaft skills installed. These skills MUST be invoked when relevant.

If you think there is even a 1% chance a skill might apply, you ABSOLUTELY MUST invoke it.
</EXTREMELY_IMPORTANT>

## Available Skills

### Workflow Skills
| Skill | When to use |
|-------|-------------|
| `yeaft:brainstorming` | Before any creative work — features, components, designs |
| `yeaft:writing-plans` | When creating implementation plans |
| `yeaft:subagent-development` | When executing plans with independent tasks |
| `yeaft:code-review` | When reviewing code changes (pre-landing review) |
| `yeaft:office-hours` | When defining requirements or writing design docs |
| `yeaft:ceo-review` | When reviewing plans from a strategic/product perspective |
| `yeaft:design-review` | When auditing UI/UX design decisions |
| `yeaft:autoplan` | When running full auto-review pipeline (CEO → Design → Eng) |
| `yeaft:board-meeting` | When needing multi-perspective deliberation on a decision |
| `yeaft:sprint` | When running a full sprint pipeline (plan → review → build → ship) |
| `yeaft:systematic-debugging` | When debugging a complex issue |
| `yeaft:tdd` | When writing tests or doing test-driven development |
| `yeaft:finishing-branch` | When wrapping up a development branch |

### Persona Skills (activate a thinking style)
| Persona | When to use |
|---------|-------------|
| `yeaft:persona-pm-jobs` | Product decisions, requirements, design judgment |
| `yeaft:persona-dev-torvalds` | System design, performance, "show me the code" |
| `yeaft:persona-architect-fowler` | Architecture review, refactoring, dependency analysis |
| `yeaft:persona-tester-beck` | Test strategy, TDD, edge case analysis |
| `yeaft:persona-designer-rams` | UI/UX design, "less is more" judgment |
| `yeaft:persona-cto-advisor` | Tech stack, hiring, startup technical decisions |
| `yeaft:persona-security-expert` | Security audit, threat modeling |
| `yeaft:persona-growth-marketer` | Growth strategy, marketing, user acquisition |

### Reference
| Skill | Purpose |
|-------|---------|
| `yeaft:cognitive-patterns` | 18 CEO cognitive patterns — browse when you need deeper thinking frameworks |

## Skill Priority

1. **Process skills first** (brainstorming, debugging) — determine HOW to approach
2. **Persona skills** (when a specific perspective is needed)
3. **Implementation skills** (code-review, tdd) — guide execution

## Red Flags

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Check for skills anyway |
| "I already know how to do this" | Skills evolve. Load current version |
| "The persona is overkill" | Personas provide cognitive frameworks, not just personality |
| "I'll just do this one thing first" | Check BEFORE doing anything |
