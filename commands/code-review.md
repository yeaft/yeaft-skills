---
name: code-review
description: |
  代码审查。两轮 review：Pass 1 架构审查（Fowler persona），Pass 2 代码质量审查
  （Torvalds persona）。支持 fix-first 原则和范围漂移检测。
  当用户说"审查代码"、"review"、"帮我看看这个 PR"时触发。
---

# 代码审查

两轮 review，每轮 dispatch 独立的 persona subagent。

## 核心原则

- **Fix-first**：能直接修的 bug 不要只报告，直接修
- **范围漂移检测**：发现不在需求范围内的改动，标记出来
- **两轮 review 缺一不可**：架构审查确保方向对，代码质量审查确保实现好

## 流程

### Step 1: 收集变更信息

```bash
# 获取变更范围
git diff main...HEAD --stat
git log main..HEAD --oneline
```

确认：哪些文件改了？改动量多大？commit 历史清晰吗？

### Step 2: 理解上下文

- 读 PR 描述或 commit message
- 理解改了什么、为什么改
- 找到相关的需求/设计文档

### Step 3: Pass 1 — 架构审查（Fowler Persona）

dispatch subagent：
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-architect-fowler 内容]</persona>

    你正在做架构层面的代码审查。

    变更内容：[git diff 输出]
    变更说明：[PR 描述]

    审查重点：
    1. 模块边界是否清晰？依赖方向对吗？
    2. 抽象层次是否恰当？有没有过度工程或不足？
    3. 改动是否和现有架构一致？
    4. 有没有引入不必要的耦合？
    5. 范围漂移：有没有不属于这个 PR 的改动？

    输出格式：
    - ✅ 通过 / ❌ 有问题
    - 发现的问题（附文件:行号）
    - 范围漂移警告（如有）
    - 架构建议
```

### Step 4: Pass 2 — 代码质量审查（Torvalds Persona）

dispatch subagent：
```
Task tool:
  prompt: |
    <persona>[yeaft:persona-dev-torvalds 内容]</persona>

    你正在做代码质量审查。

    变更内容：[git diff 输出]

    审查重点：
    1. 代码简洁清晰吗？有没有不必要的复杂度？
    2. 命名清楚吗？看名字就知道干嘛的？
    3. 错误处理到位吗？边界条件考虑了吗？
    4. 性能问题？不必要的循环、内存泄漏？
    5. 有没有调试代码、console.log 忘删？

    Fix-first 原则：能直接修的问题给出具体修复代码，不只报告。

    输出格式：
    - 优点：[做得好的]
    - 问题：Critical / Important / Minor
    - 可直接修复的：[附修复代码]
    - 结论：✅ 通过 | ❌ 需要修复
```

### Step 5: 综合报告

收集两轮审查结果，综合呈现：
- 架构层面发现
- 代码质量发现
- 可直接修复的问题（附代码）
- 范围漂移警告
- 最终结论：✅ APPROVED / ❌ CHANGES_REQUESTED

## 范围漂移检测

如果发现以下情况，标记为范围漂移：
- 改了与 PR 目标无关的文件
- "顺手" 重构了不相关的代码
- 添加了需求之外的功能
- 改了不该改的测试

范围漂移不一定要打回——但必须标记出来让作者确认是否有意为之。
