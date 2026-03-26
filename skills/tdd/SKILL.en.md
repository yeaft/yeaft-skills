<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: tdd
description: |
  Test-driven development. Use when implementing any feature or bugfix, before writing
  implementation code. Iron law: no production code without a failing test first.
  Red-Green-Refactor cycle.
  Trigger when user says "TDD", "write tests", "test-driven".
---

# Test-Driven Development (TDD)

## Overview

Write the test first. Watch it fail. Write minimal code to pass.

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over.

**No exceptions:**
- Don't keep it as "reference"
- Don't "adapt" it while writing tests
- Don't look at it
- Delete means delete

## Red-Green-Refactor

### RED — Write Failing Test

One minimal test showing expected behavior.

Requirements:
- One behavior
- Clear name
- Real code (no mocks unless unavoidable)

### Verify RED — Watch It Fail

**MANDATORY. Never skip.**

Confirm:
- Test fails (not errors)
- Failure message is expected
- Fails because feature missing (not typos)

### GREEN — Minimal Code

Simplest code to pass the test. Nothing more.

### Verify GREEN — Watch It Pass

**MANDATORY.**

Confirm:
- Test passes
- Other tests still pass
- Output pristine (no errors, warnings)

### REFACTOR — Clean Up

After green only:
- Remove duplication
- Improve names
- Extract helpers

Keep tests green. Don't add behavior.

### Repeat

Next failing test for next behavior.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Too simple to test" | Simple code breaks. Test takes 30 seconds |
| "I'll test after" | Tests passing immediately prove nothing |
| "Try first, then test" | First fix sets the pattern. Do it right from start |
| "TDD is dogmatic" | TDD IS pragmatic — faster than debugging |
| "Manual test is enough" | Ad-hoc ≠ systematic. No record, can't re-run |
| "Deleting X hours is wasteful" | Sunk cost fallacy. Keeping unverified code is waste |

## Red Flags — STOP and Start Over

- Code before test
- Test after implementation
- Test passes immediately
- Can't explain why test failed
- "Just this once"

**All of these mean: Delete code. Start over with TDD.**

## Verification Checklist

- [ ] Every new function/method has a test
- [ ] Watched each test fail before implementing
- [ ] Each test failed for expected reason
- [ ] Wrote minimal code to pass
- [ ] All tests pass
- [ ] Output pristine
- [ ] Tests use real code
- [ ] Edge cases and errors covered
