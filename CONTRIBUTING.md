# 贡献指南

感谢你对 Yeaft Skills 的关注！以下是参与贡献的指南。

## 如何新增 Skill

### 1. 确定 Skill 类型

| 类型 | 说明 | 目录 |
|------|------|------|
| 工作流 Skill | 可复用的工作流程 | `skills/<skill-name>/` |
| Persona Skill | 人物认知框架 | `skills/personas/<persona-name>/` |
| 参考 Skill | 知识库和参考资料 | `skills/<skill-name>/` |

### 2. SKILL.md 格式规范

每个 skill 需要两个文件：
- `SKILL.md` — 中文版（必须）
- `SKILL.en.md` — 英文版（必须）

#### Frontmatter 必填字段

```yaml
---
name: skill-name-with-hyphens
description: |
  简短描述这个 skill 何时使用。以"当..."或"Use when..."开头。
  不要描述 skill 的具体流程，只描述触发条件。
---
```

**格式规则**：
- `name`：只允许字母、数字和连字符，不要括号或特殊字符
- `description`：最长 1024 字符，第三人称
- description 描述**何时使用**，不描述**做什么**（避免 Claude 读了描述就跳过正文）

#### SKILL.md 基本结构

```markdown
---
name: my-skill
description: 当遇到 XXX 情况时使用...
---

# Skill 名称

## 概述
这是什么？核心原则 1-2 句话。

## 何时使用
- 触发条件 1
- 触发条件 2
- 不适用的场景

## 核心流程
步骤和方法。

## 常见错误
容易犯的错 + 修正方法。
```

### 3. Persona Skill 特殊要求

Persona skill 必须包含以下段落：

| 段落 | 说明 |
|------|------|
| 身份与记忆 | 角色定位、个性、经验 |
| 认知模式 | 从 18 条中选 3-5 条，内联（不引用外部文件） |
| 核心使命 | 角色的核心目标 |
| 决策框架 | 做决策时的判断逻辑 |
| 沟通风格 | 口头禅、原则、标准 |
| 何时使用 | 适用场景 |
| 工作流 | 具体的工作流程（至少 2 个） |

### 4. 双语要求

- 中文版（SKILL.md）和英文版（SKILL.en.md）内容必须一致
- 中文版是主要版本，英文版是翻译
- 技术术语保持英文（如 TDD、subagent、frontmatter）
- 两个文件的 frontmatter `name` 字段必须相同

## PR 流程

### 1. Fork 并克隆

```bash
git clone https://github.com/<your-username>/yeaft-skills.git
cd yeaft-skills
git checkout -b feature/my-new-skill
```

### 2. 创建 Skill 文件

```bash
mkdir -p skills/my-skill
# 创建 SKILL.md 和 SKILL.en.md
```

### 3. 自检清单

提交前确认：

- [ ] SKILL.md 和 SKILL.en.md 都存在
- [ ] Frontmatter 包含 `name` 和 `description`
- [ ] `name` 只含字母、数字、连字符
- [ ] `description` 以触发条件开头，不描述流程
- [ ] 中英文内容一致
- [ ] 如果是 Persona skill，包含全部 7 个必需段落
- [ ] 认知模式内联在 Persona 中（不引用外部文件）

### 4. 提交并创建 PR

```bash
git add skills/my-skill/
git commit -m "feat: add my-skill — 简短描述"
git push origin feature/my-new-skill
```

在 GitHub 上创建 PR，使用 PR 模板填写说明。

## 测试要求

- 新增的 SKILL.md 文件必须能被 `session-start` hook 正确加载
- JSON 文件必须通过 parse 验证
- Persona skill 必须通过结构验证（7 个必需段落）

## 代码风格

- Bash 脚本：`set -euo pipefail`，使用 `shellcheck` 检查
- Markdown：使用 ATX 风格标题（`#`），表格对齐
- 文件名：小写字母、连字符分隔（`my-skill-name`）

## 问题反馈

- Bug 报告：使用 [Bug Report 模板](./.github/ISSUE_TEMPLATE/bug_report.md)
- Feature 请求：使用 [Feature Request 模板](./.github/ISSUE_TEMPLATE/feature_request.md)

## 许可证

贡献的代码将遵循本项目的 [MIT License](./LICENSE)。
