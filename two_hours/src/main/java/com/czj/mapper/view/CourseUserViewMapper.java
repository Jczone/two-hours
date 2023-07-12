package com.czj.mapper.view;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.czj.pojo.view.CourseUserView;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper // 定义Bean
@Repository
public interface CourseUserViewMapper extends BaseMapper<CourseUserView> {
}
