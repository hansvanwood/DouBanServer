package com.example.movie.entity;

import lombok.Data;

import java.util.Date;

/**
 * 电影评论实体类，对应 movie_comment 表
 */
@Data
public class MovieComment {

    /** 评论ID */
    private Integer commentId;

    /** 豆瓣用户ID */
    private String userId;

    /** 豆瓣用户昵称 */
    private String userNickname;

    /** 电影ID */
    private Integer movieId;

    /** 评论内容 */
    private String commentContent;

    /** 评论点赞数 */
    private Integer likeCount;

    /** 评分（1-5） */
    private Integer rating;

    /** 评论时间 */
    private Date commentTime;
}
