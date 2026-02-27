# 🎬 豆瓣电影查询系统

基于 **SpringBoot 3.3.13** 的豆瓣电影数据查询后端服务，提供电影列表查询、电影详情、评论分页、工作者信息等 RESTful API。

---

## 技术栈

| 技术 | 版本 |
|------|------|
| Java | 21 |
| SpringBoot | 3.3.13 |
| MyBatis | 3.0.5 |
| MySQL | 9.x |
| Knife4j | 4.5.0 |
| Lombok | latest |

## 数据规模

| 表名 | 数据量 | 说明 |
|------|--------|------|
| movie | ~140,502 条 | 电影主表 |
| movie_comment | ~4,428,475 条 | 电影评论表 |
| movie_worker | ~70,001 条 | 电影工作者表 |

## 快速启动

### 1. 环境准备

- JDK 21+
- MySQL 9.x
- Maven 3.9+

### 2. 初始化数据库

```sql
CREATE DATABASE IF NOT EXISTS douban_movie_dev DEFAULT CHARACTER SET utf8mb4;
USE douban_movie_dev;
-- 执行 src/main/resources/douban_movie_dev.sql 建表
-- 导入数据文件
```

> **性能提示**：建议为 `movie_comment.movie_id` 添加索引：
> ```sql
> ALTER TABLE movie_comment ADD INDEX idx_movie_id (movie_id);
> ```

### 3. 修改配置

编辑 `src/main/resources/application-dev.yml`，修改数据库连接信息：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/douban_movie_dev?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true
    username: root
    password: 你的密码
```

### 4. 启动项目

```bash
mvn clean compile
mvn spring-boot:run
```

### 5. 访问接口文档

启动成功后访问 Knife4j 在线文档：

```
http://localhost:8080/api/doc.html
```

## 工程结构

```
src/main/java/com/example/movie/
├── MovieApplication.java           # 启动类
├── common/                         # 公共层
│   ├── Result.java                 # 统一返回体
│   ├── PageResult.java             # 分页返回体
│   ├── ResultCode.java             # 状态码枚举
│   ├── exception/                  # 异常处理
│   │   ├── BusinessException.java
│   │   └── GlobalExceptionHandler.java
│   └── util/
│       └── IPUtil.java
├── config/                         # 配置类
│   ├── Knife4jConfig.java
│   ├── CorsConfig.java
│   └── StartupApplicationRunner.java
├── controller/                     # 控制器
│   ├── MovieController.java
│   ├── MovieCommentController.java
│   └── MovieWorkerController.java
├── service/                        # 业务层
│   ├── MovieService.java
│   ├── MovieCommentService.java
│   └── MovieWorkerService.java
├── dao/                            # 数据访问层
│   ├── MovieDao.java
│   ├── MovieCommentDao.java
│   └── MovieWorkerDao.java
├── dto/                            # 数据传输对象
│   ├── request/
│   │   ├── MovieListRequest.java
│   │   └── MovieCommentPageRequest.java
│   └── response/
│       ├── MovieOverviewResponse.java
│       ├── MovieDetailResponse.java
│       ├── MovieCommentResponse.java
│       ├── MovieStatsResponse.java
│       └── MovieWorkerResponse.java
└── entity/                         # 实体类
    ├── Movie.java
    ├── MovieComment.java
    └── MovieWorker.java
```

## API 概览

| 方法 | 接口地址 | 说明 |
|------|---------|------|
| POST | `/api/movies/list` | 电影列表（分页+筛选+排序） |
| GET | `/api/movies/stats` | 电影统计数据 |
| GET | `/api/movies/{movieId}` | 电影详情（含最新20条评论与评论总数） |
| GET | `/api/comments/{movieId}` | 电影评论分页 |
| GET | `/api/workers/{workerId}` | 工作者详情 |

> 完整接口文档请参阅 [API-DOCS.md](./API-DOCS.md)

## 开发规范

- **依赖注入**：统一使用 `@RequiredArgsConstructor` + `final`，禁止 `@Autowired`
- **时间格式**：所有 Date 字段统一使用 `@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")`
- **排序安全**：`sortField` 使用 `${}` 拼接，Service 层做白名单校验防止 SQL 注入
- **异常处理**：全局 `GlobalExceptionHandler` 统一拦截处理

## License

MIT
