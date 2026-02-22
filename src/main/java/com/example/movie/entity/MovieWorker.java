package com.example.movie.entity;

import lombok.Data;

import java.util.Date;

/**
 * 电影工作者实体类，对应 movie_worker 表
 */
@Data
public class MovieWorker {

    /** 工作者ID */
    private Integer workerId;

    /** 姓名 */
    private String workerName;

    /** 性别 */
    private String gender;

    /** 英文名 */
    private String nameEn;

    /** 中文名 */
    private String nameZh;

    /** 出生日期 */
    private Date birth;

    /** 出生地点 */
    private String birthplace;

    /** 星座 */
    private String constellatory;

    /** 职业 */
    private String profession;

    /** 简介 */
    private String biography;
}
