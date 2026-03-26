<!-- Adapted from github.com/obra/superpowers (MIT License) -->
---
name: finishing-branch
description: |
  分支收尾。当实现完成、测试全通过后使用。引导完成开发工作：
  验证测试 → 呈现选项（合并/PR/保留/放弃）→ 执行 → 清理。
  当用户说"完成这个分支"、"合并"、"收尾"时触发。
---

# 分支收尾

## 概述

引导完成开发工作，呈现清晰选项并处理选择的流程。

**核心原则：** 验证测试 → 呈现选项 → 执行选择 → 清理。

**开始时宣告：** "我正在使用 finishing-branch skill 完成这个工作。"

## 流程

### Step 1: 验证测试

**呈现选项前先确认测试通过：**

```bash
npm test  # 或项目对应的测试命令
```

**测试失败？** 停。不要进入 Step 2。先修。

**测试通过？** 继续。

### Step 2: 确定基础分支

```bash
git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null
```

### Step 3: 呈现选项

呈现恰好 4 个选项：

```
实现完成。你想怎么做？

1. 本地合并回 <base-branch>
2. 推送并创建 Pull Request
3. 保持现状（我之后处理）
4. 放弃这些工作
```

### Step 4: 执行选择

#### 选项 1: 本地合并
```bash
git checkout <base-branch>
git pull
git merge <feature-branch>
# 验证合并后测试
git branch -d <feature-branch>
```

#### 选项 2: 推送并创建 PR
```bash
git push -u origin <feature-branch>
gh pr create --title "<标题>" --body "<描述>"
```

#### 选项 3: 保持现状
报告 "保持分支 <name>。" 不做清理。

#### 选项 4: 放弃
**先确认：**
```
这将永久删除：
- 分支 <name>
- 所有提交：<commit-list>

输入 'discard' 确认。
```
等待确认后执行。

### Step 5: 清理 Worktree

选项 1、2、4 后检查并清理 worktree。
选项 3 保留 worktree。

## 红线

**永远不要：**
- 测试失败时继续
- 合并前不验证测试
- 不确认就删除工作
- 不被要求就 force push
