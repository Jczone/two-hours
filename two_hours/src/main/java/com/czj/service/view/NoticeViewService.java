package com.czj.service.view;

import com.baomidou.mybatisplus.extension.service.IService;
import com.czj.pojo.view.NoticeView;
import org.springframework.stereotype.Service;

import java.util.List;

@Service  // 注册一个service
public interface NoticeViewService extends IService<NoticeView> {

    List<NoticeView> getLatestEightNotice(String userId, int size);
}
