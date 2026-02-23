package com.example.movie.dao;

import com.example.movie.dto.response.MovieCommentResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 电影评论数据访问层
 */
@Mapper
public interface MovieCommentDao {

    /**
     * 统计评论总数
     */
    @Select("SELECT COUNT(*) FROM movie_comment")
    long countAll();

    /**
     * 根据电影ID分页查询评论，按评论时间倒序
     */
    List<MovieCommentResponse> selectByMovieId(
            @Param("movieId") Integer movieId,
            @Param("offset") int offset,
            @Param("pageSize") int pageSize);

    /**
     * 根据电影ID统计评论总数
     */
    long countByMovieId(@Param("movieId") Integer movieId);
}
