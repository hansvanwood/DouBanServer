package com.example.movie.dao;

import com.example.movie.entity.MovieWorker;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 电影工作者数据访问层
 */
@Mapper
public interface MovieWorkerDao {

    /**
     * 根据工作者ID查询单个工作者
     */
    MovieWorker selectById(@Param("workerId") Integer workerId);

    /**
     * 根据ID列表批量查询工作者
     */
    List<MovieWorker> selectByIds(@Param("ids") List<Integer> ids);
}
