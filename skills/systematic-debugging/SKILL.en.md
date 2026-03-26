<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: systematic-debugging
description: |
  Systematic debugging. Use when encountering any bug, test failure, or unexpected behavior.
  Iron law: no fixes without root cause investigation first. Four phases: root cause →
  pattern analysis → hypothesis testing → implementation.
  3+ failed fixes means question the architecture.
  Trigger when user says "debug", "this bug", "why isn't this working".
---

# Systematic Debugging

## Overview

Random fixes waste time and create new bugs. Quick patches mask underlying issues.

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## The Four Phases

Each phase MUST complete before proceeding to the next.

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully**
   - Don't skip errors or warnings
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - Exact steps?
   - Every time?
   - Not reproducible → gather more data, don't guess

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits
   - New dependencies, config changes

4. **Gather Evidence in Multi-Component Systems**
   Add diagnostic logging at each component boundary, run once to gather evidence, find the break point.

5. **Trace Data Flow**
   - Where does bad value originate?
   - What called this with bad value?
   - Keep tracing up until source
   - Fix at source, not at symptom

### Phase 2: Pattern Analysis

1. **Find Working Examples** — similar working code in same codebase
2. **Compare Against References** — read reference implementation COMPLETELY
3. **Identify Differences** — what's different between working and broken?
4. **Understand Dependencies** — what components, settings, environment needed?

### Phase 3: Hypothesis and Testing

1. **Form Single Hypothesis** — "I think X is root cause because Y"
2. **Test Minimally** — smallest possible change to test hypothesis
3. **One variable at a time**
4. **Verify before continuing**

### Phase 4: Implementation

1. **Create Failing Test Case** — use `yeaft:tdd` skill
2. **Implement Single Fix** — address root cause, one change at a time
3. **Verify** — tests pass? Other tests not broken?
4. **If 3+ fixes failed → question architecture**
   - Each fix reveals new shared state/coupling?
   - Fixes require "massive refactoring"?
   - Discuss with user, don't attempt fix #4

## Red Flags — STOP and Follow Process

If you catch yourself thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see"
- "Add multiple changes, run tests"
- "It's probably X, let me fix that"

**ALL of these mean: STOP. Return to Phase 1.**

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need process" | Simple issues have root causes too. Process is fast for simple bugs |
| "Emergency, no time" | Systematic debugging is FASTER than thrashing |
| "Let me try this first" | First fix sets the pattern. Do it right from start |
| "One more fix attempt" (after 2+) | 3+ failures = architectural problem. Question the pattern |
