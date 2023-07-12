package com.czj.service.com;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.czj.pojo.com.NoticeAdm;
import org.springframework.stereotype.Service;

@Service  // 注册一个service
public interface NoticeAdmService extends IService<NoticeAdm> {

    /**
     * 分页查询所有
     * @param currentPage 当前页
     * @param pageSize 页码大小
     * @return 数据集
     */
    IPage<NoticeAdm> getPage(int currentPage, int pageSize);

    /**
     * 分页条件查询
     * @param title  查找标题
     * @param currentPage 当前页
     * @param pageSize 页码大小
     * @return 数据集
     */
    IPage<NoticeAdm> getPageByCondition(String title, int currentPage, int pageSize);
}
