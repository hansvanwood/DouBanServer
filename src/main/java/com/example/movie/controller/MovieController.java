package com.example.movie.controller;

import com.example.movie.common.PageResult;
import com.example.movie.common.Result;
import com.example.movie.dto.request.MovieCommentPageRequest;
import com.example.movie.dto.request.MovieListRequest;
import com.example.movie.dto.response.MovieCommentResponse;
import com.example.movie.dto.response.MovieDetailResponse;
import com.example.movie.dto.response.MovieOverviewResponse;
import com.example.movie.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 电影接口控制器
 */
@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
@Tag(name = "电影模块", description = "电影查询相关接口，包括列表、详情和评论")
public class MovieController {

    private final MovieService movieService;

    /**
     * 电影概览列表（分页+筛选+排序）
     */
    @PostMapping("/list")
    @Operation(summary = "电影概览列表", description = "支持关键词搜索、类型/语言/地区/年份/时长筛选，以及排序和分页")
    public PageResult<MovieOverviewResponse> getMovieList(
            @Valid @RequestBody MovieListRequest request) {
        return movieService.getMovieList(request);
    }

    /**
     * 电影详情
     */
    @GetMapping("/{movieId}")
    @Operation(summary = "电影详情", description = "根据电影ID查询详情，包含最新20条评论")
    public Result<MovieDetailResponse> getMovieDetail(
            @Parameter(description = "电影ID") @PathVariable Integer movieId) {
        MovieDetailResponse detail = movieService.getMovieDetail(movieId);
        return Result.success(detail);
    }

}
