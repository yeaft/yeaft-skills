# 技能目录

Yeaft Skills 包含 3 类技能：**工作流技能**（13 个）、**Persona 技能**（8 个）、**参考资料**（2 个）。

---

## 入口技能

### using-yeaft

- **用途**：每次新 session 自动加载。建立可用技能和 Persona 列表，引导 Claude 在相关场景调用对应技能。
- **触发关键词**：自动触发（SessionStart hook）、`/using-yeaft`
- **涉及 Persona**：无（元技能）

---

## 工作流技能

### brainstorming

- **用途**：创造性工作前的头脑风暴。探索用户意图、需求和设计方案。支持多角色视角 brainstorm — dispatch 独立 subagent，每个带不同 persona，防止锚定效应。
- **触发关键词**：`/brainstorming`、"头脑风暴"、"讨论方案"
- **涉及 Persona**：按需选择（多角色 brainstorm 模式）

### writing-plans

- **用途**：将需求/设计文档转化为分步实现计划。假设执行者零上下文 — 每一步都写清楚改哪些文件、写什么代码、怎么测试。
- **触发关键词**：`/writing-plans`、"写计划"、"做实现计划"
- **涉及 Persona**：无

### subagent-development

- **用途**：按实现计划逐任务执行。每个任务 dispatch 一个独立 subagent（带 persona），任务间两阶段 review（规格合规 + 代码质量）。
- **触发关键词**：`/subagent-development`、"按计划执行"、"开始实现"
- **涉及 Persona**：Torvalds（实现）、Fowler（review）

### code-review

- **用途**：两轮代码审查。Pass 1 架构审查（Fowler persona），Pass 2 代码质量审查（Torvalds persona）。支持 fix-first 原则和范围漂移检测。
- **触发关键词**：`/code-review`、"审查代码"、"review"、"帮我看看这个 PR"
- **涉及 Persona**：Fowler（架构）、Torvalds（代码质量）

### office-hours

- **用途**：需求发现与可行性分析。用 Jobs persona 做需求分析（用户真正需要什么），用 Torvalds persona 做技术可行性判断。
- **触发关键词**：`/office-hours`、"讨论需求"、"这个功能可行吗"
- **涉及 Persona**：Jobs（需求）、Torvalds（技术可行性）

### ceo-review

- **用途**：从战略和产品角度审查计划/设计/代码。4 种 scope 模式：full（全面）、quick（快速）、scope-only（只看范围）、taste-only（品味判断）。
- **触发关键词**：`/ceo-review`、"CEO review"、"从战略角度看"、"产品角度审查"
- **涉及 Persona**：Jobs（产品判断）

### design-review

- **用途**：UI/UX 设计审查。减法默认、像素级判断、"如果需要说明书就是设计失败"。
- **触发关键词**：`/design-review`、"设计审查"、"看看 UI"
- **涉及 Persona**：Rams（设计审查）

### autoplan

- **用途**：自动审查流水线。粗略计划输入，完整审查计划输出。CEO → Design → Eng 三阶段顺序执行，每阶段 dispatch persona subagent。
- **触发关键词**：`/autoplan`、"自动审查"、"帮我做决定"
- **涉及 Persona**：Jobs（CEO 审查）、Rams（设计审查）、Fowler（工程审查）

### board-meeting

- **用途**：多角色审议协议。通过独立贡献（隔离，不互相影响）防止群体思维。6 阶段：上下文 → 独立贡献 → 批评分析 → 综合 → 人类审阅 → 执行。
- **触发关键词**：`/board-meeting`、"多角度讨论"、"我需要不同视角"
- **涉及 Persona**：按需选择（多角色并行）

### tdd

- **用途**：测试驱动开发。在实现功能或修复 bug 之前使用。铁律：没有失败的测试就没有生产代码。Red-Green-Refactor 循环。
- **触发关键词**：`/tdd`、"TDD"、"写测试"、"测试驱动"
- **涉及 Persona**：Beck（测试架构师）

### systematic-debugging

- **用途**：系统调试。遇到 bug、测试失败或意外行为时使用。四阶段：根因调查 → 模式分析 → 假设测试 → 实现修复。3 次修复失败就质疑架构。
- **触发关键词**：`/systematic-debugging`、"调试"、"这个 bug"、"为什么不工作"
- **涉及 Persona**：无

### finishing-branch

- **用途**：分支收尾。实现完成、测试全通过后使用。引导完成：验证测试 → 呈现选项（合并/PR/保留/放弃）→ 执行 → 清理。
- **触发关键词**：`/finishing-branch`、"完成这个分支"、"合并"、"收尾"
- **涉及 Persona**：无

### sprint

- **用途**：从需求到交付的完整流水线。每个阶段 dispatch 专属 persona subagent：需求（Jobs）→ 架构（Fowler）→ 实现（Torvalds）→ 测试（Beck）→ 最终审查（Fowler）。
- **触发关键词**：`/sprint`、"从头到尾做这个功能"、"完整开发流程"
- **涉及 Persona**：Jobs → Fowler → Torvalds → Beck → Fowler

---

## Persona 技能

每个 Persona 是一个独立的"角色人格"，可以被工作流自动调用，也可以手动激活。

### persona-pm-jobs

- **用途**：Steve Jobs — 产品经理。产品分析、需求拆解、设计评审。
- **触发关键词**：`/persona:pm-jobs`、产品决策场景自动触发
- **认知模式**：聚焦即减法、代理指标怀疑、速度校准、层级即服务、减法默认

### persona-dev-torvalds

- **用途**：Linus Torvalds — 系统开发者。代码实现、性能优化、数据结构设计。
- **触发关键词**：`/persona:dev-torvalds`、代码实现场景自动触发
- **认知模式**：速度校准、反转反射、杠杆执念、偏执扫描

### persona-architect-fowler

- **用途**：Martin Fowler — 架构师。架构评审、重构决策、依赖分析。
- **触发关键词**：`/persona:architect-fowler`、架构决策场景自动触发
- **认知模式**：分类本能、反转反射、时间纵深、代理指标怀疑

### persona-tester-beck

- **用途**：Kent Beck — 测试架构师。测试策略、TDD、边界条件分析。
- **触发关键词**：`/persona:tester-beck`、测试场景自动触发
- **认知模式**：边界条件偏执、反转反射、勇气累积

### persona-designer-rams

- **用途**：Dieter Rams — 产品设计师。UI/UX 设计、视觉评审、交互优化。
- **触发关键词**：`/persona:designer-rams`、设计场景自动触发
- **认知模式**：减法默认、层级即服务、边界条件偏执、信任设计

### persona-cto-advisor

- **用途**：CTO 顾问。技术选型、架构决策、团队建设。
- **触发关键词**：`/persona:cto-advisor`、技术决策场景自动触发
- **认知模式**：分类本能、速度校准、人员优先排序、战时意识

### persona-security-expert

- **用途**：安全专家。安全审计、威胁建模（STRIDE）、代码安全审查。
- **触发关键词**：`/persona:security-expert`、安全场景自动触发
- **认知模式**：偏执扫描、反转反射、边界条件偏执

### persona-growth-marketer

- **用途**：增长营销专家。增长策略、转化优化、产品发布、渠道评估。
- **触发关键词**：`/persona:growth-marketer`、增长场景自动触发
- **认知模式**：杠杆执念、代理指标怀疑、意志力即战略

---

## 参考资料

### cognitive-patterns

- **用途**：18 条来自顶级 CEO 和思想家的认知模式。被 Persona 技能引用，也可独立查阅。
- **触发关键词**：`/cognitive-patterns`、"深度思考"、"像 CEO 一样思考"
- **来源**：[gstack](https://github.com/garrytan/gstack)（MIT License）

### personas/README.md

- **用途**：Persona 技能使用指南。说明所有可用 persona、调用方式、与工作流的关系。
- **触发关键词**：无（参考文档）
