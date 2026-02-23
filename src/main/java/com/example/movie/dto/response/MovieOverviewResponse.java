package com.example.movie.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

/**
 * 电影概览响应
 */
@Data
@Schema(description = "电影概览信息")
public class MovieOverviewResponse {

    @Schema(description = "电影ID")
    private Integer movieId;

    @Schema(description = "电影名称")
    private String movieName;

    @Schema(description = "电影别名")
    private String movieAlias;

    @Schema(description = "电影封面地址")
    private String cover;

    @Schema(description = "导演")
    private String directors;

    @Schema(description = "演员")
    private String actors;

    @Schema(description = "豆瓣评分")
    private Double doubanScore;

    @Schema(description = "豆瓣投票数")
    private Integer doubanVotes;

    @Schema(description = "电影类型")
    private String type;

    @Schema(description = "语言")
    private String languages;

    @Schema(description = "制片国家/地区")
    private String regions;

    @Schema(description = "时长（分钟）")
    private Integer minutes;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    @Schema(description = "上映日期")
    private Date releaseDate;

    @Schema(description = "上映年份")
    private Integer year;
}
