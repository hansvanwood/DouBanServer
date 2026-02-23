package com.example.movie.service;

import com.example.movie.common.PageResult;
import com.example.movie.dao.MovieCommentDao;
import com.example.movie.dto.request.MovieCommentPageRequest;
import com.example.movie.dto.response.MovieCommentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 电影评论业务逻辑层
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MovieCommentService {

    private final MovieCommentDao movieCommentDao;

    /**
     * 电影评论分页
     */
    public PageResult<MovieCommentResponse> getMovieComments(Integer movieId, MovieCommentPageRequest request) {
        int offset = (request.getPageNum() - 1) * request.getPageSize();

        long total = movieCommentDao.countByMovieId(movieId);
        List<MovieCommentResponse> list = movieCommentDao.selectByMovieId(movieId, offset, request.getPageSize());

        return PageResult.success(list, total, request.getPageNum(), request.getPageSize());
    }
}
