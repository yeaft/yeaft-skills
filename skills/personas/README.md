# Persona Skills 使用指南

## 什么是 Persona？

Persona 是一种特殊的 Skill——它不是工作流程，而是**思维方式**。

当你激活一个 Persona，Claude 会以那个人物的认知模式来思考和工作。不是角色扮演——是认知升级。每个 Persona 内嵌了 3-5 条经过精选的认知模式（来自 Bezos、Munger、Jobs、Rams 等顶级思考者），让 Claude 在特定领域获得更深层的判断力。

## 可用 Personas

| Persona | 人物 | 擅长领域 | 调用方式 |
|---------|------|----------|----------|
| `persona-pm-jobs` | Steve Jobs | 产品分析、需求拆解、设计评审 | `/persona:pm-jobs` |
| `persona-dev-torvalds` | Linus Torvalds | 代码实现、性能优化、数据结构 | `/persona:dev-torvalds` |
| `persona-architect-fowler` | Martin Fowler | 架构评审、重构策略、依赖分析 | `/persona:architect-fowler` |
| `persona-tester-beck` | Kent Beck | TDD、测试策略、边界条件 | `/persona:tester-beck` |
| `persona-designer-rams` | Dieter Rams | UI/UX 设计、视觉评审、交互优化 | `/persona:designer-rams` |
| `persona-cto-advisor` | CTO 顾问 | 技术选型、架构决策、团队建设 | `/persona:cto-advisor` |
| `persona-security-expert` | 安全专家 | 威胁建模、安全审计、漏洞分析 | `/persona:security-expert` |
| `persona-growth-marketer` | 增长营销 | 增长策略、转化优化、产品发布 | `/persona:growth-marketer` |

## 怎么用

### 直接调用
```
/persona:pm-jobs
然后描述你的问题
```

### 在 Workflow 中自动选择
Workflow skills（如 `/subagent-development`、`/autoplan`）会根据任务类型自动选择合适的 Persona：
- 代码实现 → Torvalds
- 架构评审 → Fowler
- 测试编写 → Beck
- UI 设计 → Rams
- 产品决策 → Jobs

### 手动覆盖
你可以覆盖自动选择：
> "用 Jobs 的视角来审查这个架构"
> "让 Torvalds 来写测试"

## Persona vs Workflow 的区别

| | Persona | Workflow |
|---|---------|---------|
| **是什么** | 思维方式 | 工作流程 |
| **做什么** | 改变 Claude 的判断方式 | 指导 Claude 的工作步骤 |
| **什么时候用** | 需要特定视角时 | 需要结构化流程时 |
| **能组合吗** | 可以嵌入任何 Workflow | 可以在任意步骤使用 Persona |

最强大的用法是 **Persona × Workflow**：在 Workflow 的每个步骤中，用最合适的 Persona 来执行。

## 认知模式

每个 Persona 内嵌了 3-5 条认知模式。完整的 18 条认知模式库在 `/cognitive-patterns`。

这些模式来自 Bezos（单向门/双向门）、Munger（反转思维）、Jobs（聚焦减法）、Rams（少即是多）、Horowitz（战时/和平时）等顶级思考者。

## 双语支持

每个 Persona 都有中文版（`SKILL.md`）和英文版（`SKILL.en.md`）。中文版是第一语言。
