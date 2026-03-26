# Platform Notes

Yeaft Skills runs on bash. Here are platform-specific notes for each operating system.

## macOS

macOS is the primary development and testing platform for Yeaft Skills. It works out of the box.

### Shell Differences

- macOS Catalina (10.15) and later default to **zsh**, not bash
- Yeaft Skills hook scripts use `#!/usr/bin/env bash` and do not depend on the default shell
- macOS ships with an older bash (3.2), but hook scripts only use POSIX-compatible features

### Environment Variables

- `LANG` is typically `zh_CN.UTF-8` (Simplified Chinese) or `en_US.UTF-8` (English)
- Skill file language selection depends on `LANG`: `zh_*` loads Chinese, others load English
- To override, set in `~/.zshrc` or `~/.bash_profile`:
  ```bash
  export LANG=en_US.UTF-8
  ```

### Paths

- Default plugin install path: `~/.claude/plugins/yeaft-skills/`
- `~` expands to `/Users/<username>`

## Linux

Linux environments typically work without issues.

### Permissions

After installation, ensure the hook script has execute permission:

```bash
chmod +x ~/.claude/plugins/yeaft-skills/hooks/session-start
```

Plugin install (`claude plugin install`) handles permissions automatically. Git clone may require manual setup.

### Path Conventions

- Default plugin install path: `~/.claude/plugins/yeaft-skills/`
- `~` expands to `/home/<username>`
- Some distributions (e.g., NixOS) may have non-standard `/usr/bin/env` paths, but most distributions work fine

### Environment Variables

- `LANG` depends on system locale configuration
- Server environments may not set `LANG`, defaulting to English skills (`SKILL.en.md`)
- To specify:
  ```bash
  export LANG=zh_CN.UTF-8
  ```

## Windows

Windows does not natively support bash, but Yeaft Skills includes `run-hook.cmd` — a cross-platform wrapper.

### How run-hook.cmd Works

`hooks/run-hook.cmd` is a polyglot script (valid as both a batch file and a bash script):

- **When run by CMD**: The batch portion executes, searching for bash in this order:
  1. `C:\Program Files\Git\bin\bash.exe` (Git for Windows standard path)
  2. `C:\Program Files (x86)\Git\bin\bash.exe`
  3. `bash` on PATH (MSYS2, Cygwin, etc.)
- **When run by bash**: Directly executes the target hook script

### Installing a Bash Environment

Install [Git for Windows](https://git-scm.com/download/win) (recommended — includes bash). No additional configuration needed after installation.

### PowerShell vs CMD

- **PowerShell**: Claude Code CLI works normally in PowerShell. Hooks call bash via `run-hook.cmd`.
- **CMD**: Same as above — `run-hook.cmd` runs natively in CMD.
- **Git Bash**: Runs bash hooks directly without `run-hook.cmd`.

### Path Separators

- Windows uses backslashes (`\`), Unix uses forward slashes (`/`)
- Yeaft Skills hook scripts run in bash, using forward slashes throughout
- Plugin path example: `C:\Users\<username>\.claude\plugins\yeaft-skills\`
- Bash equivalent: `/c/Users/<username>/.claude/plugins/yeaft-skills/`

### Known Limitations

- If no bash is installed (no Git for Windows, no WSL, no MSYS2), the SessionStart hook silently skips
- The plugin still works — it just won't auto-inject the entry skill on new sessions
- You can manually invoke `/using-yeaft` to load the entry skill

## WSL (Windows Subsystem for Linux)

WSL is the recommended way to use Yeaft Skills on Windows.

### Recommended Approach

1. Install Claude Code CLI inside WSL
2. Install Yeaft Skills inside WSL
3. Run the `claude` command inside WSL

This is equivalent to a Linux environment — everything works out of the box.

### WSL Notes

- WSL filesystem path: `/home/<username>/.claude/plugins/yeaft-skills/`
- Do not mix Windows paths and WSL paths (avoid `/mnt/c/Users/.../` paths)
- `LANG` may not be set by default — add to `~/.bashrc`:
  ```bash
  export LANG=zh_CN.UTF-8  # or en_US.UTF-8
  ```

### WSL + Windows Hybrid Use

If using Claude Code in both native Windows and WSL:
- The two environments are independent, each requiring its own plugin installation
- Plugins in WSL do not affect the native Windows environment, and vice versa
