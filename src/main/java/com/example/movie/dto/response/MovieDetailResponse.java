package com.example.movie.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 电影详情响应
 */
@Data
@Schema(description = "电影详情信息")
public class MovieDetailResponse {

    @Schema(description = "电影ID")
    private Integer movieId;

    @Schema(description = "电影名称")
    private String movieName;

    @Schema(description = "电影别名")
    private String movieAlias;

    @Schema(description = "演员")
    private String actors;

    @Schema(description = "电影封面地址")
    private String cover;

    @Schema(description = "导演")
    private String directors;

    @Schema(description = "豆瓣评分")
    private Double doubanScore;

    @Schema(description = "豆瓣投票数")
    private Integer doubanVotes;

    @Schema(description = "电影类型")
    private String type;

    @Schema(description = "IMDB ID")
    private String imdbId;

    @Schema(description = "语言")
    private String languages;

    @Schema(description = "时长（分钟）")
    private Integer minutes;

    @Schema(description = "官方网址")
    private String officialSite;

    @Schema(description = "制片国家/地区")
    private String regions;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Schema(description = "上映日期")
    private Date releaseDate;

    @Schema(description = "电影描述")
    private String description;

    @Schema(description = "标签")
    private String tags;

    @Schema(description = "上映年份")
    private Integer year;

    @Schema(description = "演员ID原始数据")
    private String actorIds;

    @Schema(description = "导演ID原始数据")
    private String directorIds;

    @Schema(description = "最新20条评论")
    private List<MovieCommentResponse> comments;
}
