---
name: sprint
description: |
  Sprint 全流程。从需求到交付的完整流水线，每个阶段 dispatch 专属 persona subagent：
  Step 1 需求（Jobs）→ Step 2 架构（Fowler）→ Step 3 实现（Torvalds）→
  Step 4 测试（Beck）→ Step 5 最终审查（Fowler）。
  当用户说"sprint"、"从头到尾做这个功能"、"完整开发流程"时触发。
---

# Sprint — 全流程开发

从需求分析到代码交付的完整流水线。每个阶段 dispatch 专属 persona subagent，确保每一步都有最适合的"人"在做。

## 流程总览

```
Step 1: 需求分析（Jobs）
    ↓
Step 2: 架构设计（Fowler）
    ↓
Step 3: 实现（Torvalds × N 个任务）
    ↓
Step 4: 测试（Beck）
    ↓
Step 5: 最终审查（Fowler）
    ↓
完成 → finishing-branch
```

## Step 1: 需求分析（Jobs Persona）

dispatch subagent：
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-pm-jobs 内容]</persona>

    你正在做 sprint 的需求分析阶段。

    用户需求：[用户说的]
    项目上下文：[当前状态]

    你的工作：
    1. 用户真正需要什么？（不是他们说的）
    2. MVP 是什么？最小 WOW 体验
    3. P0/P1/P2 优先级排列
    4. 应该砍掉什么？
    5. 验收标准（具体、可测试的）

    输出：需求文档（简洁版，一页以内）
```

⏸️ **呈现需求给用户确认。** 确认后继续。

## Step 2: 架构设计（Fowler Persona）

dispatch subagent：
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler 内容]</persona>

    你正在做 sprint 的架构设计阶段。

    需求：[Step 1 输出]
    现有代码库：[相关代码]

    你的工作：
    1. 分析哪些文件需要改动
    2. 设计模块边界和接口
    3. 识别依赖和风险
    4. 拆分成独立的实现任务
    5. 为每个任务定义清晰的输入/输出

    输出：实现计划（任务列表 + 每个任务的文件/代码/测试）

    遵循 yeaft:writing-plans 的格式要求。
```

## Step 3: 实现（Torvalds Persona × N 个任务）

使用 `yeaft:subagent-development` 流程逐个执行任务：
- 每个实现任务 dispatch Torvalds persona subagent
- 每个任务完成后两阶段 review（Fowler spec + Torvalds quality）
- 顺序执行，不并行（避免冲突）

## Step 4: 测试验证（Beck Persona）

所有实现任务完成后，dispatch 测试 subagent：
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-tester-beck 内容]</persona>

    你正在做 sprint 的测试验证阶段。

    已实现的功能：[所有任务的总结]
    验收标准：[Step 1 定义的]

    你的工作：
    1. 运行现有测试确认没有回归
    2. 检查验收标准是否全部满足
    3. 检查边界条件和错误处理
    4. 如果发现覆盖不足，补充测试
    5. 验证空状态、极端输入、并发场景

    输出：
    - 测试通过/失败报告
    - 发现的问题（如有）
    - 补充的测试用例
```

如果发现问题 → 回到 Step 3 修复。

## Step 5: 最终审查（Fowler Persona）

dispatch 最终审查 subagent：
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler 内容]</persona>

    你正在做 sprint 的最终审查。

    所有改动：[git diff main...HEAD]
    需求：[Step 1 输出]

    审查重点：
    1. 所有需求都实现了吗？
    2. 架构一致性：改动和现有系统协调吗？
    3. 有没有遗漏的边界条件？
    4. 代码质量是否达标？
    5. 有没有范围漂移？

    输出：✅ 通过 / ❌ 需要修复 + 具体问题
```

## 完成

最终审查通过后，调用 `yeaft:finishing-branch` skill 收尾。

## 什么时候用

- 需要从头到尾完成一个功能
- 需要完整的开发流程（需求 → 设计 → 实现 → 测试 → 审查）
- 想确保每一步都有最合适的角色把关
- 中小型功能（1-5 天工作量）
