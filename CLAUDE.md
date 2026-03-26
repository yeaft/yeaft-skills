# Yeaft Skills — Claude Code 配置

本项目是 Claude Code Plugin，提供 Persona 驱动的技能库。

## 项目结构

```
.claude-plugin/     Plugin 元数据
hooks/              SessionStart 钩子（入口 skill 注入）
skills/             所有技能
  using-yeaft/      入口技能（自动加载）
  personas/         Persona 类技能
  cognitive-patterns/ 认知模式参考
  ...               工作流类技能
```

## 开发约定

- Skill 内容放在 `SKILL.md`（中文版）和 `SKILL.en.md`（英文版）
- SKILL.md 使用 YAML frontmatter（`name`, `description` 字段）
- 每个 skill 目录名即为 skill 标识符：`yeaft:<dir-name>`
- Persona skills 放在 `skills/personas/<persona-name>/` 下
- 工作流 skills 放在 `skills/<workflow-name>/` 下

## 测试 Plugin

```bash
# 本地安装测试
claude plugin add ./

# 验证 SessionStart hook
claude  # 新 session 应自动加载入口技能
```
