# 🎬 豆瓣电影查询系统 —— SpringBoot 后端开发提示词

---

## 一、角色设定

你是一位资深 Java 后端开发工程师，精通 SpringBoot 4、MyBatis、MySQL 开发，擅长编写结构清晰、规范统一、可维护性强的企业级代码。请严格按照以下要求，从零搭建一套完整的电影查询后端工程。

---

## 二、数据库表结构

数据库名：`douban_movie_dev`，共三张表，建表 SQL 如下：

```sql
-- 电影主表（56 条数据）
CREATE TABLE `movie` (
  `movie_id` int unsigned NOT NULL COMMENT '电影ID',
  `movie_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电影名称',
  `movie_alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电影别名',
  `actors` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '演员',
  `cover` varbinary(512) DEFAULT NULL COMMENT '电影封面地址',
  `directors` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '导演',
  `douban_score` double DEFAULT NULL COMMENT '豆瓣评分',
  `douban_votes` int DEFAULT NULL COMMENT '豆瓣投票数',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电影类型',
  `imdb_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'IMDB ID',
  `languages` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '语言',
  `minutes` int DEFAULT NULL COMMENT '时长：分钟',
  `official_site` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '官方地址',
  `regions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '制片国家/地区',
  `release_date` date DEFAULT NULL COMMENT '上映日期',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '电影描述',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '标签',
  `year` year DEFAULT NULL COMMENT '年份',
  `actor_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '演员ID，多个演员采用"|"符号分割，格式"演员A:ID|演员B:ID"',
  `director_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '导演ID，多个导演采用"|"符号分割，格式"导演A:ID|导演B:ID"',
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='电影列表';

-- 电影评论表（约 1254 条数据）
DROP TABLE IF EXISTS `movie_comment`;
CREATE TABLE `movie_comment` (
  `comment_id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '豆瓣用户ID',
  `user_nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '豆瓣用户昵称',
  `movie_id` int DEFAULT NULL COMMENT '电影ID',
  `comment_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '评论内容',
  `like_count` int DEFAULT NULL COMMENT '评论点赞数量',
  `rating` int DEFAULT NULL COMMENT '评分',
  `comment_time` datetime DEFAULT NULL COMMENT '评论时间',
  PRIMARY KEY (`comment_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5001305 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='电影评论表';

-- 电影工作者表（约 247 条数据）
CREATE TABLE `movie_worker` (
  `worker_id` int NOT NULL COMMENT '电影工作者ID',
  `worker_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电影工作者名称',
  `gender` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '性别',
  `name_en` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '英文名',
  `name_zh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '中文名',
  `birth` date DEFAULT NULL COMMENT '出生日期',
  `birthplace` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '出生地点',
  `constellatory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '星座',
  `profession` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '职业',
  `biography` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '简介',
  PRIMARY KEY (`worker_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='电影工作者';
```

> **重要字段说明：**
> - `movie.cover`：类型为 `varbinary(512)`，存储的是封面文件名的二进制编码（如 PNG 文件名的 UTF-8 字节），Java 实体中映射为 `String` 类型。
> - `movie.actor_ids` 与 `movie.director_ids`：格式为 `姓名:ID|姓名:ID`，通过此字段解析出 `worker_id`，再关联 `movie_worker` 表查询工作者详情。解析逻辑在 Service 层用 Java 代码完成，不在 SQL 中处理。
> - `movie.type`、`movie.languages`、`movie.regions`：多值字段，值之间用 `/`（斜杠）分隔，筛选时使用 `LIKE '%值%'` 处理。

---

## 三、技术栈

| 技术 | 版本 / 说明                                         |
|------|-------------------------------------------------|
| Java | **21**                                          |
| SpringBoot | **4.0.3**                                       |
| MyBatis | 原生 MyBatis（`mybatis-spring-boot-starter 4.0.1`），**禁止使用 MyBatisPlus** |
| Springdoc OpenAPI & Scalar UI | `springdoc-openapi-starter-webmvc-scalar 3.0.1` |
| MySQL | 9.x                                             |
| Lombok | 全程使用                                            |
| spring-boot-devtools | 热部署（仅 dev 环境启用）                                  |
| spring-boot-starter-validation | 参数校验                                            |
| spring-boot-starter-actuator | 应用监控                                            |

---

## 四、工程结构

```
movie-api/
├── src/main/java/com/example/movie/
│   ├── MovieApplication.java
│   ├── common/
│   │   ├── Result.java                    # 统一单数据返回体
│   │   ├── PageResult.java                # 统一分页返回体
│   │   ├── ResultCode.java                # 全局状态码枚举
│   │   ├── MovieFilterConstants.java      # 电影筛选条件常量（地区/语言/类型，区分 dev/prod）
│   │   ├── exception/
│   │   │   ├── BusinessException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   └── util/
│   │       └── IPUtil.java                # IP 工具类
│   ├── config/
│   │   ├── OpenApiConfig.java             # Springdoc OpenAPI & Scalar UI 配置
│   │   ├── CorsConfig.java               # 跨域配置
│   │   ├── WebConfig.java                # Web 配置
│   │   └── StartupApplicationRunner.java  # 启动后打印信息
│   ├── controller/
│   │   ├── MovieController.java           # 电影相关接口（列表/详情/统计/筛选条件）
│   │   ├── MovieCommentController.java    # 电影评论接口（独立 Controller）
│   │   └── MovieWorkerController.java     # 电影工作者接口
│   ├── service/
│   │   ├── MovieService.java              # 电影业务逻辑（无 Impl）
│   │   ├── MovieCommentService.java       # 评论业务逻辑（无 Impl）
│   │   └── MovieWorkerService.java        # 工作者业务逻辑（无 Impl）
│   ├── dao/
│   │   ├── MovieDao.java                  # MyBatis Mapper 接口即 Dao，加 @Mapper
│   │   ├── MovieCommentDao.java
│   │   └── MovieWorkerDao.java
│   ├── dto/
│   │   ├── request/
│   │   │   ├── MovieListRequest.java
│   │   │   └── MovieCommentPageRequest.java
│   │   └── response/
│   │       ├── MovieOverviewResponse.java
│   │       ├── MovieDetailResponse.java
│   │       ├── MovieCommentResponse.java
│   │       ├── MovieStatsResponse.java    # 统计数据响应
│   │       └── MovieWorkerResponse.java
│   └── entity/
│       ├── Movie.java
│       ├── MovieComment.java
│       └── MovieWorker.java
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml                # 开发环境配置
│   ├── application-prod.yml               # 生产环境配置
│   ├── logback.xml                        # 日志配置（非 logback-spring.xml）
│   ├── douban_movie_dev.sql               # 初始化 SQL 数据
│   └── mapper/
│       ├── MovieMapper.xml
│       ├── MovieCommentMapper.xml
│       └── MovieWorkerMapper.xml
└── pom.xml
```

---

## 五、开发规范（必须严格遵守）

### 5.1 统一返回体

```java
// 单数据返回体 Result<T>
// 包含：code、message、data 三个字段
// 提供静态方法：Result.success(data)、Result.fail(ResultCode)、Result.fail(code, message)

// 分页返回体 PageResult<T>
// 包含：code、message、total（总条数）、pageNum、pageSize、data（列表）六个字段
// 提供静态方法：PageResult.success(data, total, pageNum, pageSize)
```

### 5.2 全局状态码枚举 ResultCode

```
SUCCESS(200, "操作成功")
BAD_REQUEST(400, "请求参数错误")
NOT_FOUND(404, "资源不存在")
INTERNAL_ERROR(500, "服务器内部错误")
```

### 5.3 依赖注入规范

所有 Controller、Service 统一使用 `@RequiredArgsConstructor` + `final` 字段注入，**禁止使用 `@Autowired`**。

```java
@RestController
@RequiredArgsConstructor
public class MovieController {
    private final MovieService movieService;
}
```

### 5.4 Service 与 Dao 层规范

- **无 Impl 类**，Service 和 Dao 各自只有一个 class。
- Dao 层即 MyBatis 的 Mapper 接口（加 `@Mapper` 注解），SQL 全部写在 XML 文件中。
- Service 加 `@Service` + `@Slf4j` 注解，注入对应 Dao，直接在 Service 类中编写完整业务逻辑。
- 评论相关业务逻辑拆分到独立的 `MovieCommentService` 中。

### 5.5 命名规范

- 请求参数类后缀：`Request`，例如 `MovieListRequest`
- 响应结果类后缀：`Response`，例如 `MovieDetailResponse`
- 实体类：对应表名驼峰，如 `Movie`、`MovieComment`、`MovieWorker`

### 5.6 参数校验

使用 `@Valid` + `jakarta.validation` 注解对 Request 类校验。在 `GlobalExceptionHandler` 中统一捕获 `MethodArgumentNotValidException` 和 `ConstraintViolationException`，返回 `ResultCode.BAD_REQUEST`，并将所有字段错误信息拼接后放入 message 返回。

### 5.7 全局异常处理

`GlobalExceptionHandler` 使用 `@RestControllerAdvice` + `@Slf4j`，至少处理：
- `MethodArgumentNotValidException`：参数校验失败
- `HttpMessageNotReadableException`：参数格式解析失败
- `BusinessException`：业务异常（自定义异常，包含 ResultCode）
- `Exception`：兜底异常，日志打印完整堆栈，返回 `ResultCode.INTERNAL_ERROR`

### 5.8 日志配置（logback.xml）

- 日志配置文件名为 `logback.xml`（早于 `application.yml` 加载）
- 控制台彩色输出，Pattern 包含时间、级别、线程、类名、消息
- 按天滚动归档到 `logs/` 目录，文件名格式 `app-%d{yyyy-MM-dd}.log`
- 保留最近 30 天，单文件最大 100MB
- 总大小上限：INFO 日志 3GB，ERROR 日志 1GB
- 分别输出 INFO 级别总日志和 ERROR 级别错误日志到不同文件
- 使用 `NopStatusListener` 屏蔽 logback 启动日志

---

## 六、接口详细设计

### 接口一：电影统计数据

**`GET /api/movies/stats`**

**响应：`Result<MovieStatsResponse>`**

`MovieStatsResponse` 包含字段：movieCount（电影总数）、commentCount（评论总数）、workerCount（电影制作人总数）

**实现要点：**
- 使用类变量（`volatile`）缓存统计结果，数据库数据为静态数据，缓存永不失效
- 使用双重检查锁定（DCL）模式保证线程安全
- Dao 层各提供 `countAll()` 方法

---

### 接口二：电影概览列表（分页+筛选+排序）

**`POST /api/movies/list`**

**请求体 `MovieListRequest`：**

| 字段 | 类型 | 必填 | 校验规则 | 说明                                                                                        |
|------|------|------|---------|-------------------------------------------------------------------------------------------|
| keyword | String | 否 | 无 | 模糊搜索，同时匹配 movie_name、movie_alias、actors、directors                                         |
| type | String | 否 | 无 | 电影类型，如"剧情"                                                                                |
| language | String | 否 | 无 | 语言，如"英语"                                                                                  |
| region | String | 否 | 无 | 制片国家/地区，如"美国"                                                                             |
| year | Integer | 否 | min=1888 | 上映年份                                                                                      |
| minMinutes | Integer | 否 | min=0 | 最短时长（分钟）                                                                                  |
| maxMinutes | Integer | 否 | min=0 | 最长时长（分钟）                                                                                  |
| sortField | String | 否 | 无 | 排序字段，枚举值：movie_name / movie_alias / release_date / douban_score / minutes，默认 douban_score |
| sortOrder | String | 否 | 无 | 排序方向：asc / desc，默认 desc                                                                   |
| pageNum | Integer | 是 | min=1 | 页码                                                                                        |
| pageSize | Integer | 是 | min=1, max=100 | 每页条数                                                                                      |

**响应：`PageResult<MovieOverviewResponse>`**

`MovieOverviewResponse` 包含字段：movieId、movieName、movieAlias、cover、directors、actors、doubanScore、doubanVotes、type、languages、regions、minutes、releaseDate、year

**SQL 编写要点（在 MovieMapper.xml 中实现）：**
- keyword 用 `AND (movie_name LIKE #{kw} OR movie_alias LIKE #{kw} OR actors LIKE #{kw} OR directors LIKE #{kw})`，kw 值为 `%keyword%`
- type/language/region 筛选用 `AND type LIKE #{type}`（值拼接为 `%值%`）
- year 精确匹配：`AND year = #{year}`
- 时长范围：`AND minutes >= #{minMinutes} AND minutes <= #{maxMinutes}`
- 排序：`ORDER BY ${sortField} ${sortOrder}`，**sortField 在 Service 层做白名单校验后才传入**
- 分页：使用 `LIMIT #{offset}, #{pageSize}` 手动分页，COUNT 查询单独写一个方法

**Service 层排序字段白名单校验：**
```
允许值：movie_name、movie_alias、release_date、douban_score、minutes
非法值抛出 BusinessException(ResultCode.BAD_REQUEST, "不支持的排序字段")
sortField 为空时默认 douban_score
sortOrder 只允许 asc/desc，否则默认 desc
```

---

### 接口三：电影详情

**`GET /api/movies/{movieId}`**

**响应：`Result<MovieDetailResponse>`**

`MovieDetailResponse` 包含：
- movie 表全部字段（movieId、movieName、movieAlias、actors、cover、directors、doubanScore、doubanVotes、type、imdbId、languages、minutes、officialSite、regions、releaseDate、description、tags、year、actorIds、directorIds）
- `Long commentTotal`：该电影的评论总数（用于前端分页展示）
- `List<MovieCommentResponse> comments`：该电影最新 20 条评论，按 comment_time 倒序

> **注意**：`MovieDetailResponse` 中**不包含** `directorList` 和 `actorList` 字段，导演和演员信息通过 `actorIds`/`directorIds` 原始字段返回，由前端解析后调用工作者详情接口获取。

**实现逻辑（在 MovieService 层）：**
1. 查出 movie 记录，若不存在抛出 `BusinessException(ResultCode.NOT_FOUND, "电影不存在")`
2. 使用 `BeanUtils.copyProperties` 将 Movie 实体拷贝到 MovieDetailResponse
3. 查询该电影的评论总数：`MovieCommentDao.countByMovieId(movieId)`
4. 查询最新 20 条评论：`MovieCommentDao.selectByMovieId(movieId, 0, 20)`

---

### 接口四：电影评论分页（独立 Controller）

**`GET /api/comments/{movieId}`**

> **注意**：评论接口位于独立的 `MovieCommentController`（路径前缀 `/api/comments`），不在 `MovieController` 中。

**请求参数 `MovieCommentPageRequest`（Query 参数）：**

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|-------|------|
| pageNum | Integer | 否 | 1 | 页码 |
| pageSize | Integer | 否 | 20 | 每页条数，最大 50 |

**响应：`PageResult<MovieCommentResponse>`**，按 comment_time 倒序

`MovieCommentResponse` 包含：commentId、userNickname、commentContent、likeCount、rating、commentTime

**实现逻辑（在 MovieCommentService 层）：**
- 计算偏移量 `offset = (pageNum - 1) * pageSize`
- 查询评论总数 `MovieCommentDao.countByMovieId(movieId)`
- 查询评论列表 `MovieCommentDao.selectByMovieId(movieId, offset, pageSize)`

---

### 接口五：电影工作者详情

**`GET /api/workers/{workerId}`**

**响应：`Result<MovieWorkerResponse>`**

`MovieWorkerResponse` 包含：workerId、workerName、gender、nameEn、nameZh、birth、birthplace、constellatory、profession、biography

worker 不存在时抛出 `BusinessException(ResultCode.NOT_FOUND, "工作者不存在")`

---

### 接口六：筛选条件列表（3 个接口）

以下三个接口均在 `MovieController` 中，返回常量定义的筛选选项，根据 `spring.profiles.active` 区分 dev/prod 环境返回不同数据。

**6.1 获取国家或地区列表**

**`GET /api/movies/regions`**

**响应：`Result<List<String>>`**

- **dev 环境**：中国、美国、日本、韩国、英国、泰国、印度、德国、西班牙、澳大利亚
- **prod 环境**：扩展至中国大陆、中国香港、中国台湾等 21 个国家和地区

**6.2 获取电影语言列表**

**`GET /api/movies/languages`**

**响应：`Result<List<String>>`**

- **dev 环境**：汉语普通话、英语、日语、西班牙语、葡萄牙语、韩语、泰语、印地语、法语、德语、意大利语、粤语、拉丁语、俄语、挪威语、荷兰语、手语
- **prod 环境**：扩展至 30 种语言

**6.3 获取电影类型列表**

**`GET /api/movies/types`**

**响应：`Result<List<String>>`**

- **dev 环境**：喜剧、科幻、动作、奇幻、冒险、战争、剧情、动画、爱情、悬疑、犯罪、惊悚、传记、运动、歌舞、家庭、音乐、历史、灾难、真人秀
- **prod 环境**：扩展至 55 种类型（含中英混合标签）

**实现要点：**
- 筛选常量定义在 `MovieFilterConstants.java` 中，使用 `List.of(...)` 创建不可变列表
- Service 层通过 `@Value("${spring.profiles.active:dev}")` 注入当前环境变量，按环境返回对应常量

---

## 七、Scalar UI 接口文档规范

- 使用 `OpenApiConfig.java` 配置 OpenAPI 信息（标题、描述、版本、联系方式）
- Controller 类加 `@Tag(name = "模块名", description = "描述")`
- 每个接口方法加 `@Operation(summary = "接口名", description = "详细说明")`
- Request DTO 每个字段加 `@Schema(description = "字段说明", example = "示例值")`
- Response DTO 每个字段同样加 `@Schema(description = "字段说明")`
- 访问地址：`http://localhost:8080/scalar`

---

## 八、配置文件

### application.yml

```yaml
spring:
  profiles:
    active: dev # 选择启用的配置文件
  application:
    name: movie-api # 应用名称

server:
  port: 8080 # 服务器端口

mybatis:
  mapper-locations: classpath:mapper/*.xml # Mapper文件位置
  type-aliases-package: com.example.movie.entity # 类型别名包
  configuration:
    map-underscore-to-camel-case: true # 下划线转驼峰
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl # 日志实现类，这里使用标准输出
```

### application-dev.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/douban_movie_dev?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&allowMultiQueries=true # 数据库连接URL
    username: root # 数据库用户名
    password: 123456 # 数据库密码
    driver-class-name: com.mysql.cj.jdbc.Driver # 数据库驱动类
  devtools:
    restart:
      enabled: true # 启用自动重启

springdoc:
  api-docs:
    path: /v3/api-docs # OpenAPI 接口 JSON 数据路径
  swagger-ui:
    enabled: false # 禁用默认的 Swagger UI，因为我们使用的是 Scalar UI
```

### application-prod.yml

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/douban_movie_prod?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&allowMultiQueries=true
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver
  devtools:
    restart:
      enabled: false # 生产环境下关闭自动重启

springdoc:
  api-docs:
    enabled: false # 生产环境下关闭接口文档
```

---

## 九、pom.xml 关键依赖清单

```xml
<!-- SpringBoot 父 POM，版本 4.0.3 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.0.3</version>
</parent>

<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <java.version>21</java.version>
    <maven.compiler.source>${java.version}</maven.compiler.source>
    <maven.compiler.target>${java.version}</maven.compiler.target>
    <maven.compiler.release>${java.version}</maven.compiler.release>
</properties>

<dependencies>
        <!-- Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- MyBatis -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>4.0.1</version>
        </dependency>
        <!-- MySQL -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>
        <!-- Springdoc OpenAPI & Scalar UI -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-scalar</artifactId>
            <version>3.0.1</version>
            <scope>compile</scope>
        </dependency>
        <!-- 参数校验 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <!-- 热部署 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <optional>true</optional>
        </dependency>
        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!-- 测试 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Actuator 监控 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
</dependencies>
```

---

## 十、额外配置类说明

### 10.1 CorsConfig.java

跨域配置，允许前端开发服务器（如 Vue 开发服务器）访问后端 API。

### 10.2 WebConfig.java

Web 相关配置。

### 10.3 StartupApplicationRunner.java

实现 `ApplicationRunner` 接口，应用启动后在控制台打印项目信息（如访问地址、接口文档地址等）。

### 10.4 IPUtil.java

IP 工具类，用于获取本机局域网 IP 地址，供启动信息展示使用。

---

## 十一、注意事项与坑点提示

1. **cover 字段类型**：`movie.cover` 在数据库中是 `varbinary(512)` 类型，存储的是文件名的二进制编码。Java 实体中映射为 `String`，MyBatis 会自动处理转换。

2. **多值字段筛选**：`type`、`languages`、`regions` 存储格式为 `喜剧/奇幻/冒险` 或 `英语 / 法语`，筛选时用 `LIKE '%值%'` 即可，注意边界误匹配问题。

3. **排序字段安全**：`sortField` 在 XML 中必须用 `${sortField}` 拼接（不能用 `#{}`），因此 **Service 层必须先做白名单校验**，防止 SQL 注入。排序字段白名单：`movie_name`、`movie_alias`、`release_date`、`douban_score`、`minutes`。

4. **工作者 ID 解析**：`actor_ids` 格式为 `张国荣:1003494|张丰毅:1050265`，若需要在后端解析，在 Service 层用 Java split 处理，不在 SQL 中处理字符串。当前实现中 `MovieDetailResponse` 直接返回原始 `actorIds`/`directorIds`，由前端解析。

5. **批量查询 IN**：`MovieWorkerDao.selectByIds` 方法入参为 `List<Integer>`，XML 中用 `<foreach>` 生成 `IN (...)` 语句。

6. **entity 字段类型**：`movie.year` 在 MySQL 中是 `YEAR` 类型，Java 实体映射为 `Integer`；`douban_votes` 和 `minutes` 映射为 `Integer`；`douban_score` 映射为 `Double`。

7. **评论接口独立**：评论分页接口拆分到独立的 `MovieCommentController`（`/api/comments/{movieId}`）和 `MovieCommentService` 中，不在 `MovieController` 和 `MovieService` 里。

8. **统计数据缓存**：统计接口使用类变量 `volatile` + 双重检查锁定（DCL）实现缓存，因为数据库数据不变，缓存永不失效，不需要定时器。

9. **筛选条件环境区分**：三个筛选条件列表接口（regions/languages/types）根据 `spring.profiles.active` 配置区分 dev/prod 环境，返回不同数量的选项。

10. **Scalar UI SpringBoot 4 兼容**：必须使用 `springdoc-openapi-starter-webmvc-scalar`，不能使用旧版 Knife4j。配置类为 `OpenApiConfig`（非 `Knife4jConfig`）。

---

## 十二、输出顺序要求

请按以下顺序逐步输出完整可运行代码，每个文件开头注明完整路径和文件名：

1. `pom.xml`
2. `application.yml` + `application-dev.yml` + `application-prod.yml` + `logback.xml`
3. 公共层：`Result.java`、`PageResult.java`、`ResultCode.java`、`BusinessException.java`、`GlobalExceptionHandler.java`、`MovieFilterConstants.java`、`IPUtil.java`
4. 实体类：`Movie.java`、`MovieComment.java`、`MovieWorker.java`
5. DTO 类：所有 Request 和 Response（含完整 `@Schema` 注解），包括 `MovieStatsResponse`
6. Dao 接口：`MovieDao.java`、`MovieCommentDao.java`、`MovieWorkerDao.java`
7. Mapper XML：`MovieMapper.xml`、`MovieCommentMapper.xml`、`MovieWorkerMapper.xml`（含完整 SQL）
8. Service 类：`MovieService.java`、`MovieCommentService.java`、`MovieWorkerService.java`（含完整业务逻辑）
9. Controller 类：`MovieController.java`、`MovieCommentController.java`、`MovieWorkerController.java`（含完整 OpenAPI 注解）
10. 配置类：`OpenApiConfig.java`、`CorsConfig.java`、`WebConfig.java`、`StartupApplicationRunner.java`
11. `MovieApplication.java`

确保所有代码完整、可直接复制运行，不要省略任何方法实现。