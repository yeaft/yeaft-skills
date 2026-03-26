# Yeaft Skills

> Persona 驱动的 Claude Code 技能库 — 工作流、认知模式、多角色协作。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Skills](https://img.shields.io/badge/Skills-22-green.svg)](#可用技能)
[![Personas](https://img.shields.io/badge/Personas-8-purple.svg)](#persona-技能8)
[![Bilingual](https://img.shields.io/badge/双语-中文%20%2B%20English-orange.svg)](#双语支持)

[English](./README.en.md)

## 这是什么？

一个 Claude Code 插件，将 **Persona**（大师思维方式）、**Skill**（可复用工作流）和 **Agent**（子代理执行）组合成统一系统。

与通用技能库不同，Yeaft Skills 让 Claude 在审查产品时像 Steve Jobs 一样思考，在写代码时像 Linus Torvalds 一样思考，在设计测试时像 Kent Beck 一样思考——每个角色都有其真实的认知模式。

## 安装

### 方式 A：Claude Code Plugin（推荐）

```bash
claude plugin add https://github.com/yeaft/yeaft-skills
```

安装后，每次新 session 会自动加载入口技能，Claude 会在相关场景自动调用对应 skill。

### 方式 B：Git Clone

```bash
git clone https://github.com/yeaft/yeaft-skills.git ~/.claude/skills/yeaft-skills
```

或使用安装脚本：

```bash
curl -fsSL https://raw.githubusercontent.com/yeaft/yeaft-skills/main/setup | bash
```

更新时重新运行安装脚本即可。

## 可用技能

### 工作流技能（13）

| 技能 | 说明 |
|------|------|
| `yeaft:brainstorming` | 创造性工作前的头脑风暴 |
| `yeaft:writing-plans` | 从需求创建结构化实现计划 |
| `yeaft:subagent-development` | 用独立子代理执行计划，带 Persona 驱动的审查 |
| `yeaft:code-review` | 提交前代码审查 |
| `yeaft:office-hours` | 需求发现和设计文档编写 |
| `yeaft:ceo-review` | 战略/产品视角审查（4 种范围模式） |
| `yeaft:design-review` | UI/UX 设计审核 |
| `yeaft:autoplan` | 自动审查流水线：CEO → Design → Eng |
| `yeaft:board-meeting` | 多角度独立审议（6 阶段） |
| `yeaft:sprint` | 完整冲刺流水线：计划 → 审查 → 构建 → 交付 |
| `yeaft:systematic-debugging` | 假设驱动的系统化调试 |
| `yeaft:tdd` | 测试驱动开发：Red → Green → Refactor |
| `yeaft:finishing-branch` | 收尾开发分支：测试、清理、PR、合并 |

### Persona 技能（8）

每个 Persona 都是认知框架——不是角色扮演，而是一种思维方式。

| Persona | 身份 | 核心认知模式 |
|---------|------|-------------|
| `yeaft:persona-pm-jobs` | Steve Jobs — 产品经理 | 减法思维、代理指标怀疑、速度校准 |
| `yeaft:persona-dev-torvalds` | Linus Torvalds — 系统开发者 | 速度校准、反转反射、杠杆执念 |
| `yeaft:persona-architect-fowler` | Martin Fowler — 架构师 | 分类本能、反转反射、时间深度 |
| `yeaft:persona-tester-beck` | Kent Beck — 测试专家 | 边界条件偏执、反转反射、勇气积累 |
| `yeaft:persona-designer-rams` | Dieter Rams — 产品设计师 | 减法默认、层次即服务、信任设计 |
| `yeaft:persona-cto-advisor` | CTO 顾问 | 分类本能、速度校准、战时意识 |
| `yeaft:persona-security-expert` | 安全专家 | 偏执扫描、反转反射、边界条件偏执 |
| `yeaft:persona-growth-marketer` | 增长营销专家 | 杠杆执念、代理指标怀疑、意志力策略 |

### 认知模式库（18 条）

| 模式 | 来源 | 核心思想 |
|------|------|----------|
| 减法聚焦 | Jobs | 价值 = 决定不做什么 |
| 代理指标怀疑 | Bezos | 指标是在服务用户还是自我循环？ |
| 速度校准 | Bezos | 默认快速；只对不可逆+高影响决策放慢 |
| 分类本能 | Bezos | 单向门（不可逆）vs 双向门（可逆） |
| 反转反射 | Munger | 别问"如何成功"——问"这怎么会失败？" |
| 杠杆执念 | Grove | 找到每个情境中的 10x 杠杆点 |
| 偏执扫描 | Grove | 只有偏执狂才能生存——什么可能出错？ |
| 边界条件偏执 | Beck | null？空数组？并发访问？竞态条件？ |
| 勇气积累 | Beck | 小胜利累积成大变革的信心 |
| 减法默认 | Rams | "尽可能少的设计" |
| 层次即服务 | Rams | 用户应该先看到什么、再看到什么？ |
| 信任设计 | Rams | 诚实、透明、可理解的产品 |
| 时间深度 | Fowler | 以 6 个月、2 年、5 年的视角思考 |
| 人员优先排序 | Horowitz | 谁来决定 → 决定什么 → 怎么执行 |
| 战时意识 | Horowitz | 和平时期 ≠ 战争时期——调整领导风格 |
| 意志力策略 | Thiel | 0→1 需要做别人不愿做的事 |
| 第一性原理制造 | Musk | 成本 = 原材料 + 劳动力，其他都可优化 |
| 元学习复利 | Altman | 学习如何学习，比任何技能都复利更快 |

### 参考与元技能

| 技能 | 说明 |
|------|------|
| `yeaft:cognitive-patterns` | 浏览全部 18 条认知模式 |
| `yeaft:writing-skills` | 学习如何为本库编写新 skill |

## 快速开始

安装后，直接和 Claude 对话：

```
你：帮我重构认证模块

Claude：（加载 yeaft:brainstorming → 讨论方案）
        （加载 yeaft:writing-plans → 创建实现计划）
        （加载 yeaft:subagent-development → 派遣 Torvalds 子代理写代码、
         Fowler 子代理做架构审查、Beck 子代理写测试）
```

或直接调用：

```
你：/skill yeaft:persona-pm-jobs
    评审一下这个功能提案...

Claude：（以 Steve Jobs 的思维方式思考）
        "用户会在乎吗？有更简单的方式吗？你自己会用这个吗？"
```

## 双语支持

所有 skill 同时提供中文版（SKILL.md）和英文版（SKILL.en.md）。SessionStart hook 检测 `LANG` 环境变量：
- 中文环境（`zh_CN`、`zh_TW`、`zh_HK`）→ 加载中文版
- 其他环境 → 加载英文版（英文不存在时 fallback 到中文）

## 核心理念

参见 [ETHOS.md](./ETHOS.md)：
- **煮沸湖泊** — 做就做彻底
- **先搜索，再建造** — 不重复造轮子
- **Persona × Skill × Agent** — 三层抽象的组合力量

## 贡献

欢迎贡献！参见 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何新增 skill、格式规范和 PR 流程。

## 致谢

本项目借鉴了以下开源项目的思路和模式：
- [Superpowers](https://github.com/obra/superpowers) (MIT) — Plugin 架构、skill 加载模式、subagent 工作流
- [gstack](https://github.com/gstack-com/gstack) (MIT) — 认知模式、审查流水线、"Boil the Lake" 哲学
- [claude-skills](https://github.com/TejasQ/claude-skills) (MIT) — Persona 模板格式、三层抽象

## 许可证

MIT — 详见 [LICENSE](./LICENSE)
