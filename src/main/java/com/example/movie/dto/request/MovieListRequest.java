package com.example.movie.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 电影列表查询请求参数
 */
@Data
@Schema(description = "电影列表查询请求")
public class MovieListRequest {

    @Schema(description = "关键词，模糊搜索电影名/别名/演员/导演", example = "哈利波特")
    private String keyword;

    @Schema(description = "电影类型，如：剧情", example = "剧情")
    private String type;

    @Schema(description = "语言，如：英语", example = "英语")
    private String language;

    @Schema(description = "制片国家/地区，如：美国", example = "美国")
    private String region;

    @Min(value = 1888, message = "年份不能小于1888")
    @Schema(description = "上映年份", example = "2020")
    private Integer year;

    @Min(value = 0, message = "最短时长不能为负数")
    @Schema(description = "最短时长（分钟）", example = "90")
    private Integer minMinutes;

    @Min(value = 0, message = "最长时长不能为负数")
    @Schema(description = "最长时长（分钟）", example = "180")
    private Integer maxMinutes;

    @Schema(description = "排序字段：movie_name / movie_alias / release_date / douban_score，默认 douban_score", example = "douban_score")
    private String sortField;

    @Schema(description = "排序方向：asc / desc，默认 desc", example = "desc")
    private String sortOrder;

    @NotNull(message = "页码不能为空")
    @Min(value = 1, message = "页码最小为1")
    @Schema(description = "页码", example = "1", defaultValue = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer pageNum = 1;

    @NotNull(message = "每页条数不能为空")
    @Min(value = 1, message = "每页条数最小为1")
    @Max(value = 200, message = "每页条数最大为200")
    @Schema(description = "每页条数", example = "20", defaultValue = "20", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer pageSize = 20;
}
