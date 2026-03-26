# 平台特定说明

Yeaft Skills 的核心运行环境是 bash。不同操作系统下有一些差异需要注意。

## macOS

macOS 是 Yeaft Skills 的主要开发和测试平台，开箱即用。

### Shell 差异

- macOS Catalina (10.15) 及之后默认 shell 是 **zsh**，不是 bash
- Yeaft Skills 的 hook 脚本使用 `#!/usr/bin/env bash`，不依赖默认 shell
- macOS 自带的 bash 版本较旧（3.2），但 hook 脚本只使用 POSIX 兼容特性，不受影响

### 环境变量

- `LANG` 通常为 `zh_CN.UTF-8`（简体中文）或 `en_US.UTF-8`（英文）
- 技能文件语言选择依赖 `LANG` 变量：`zh_*` 加载中文版，其他加载英文版
- 如需覆盖，在 `~/.zshrc` 或 `~/.bash_profile` 中设置：
  ```bash
  export LANG=en_US.UTF-8
  ```

### 路径

- Plugin 默认安装路径：`~/.claude/plugins/yeaft-skills/`
- `~` 展开为 `/Users/<username>`

## Linux

Linux 环境通常无障碍运行。

### 权限

安装后需确保 hook 脚本有执行权限：

```bash
chmod +x ~/.claude/plugins/yeaft-skills/hooks/session-start
```

Plugin 安装方式（`claude plugin install`）会自动处理权限。Git clone 方式可能需要手动设置。

### 路径约定

- Plugin 默认安装路径：`~/.claude/plugins/yeaft-skills/`
- `~` 展开为 `/home/<username>`
- 部分发行版（如 NixOS）的 `/usr/bin/env` 路径可能不同，但绝大多数发行版无需担心

### 环境变量

- `LANG` 取决于系统 locale 配置
- 服务器环境可能未设置 `LANG`，此时默认加载英文版技能（`SKILL.en.md`）
- 如需指定：
  ```bash
  export LANG=zh_CN.UTF-8
  ```

## Windows

Windows 不原生支持 bash，但 Yeaft Skills 提供了 `run-hook.cmd` 跨平台包装器来解决。

### run-hook.cmd 工作原理

`hooks/run-hook.cmd` 是一个 polyglot 脚本（同时是合法的 batch 文件和 bash 脚本）：

- **CMD 执行时**：batch 部分运行，按以下优先级查找 bash：
  1. `C:\Program Files\Git\bin\bash.exe`（Git for Windows 标准路径）
  2. `C:\Program Files (x86)\Git\bin\bash.exe`
  3. PATH 中的 `bash`（MSYS2、Cygwin 等）
- **Bash 执行时**：直接执行目标 hook 脚本

### 安装 Bash 环境

推荐安装 [Git for Windows](https://git-scm.com/download/win)，它自带 bash。安装后无需额外配置。

### PowerShell vs CMD

- **PowerShell**：Claude Code CLI 在 PowerShell 中正常工作。Hook 通过 `run-hook.cmd` 调用 bash。
- **CMD**：同上，`run-hook.cmd` 在 CMD 中原生运行。
- **Git Bash**：直接运行 bash hook，不需要 `run-hook.cmd`。

### 路径分隔符

- Windows 使用反斜杠（`\`），Unix 使用正斜杠（`/`）
- Yeaft Skills 的 hook 脚本在 bash 中运行，统一使用正斜杠
- Plugin 路径示例：`C:\Users\<username>\.claude\plugins\yeaft-skills\`
- 在 bash 中等价于：`/c/Users/<username>/.claude/plugins/yeaft-skills/`

### 已知限制

- 如果系统没有安装 bash（无 Git for Windows、无 WSL、无 MSYS2），SessionStart hook 会静默跳过
- 此时 plugin 仍然可用，只是不会在新 session 开始时自动注入入口技能
- 可以手动调用 `/using-yeaft` 加载入口技能

## WSL (Windows Subsystem for Linux)

WSL 是 Windows 上使用 Yeaft Skills 的推荐方式。

### 推荐做法

1. 在 WSL 内安装 Claude Code CLI
2. 在 WSL 内安装 Yeaft Skills
3. 在 WSL 内运行 `claude` 命令

这样等同于 Linux 环境，所有功能开箱即用。

### WSL 注意事项

- WSL 文件系统路径：`/home/<username>/.claude/plugins/yeaft-skills/`
- 不要混用 Windows 路径和 WSL 路径（如避免 `/mnt/c/Users/.../` 路径）
- `LANG` 默认可能未设置，建议在 `~/.bashrc` 中添加：
  ```bash
  export LANG=zh_CN.UTF-8  # 或 en_US.UTF-8
  ```

### WSL + Windows 混合使用

如果同时在 Windows 原生和 WSL 中使用 Claude Code：
- 两个环境是独立的，各自需要安装 plugin
- WSL 中的 plugin 不会影响 Windows 原生环境，反之亦然
