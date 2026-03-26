# 安装指南

Yeaft Skills 支持两种安装方式：Plugin 安装（推荐）和 Git clone 手动安装。

## 前置条件

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) 已安装并可用
- Git（仅 Git clone 方式需要）
- Bash 环境（macOS/Linux 自带；Windows 需要 Git Bash 或 WSL）

## 方式 A：Plugin 安装（推荐）

Plugin 安装是最简单的方式，Claude Code 会自动管理 hook 注册和技能加载。

### 从 Marketplace 安装

```bash
claude plugin marketplace add yeaft-skills
```

### 从 GitHub 安装

```bash
claude plugin install https://github.com/yeaft/yeaft-skills
```

安装完成后，Claude Code 会自动：
1. 将 plugin 下载到 `~/.claude/plugins/yeaft-skills/`
2. 注册 `SessionStart` hook（每次新对话自动加载入口技能）
3. 技能在对话中按需触发，无需额外配置

## 方式 B：Git Clone 安装

适合需要自定义或开发贡献的用户。

### 1. 克隆仓库

```bash
git clone https://github.com/yeaft/yeaft-skills.git ~/.claude/plugins/yeaft-skills
```

### 2. 注册 Plugin

在 Claude Code 的 settings 中手动注册 plugin。编辑 `~/.claude/settings.json`：

```json
{
  "plugins": [
    {
      "path": "~/.claude/plugins/yeaft-skills"
    }
  ]
}
```

或者使用 Claude Code CLI：

```bash
claude plugin install ~/.claude/plugins/yeaft-skills
```

### 3. 验证 Hook 可执行

确保 hook 脚本有执行权限：

```bash
chmod +x ~/.claude/plugins/yeaft-skills/hooks/session-start
```

Windows 用户无需此步骤 — `run-hook.cmd` 会自动找到 bash 执行 hook。

## 验证安装

### 步骤 1：启动新 Session

```bash
claude
```

或在已有项目中：

```bash
cd your-project && claude
```

### 步骤 2：检查技能列表

在 Claude 对话中输入：

```
/skills
```

你应该看到以 `yeaft:` 开头的技能列表，包括：
- `yeaft:using-yeaft` — 入口技能
- `yeaft:brainstorming` — 头脑风暴
- `yeaft:code-review` — 代码审查
- 等等

### 步骤 3：测试技能调用

尝试调用一个技能：

```
/brainstorming
```

如果看到头脑风暴的引导提示，说明安装成功。

## 更新

### Plugin 方式

```bash
claude plugin update yeaft-skills
```

### Git Clone 方式

```bash
cd ~/.claude/plugins/yeaft-skills && git pull
```

## 卸载

### Plugin 方式

```bash
claude plugin remove yeaft-skills
```

### Git Clone 方式

1. 删除 plugin 目录：
   ```bash
   rm -rf ~/.claude/plugins/yeaft-skills
   ```
2. 从 `~/.claude/settings.json` 中移除 plugin 配置

## 常见问题

### Q: 新 Session 没有自动加载技能？

**检查 Hook 注册**：确认 `hooks/session-start` 有执行权限：
```bash
ls -la ~/.claude/plugins/yeaft-skills/hooks/session-start
# 应该看到 -rwxr-xr-x
```

如果权限不对：
```bash
chmod +x ~/.claude/plugins/yeaft-skills/hooks/session-start
```

### Q: `/skills` 命令没有显示 yeaft 技能？

**检查 Plugin 注册**：确认 plugin 已正确注册：
```bash
claude plugin list
```

如果看不到 `yeaft-skills`，重新安装：
```bash
claude plugin install ~/.claude/plugins/yeaft-skills
```

### Q: Windows 上 Hook 不执行？

**检查 Bash 可用性**：Yeaft Skills 的 hook 需要 bash 环境。Windows 上通过 `run-hook.cmd` 自动查找 bash：

1. 安装 [Git for Windows](https://git-scm.com/download/win)（推荐，自带 bash）
2. 或使用 WSL

详见 [平台特定说明](./platform-notes.md)。

### Q: 技能触发了但行为不对？

**检查版本**：确保你在使用最新版本：
```bash
cd ~/.claude/plugins/yeaft-skills && git log --oneline -1
```

**检查语言**：Yeaft Skills 根据 `LANG` 环境变量选择中文或英文版技能。中文环境（`zh_CN`、`zh_TW`）加载 `SKILL.md`，其他环境加载 `SKILL.en.md`。

### Q: 想用英文版但系统是中文？

设置英文环境变量：
```bash
LANG=en_US.UTF-8 claude
```

或反过来，想在英文系统用中文版：
```bash
LANG=zh_CN.UTF-8 claude
```
