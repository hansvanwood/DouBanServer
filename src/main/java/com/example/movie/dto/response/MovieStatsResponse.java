package com.example.movie.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 电影统计数据响应
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "电影统计数据")
public class MovieStatsResponse {

    @Schema(description = "电影总数")
    private Long movieCount;

    @Schema(description = "评论总数")
    private Long commentCount;

    @Schema(description = "电影制作人总数")
    private Long workerCount;
}
