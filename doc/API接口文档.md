# 📖 豆瓣电影查询系统 — API 接口文档

**Base URL**：`http://localhost:8080/api`

**在线文档**：`http://localhost:8080/scalar`（Scalar UI）

所有接口统一返回格式如下。日期字段统一格式：`yyyy-MM-dd`，时间字段统一格式：`yyyy-MM-dd HH:mm:ss`。

---

## 统一返回格式

### 单数据返回 `Result<T>`

```json
{
  "code": 200,
  "message": "操作成功",
  "data": { }
}
```

### 分页返回 `PageResult<T>`

```json
{
  "code": 200,
  "message": "操作成功",
  "total": 140502,
  "pageNum": 1,
  "pageSize": 20,
  "data": [ ]
}
```

### 错误码

| code | message | 说明 |
|------|---------|------|
| 200 | 操作成功 | 成功 |
| 400 | 请求参数错误 | 参数校验失败 |
| 404 | 资源不存在 | 找不到数据 |
| 500 | 服务器内部错误 | 兜底异常 |

---

## 一、电影列表（分页 + 筛选 + 排序）

`POST /movies/list`

### 请求参数（JSON Body）

| 字段 | 类型 | 必填 | 默认值 | 说明                                                                              |
|------|------|------|--------|---------------------------------------------------------------------------------|
| keyword | String | 否 | - | 模糊搜索，匹配电影名/别名/演员/导演                                                             |
| type | String | 否 | - | 电影类型，如 `剧情`                                                                     |
| language | String | 否 | - | 语言，如 `英语`                                                                       |
| region | String | 否 | - | 制片国家/地区，如 `美国`                                                                  |
| year | Integer | 否 | - | 上映年份（≥1888）                                                                     |
| minMinutes | Integer | 否 | - | 最短时长（分钟，≥0）                                                                     |
| maxMinutes | Integer | 否 | - | 最长时长（分钟，≥0）                                                                     |
| sortField | String | 否 | `douban_score` | 排序字段：`movie_name` / `movie_alias` / `release_date` / `minutes` / `douban_score` |
| sortOrder | String | 否 | `desc` | 排序方向：`asc` / `desc`                                                             |
| pageNum | Integer | 是 | 1 | 页码（≥1）                                                                          |
| pageSize | Integer | 是 | 20 | 每页条数（1~200）                                                                     |

### 请求示例

```json
{
  "keyword": "霸王别姬",
  "type": "剧情",
  "sortField": "douban_score",
  "sortOrder": "desc",
  "pageNum": 1,
  "pageSize": 10
}
```

### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "total": 3,
  "pageNum": 1,
  "pageSize": 10,
  "data": [
    {
      "movieId": 1291546,
      "movieName": "霸王别姬",
      "movieAlias": "再见，我的妾",
      "cover": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1488213971.jpg",
      "directors": "陈凯歌",
      "actors": "张国荣/张丰毅/巩俐/葛优/英达/蒋雯丽",
      "doubanScore": 9.6,
      "doubanVotes": 1167141,
      "type": "剧情/爱情/同性",
      "languages": "汉语普通话",
      "regions": "中国大陆 / 中国香港",
      "minutes": 171,
      "releaseDate": "1993-01-01 00:00:00",
      "year": 1993
    }
  ]
}
```

---

## 二、电影统计数据

`GET /movies/stats`

### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "movieCount": 140502,
    "commentCount": 4428475,
    "workerCount": 70001
  }
}
```

---

## 三、电影详情

`GET /movies/{movieId}`

### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| movieId | Integer | 电影ID |

### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "movieId": 1291546,
    "movieName": "霸王别姬",
    "movieAlias": "再见，我的妾",
    "actors": "张国荣/张丰毅/巩俐/葛优/英达/蒋雯丽/吴大维/吕齐/雷汉/尹治",
    "cover": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1488213971.jpg",
    "directors": "陈凯歌",
    "doubanScore": 9.6,
    "doubanVotes": 1167141,
    "type": "剧情/爱情/同性",
    "imdbId": "tt0106332",
    "languages": "汉语普通话",
    "minutes": 171,
    "officialSite": "",
    "regions": "中国大陆 / 中国香港",
    "releaseDate": "1993-01-01 00:00:00",
    "description": "段小楼（张丰毅）与程蝶衣（张国荣）是一对打小一起长大的师兄弟...",
    "tags": "经典/人性/文艺/爱情/人生/同志/剧情/文革",
    "year": 1993,
    "actorIds": "张国荣:1003494|张丰毅:1050265|巩俐:1035641",
    "directorIds": "陈凯歌:1023040",
    "commentTotal": 520,
    "comments": [
      {
        "commentId": 12345,
        "userNickname": "影迷小王",
        "commentContent": "这部电影太感人了，经典中的经典！",
        "likeCount": 128,
        "rating": 5,
        "commentTime": "2019-06-15 20:30:00"
      },
      {
        "commentId": 12346,
        "userNickname": "电影爱好者",
        "commentContent": "张国荣的演技无人能及",
        "likeCount": 256,
        "rating": 5,
        "commentTime": "2019-05-20 14:22:30"
      }
    ]
  }
}
```

### 错误响应

```json
{
  "code": 404,
  "message": "电影不存在",
  "data": null
}
```

---

## 四、电影评论分页

`GET /comments/{movieId}`

### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| movieId | Integer | 电影ID |

### Query 参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| pageNum | Integer | 否 | 1 | 页码（≥1） |
| pageSize | Integer | 否 | 20 | 每页条数（1~200） |

### 请求示例

```
GET /api/comments/1291546?pageNum=1&pageSize=10
```

### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "total": 520,
  "pageNum": 1,
  "pageSize": 10,
  "data": [
    {
      "commentId": 1167353,
      "userNickname": "大洁",
      "commentContent": "这是一部让人反复观看的电影",
      "likeCount": 15,
      "rating": 5,
      "commentTime": "2019-08-10 18:45:00"
    },
    {
      "commentId": 1167354,
      "userNickname": "原来是个松鼠",
      "commentContent": "演技太好了",
      "likeCount": 8,
      "rating": 4,
      "commentTime": "2019-07-02 10:28:11"
    }
  ]
}
```

---

## 五、工作者详情

`GET /workers/{workerId}`

### 路径参数

| 参数 | 类型 | 说明 |
|------|------|------|
| workerId | Integer | 工作者ID |

### 请求示例

```
GET /api/workers/1003494
```

### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {
    "workerId": 1003494,
    "workerName": "张国荣",
    "gender": "男",
    "nameEn": "Leslie Cheung",
    "nameZh": "张国荣",
    "birth": "1956-09-12 00:00:00",
    "birthplace": "中国,香港",
    "constellatory": "处女座",
    "profession": "演员/歌手",
    "biography": "张国荣（1956年9月12日－2003年4月1日），生于香港..."
  }
}
```

### 错误响应

```json
{
  "code": 404,
  "message": "工作者不存在",
  "data": null
}
```

---

## 六、通用错误响应

### 参数校验失败（400）

```json
{
  "code": 400,
  "message": "pageNum: 页码最小为1; pageSize: 每页条数不能为空",
  "data": null
}
```

### 服务器内部错误（500）

```json
{
  "code": 500,
  "message": "服务器内部错误",
  "data": null
}
```
## 七、可筛选的地区、语言、类型

### 获取可筛选的国家或地区列表

`GET /movies/regions`

#### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "data": ["中国","美国","日本","韩国","英国","泰国","印度","德国","西班牙","澳大利亚"]
}
```

### 获取可筛选的电影语言列表

`GET /movies/languages`

#### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "data": ["汉语普通话","英语","日语","西班牙语","葡萄牙语","韩语","泰语","印地语","法语","德语","意大利语","粤语","拉丁语","俄语","挪威语","荷兰语","手语"]
}
```

### 获取可筛选的电影类型列表

`GET /movies/genres`

#### 响应示例

```json
{
  "code": 200,
  "message": "操作成功",
  "data": ["喜剧","科幻","动作","奇幻","冒险","战争","剧情","动画","爱情","悬疑","犯罪","惊悚","传记","运动","歌舞","家庭","音乐","历史","灾难","真人秀","剧情","奇幻","冒险","家庭","爱情","同性","动作","犯罪","音乐","惊悚","动画","歌舞","科幻","喜剧","儿童","历史","战争","悬疑","传记","西部","恐怖","古装","武侠","灾难","黑色电影","运动","惊栗","荒诞","悬念","戏曲","记录","Adult","Reality-TV","Comedy","纪录片","短片","懸疑 Mystery","舞台艺术","鬼怪","真人秀","劇情 Drama","驚悚 Thriller","紀錄片 Documentary","音樂 Music","News","脱口秀","傳記 Biography","愛情 Romance","動作 Action","Talk-Show","動畫 Animation","兒童 Kids","喜劇 Comedy","歷史 History"]
}
```
