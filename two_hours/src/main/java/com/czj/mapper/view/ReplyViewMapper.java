package com.czj.mapper.view;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.czj.pojo.view.ReplyView;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper // 定义Bean
@Repository
public interface ReplyViewMapper extends BaseMapper<ReplyView> {

}
