package com.example.movie.service;

import com.example.movie.common.ResultCode;
import com.example.movie.common.exception.BusinessException;
import com.example.movie.dao.MovieWorkerDao;
import com.example.movie.dto.response.MovieWorkerResponse;
import com.example.movie.entity.MovieWorker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
 * 电影工作者业务逻辑层
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MovieWorkerService {

    private final MovieWorkerDao movieWorkerDao;

    /**
     * 根据ID查询工作者详情
     */
    public MovieWorkerResponse getWorkerDetail(Integer workerId) {
        MovieWorker worker = movieWorkerDao.selectById(workerId);
        if (worker == null) {
            throw new BusinessException(ResultCode.NOT_FOUND, "工作者不存在");
        }
        MovieWorkerResponse response = new MovieWorkerResponse();
        BeanUtils.copyProperties(worker, response);
        return response;
    }
}
