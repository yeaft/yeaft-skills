---
name: board-meeting
description: |
  多角色审议协议。通过独立贡献（隔离，不互相影响）防止群体思维。
  6 阶段：上下文 → 独立贡献 → 批评分析 → 综合 → 人类审阅 → 执行。
  Phase 2 dispatch 并行 persona subagent（真正隔离）。
  当用户说"board meeting"、"多角度讨论"、"我需要不同视角"时触发。
---

# Board Meeting 协议

多角色独立审议，防止群体思维。

核心原则：每个角色独立思考，不受其他角色影响。通过 dispatch 独立 subagent 实现真正隔离。

## Phase 1: 上下文

清晰陈述需要决策的问题。确定需要哪些角度。

格式：
```
## 决策议题
[一句话描述需要做什么决策]

## 背景
[相关上下文、约束、历史]

## 参与角色
[根据问题性质选择 2-4 个角色]
```

默认角色组合：
- **产品决策**: Jobs + Torvalds + Rams
- **架构决策**: Fowler + Torvalds + Beck
- **战略决策**: Jobs + Fowler + CTO Advisor
- **全面审议**: Jobs + Torvalds + Fowler + Rams

## Phase 2: 独立贡献（隔离）

为每个角色 dispatch 独立的 subagent，**并行**执行。

每个 subagent 使用不同的推理技术：

**产品（Jobs）** — Tree of Thought：3 种可能的未来
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-pm-jobs 内容]</persona>

    决策议题：[问题描述]
    背景：[上下文]

    使用 Tree of Thought 推理——构想 3 种可能的未来。
    独立思考，不要考虑其他角色的观点。

    输出格式：
    ## [角色] — 分析
    关键观点（最多 5 条）：
    - [发现] — 置信度: 高/中/低
    建议：[明确立场]
    什么会改变我的想法：[具体条件]
```

**工程（Torvalds）** — ReAct：研究 → 分析 → 行动
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-dev-torvalds 内容]</persona>
    [同上结构，使用 ReAct 推理]
```

**架构（Fowler）** — 第一性原理：从基本假设推导
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler 内容]</persona>
    [同上结构，使用第一性原理推理]
```

**设计（Rams）** — 减法：什么该砍掉
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-designer-rams 内容]</persona>
    [同上结构，使用减法推理]
```

## Phase 3: 批评分析

收集所有角色输出后，同时审视所有观点：

- 哪些观点达成共识太容易了？（可疑的一致性）
- 哪些假设是共享但未验证的？
- 缺少什么视角？
- 没有任何人提到的风险是什么？

## Phase 4: 综合

- 需要做的决策（一句话）
- 观点一致的地方 / 分歧的地方
- 批评分析的 uncomfortable truth
- 推荐的决策 + 行动项

## Phase 5: 人类审阅

⏸️ **完全停下。等待用户批准。**

选项：✅ 批准 | ✏️ 修改 | ❌ 驳回 | ❓ 追问

## Phase 6: 执行

用户批准后，根据决策类型：
- 需要设计 → 调用 `yeaft:brainstorming`
- 需要计划 → 调用 `yeaft:writing-plans`
- 需要实现 → 调用 `yeaft:subagent-development`

## 什么时候用

- 面对战略决策
- 需要多角度审视
- 决策感觉太一维
- 防止确认偏误
- 重大技术/产品方向选择
