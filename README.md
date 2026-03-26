# Yeaft Skills

Persona 驱动的 Claude Code 技能库 — 工作流、认知模式、多角色协作。

## 安装

```bash
claude plugin add https://github.com/yeaft/yeaft-skills
```

安装后，每次新 session 会自动加载入口技能，Claude 会在相关场景自动调用对应 skill。

## 技能列表

### 工作流技能
| 技能 | 说明 |
|------|------|
| `yeaft:brainstorming` | 创造性工作前的头脑风暴 |
| `yeaft:writing-plans` | 创建实现计划 |
| `yeaft:subagent-development` | 用独立子代理执行计划任务 |
| `yeaft:code-review` | 代码审查 |
| `yeaft:office-hours` | 需求定义和设计文档 |
| `yeaft:ceo-review` | 战略/产品视角审查 |
| `yeaft:design-review` | UI/UX 设计审核 |
| `yeaft:autoplan` | 自动审查流水线（CEO → Design → Eng） |
| `yeaft:board-meeting` | 多角度审议 |
| `yeaft:sprint` | 冲刺流水线（计划 → 审查 → 构建 → 交付） |
| `yeaft:systematic-debugging` | 系统化调试 |
| `yeaft:tdd` | 测试驱动开发 |
| `yeaft:finishing-branch` | 收尾开发分支 |

### Persona 技能
| Persona | 说明 |
|---------|------|
| `yeaft:persona-pm-jobs` | Steve Jobs — 产品经理 |
| `yeaft:persona-dev-torvalds` | Linus Torvalds — 系统开发者 |
| `yeaft:persona-architect-fowler` | Martin Fowler — 架构师 |
| `yeaft:persona-tester-beck` | Kent Beck — 测试专家 |
| `yeaft:persona-designer-rams` | Dieter Rams — 产品设计师 |
| `yeaft:persona-cto-advisor` | CTO 顾问 |
| `yeaft:persona-security-expert` | 安全专家 |
| `yeaft:persona-growth-marketer` | 增长营销专家 |

### 参考资料
| 技能 | 说明 |
|------|------|
| `yeaft:cognitive-patterns` | 18 条 CEO 认知模式 |

## 核心理念

参见 [ETHOS.md](./ETHOS.md)：
- **煮沸湖泊** — 做就做彻底
- **先搜索，再建造** — 不重复造轮子
- **Persona × Skill × Agent** — 三层抽象的组合力量

## 致谢

本项目借鉴了以下开源项目的思路和模式：
- [Superpowers](https://github.com/obra/superpowers) (MIT) — Plugin 架构、skill 加载模式、subagent 工作流
- [gstack](https://github.com/gstack-com/gstack) (MIT) — 认知模式、审查流水线、"Boil the Lake" 哲学
- [claude-skills](https://github.com/TejasQ/claude-skills) (MIT) — Persona 模板格式、三层抽象

## 许可证

MIT — 详见 [LICENSE](./LICENSE)
