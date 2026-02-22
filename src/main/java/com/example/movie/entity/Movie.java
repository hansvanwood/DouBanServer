package com.example.movie.entity;

import lombok.Data;

import java.util.Date;

/**
 * 电影实体类，对应 movie 表
 */
@Data
public class Movie {

    /** 电影ID */
    private Integer movieId;

    /** 电影名称 */
    private String movieName;

    /** 电影别名（多个别名用 / 分隔） */
    private String movieAlias;

    /** 演员（多人用 / 分隔） */
    private String actors;

    /** 电影封面地址 */
    private String cover;

    /** 导演（多人用 / 分隔） */
    private String directors;

    /** 豆瓣评分 */
    private Double doubanScore;

    /** 豆瓣投票数 */
    private Integer doubanVotes;

    /** 电影类型（多个类型用 / 分隔） */
    private String type;

    /** IMDB ID */
    private String imdbId;

    /** 语言（多个用 / 分隔） */
    private String languages;

    /** 时长（分钟） */
    private Integer minutes;

    /** 官方网址 */
    private String officialSite;

    /** 制片国家/地区（多个用 / 分隔） */
    private String regions;

    /** 上映日期 */
    private Date releaseDate;

    /** 电影描述 */
    private String description;

    /** 标签（多个用 / 分隔） */
    private String tags;

    /** 上映年份 */
    private Integer year;

    /** 演员ID，格式：演员A:ID|演员B:ID */
    private String actorIds;

    /** 导演ID，格式：导演A:ID|导演B:ID */
    private String directorIds;
}
