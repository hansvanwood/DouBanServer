package com.example.movie.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 统一单数据返回体
 */
@Data
@Schema(description = "统一返回结果")
public class Result<T> {

    @Schema(description = "状态码")
    private int code;

    @Schema(description = "提示信息")
    private String message;

    @Schema(description = "返回数据")
    private T data;

    /**
     * 成功返回（带数据）
     */
    public static <T> Result<T> success(T data) {
        Result<T> result = new Result<>();
        result.setCode(ResultCode.SUCCESS.getCode());
        result.setMessage(ResultCode.SUCCESS.getMessage());
        result.setData(data);
        return result;
    }

    /**
     * 失败返回（使用 ResultCode）
     */
    public static <T> Result<T> fail(ResultCode resultCode) {
        Result<T> result = new Result<>();
        result.setCode(resultCode.getCode());
        result.setMessage(resultCode.getMessage());
        return result;
    }

    /**
     * 失败返回（自定义 code 和 message）
     */
    public static <T> Result<T> fail(int code, String message) {
        Result<T> result = new Result<>();
        result.setCode(code);
        result.setMessage(message);
        return result;
    }
}
