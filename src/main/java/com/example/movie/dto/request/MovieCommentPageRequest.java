package com.example.movie.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

/**
 * 电影评论分页查询请求参数
 */
@Data
@Schema(description = "电影评论分页查询请求")
public class MovieCommentPageRequest {

    @Min(value = 1, message = "页码最小为1")
    @Schema(description = "页码，默认1", example = "1")
    private Integer pageNum = 1;

    @Min(value = 1, message = "每页条数最小为1")
    @Max(value = 200, message = "每页条数最大为200")
    @Schema(description = "每页条数，默认20，最大200", example = "20")
    private Integer pageSize = 20;
}
