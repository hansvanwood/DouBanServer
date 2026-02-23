package com.example.movie.controller;

import com.example.movie.common.PageResult;
import com.example.movie.dto.request.MovieCommentPageRequest;
import com.example.movie.dto.response.MovieCommentResponse;
import com.example.movie.service.MovieCommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 电影接口控制器
 */
@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@Tag(name = "电影评论模块", description = "电影评论相关接口")
public class MovieCommentController {

    private final MovieCommentService movieCommentService;

    /**
     * 电影评论分页
     */
    @GetMapping("/{movieId}")
    @Operation(summary = "电影评论分页", description = "根据电影ID分页查询评论，按评论时间倒序")
    public PageResult<MovieCommentResponse> getMovieComments(
            @Parameter(description = "电影ID") @PathVariable Integer movieId,
            @Valid MovieCommentPageRequest request) {
        return movieCommentService.getMovieComments(movieId, request);
    }
}
