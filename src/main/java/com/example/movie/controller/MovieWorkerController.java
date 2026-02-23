package com.example.movie.controller;

import com.example.movie.common.Result;
import com.example.movie.dto.response.MovieWorkerResponse;
import com.example.movie.service.MovieWorkerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 电影工作者接口控制器
 */
@RestController
@RequestMapping("/api/workers")
@RequiredArgsConstructor
@Tag(name = "电影工作者模块", description = "电影工作者（演员/导演）相关接口")
public class MovieWorkerController {

    private final MovieWorkerService movieWorkerService;

    /**
     * 工作者详情
     */
    @GetMapping("/{workerId}")
    @Operation(summary = "工作者详情", description = "根据工作者ID查询详细信息，包括姓名、性别、出生日期、职业等")
    public Result<MovieWorkerResponse> getWorkerDetail(
            @Parameter(description = "工作者ID") @PathVariable Integer workerId) {
        MovieWorkerResponse detail = movieWorkerService.getWorkerDetail(workerId);
        return Result.success(detail);
    }
}
