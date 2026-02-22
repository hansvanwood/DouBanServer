package com.example.movie.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

/**
 * 电影工作者响应
 */
@Data
@Schema(description = "电影工作者信息")
public class MovieWorkerResponse {

    @Schema(description = "工作者ID")
    private Integer workerId;

    @Schema(description = "姓名")
    private String workerName;

    @Schema(description = "性别")
    private String gender;

    @Schema(description = "英文名")
    private String nameEn;

    @Schema(description = "中文名")
    private String nameZh;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    @Schema(description = "出生日期")
    private Date birth;

    @Schema(description = "出生地点")
    private String birthplace;

    @Schema(description = "星座")
    private String constellatory;

    @Schema(description = "职业")
    private String profession;

    @Schema(description = "简介")
    private String biography;
}
