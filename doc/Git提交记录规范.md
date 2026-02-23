# Git 提交记录规范

> 适用于 Spring Boot 3 工程，基于 [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) 规范扩展

---

## 一、提交格式

每条 Git 提交信息由三部分组成：

```
<type>(<scope>): <subject>

[body]

[footer]
```

- **Header**（必填）：`type(scope): subject`
- **Body**（可选）：详细描述本次改动的原因和内容
- **Footer**（可选）：关联 Issue、Breaking Change 说明等

---

## 二、Type 类型

| Type       | 说明                                             | 示例场景                              |
|------------|--------------------------------------------------|---------------------------------------|
| `feat`     | 新功能                                           | 新增接口、新增业务模块                |
| `fix`      | Bug 修复                                         | 修复查询逻辑错误、修复 NPE 异常       |
| `docs`     | 文档变更                                         | 修改 README、更新 API 文档            |
| `style`    | 代码格式调整（不影响逻辑）                       | 格式化代码、补充注释、修正命名风格    |
| `refactor` | 代码重构（非 Bug 修复、非新功能）                | 优化类结构、提取公共方法              |
| `perf`     | 性能优化                                         | 优化 SQL 查询、引入缓存               |
| `test`     | 增加或修改测试代码                               | 新增单元测试、修改集成测试            |
| `build`    | 构建系统或外部依赖变更                           | 修改 `pom.xml`、升级依赖版本          |
| `ci`       | CI/CD 配置修改                                   | 修改 Jenkins Pipeline、GitHub Actions |
| `chore`    | 其他不影响源码和测试的杂项                       | 修改 `.gitignore`、整理目录结构       |
| `revert`   | 回滚某次提交                                     | 回退上一个错误发布的版本              |

---

## 三、Scope 范围（Spring Boot 3 工程建议）

Scope 用于说明本次提交影响的模块或层次，括号内填写，**可省略**。

### 按模块划分

```
user        用户模块
order       订单模块
payment     支付模块
product     商品模块
auth        认证授权模块
notify      通知/消息模块
admin       后台管理模块
```

### 按技术层划分

```
controller  控制层
service     业务逻辑层
repository  数据访问层
entity      实体/领域模型
dto         数据传输对象
config      配置类
filter      过滤器/拦截器
schedule    定时任务
mq          消息队列
cache       缓存
security    Spring Security 相关
```

### 按基础设施划分

```
db          数据库/迁移脚本（Flyway/Liquibase）
docker      容器化配置
k8s         Kubernetes 配置
deps        依赖管理
```

---

## 四、Subject 主题规范

- 使用**动宾结构**，言简意赅，不超过 **72 个字符**
- 中文描述优先，保持团队统一
- 结尾**不加句号**
- 禁止使用模糊描述，如 `fix bug`、`update code`、`修改`

| ❌ 不规范           | ✅ 规范                                      |
|---------------------|----------------------------------------------|
| `fix bug`           | `fix(order): 修复订单金额计算精度丢失问题`   |
| `update`            | `refactor(user): 重构用户注册流程，拆分校验逻辑` |
| `修改配置`          | `chore(config): 调整线程池核心线程数为 20`   |
| `添加接口`          | `feat(product): 新增商品分类树查询接口`      |

---

## 五、Body 正文规范

- 与 Header 之间空一行
- 说明**为什么**改动，而不是改了什么（改了什么 diff 已可见）
- 每行不超过 **100 个字符**

```
feat(auth): 新增基于 JWT 的 Token 刷新机制

原有 Token 有效期固定为 2 小时，用户频繁掉线体验差。
本次引入 Refresh Token 机制，Access Token 有效期缩短至 30 分钟，
Refresh Token 有效期 7 天，存储于 Redis，支持主动失效。
```

---

## 六、Footer 尾部规范

### 关联 Issue

```
Closes #123
Fixes #456
Refs #789
```

### Breaking Change（破坏性变更）

涉及接口变更、配置项移除等不兼容改动，必须在 Footer 中声明：

```
BREAKING CHANGE: 移除 /api/v1/user/list 接口，请迁移至 /api/v2/user/page
```

---

## 七、完整示例

### 示例 1：新增功能

```
feat(movie): 新增电影统计数据接口

为了在后台首页展示全局数据，新增 GET /movies/stats 接口。
统计包含电影总数、评论总数和工作者总数。
因表数据量大且静态，已在 Service 层加入 volatile 变量缓存。

Closes #15
```

### 示例 2：新增功能（其他场景）

```
feat(order): 新增订单超时自动取消功能

接入 RocketMQ 延迟消息，下单后 30 分钟未支付自动关闭订单并释放库存。
相关配置项在 application.yml 中新增 order.timeout-minutes 参数，默认值为 30。

Closes #112
```

### 示例 2：Bug 修复

```
fix(payment): 修复并发场景下重复扣款问题

并发支付时由于幂等校验逻辑缺失，导致同一笔订单可能被重复扣款。
增加基于 Redis 分布式锁的幂等控制，锁 key 为 pay:idempotent:{tradeNo}，
持锁时间 10s，处理完成后主动释放。

Fixes #98
```

### 示例 3：依赖升级（含 Breaking Change）

```
build(deps): 升级 Spring Boot 3.2.0 → 3.3.2

修复已知 CVE-2024-38820 安全漏洞，同步升级 Spring Security 至 6.3.x。

BREAKING CHANGE: Spring Security 6.3 移除了 WebSecurityConfigurerAdapter，
需将安全配置类改为注入 SecurityFilterChain Bean，请参考迁移文档更新配置。
```

### 示例 4：数据库变更

```
feat(db): 新增 t_order_refund 退款记录表

使用 Flyway 管理迁移脚本，脚本版本号 V20240801_001。
表结构包含退款单号、原订单号、退款金额、退款状态、创建时间等字段。
```

### 示例 5：代码重构

```
refactor(service): 拆分 UserService，抽离认证相关逻辑至 AuthService

原 UserService 承担了过多职责，将登录、注销、Token 校验等认证逻辑
统一迁移至 AuthService，遵循单一职责原则，便于后续扩展。
```

---

## 八、分支命名规范

与提交类型保持一致，便于追踪：

```
feature/user-register          新功能开发
fix/order-timeout-bug          Bug 修复
hotfix/payment-duplicate       线上紧急修复
refactor/auth-service          重构
release/v1.2.0                 发布版本
chore/upgrade-springboot-3.3   依赖升级等杂项
```

---

## 九、工具推荐

| 工具                   | 用途                                              |
|------------------------|---------------------------------------------------|
| **Commitizen**         | 交互式命令行辅助填写提交信息                      |
| **commitlint**         | 在 Git Hook 中校验提交格式，不合规则拒绝提交      |
| **husky**              | 管理 Git Hooks，配合 commitlint 使用              |
| **conventional-changelog** | 根据提交记录自动生成 `CHANGELOG.md`           |
| **IDEA Git 插件**      | 推荐安装 `Git Commit Template` 插件辅助填写       |

### commitlint 配置示例（`commitlint.config.js`）

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor',
      'perf', 'test', 'build', 'ci', 'chore', 'revert'
    ]],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100],
  },
};
```

---

## 十、常见错误示例

```bash
# ❌ 类型错误
update(user): 修改用户接口          # update 不是合法 type

# ❌ subject 过于模糊
fix: 修了个问题

# ❌ 没有空行直接跟 body
feat(order): 新增接口
这里是详细说明，但缺少空行分隔

# ❌ subject 结尾加句号
feat(auth): 新增登录接口。

# ✅ 正确示范
feat(auth): 新增手机号验证码登录接口

支持通过手机号 + 短信验证码方式登录，验证码有效期 5 分钟，
存储于 Redis，Key 格式为 sms:login:{phone}。

Closes #201
```

---

> 📌 **团队约定**：所有合并到 `main` / `develop` 分支的提交，均须通过 commitlint 校验。直接 push 到主分支须经过 Code Review 且提交信息符合本规范。