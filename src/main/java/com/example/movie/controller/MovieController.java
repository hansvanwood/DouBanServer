package com.example.movie.controller;

import com.example.movie.common.PageResult;
import com.example.movie.common.Result;
import com.example.movie.dto.request.MovieListRequest;
import com.example.movie.dto.response.MovieDetailResponse;
import com.example.movie.dto.response.MovieOverviewResponse;
import com.example.movie.dto.response.MovieStatsResponse;
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
     * 电影统计数据
     */
    @GetMapping("/stats")
    @Operation(summary = "电影统计数据", description = "统计电影数量、评论数量和电影制作人数量")
    public Result<MovieStatsResponse> getMovieStats() {
        return Result.success(movieService.getMovieStats());
    }

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

    /**
     * 获取可筛选的国家或地区列表
     */
    @GetMapping("/regions")
    @Operation(summary = "获取国家或地区", description = "获取可用于筛选的国家或地区列表")
    public Result<java.util.List<String>> getRegions() {
        return Result.success(movieService.getRegions());
    }

    /**
     * 获取可筛选的电影语言列表
     */
    @GetMapping("/languages")
    @Operation(summary = "获取电影语言", description = "获取可用于筛选的电影语言列表")
    public Result<java.util.List<String>> getLanguages() {
        return Result.success(movieService.getLanguages());
    }

    /**
     * 获取可筛选的电影类型列表
     */
    @GetMapping("/types")
    @Operation(summary = "获取电影类型", description = "获取可用于筛选的电影类型列表")
    public Result<java.util.List<String>> getTypes() {
        return Result.success(movieService.getTypes());
    }

}
