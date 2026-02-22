package com.example.movie.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

/**
 * 电影评论响应
 */
@Data
@Schema(description = "电影评论信息")
public class MovieCommentResponse {

    @Schema(description = "评论ID")
    private Integer commentId;

    @Schema(description = "用户昵称")
    private String userNickname;

    @Schema(description = "评论内容")
    private String commentContent;

    @Schema(description = "点赞数")
    private Integer likeCount;

    @Schema(description = "评分（1-5）")
    private Integer rating;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @Schema(description = "评论时间")
    private Date commentTime;
}
