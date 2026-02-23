package com.example.movie.dao;

import com.example.movie.dto.response.MovieOverviewResponse;
import com.example.movie.entity.Movie;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * 电影数据访问层
 */
@Mapper
public interface MovieDao {

        /**
         * 统计电影总数
         */
        @Select("SELECT COUNT(*) FROM movie")
        long countAll();

        /**
         * 根据条件分页查询电影概览列表
         */
        List<MovieOverviewResponse> selectMovieList(
                        @Param("keyword") String keyword,
                        @Param("type") String type,
                        @Param("language") String language,
                        @Param("region") String region,
                        @Param("year") Integer year,
                        @Param("minMinutes") Integer minMinutes,
                        @Param("maxMinutes") Integer maxMinutes,
                        @Param("sortField") String sortField,
                        @Param("sortOrder") String sortOrder,
                        @Param("offset") int offset,
                        @Param("pageSize") int pageSize);

        /**
         * 根据条件统计电影总数
         */
        long countMovieList(
                        @Param("keyword") String keyword,
                        @Param("type") String type,
                        @Param("language") String language,
                        @Param("region") String region,
                        @Param("year") Integer year,
                        @Param("minMinutes") Integer minMinutes,
                        @Param("maxMinutes") Integer maxMinutes);

        /**
         * 根据电影ID查询电影详情
         */
        Movie selectById(@Param("movieId") Integer movieId);
}
