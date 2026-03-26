# Installation Guide

Yeaft Skills supports two installation methods: Plugin install (recommended) and Git clone.

## Prerequisites

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and working
- Git (only needed for Git clone method)
- Bash environment (built-in on macOS/Linux; Windows needs Git Bash or WSL)

## Method A: Plugin Install (Recommended)

Plugin install is the simplest method. Claude Code automatically manages hook registration and skill loading.

### Install from Marketplace

```bash
claude plugin marketplace add yeaft-skills
```

### Install from GitHub

```bash
claude plugin install https://github.com/yeaft/yeaft-skills
```

After installation, Claude Code will automatically:
1. Download the plugin to `~/.claude/plugins/yeaft-skills/`
2. Register the `SessionStart` hook (loads entry skill on every new conversation)
3. Skills trigger on demand during conversations — no extra configuration needed

## Method B: Git Clone Install

Best for users who want to customize or contribute.

### 1. Clone the Repository

```bash
git clone https://github.com/yeaft/yeaft-skills.git ~/.claude/plugins/yeaft-skills
```

### 2. Register the Plugin

Manually register the plugin in Claude Code settings. Edit `~/.claude/settings.json`:

```json
{
  "plugins": [
    {
      "path": "~/.claude/plugins/yeaft-skills"
    }
  ]
}
```

Or use the Claude Code CLI:

```bash
claude plugin install ~/.claude/plugins/yeaft-skills
```

### 3. Verify Hook Is Executable

Ensure the hook script has execute permission:

```bash
chmod +x ~/.claude/plugins/yeaft-skills/hooks/session-start
```

Windows users can skip this step — `run-hook.cmd` automatically finds bash to execute hooks.

## Verify Installation

### Step 1: Start a New Session

```bash
claude
```

Or in an existing project:

```bash
cd your-project && claude
```

### Step 2: Check Skill List

In the Claude conversation, type:

```
/skills
```

You should see skills prefixed with `yeaft:`, including:
- `yeaft:using-yeaft` — Entry skill
- `yeaft:brainstorming` — Brainstorming
- `yeaft:code-review` — Code review
- And more

### Step 3: Test a Skill

Try invoking a skill:

```
/brainstorming
```

If you see the brainstorming guided prompt, the installation is successful.

## Updating

### Plugin Method

```bash
claude plugin update yeaft-skills
```

### Git Clone Method

```bash
cd ~/.claude/plugins/yeaft-skills && git pull
```

## Uninstalling

### Plugin Method

```bash
claude plugin remove yeaft-skills
```

### Git Clone Method

1. Remove the plugin directory:
   ```bash
   rm -rf ~/.claude/plugins/yeaft-skills
   ```
2. Remove the plugin entry from `~/.claude/settings.json`

## Troubleshooting

### Q: Skills don't auto-load in a new session?

**Check hook registration**: Confirm `hooks/session-start` has execute permission:
```bash
ls -la ~/.claude/plugins/yeaft-skills/hooks/session-start
# Should show -rwxr-xr-x
```

If permissions are wrong:
```bash
chmod +x ~/.claude/plugins/yeaft-skills/hooks/session-start
```

### Q: `/skills` doesn't show yeaft skills?

**Check plugin registration**: Confirm the plugin is properly registered:
```bash
claude plugin list
```

If you don't see `yeaft-skills`, reinstall:
```bash
claude plugin install ~/.claude/plugins/yeaft-skills
```

### Q: Hooks don't run on Windows?

**Check bash availability**: Yeaft Skills hooks require a bash environment. On Windows, `run-hook.cmd` automatically searches for bash:

1. Install [Git for Windows](https://git-scm.com/download/win) (recommended — includes bash)
2. Or use WSL

See [Platform Notes](./platform-notes.en.md) for details.

### Q: A skill triggered but behaves incorrectly?

**Check version**: Make sure you're on the latest version:
```bash
cd ~/.claude/plugins/yeaft-skills && git log --oneline -1
```

**Check language**: Yeaft Skills selects Chinese or English skill files based on the `LANG` environment variable. Chinese locales (`zh_CN`, `zh_TW`) load `SKILL.md`; other locales load `SKILL.en.md`.

### Q: Want English but your system locale is Chinese?

Set the English environment variable:
```bash
LANG=en_US.UTF-8 claude
```

Or the reverse — use Chinese on an English system:
```bash
LANG=zh_CN.UTF-8 claude
```
