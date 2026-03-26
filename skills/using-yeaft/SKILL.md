---
name: using-yeaft
description: 每次对话开始时使用 — 建立可用技能和 Persona 列表
---

<EXTREMELY_IMPORTANT>
你已安装 yeaft skills。这些技能在相关场景下**必须**被调用。

如果你认为有哪怕 1% 的可能性某个技能适用，你**绝对必须**调用它。
</EXTREMELY_IMPORTANT>

## 可用技能

### 工作流技能
| 技能 | 何时使用 |
|------|----------|
| `yeaft:brainstorming` | 任何创造性工作之前 — 功能设计、组件规划、方案讨论 |
| `yeaft:writing-plans` | 创建实现计划时 |
| `yeaft:subagent-development` | 用独立子代理执行计划中的任务时 |
| `yeaft:code-review` | 审查代码变更时（提交前审查） |
| `yeaft:office-hours` | 需求定义或编写设计文档时 |
| `yeaft:ceo-review` | 从战略/产品角度审查计划时 |
| `yeaft:design-review` | 审核 UI/UX 设计决策时 |
| `yeaft:autoplan` | 运行完整自动审查流水线（CEO → Design → Eng）时 |
| `yeaft:board-meeting` | 需要多角度审议某个决策时 |
| `yeaft:sprint` | 运行完整冲刺流水线（计划 → 审查 → 构建 → 交付）时 |
| `yeaft:systematic-debugging` | 调试复杂问题时 |
| `yeaft:tdd` | 编写测试或进行测试驱动开发时 |
| `yeaft:finishing-branch` | 收尾开发分支时 |

### Persona 技能（激活特定思维方式）
| Persona | 何时使用 |
|---------|----------|
| `yeaft:persona-pm-jobs` | 产品决策、需求分析、设计评审 |
| `yeaft:persona-dev-torvalds` | 系统设计、性能优化、"show me the code" |
| `yeaft:persona-architect-fowler` | 架构审查、重构、依赖分析 |
| `yeaft:persona-tester-beck` | 测试策略、TDD、边界条件分析 |
| `yeaft:persona-designer-rams` | UI/UX 设计、"少即是多"判断 |
| `yeaft:persona-cto-advisor` | 技术栈选型、团队建设、创业技术决策 |
| `yeaft:persona-security-expert` | 安全审计、威胁建模 |
| `yeaft:persona-growth-marketer` | 增长策略、营销、用户获取 |

### 参考资料
| 技能 | 用途 |
|------|------|
| `yeaft:cognitive-patterns` | 18 条 CEO 认知模式 — 需要深度思维框架时浏览 |

## 技能优先级

1. **流程技能优先**（brainstorming、debugging）— 决定如何入手
2. **Persona 技能**（需要特定视角时）
3. **执行技能**（code-review、tdd）— 指导具体执行

## 危险信号

| 你的想法 | 现实 |
|----------|------|
| "这只是个简单问题" | 先检查有没有适用的技能 |
| "我已经知道怎么做了" | 技能会持续迭代，加载最新版本 |
| "用 Persona 太大材小用了" | Persona 提供认知框架，不只是角色扮演 |
| "我先做这一步再说" | 动手前先检查技能 |
