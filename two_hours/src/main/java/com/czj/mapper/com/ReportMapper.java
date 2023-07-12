package com.czj.mapper.com;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.czj.pojo.com.Report;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper // 定义Bean
@Repository
public interface ReportMapper extends BaseMapper<Report> {

}
