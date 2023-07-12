package com.czj.mapper.exam;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.czj.pojo.exam.QuestionAnswer;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper // 定义Bean
@Repository
public interface QuestionAnswerMapper extends BaseMapper<QuestionAnswer> {

}
