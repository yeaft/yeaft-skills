<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: subagent-development
description: |
  Subagent 驱动开发。当你有实现计划需要按任务执行时使用。
  每个任务 dispatch 一个独立 subagent（带 persona），任务间两阶段 review
  （规格合规 + 代码质量）。controller 负责协调，subagent 负责执行。
  当用户说"开始实现"、"按计划执行"、"用 subagent 开发"时触发。
---

# Subagent 驱动开发

通过 dispatch 独立 subagent 执行计划中的每个任务，每个任务完成后进行两阶段 review：先规格合规审查，再代码质量审查。

**为什么用 subagent：** 你把任务委托给独立的代理，它们有隔离的上下文。通过精心构造指令和上下文，确保它们专注并成功。它们不继承你的 session 历史——你构造它们需要的一切。这也保护了你自己的上下文用于协调工作。

**核心原则：** 每任务一个新 subagent + 两阶段 review = 高质量、快迭代

## Subagent 的 Persona 选择

dispatch 任何 subagent 之前，必须选择合适的 persona。

### 步骤 1: 加载 persona skill
使用 `Skill` tool 加载对应的 persona skill，获取完整内容。

### 步骤 2: 将 persona 嵌入 subagent prompt
把 persona 内容放在 `<persona>` block 中，置于 subagent dispatch prompt 的**顶部**，在任务指令之前。

### 选择规则

| 任务类型 | Persona | 原因 |
|----------|---------|------|
| 代码实现 | `yeaft:persona-dev-torvalds` | 数据结构优先，简单方案，"show me the code" |
| 架构决策 | `yeaft:persona-architect-fowler` | 模块边界，依赖方向，YAGNI |
| 规格合规审查 | `yeaft:persona-architect-fowler` | 严格验证需求匹配 |
| 代码质量审查 | `yeaft:persona-dev-torvalds` | 性能，简洁性，代码即文档 |
| 测试编写 | `yeaft:persona-tester-beck` | 边界条件，TDD 纪律 |
| UI/前端 | `yeaft:persona-designer-rams` | 减法默认，像素级判断 |
| 产品/需求 | `yeaft:persona-pm-jobs` | 用户痛点，砍功能，简化 |
| 安全审查 | `yeaft:persona-security-expert` | 威胁建模，偏执扫描 |

### Persona 覆盖
用户可以覆盖 persona 选择：
- "测试也用 Torvalds" → 用 Torvalds dispatch 测试任务
- "让 Jobs 来审架构" → 用 Jobs dispatch 架构审查
用户指令始终优先。

### 什么时候不用 persona
- 机械任务（文件移动、配置修改）→ 不需要 persona
- 用户明确说"别用 persona" → 遵从指令

## 流程

1. 读取计划，提取所有任务的完整文本和上下文
2. 对每个任务：
   a. 根据任务类型选择 persona
   b. 加载 persona skill（`Skill` tool）
   c. dispatch implementer subagent（`./implementer-prompt.md`）
      - prompt 顶部放 `<persona>` block
      - 然后是任务描述和上下文
   d. 处理 subagent 状态（DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED）
   e. dispatch spec-reviewer subagent（`./spec-reviewer-prompt.md`）— Fowler persona
   f. spec 通过后 dispatch code-quality-reviewer（`./code-quality-reviewer-prompt.md`）— Torvalds persona
   g. 两个 review 都通过后标记任务完成
3. 所有任务完成后 dispatch 最终 code reviewer
4. 使用 `yeaft:finishing-branch` skill 收尾

## 处理 Subagent 状态

**DONE：** 进入 spec 合规审查。

**DONE_WITH_CONCERNS：** 读取顾虑。如果关于正确性/范围，先解决再 review。如果是观察性质，记录并继续。

**NEEDS_CONTEXT：** 提供缺失的上下文，重新 dispatch。

**BLOCKED：** 评估阻塞原因：
1. 上下文问题 → 提供更多上下文，同模型重新 dispatch
2. 需要更强推理 → 换更强模型
3. 任务太大 → 拆成更小的子任务
4. 计划本身有问题 → 上报用户

**永远不要** 忽略 subagent 的上报。它说卡住了，就是需要改变。

## Prompt 模板

- `./implementer-prompt.md` — dispatch 实现者 subagent
- `./spec-reviewer-prompt.md` — dispatch 规格审查 subagent
- `./code-quality-reviewer-prompt.md` — dispatch 代码质量审查 subagent

## 红线

**永远不要：**
- 跳过 review（spec 合规和代码质量都不能跳）
- 在未修复问题的情况下继续
- 并行 dispatch 多个实现 subagent（会冲突）
- 让 subagent 自己去读计划文件（提供完整文本）
- 忽略 subagent 的问题
- 在 spec 合规 review 之前做代码质量 review

**如果 reviewer 发现问题：**
- implementer 修复
- reviewer 重新 review
- 循环直到通过
- 不要跳过重新 review

## 集成

**依赖的 skills：**
- `yeaft:writing-plans` — 创建此 skill 执行的计划
- `yeaft:finishing-branch` — 所有任务完成后收尾

**Subagent 应使用：**
- `yeaft:tdd` — 测试驱动开发
