---
name: writing-skills
description: 当需要为 yeaft-skills 创建新 skill、编辑现有 skill 或学习 SKILL.md 格式规范时使用
---

# 编写 Skills

## 概述

**编写 skill 就是为流程文档做 TDD。** 你写测试场景（压力测试），看它失败（基线行为），写 skill（文档），看测试通过（agent 遵守），然后重构（堵住漏洞）。

## 什么是 Skill

**Skill** 是经过验证的技术、模式或工具的参考指南。

**Skill 是**：可复用的技术、模式、工具、参考指南
**Skill 不是**：关于某次如何解决问题的叙事故事

## SKILL.md 格式规范

### Frontmatter（YAML，必填）

```yaml
---
name: skill-name-with-hyphens
description: 当遇到 XXX 情况时使用...
---
```

**规则**：
- `name`：只允许字母、数字和连字符。不要括号或特殊字符
- `description`：最长 1024 字符，第三人称
- description 只描述**何时使用**，不描述**做什么**
- 以"当..."开头

**为什么 description 不能描述流程？** 测试发现，当 description 概括了 skill 的工作流时，Claude 可能只按 description 执行而跳过正文。description 只写触发条件，Claude 才会认真读完整个 skill。

```yaml
# ❌ 错误：描述了流程——Claude 可能照着描述做而跳过正文
description: 用于执行计划——按任务派遣子代理并在任务间做代码审查

# ✅ 正确：只有触发条件
description: 当需要用独立子代理执行实现计划中的任务时使用
```

### 文件结构

```markdown
---
name: my-skill
description: 当遇到 XXX 情况时使用...
---

# Skill 名称

## 概述
这是什么？核心原则 1-2 句话。

## 何时使用
- 触发条件（症状、场景）
- 不适用的场景

## 核心流程
步骤和方法。

## 常见错误
容易犯的错 + 修正方法。
```

### 目录结构

```
skills/
  skill-name/
    SKILL.md              # 中文版（必须）
    SKILL.en.md           # 英文版（必须）
    supporting-file.*     # 辅助文件（仅在需要时）
```

## 双语要求

每个 skill 必须提供两个文件：
- `SKILL.md` — 中文版（主要版本）
- `SKILL.en.md` — 英文版（翻译）

**规则**：
- 两个文件的 frontmatter `name` 字段必须相同
- 内容必须一致（不是摘要，是完整翻译）
- 技术术语保持英文（如 TDD、subagent、frontmatter）

## Skill 类型

### 工作流 Skill

可复用的工作流程。目录：`skills/<skill-name>/`

```yaml
name: review-code
description: 当审查代码变更、准备提交前审查时使用
```

### Persona Skill

人物认知框架。目录：`skills/personas/<persona-name>/`

**必须包含 7 个段落**：

| 段落 | 说明 |
|------|------|
| 身份与记忆 | 角色定位、个性特征、关键经验 |
| 认知模式 | 从 18 条中选 3-5 条，**内联**在文件中 |
| 核心使命 | 角色的核心目标（2-3 条） |
| 决策框架 | 做决策时的判断逻辑 |
| 沟通风格 | 口头禅、原则、标准 |
| 何时使用 | 适用场景列表 |
| 工作流 | 至少 2 个具体工作流程 |

**认知模式必须内联**：Claude Code 的 Skill tool 加载 SKILL.md 时无法同时加载引用文件。每个 persona 只需要 3-5 条，内联不会太长。

### 参考 Skill

知识库和参考资料。目录：`skills/<skill-name>/`

## Persona × Subagent 集成

当 workflow skill 需要派遣 subagent 时，可以嵌入 persona：

```markdown
## Subagent 派遣

1. 用 Skill tool 加载对应 persona（如 `yeaft:persona-dev-torvalds`）
2. 将 persona 内容放在 subagent prompt 的 `<persona>` 块顶部
3. 在 persona 下方放任务指令

Subagent 一出生就"是"那个角色。
```

### Persona 选择规则

| 任务类型 | Persona |
|----------|---------|
| 代码实现 | `yeaft:persona-dev-torvalds` |
| 架构决策 | `yeaft:persona-architect-fowler` |
| 测试编写 | `yeaft:persona-tester-beck` |
| UI/前端 | `yeaft:persona-designer-rams` |
| 产品/需求 | `yeaft:persona-pm-jobs` |
| 安全审查 | `yeaft:persona-security-expert` |

## 好 Skill vs 坏 Skill

### ✅ 好 Skill

```markdown
---
name: systematic-debugging
description: 当遇到复杂 bug、多次尝试修复无果、或需要系统化排查问题时使用
---

# 系统化调试

## 概述
假设驱动的调试方法。不是随机试错，而是科学方法。

## 核心流程
1. 收集症状
2. 形成假设（最多 3 个）
3. 设计最小实验验证每个假设
4. 二分法缩小范围
...
```

**好在哪**：description 只写触发条件，流程清晰，有具体步骤。

### ❌ 坏 Skill

```markdown
---
name: debug
description: 调试技能。先收集症状，然后形成假设，接着用二分法缩小范围，最后修复
---

# 调试

上次有个 bug，我先看了日志，然后发现是 race condition...
```

**坏在哪**：
- `name` 太短太笼统
- `description` 描述了整个流程（Claude 会照着做而跳过正文）
- 内容是叙事故事而不是可复用的指南

## 搜索优化（CSO）

帮助 Claude 找到你的 skill：

- **description 使用触发条件**：症状、场景、错误信息
- **关键词覆盖**：错误信息、症状同义词、工具名
- **命名用动词**：`systematic-debugging` 而非 `debug-skill`

## 自检清单

提交前确认：

- [ ] SKILL.md 和 SKILL.en.md 都存在
- [ ] Frontmatter 有 `name` 和 `description`
- [ ] `name` 只含字母、数字、连字符
- [ ] `description` 以触发条件开头，不描述流程
- [ ] 中英文内容一致
- [ ] 如果是 Persona skill，包含全部 7 个必需段落
- [ ] 认知模式内联（不引用外部文件）
- [ ] 没有叙事故事，只有可复用的指南
