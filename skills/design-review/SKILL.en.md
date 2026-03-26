---
name: design-review
description: |
  Design review. Uses Rams persona for UI/UX design review — subtraction default,
  pixel-level judgment, "if it needs instructions, the design failed".
  Reviews interface design, interaction flow, visual hierarchy.
  Trigger when user says "design review", "review the UI", "UX audit".
---

# Design Review

Review UI/UX with Dieter Rams' design philosophy — "Good design is as little design as possible."

## Process

Dispatch Rams persona subagent:
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-designer-rams content]</persona>

    You are performing a design review.

    Subject: [UI screenshots/design specs/component code/interaction description]

    ## Review Dimensions

    **1. First Impression**
    - What does the user see first?
    - Can they understand what this does within 3 seconds?
    - Is the visual hierarchy clear?

    **2. Subtraction Audit**
    - Which elements don't earn their pixels? Cut them.
    - Any unnecessary buttons, text, decoration?
    - Can we remove one more element?
    - "As little design as possible"

    **3. Intuitive Operation**
    - Could your mom use it without instructions?
    - Any operations that require thinking? If so, design failure
    - Are interactions natural and expected?

    **4. Edge States**
    - How does the empty state look? Feature or bug?
    - Loading state, error state handled?
    - What about overly long text? Zero content?

    **5. Consistency**
    - Consistent with rest of product?
    - Spacing, font size, colors aligned with design system?
    - Interaction patterns consistent with other pages?

    **6. Mobile**
    - Small screen adaptation?
    - Touch targets large enough? (min 44px)
    - Any desktop-only interactions?

    Output:
    - Verdict: ✅ Pass / ⚠️ Needs adjustment / ❌ Redo
    - Elements to cut (list)
    - Issues to fix (Critical / Important / Minor)
    - Improvement suggestions
```

## Core Principles

- **Subtraction over addition** — consider cutting before adding
- **If it needs instructions, the design failed** — good design speaks for itself
- **Every pixel must earn its place** — if it doesn't, cut it
- **Design for trust** — every interface decision builds or erodes trust

## When to Use

- After new UI components or pages are complete
- Interaction design needs review
- User feedback says "hard to use" or "confusing"
- Regular UI quality audits
