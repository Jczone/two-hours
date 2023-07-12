package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.Reply;
import com.czj.pojo.view.ReplyView;
import com.czj.service.com.ReplyService;
import com.czj.service.view.ReplyViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/Reply")
public class ReplyCon {
    @Autowired
    private ReplyViewService replyViewService;
    @Autowired
    private ReplyService replyService;

    /**
     * 获取讨论或章节对应的全部回复
     * @param reply ID
     * @return 回复List
     */
    @PostMapping("/getReplies")
    public DEA getReplies(@RequestBody Reply reply){
        // 封装查询类
        QueryWrapper<ReplyView> queryWrapper = new QueryWrapper<>();
        if(reply.getDiscussionId() != null){
            queryWrapper.eq("discussion_id", reply.getDiscussionId());
        }else if(reply.getChapterId() != null){
            queryWrapper.eq("chapter_id", reply.getChapterId());
        }
        queryWrapper.orderByDesc("create_time");
        return new DEA(replyViewService.list(queryWrapper));
    }

    /**
     * 创建一条回复
     * @param reply 回复信息
     * @return 成功标记
     */
    @PostMapping("/createReplies")
    public DEA createReplies(@RequestBody Reply reply){
        // 获取当前时间
        Date currentTime = new Date();
        reply.setCreateTime(currentTime);
        return new DEA(replyService.save(reply));
    }

    /**
     * 编辑一条回复
     * @param reply 回复信息
     * @return 成功标记
     */
    @PostMapping("/editReplies")
    public DEA editReplies(@RequestBody Reply reply){
        // 获取当前时间
        Date currentTime = new Date();
        reply.setCreateTime(currentTime);
        QueryWrapper<Reply> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("reply_id", reply.getReplyId());
        return new DEA(replyService.update(reply,queryWrapper));
    }

    /**
     * 根据id删除回复
     * @param reply 包含id
     * @return 成功标记
     */
    @PostMapping("/deleteReplyById")
    public DEA deleteReplyById(@RequestBody Reply reply){
        return new DEA(replyService.removeById(reply.getReplyId()));
    }
}
