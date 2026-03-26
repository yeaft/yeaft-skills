# Yeaft Skills

> Persona-driven Claude Code skill library — workflows, cognitive patterns, multi-role collaboration.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Skills](https://img.shields.io/badge/Skills-22-green.svg)](#available-skills)
[![Personas](https://img.shields.io/badge/Personas-8-purple.svg)](#persona-skills)
[![Bilingual](https://img.shields.io/badge/Language-CN%20%2B%20EN-orange.svg)](#bilingual-support)

[中文版](./README.md)

## What is Yeaft Skills?

A Claude Code plugin that combines **Personas** (thinking styles of great minds), **Skills** (reusable workflows), and **Agents** (subagent execution) into a unified system.

Unlike generic skill libraries, Yeaft Skills lets Claude think as Steve Jobs when reviewing products, as Linus Torvalds when writing code, and as Kent Beck when designing tests — each with their authentic cognitive patterns.

## Installation

### Method A: Claude Code Plugin (Recommended)

```bash
claude plugin add https://github.com/yeaft/yeaft-skills
```

After installation, the entry skill loads automatically on every new session. Claude will invoke relevant skills when needed.

### Method B: Git Clone

```bash
git clone https://github.com/yeaft/yeaft-skills.git ~/.claude/skills/yeaft-skills
# Or use the setup script:
curl -fsSL https://raw.githubusercontent.com/yeaft/yeaft-skills/main/setup | bash
```

## Available Skills

### Workflow Skills (13)

| Skill | Description |
|-------|-------------|
| `yeaft:brainstorming` | Creative exploration before any design or implementation work |
| `yeaft:writing-plans` | Creating structured implementation plans from requirements |
| `yeaft:subagent-development` | Executing plans via independent subagents with persona-driven review |
| `yeaft:code-review` | Pre-landing code review with quality checklist |
| `yeaft:office-hours` | Requirements discovery and design document creation |
| `yeaft:ceo-review` | Strategic/product review with 4 scope modes |
| `yeaft:design-review` | UI/UX design audit |
| `yeaft:autoplan` | Full auto-review pipeline: CEO → Design → Engineering |
| `yeaft:board-meeting` | Multi-perspective deliberation (6-phase independent review) |
| `yeaft:sprint` | Full sprint pipeline: plan → review → build → ship |
| `yeaft:systematic-debugging` | Hypothesis-driven debugging with bisection and isolation |
| `yeaft:tdd` | Test-driven development: Red → Green → Refactor |
| `yeaft:finishing-branch` | Branch wrap-up: tests, cleanup, PR, merge |

### Persona Skills (8)

Each persona is a cognitive framework — not role-playing, but a way of thinking.

| Persona | Identity | Key Cognitive Patterns |
|---------|----------|----------------------|
| `yeaft:persona-pm-jobs` | Steve Jobs — Product Manager | Focus as subtraction, proxy skepticism, speed calibration |
| `yeaft:persona-dev-torvalds` | Linus Torvalds — System Developer | Speed calibration, inversion reflex, leverage obsession |
| `yeaft:persona-architect-fowler` | Martin Fowler — Architect | Classification instinct, inversion reflex, temporal depth |
| `yeaft:persona-tester-beck` | Kent Beck — Test Architect | Edge-case paranoia, inversion reflex, courage accumulation |
| `yeaft:persona-designer-rams` | Dieter Rams — Product Designer | Subtraction default, hierarchy as service, design for trust |
| `yeaft:persona-cto-advisor` | CTO Advisor | Classification instinct, speed calibration, wartime awareness |
| `yeaft:persona-security-expert` | Security Expert | Paranoid scanning, inversion reflex, edge-case paranoia |
| `yeaft:persona-growth-marketer` | Growth Marketer | Leverage obsession, proxy skepticism, willfulness as strategy |

### Cognitive Patterns (18)

| Pattern | Origin | Core Idea |
|---------|--------|-----------|
| Focus as Subtraction | Jobs | Value = deciding what NOT to do |
| Proxy Skepticism | Bezos | Are metrics serving users or themselves? |
| Speed Calibration | Bezos | Fast default; slow only for irreversible + high-magnitude |
| Classification Instinct | Bezos | One-way door (irreversible) vs two-way door (reversible) |
| Inversion Reflex | Munger | Don't ask "how to succeed" — ask "how would this fail?" |
| Leverage Obsession | Grove | Find the 10x leverage point in every situation |
| Paranoid Scanning | Grove | Only the paranoid survive — what could go wrong? |
| Edge-case Paranoia | Beck | null? Empty array? Concurrent access? Race condition? |
| Courage Accumulation | Beck | Small wins compound into confidence for bigger changes |
| Subtraction Default | Rams | "As little design as possible" |
| Hierarchy as Service | Rams | What should the user see first, second, third? |
| Design for Trust | Rams | Honest, transparent, understandable products |
| Temporal Depth | Fowler | Think in 6-month, 2-year, 5-year horizons |
| People-first Sequencing | Horowitz | Who decides → what to decide → how to execute |
| Wartime Awareness | Horowitz | Peacetime ≠ Wartime — adjust leadership style |
| Willfulness as Strategy | Thiel | 0→1 requires doing what others won't |
| First-principles Manufacturing | Musk | Cost = raw materials + labor, everything else is optimizable |
| Meta-learning Compound | Altman | Learning how to learn compounds faster than any skill |

### Reference & Meta Skills

| Skill | Description |
|-------|-------------|
| `yeaft:cognitive-patterns` | Browse all 18 cognitive patterns |
| `yeaft:writing-skills` | Learn how to write new skills for this library |

## Quick Start

After installing, just talk to Claude naturally:

```
You: Help me refactor the authentication module

Claude: (loads yeaft:brainstorming → discusses approach)
        (loads yeaft:writing-plans → creates implementation plan)
        (loads yeaft:subagent-development → dispatches Torvalds subagent for code,
         Fowler subagent for architecture review, Beck subagent for tests)
```

Or invoke skills directly:

```
You: /skill yeaft:persona-pm-jobs
     Review this feature proposal...

Claude: (thinks as Steve Jobs)
        "Will the user care? Is there a simpler way? Would you use this yourself?"
```

## Bilingual Support

All skills ship in Chinese (SKILL.md) and English (SKILL.en.md). The SessionStart hook detects the `LANG` environment variable:
- Chinese locale (`zh_CN`, `zh_TW`, `zh_HK`) → loads Chinese version
- Other locales → loads English version (falls back to Chinese if English unavailable)

## Core Philosophy

See [ETHOS.md](./ETHOS.md):
- **Boil the Lake** — Do it thoroughly or don't do it
- **Search Before Building** — Don't reinvent the wheel
- **Persona × Skill × Agent** — Three-layer abstraction for combinatorial power

## Acknowledgments

This project adapts ideas and patterns from these open-source projects:
- [Superpowers](https://github.com/obra/superpowers) (MIT) — Plugin architecture, skill loading pattern, subagent workflows
- [gstack](https://github.com/gstack-com/gstack) (MIT) — Cognitive patterns, review pipelines, "Boil the Lake" philosophy
- [claude-skills](https://github.com/TejasQ/claude-skills) (MIT) — Persona template format, three-layer abstraction

## License

MIT — See [LICENSE](./LICENSE)
