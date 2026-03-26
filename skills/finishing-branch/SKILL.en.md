<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: finishing-branch
description: |
  Finish a development branch. Use when implementation is complete and all tests pass.
  Guides completion: verify tests → present options (merge/PR/keep/discard) → execute → cleanup.
  Trigger when user says "finish this branch", "merge", "wrap up".
---

# Finishing a Development Branch

## Overview

Guide completion of development work by presenting clear options and handling chosen workflow.

**Core principle:** Verify tests → Present options → Execute choice → Clean up.

**Announce at start:** "I'm using the finishing-branch skill to complete this work."

## Process

### Step 1: Verify Tests

**Before presenting options, verify tests pass:**

```bash
npm test  # or project's test command
```

**Tests fail?** Stop. Don't proceed to Step 2. Fix first.

**Tests pass?** Continue.

### Step 2: Determine Base Branch

```bash
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
```

### Step 3: Present Options

Present exactly 4 options:

```
Implementation complete. What would you like to do?

1. Merge back to <base-branch> locally
2. Push and create a Pull Request
3. Keep the branch as-is (I'll handle it later)
4. Discard this work
```

### Step 4: Execute Choice

#### Option 1: Merge Locally
```bash
git checkout <base-branch>
git pull
git merge <feature-branch>
# Verify tests on merged result
git branch -d <feature-branch>
```

#### Option 2: Push and Create PR
```bash
git push -u origin <feature-branch>
gh pr create --title "<title>" --body "<description>"
```

#### Option 3: Keep As-Is
Report "Keeping branch <name>." Don't cleanup.

#### Option 4: Discard
**Confirm first:**
```
This will permanently delete:
- Branch <name>
- All commits: <commit-list>

Type 'discard' to confirm.
```
Wait for exact confirmation.

### Step 5: Cleanup Worktree

For Options 1, 2, 4: check and cleanup worktree.
For Option 3: keep worktree.

## Red Flags

**Never:**
- Proceed with failing tests
- Merge without verifying tests
- Delete work without confirmation
- Force-push without explicit request
