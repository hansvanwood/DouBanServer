package com.example.movie.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

/**
 * 统一分页返回体
 */
@Data
@Schema(description = "分页返回结果")
public class PageResult<T> {

    @Schema(description = "状态码")
    private int code;

    @Schema(description = "提示信息")
    private String message;

    @Schema(description = "总条数")
    private long total;

    @Schema(description = "当前页码")
    private int pageNum;

    @Schema(description = "每页条数")
    private int pageSize;

    @Schema(description = "数据列表")
    private List<T> data;

    /**
     * 分页成功返回
     */
    public static <T> PageResult<T> success(List<T> data, long total, int pageNum, int pageSize) {
        PageResult<T> result = new PageResult<>();
        result.setCode(ResultCode.SUCCESS.getCode());
        result.setMessage(ResultCode.SUCCESS.getMessage());
        result.setData(data);
        result.setTotal(total);
        result.setPageNum(pageNum);
        result.setPageSize(pageSize);
        return result;
    }
}
