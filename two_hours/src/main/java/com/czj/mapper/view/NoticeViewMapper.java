package com.czj.mapper.view;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.czj.pojo.view.NoticeView;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper // 定义Bean
@Repository
public interface NoticeViewMapper extends BaseMapper<NoticeView> {

    List<NoticeView> getLatestEightNotice(@Param("userId") String userId,@Param("size") int size);
}
