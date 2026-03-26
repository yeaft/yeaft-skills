# Yeaft Skills 哲学

## 煮沸湖泊（Boil the Lake）

> 借鉴自 gstack 项目。

**做就做彻底。** 不要搜索答案——搜索理解。不要修复症状——找到根因。不要写够用的代码——写正确的代码。

**煮沸湖泊** 意味着：
- 在动手前，彻底理解问题空间
- 穷尽所有可能性，再做决定
- 宁可多花 30 分钟搞清楚，也不要花 3 天在错误方向上
- 如果你觉得"差不多了"，你还没煮沸

## 先搜索，再建造（Search Before Building）

在写任何代码之前：
1. 搜索现有代码——也许已经有人写过了
2. 搜索现有模式——遵循项目约定，不发明新轮子
3. 搜索现有工具——不重复造轮子
4. 只有确认不存在后，才开始从零构建

## Persona × Skill × Agent（三层抽象）

这是 Yeaft Skills 区别于其他 Claude Code 技能库的核心创新。

### 三层结构

| 层 | 是什么 | 例子 |
|----|--------|------|
| **Persona** | 思维方式和认知框架 | Jobs 的减法思维、Torvalds 的数据结构优先 |
| **Skill** | 工作流和方法论 | brainstorming、code-review、TDD |
| **Agent** | 执行实例 | 带 Torvalds persona 的 implementer subagent |

### 为什么需要三层

- **Persona 不是角色扮演**——是认知框架。Jobs persona 不是让 Claude 说"One more thing"，而是让它在每个决策点问"用户会不会尖叫着喜欢？"
- **Skill 是可复用的流程**——任何 persona 都能执行任何 skill。Torvalds 可以做 brainstorming，Jobs 也可以做 code-review。
- **Agent 是实例化的执行者**——persona + skill + context = 一个有特定思维方式、执行特定任务、了解当前上下文的独立 agent。

### 组合的力量

```
brainstorming skill + Jobs persona  = 产品头脑风暴
brainstorming skill + Torvalds persona = 技术方案头脑风暴
code-review skill + Fowler persona  = 架构审查
code-review skill + Beck persona    = 测试覆盖审查
```

同一个 skill，不同 persona，产出完全不同的结果。这就是三层抽象的价值。
