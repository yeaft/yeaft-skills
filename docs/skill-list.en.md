# Skill Directory

Yeaft Skills includes 3 categories: **Workflow Skills** (13), **Persona Skills** (8), and **Reference Materials** (2).

---

## Entry Skill

### using-yeaft

- **Purpose**: Auto-loaded on every new session. Establishes the list of available skills and personas, guiding Claude to invoke the right skill in relevant scenarios.
- **Trigger keywords**: Auto-triggered (SessionStart hook), `/using-yeaft`
- **Personas involved**: None (meta skill)

---

## Workflow Skills

### brainstorming

- **Purpose**: Brainstorming before creative work. Explore user intent, requirements, and design options. Supports multi-persona brainstorm — dispatches independent subagents, each with a different persona, to prevent anchoring bias.
- **Trigger keywords**: `/brainstorming`, "brainstorm", "discuss options"
- **Personas involved**: Selected on demand (multi-persona brainstorm mode)

### writing-plans

- **Purpose**: Convert requirements/design docs into step-by-step implementation plans. Assumes the executor has zero context — every step specifies which files to change, what code to write, how to test.
- **Trigger keywords**: `/writing-plans`, "write a plan", "create implementation plan"
- **Personas involved**: None

### subagent-development

- **Purpose**: Execute implementation plans task by task. Each task dispatches an independent subagent (with persona), with two-phase review between tasks (spec compliance + code quality).
- **Trigger keywords**: `/subagent-development`, "execute the plan", "start building"
- **Personas involved**: Torvalds (implementation), Fowler (review)

### code-review

- **Purpose**: Two-pass code review. Pass 1: architecture review (Fowler persona). Pass 2: code quality review (Torvalds persona). Supports fix-first principle and scope drift detection.
- **Trigger keywords**: `/code-review`, "review code", "review", "look at this PR"
- **Personas involved**: Fowler (architecture), Torvalds (code quality)

### office-hours

- **Purpose**: Requirements discovery and feasibility analysis. Jobs persona for requirements analysis (what users truly need), Torvalds persona for technical feasibility.
- **Trigger keywords**: `/office-hours`, "discuss requirements", "is this feature feasible"
- **Personas involved**: Jobs (requirements), Torvalds (technical feasibility)

### ceo-review

- **Purpose**: Review plans/designs/code from a strategic and product perspective. 4 scope modes: full, quick, scope-only, taste-only.
- **Trigger keywords**: `/ceo-review`, "CEO review", "strategic perspective", "product review"
- **Personas involved**: Jobs (product judgment)

### design-review

- **Purpose**: UI/UX design review. Subtraction by default, pixel-level judgment, "if it needs a manual, the design has failed."
- **Trigger keywords**: `/design-review`, "design review", "check the UI"
- **Personas involved**: Rams (design review)

### autoplan

- **Purpose**: Automated review pipeline. Rough plan in, fully reviewed plan out. CEO → Design → Eng three-stage sequential execution, each stage dispatches a persona subagent.
- **Trigger keywords**: `/autoplan`, "auto review", "help me decide"
- **Personas involved**: Jobs (CEO review), Rams (design review), Fowler (engineering review)

### board-meeting

- **Purpose**: Multi-persona deliberation protocol. Prevents groupthink through independent contributions (isolated, no cross-influence). 6 phases: context → independent contributions → critical analysis → synthesis → human review → execution.
- **Trigger keywords**: `/board-meeting`, "multi-perspective discussion", "I need different viewpoints"
- **Personas involved**: Selected on demand (parallel multi-persona)

### tdd

- **Purpose**: Test-driven development. Use before implementing features or fixing bugs. Iron rule: no production code without a failing test. Red-Green-Refactor cycle.
- **Trigger keywords**: `/tdd`, "TDD", "write tests", "test-driven"
- **Personas involved**: Beck (test architect)

### systematic-debugging

- **Purpose**: Systematic debugging. Use for bugs, test failures, or unexpected behavior. Four phases: root cause investigation → pattern analysis → hypothesis testing → implement fix. If 3 fix attempts fail, question the architecture.
- **Trigger keywords**: `/systematic-debugging`, "debug", "this bug", "why doesn't it work"
- **Personas involved**: None

### finishing-branch

- **Purpose**: Branch finishing. Use after implementation is complete and tests pass. Guides: verify tests → present options (merge/PR/keep/abandon) → execute → clean up.
- **Trigger keywords**: `/finishing-branch`, "finish this branch", "merge", "wrap up"
- **Personas involved**: None

### sprint

- **Purpose**: Full pipeline from requirements to delivery. Each stage dispatches a dedicated persona subagent: Requirements (Jobs) → Architecture (Fowler) → Implementation (Torvalds) → Testing (Beck) → Final Review (Fowler).
- **Trigger keywords**: `/sprint`, "build this feature end-to-end", "full development cycle"
- **Personas involved**: Jobs → Fowler → Torvalds → Beck → Fowler

---

## Persona Skills

Each Persona is a standalone "role personality" that can be auto-invoked by workflows or manually activated.

### persona-pm-jobs

- **Purpose**: Steve Jobs — Product Manager. Product analysis, requirements breakdown, design review.
- **Trigger keywords**: `/persona:pm-jobs`, auto-triggered in product decision scenarios
- **Cognitive patterns**: Focus is subtraction, Proxy metric skepticism, Speed calibration, Hierarchy as service, Subtraction by default

### persona-dev-torvalds

- **Purpose**: Linus Torvalds — Systems Developer. Code implementation, performance optimization, data structure design.
- **Trigger keywords**: `/persona:dev-torvalds`, auto-triggered in implementation scenarios
- **Cognitive patterns**: Speed calibration, Inversion reflex, Leverage obsession, Paranoid scanning

### persona-architect-fowler

- **Purpose**: Martin Fowler — Software Architect. Architecture review, refactoring decisions, dependency analysis.
- **Trigger keywords**: `/persona:architect-fowler`, auto-triggered in architecture decision scenarios
- **Cognitive patterns**: Classification instinct, Inversion reflex, Time depth, Proxy metric skepticism

### persona-tester-beck

- **Purpose**: Kent Beck — Test Architect. Test strategy, TDD, boundary condition analysis.
- **Trigger keywords**: `/persona:tester-beck`, auto-triggered in testing scenarios
- **Cognitive patterns**: Edge case paranoia, Inversion reflex, Courage accumulation

### persona-designer-rams

- **Purpose**: Dieter Rams — Product Designer. UI/UX design, visual review, interaction optimization.
- **Trigger keywords**: `/persona:designer-rams`, auto-triggered in design scenarios
- **Cognitive patterns**: Subtraction by default, Hierarchy as service, Edge case paranoia, Trust design

### persona-cto-advisor

- **Purpose**: CTO Advisor. Technology selection, architecture decisions, team building.
- **Trigger keywords**: `/persona:cto-advisor`, auto-triggered in technology decision scenarios
- **Cognitive patterns**: Classification instinct, Speed calibration, People-first prioritization, Wartime awareness

### persona-security-expert

- **Purpose**: Security Expert. Security audits, threat modeling (STRIDE), code security review.
- **Trigger keywords**: `/persona:security-expert`, auto-triggered in security scenarios
- **Cognitive patterns**: Paranoid scanning, Inversion reflex, Edge case paranoia

### persona-growth-marketer

- **Purpose**: Growth Marketing Expert. Growth strategy, conversion optimization, product launches, channel evaluation.
- **Trigger keywords**: `/persona:growth-marketer`, auto-triggered in growth scenarios
- **Cognitive patterns**: Leverage obsession, Proxy metric skepticism, Willfulness as strategy

---

## Reference Materials

### cognitive-patterns

- **Purpose**: 18 cognitive patterns from top CEOs and thinkers. Referenced by Persona skills, also available for standalone reading.
- **Trigger keywords**: `/cognitive-patterns`, "deep thinking", "think like a CEO"
- **Source**: [gstack](https://github.com/garrytan/gstack) (MIT License)

### personas/README.md

- **Purpose**: Persona skills usage guide. Lists all available personas, invocation methods, and their relationship with workflows.
- **Trigger keywords**: None (reference document)
