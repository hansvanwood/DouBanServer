# 🎬 豆瓣电影查询系统 —— SpringBoot 后端开发提示词

---

## 一、角色设定

你是一位资深 Java 后端开发工程师，精通 SpringBoot 3、MyBatis、MySQL 开发，擅长编写结构清晰、规范统一、可维护性强的企业级代码。请严格按照以下要求，从零搭建一套完整的电影查询后端工程。

---

## 二、数据库表结构

数据库名：`douban_movie`，共三张表，建表 SQL 如下：

```sql
-- 电影主表（约 140502 条数据）
CREATE TABLE `movie` (
  `movie_id` int unsigned NOT NULL COMMENT '电影ID',
  `movie_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电影名称',
  `movie_alias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电影别名',
  `actors` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '演员',
  `cover` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电影封面地址',
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
  `actor_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '演员ID，多个演员采用“|”符号分割，格式“演员A:ID|演员B:ID”',
  `director_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '导演ID，多个导演采用“|”符号分割，格式“导演A:ID|导演B:ID”',
  PRIMARY KEY (`movie_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='电影列表（总共140502条数据，采集于2019年的豆瓣）';

-- 电影评论表（约 4428475 条数据）
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
  PRIMARY KEY (`comment_id`) USING BTREE,
  KEY `idx_movie_time` (`movie_id`,`comment_time` DESC) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4428476 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='电影评论表（总共4428475条数据，采集于2019年的豆瓣）';

-- 电影工作者表（约 70001 条数据）
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='电影工作者（总共70001条数据，采集于2019年的豆瓣）';
```

> **重要字段说明：**
> - `movie.actor_ids` 与 `movie.director_ids`：格式为 `姓名:ID|姓名:ID`，通过此字段解析出 `worker_id`，再关联 `movie_worker` 表查询工作者详情。解析逻辑在 Service 层用 Java 代码完成，不在 SQL 中处理。
> - `movie.type`、`movie.languages`、`movie.regions`：多值字段，值之间用 ` / `（空格+斜杠+空格）分隔，筛选时使用 `LIKE '%值%'` 处理。

---

## 三、技术栈

| 技术 | 版本 / 说明                                              |
|------|------------------------------------------------------|
| Java | 17+                                                  |
| SpringBoot | **3.3.13**                                           |
| MyBatis | 原生 MyBatis，**禁止使用 MyBatisPlus**                      |
| Knife4j | `knife4j-openapi3-jakarta-spring-boot-starter 4.5.0` |
| MySQL | 9.x                                                  |
| Lombok | 全程使用                                                 |
| spring-boot-devtools | 热部署                                                  |
| spring-boot-starter-validation | 参数校验                                                 |

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
│   │   └── exception/
│   │       ├── BusinessException.java
│   │       └── GlobalExceptionHandler.java
│   ├── config/
│   │   └── Knife4jConfig.java
│   ├── controller/
│   │   ├── MovieController.java
│   │   └── MovieWorkerController.java
│   ├── service/
│   │   ├── MovieService.java              # 无 Impl，直接在此类写业务逻辑
│   │   └── MovieWorkerService.java
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
│   │       └── MovieWorkerResponse.java
│   └── entity/
│       ├── Movie.java
│       ├── MovieComment.java
│       └── MovieWorker.java
├── src/main/resources/
│   ├── application.yml
│   ├── logback-spring.xml
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
- Service 加 `@Service` 注解，注入对应 Dao，直接在 Service 类中编写完整业务逻辑。

### 5.5 命名规范

- 请求参数类后缀：`Request`，例如 `MovieListRequest`
- 响应结果类后缀：`Response`，例如 `MovieDetailResponse`
- 实体类：对应表名驼峰，如 `Movie`、`MovieComment`、`MovieWorker`

### 5.6 参数校验

使用 `@Valid` + `jakarta.validation` 注解对 Request 类校验。在 `GlobalExceptionHandler` 中统一捕获 `MethodArgumentNotValidException` 和 `ConstraintViolationException`，返回 `ResultCode.BAD_REQUEST`，并将所有字段错误信息拼接后放入 message 返回。

### 5.7 全局异常处理

`GlobalExceptionHandler` 使用 `@RestControllerAdvice` + `@Slf4j`，至少处理：
- `MethodArgumentNotValidException`：参数校验失败
- `BusinessException`：业务异常（自定义异常，包含 ResultCode）
- `Exception`：兜底异常，日志打印完整堆栈，返回 `ResultCode.INTERNAL_ERROR`

### 5.8 日志配置（logback-spring.xml）

- 控制台彩色输出，Pattern 包含时间、级别、线程、类名、消息
- 按天滚动归档到 `logs/` 目录，文件名格式 `app-%d{yyyy-MM-dd}.log`
- 保留最近 30 天，单文件最大 100MB
- 分别输出 INFO 级别总日志和 ERROR 级别错误日志到不同文件

---

## 六、接口详细设计

### 接口一：电影概览列表（分页+筛选+排序）

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

`MovieOverviewResponse` 包含字段：movie_id、movie_name、movie_alias、cover、directors、actors、douban_score、douban_votes、type、languages、regions、minutes、release_date、year

**SQL 编写要点（在 MovieMapper.xml 中实现）：**
- keyword 用 `AND (movie_name LIKE #{kw} OR movie_alias LIKE #{kw} OR actors LIKE #{kw} OR directors LIKE #{kw})`，kw 值为 `%keyword%`
- type/language/region 筛选用 `AND type LIKE #{type}`（值拼接为 `%值%`）
- year 精确匹配：`AND year = #{year}`
- 时长范围：`AND minutes >= #{minMinutes} AND minutes <= #{maxMinutes}`
- 排序：`ORDER BY ${sortField} ${sortOrder}`，**sortField 在 Service 层做白名单校验后才传入**
- 分页：使用 `LIMIT #{offset}, #{pageSize}` 手动分页，COUNT 查询单独写一个方法

**Service 层排序字段白名单校验：**
```
允许值：movie_name、movie_alias、release_date、douban_score
非法值抛出 BusinessException(ResultCode.BAD_REQUEST, "不支持的排序字段")
sortOrder 只允许 asc/desc，否则默认 desc
```

---

### 接口二：电影详情

**`GET /api/movies/{movieId}`**

**响应：`Result<MovieDetailResponse>`**

`MovieDetailResponse` 包含：
- movie 表全部字段
- `List<MovieCommentResponse> comments`：该电影最新 20 条评论，按 comment_time 倒序
- `List<MovieWorkerResponse> directorList`：导演详情列表
- `List<MovieWorkerResponse> actorList`：演员详情列表

**工作者关联逻辑（在 Service 层用 Java 处理，不写 SQL JOIN）：**
1. 查出 movie 记录，若不存在抛出 `BusinessException(ResultCode.NOT_FOUND, "电影不存在")`
2. 解析 `director_ids` 字段：按 `|` 分割，每项再按 `:` 分割取最后一段作为 worker_id
3. 解析 `actor_ids` 字段：同上
4. 将所有 worker_id 合并去重，调用 `MovieWorkerDao.selectByIds(List<Integer> ids)` 批量查询
5. 根据 director_ids 中的 ID 顺序组装 directorList，根据 actor_ids 中的 ID 顺序组装 actorList
6. 单独查询评论：`MovieCommentDao.selectByMovieId(movieId, 0, 20)`

---

### 接口三：电影评论分页

**`GET /api/movies/{movieId}/comments`**

**请求参数 `MovieCommentPageRequest`（Query 参数）：**

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|-------|------|
| pageNum | Integer | 否 | 1 | 页码 |
| pageSize | Integer | 否 | 20 | 每页条数，最大 50 |

**响应：`PageResult<MovieCommentResponse>`**，按 comment_time 倒序

`MovieCommentResponse` 包含：comment_id、user_nickname、comment_content、like_count、rating、comment_time

---

### 接口四：电影工作者详情

**`GET /api/workers/{workerId}`**

**响应：`Result<MovieWorkerResponse>`**

`MovieWorkerResponse` 包含：worker_id、worker_name、gender、name_en、name_zh、birth、birthplace、constellatory、profession、biography

worker 不存在时抛出 `BusinessException(ResultCode.NOT_FOUND, "工作者不存在")`

---

## 七、Knife4j 接口文档规范

- Controller 类加 `@Tag(name = "模块名", description = "描述")`
- 每个接口方法加 `@Operation(summary = "接口名", description = "详细说明")`
- Request DTO 每个字段加 `@Schema(description = "字段说明", example = "示例值")`
- Response DTO 每个字段同样加 `@Schema(description = "字段说明")`
- 访问地址：`http://localhost:8080/doc.html`

---

## 八、配置文件

### application.yml

```yaml
server:
  port: 8080

spring:
  application:
    name: movie-api
  datasource:
    url: jdbc:mysql://localhost:3306/douban_movie?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&allowMultiQueries=true
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  devtools:
    restart:
      enabled: true

mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.movie.entity
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl

knife4j:
  enable: true
  setting:
    language: zh_cn
```

---

## 九、pom.xml 关键依赖清单

```xml
<!-- SpringBoot 父 POM，版本 3.3.13 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-parent</artifactId>
    <version>3.3.13</version>
</parent>

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
            <version>3.0.5</version>
        </dependency>
        <!-- MySQL -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>
        <!-- Knife4j（OpenAPI3，兼容 SpringBoot 3.3，但不兼容3.4+） -->
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-openapi3-jakarta-spring-boot-starter</artifactId>
            <version>4.5.0</version>
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
</dependencies>
```

---

## 十、注意事项与坑点提示

1. **多值字段筛选**：`type`、`languages`、`regions` 存储格式为 `剧情/奇幻/冒险` 或 `英语 / 法语`，筛选时用 `LIKE '%值%'` 即可，注意边界误匹配问题。

2. **排序字段安全**：`sortField` 在 XML 中必须用 `${sortField}` 拼接（不能用 `#{}`），因此 **Service 层必须先做白名单校验**，防止 SQL 注入。

3. **工作者 ID 解析**：`actor_ids` 格式为 `张国荣:1003494|张丰毅:1050265`，在 Service 层用 Java split 解析，不在 SQL 中处理字符串。

4. **批量查询 IN**：`MovieWorkerDao.selectByIds` 方法入参为 `List<Integer>`，XML 中用 `<foreach>` 生成 `IN (...)` 语句。

5. **大数据量优化**：`movie_comment` 有 440 万条数据，查询时 `WHERE movie_id = ?` 依赖索引，建议在创建表时或在 README 中说明需要对 `movie_comment.movie_id` 添加索引。

6. **entity 字段类型**：`movie.year` 在 MySQL 中是 `YEAR` 类型，Java 实体映射为 `Integer` 或 `Short`；`douban_score`、`douban_votes`、`minutes` 映射为 `Double`。

7. **Knife4j SpringBoot 3 兼容**：必须使用 `knife4j-openapi3-jakarta-spring-boot-starter`，不能使用旧版 `knife4j-spring-boot-starter`。

---

## 十一、输出顺序要求

请按以下顺序逐步输出完整可运行代码，每个文件开头注明完整路径和文件名：

1. `pom.xml`
2. `application.yml` + `logback-spring.xml`
3. 公共层：`Result.java`、`PageResult.java`、`ResultCode.java`、`BusinessException.java`、`GlobalExceptionHandler.java`
4. 实体类：`Movie.java`、`MovieComment.java`、`MovieWorker.java`
5. DTO 类：所有 Request 和 Response（含完整 `@Schema` 注解）
6. Dao 接口：`MovieDao.java`、`MovieCommentDao.java`、`MovieWorkerDao.java`
7. Mapper XML：`MovieMapper.xml`、`MovieCommentMapper.xml`、`MovieWorkerMapper.xml`（含完整 SQL）
8. Service 类：`MovieService.java`、`MovieWorkerService.java`（含完整业务逻辑）
9. Controller 类：`MovieController.java`、`MovieWorkerController.java`（含完整 Knife4j 注解）
10. `Knife4jConfig.java`
11. `MovieApplication.java`

确保所有代码完整、可直接复制运行，不要省略任何方法实现。