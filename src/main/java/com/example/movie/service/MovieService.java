package com.example.movie.service;

import com.example.movie.common.MovieFilterConstants;
import com.example.movie.common.PageResult;
import com.example.movie.common.ResultCode;
import com.example.movie.common.exception.BusinessException;
import com.example.movie.dao.MovieCommentDao;
import com.example.movie.dao.MovieDao;
import com.example.movie.dao.MovieWorkerDao;
import com.example.movie.dto.request.MovieListRequest;
import com.example.movie.dto.response.MovieCommentResponse;
import com.example.movie.dto.response.MovieDetailResponse;
import com.example.movie.dto.response.MovieOverviewResponse;
import com.example.movie.dto.response.MovieStatsResponse;
import com.example.movie.entity.Movie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Set;

/**
 * 电影业务逻辑层
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MovieService {

    /**
     * 排序字段白名单
     */
    private static final Set<String> SORT_FIELD_WHITELIST = Set.of(
            "movie_name", "movie_alias", "release_date", "minutes", "douban_score");

    private final MovieDao movieDao;
    private final MovieCommentDao movieCommentDao;
    private final MovieWorkerDao movieWorkerDao;
    /**
     * 排序方向白名单
     */
    private static final Set<String> SORT_ORDER_WHITELIST = Set.of("asc", "desc");
    @Value("${spring.profiles.active:dev}")
    private String activeProfile;
    /**
     * 统计数据缓存（数据库数据不变，缓存永不失效）
     */
    private volatile MovieStatsResponse cachedStats;

    /**
     * 电影概览列表（分页+筛选+排序）
     */
    public PageResult<MovieOverviewResponse> getMovieList(MovieListRequest request) {
        // 排序字段校验
        String sortField = request.getSortField();
        if (!StringUtils.hasText(sortField)) {
            sortField = "douban_score";
        } else if (!SORT_FIELD_WHITELIST.contains(sortField)) {
            throw new BusinessException(ResultCode.BAD_REQUEST, "不支持的排序字段");
        }

        // 排序方向校验
        String sortOrder = request.getSortOrder();
        if (!StringUtils.hasText(sortOrder) || !SORT_ORDER_WHITELIST.contains(sortOrder.toLowerCase())) {
            sortOrder = "desc";
        } else {
            sortOrder = sortOrder.toLowerCase();
        }

        // 模糊搜索关键词处理
        String keyword = StringUtils.hasText(request.getKeyword()) ? "%" + request.getKeyword() + "%" : null;
        String type = StringUtils.hasText(request.getType()) ? "%" + request.getType() + "%" : null;
        String language = StringUtils.hasText(request.getLanguage()) ? "%" + request.getLanguage() + "%" : null;
        String region = StringUtils.hasText(request.getRegion()) ? "%" + request.getRegion() + "%" : null;

        // 计算偏移量
        int offset = (request.getPageNum() - 1) * request.getPageSize();

        // 查询总数
        long total = movieDao.countMovieList(keyword, type, language, region,
                request.getYear(), request.getMinMinutes(), request.getMaxMinutes());

        // 查询列表
        List<MovieOverviewResponse> list = movieDao.selectMovieList(
                keyword, type, language, region,
                request.getYear(), request.getMinMinutes(), request.getMaxMinutes(),
                sortField, sortOrder, offset, request.getPageSize());

        return PageResult.success(list, total, request.getPageNum(), request.getPageSize());
    }

    /**
     * 电影详情
     */
    public MovieDetailResponse getMovieDetail(Integer movieId) {
        // 查询电影
        Movie movie = movieDao.selectById(movieId);
        if (movie == null) {
            throw new BusinessException(ResultCode.NOT_FOUND, "电影不存在");
        }

        // 组装详情响应
        MovieDetailResponse response = new MovieDetailResponse();
        BeanUtils.copyProperties(movie, response);

        // 查询评论总数（用于前端分页）
        long commentTotal = movieCommentDao.countByMovieId(movieId);
        response.setCommentTotal(commentTotal);

        // 查询最新20条评论
        List<MovieCommentResponse> comments = movieCommentDao.selectByMovieId(movieId, 0, 20);
        response.setComments(comments);

        return response;
    }

    /**
     * 获取电影统计数据（带类变量缓存）
     */
    public MovieStatsResponse getMovieStats() {
        if (cachedStats == null) {
            synchronized (this) {
                if (cachedStats == null) {
                    long movieCount = movieDao.countAll();
                    long commentCount = movieCommentDao.countAll();
                    long workerCount = movieWorkerDao.countAll();
                    cachedStats = new MovieStatsResponse(movieCount, commentCount, workerCount);
                    log.info("统计数据已缓存: 电影={}, 评论={}, 制作人={}", movieCount, commentCount, workerCount);
                }
            }
        }
        return cachedStats;
    }

    /**
     * 获取国家或地区列表
     */
    public List<String> getRegions() {
        return "prod".equalsIgnoreCase(activeProfile) ? MovieFilterConstants.PROD_REGIONS
                : MovieFilterConstants.DEV_REGIONS;
    }

    /**
     * 获取电影语言列表
     */
    public List<String> getLanguages() {
        return "prod".equalsIgnoreCase(activeProfile) ? MovieFilterConstants.PROD_LANGUAGES
                : MovieFilterConstants.DEV_LANGUAGES;
    }

    /**
     * 获取电影类型列表
     */
    public List<String> getTypes() {
        return "prod".equalsIgnoreCase(activeProfile) ? MovieFilterConstants.PROD_TYPES
                : MovieFilterConstants.DEV_TYPES;
    }

}
