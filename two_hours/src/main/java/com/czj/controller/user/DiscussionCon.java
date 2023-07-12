package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.Discussion;
import com.czj.pojo.com.DiscussionLikeRecords;
import com.czj.pojo.util.SearchForm;
import com.czj.pojo.view.DiscussionView;
import com.czj.service.com.DiscussionLikeRecordsService;
import com.czj.service.com.DiscussionService;
import com.czj.service.view.DiscussionViewService;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

@RestController
@RequestMapping("/Discussion")
public class DiscussionCon {
    @Autowired
    private DiscussionService discussionService;
    @Autowired
    private DiscussionViewService discussionViewService;
    @Autowired
    private DiscussionLikeRecordsService discussionLikeRecordsService;

    /**
     * 分页条件查询讨论
     * @return 数据集
     */
    @PostMapping("/getDiscussionByTitle")
    public DEA getDiscussionByTitle(@RequestBody SearchForm searchForm, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        String title = searchForm.title;
        // 封装查询类
        QueryWrapper<DiscussionView> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("title", title);
        queryWrapper.eq("course_id", courseId);
        queryWrapper.orderByDesc("create_time");
        // 查询页面总数
        int count = discussionViewService.count(queryWrapper);
        int currentPage = searchForm.currentPage;
        int pageSize = searchForm.pageSize;
        // 超界检测-默认归零
        if(count < (currentPage - 1) * pageSize){
            currentPage = 1;
        }
        // 封装分页信息
        IPage<DiscussionView> page = new Page<>(currentPage,pageSize);
        return  new DEA(discussionViewService.page(page,queryWrapper));
    }

    /**
     * 添加一条讨论到数据库
     * @param discussion 包含标题和内容
     * @return 成功标记
     */
    @PostMapping("/createDiscussion")
    public DEA createDiscussion(@RequestBody Discussion discussion, HttpServletRequest request){
        // 获取课程id
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        String userId = (String) session.getAttribute("userId");
        // 获取当前时间
        Date currentTime = new Date();
        discussion.setUserId(userId);
        discussion.setCreateTime(currentTime);
        discussion.setCourseId(courseId);
        discussion.setHits(0);
        discussion.setLikes(0);
        return  new DEA(discussionService.save(discussion));
    }

    /**
     * 更新讨论
     * @param discussion 包含标题、内容和讨论d
     * @return 成功标记
     */
    @PostMapping("/updateDiscussion")
    public DEA updateDiscussion(@RequestBody Discussion discussion){
        int discussionId = discussion.getDiscussionId();
        QueryWrapper<Discussion> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("discussion_id",discussionId);
        return  new DEA(discussionService.update(discussion,queryWrapper));
    }

    /**
     * 删除一条讨论
     * @param discussion 包含id
     */
    @PostMapping("/deleteDiscussionById")
    public DEA deleteDiscussionById(@RequestBody Discussion discussion){
        return new DEA(discussionService.removeById(discussion.getDiscussionId()));
    }

    /**
     * 删除通知
     * @param id ID
     */
    @GetMapping("/deleteById/{id}")
    public DEA deleteById(@PathVariable("id") int id){
        return new DEA(discussionService.removeById(id));
    }

    /**
     * 获取一条讨论
     * @param discussion 包含id
     * @return 讨论信息
     */
    @PostMapping("/getDiscussionById")
    public DEA getDiscussionById(@RequestBody DiscussionView discussion){
        return new DEA(discussionViewService.getById(discussion.getDiscussionId()));
    }

    /**
     * 讨论点击量增加
     * @param discussion 讨论数据
     */
    @PostMapping("/addHits")
    public DEA addHits(@RequestBody Discussion discussion){
        // 获取当前数据库中的值
        Discussion discussionCurrent = discussionService.getById(discussion.getDiscussionId());
        // 封装更新对象
        Discussion discussionUpdate = new Discussion();
        discussionUpdate.setHits(discussionCurrent.getHits()+1);
        // 封装查询类
        QueryWrapper<Discussion> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("discussion_id", discussionCurrent.getDiscussionId());
        // 调用接口
        return new DEA(discussionService.update(discussionUpdate,queryWrapper));
    }

    /**
     * 是否赞过该讨论
     * @param discussion 包含id
     * @return 讨论信息
     */
    @PostMapping("/isLiked")
    public DEA isLiked(@RequestBody Discussion discussion, HttpServletRequest request){
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装查询类
        QueryWrapper<DiscussionLikeRecords> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("discussion_id", discussion.getDiscussionId());
        queryWrapper.eq("user_id",userId);
        // 查询点赞记录
        return new DEA(discussionLikeRecordsService.count(queryWrapper));
    }

    /**
     * 点赞该讨论
     * @param discussion 包含id
     * @return 讨论信息
     */
    @PostMapping("/likeThis")
    public DEA likeThis(@RequestBody Discussion discussion, HttpServletRequest request){
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装实体类
        DiscussionLikeRecords discussionLikeRecords = new DiscussionLikeRecords();
        discussionLikeRecords.setDiscussionId(discussion.getDiscussionId());
        discussionLikeRecords.setUserId(userId);
        // 添加点赞记录
        boolean likeSuccess = discussionLikeRecordsService.save(discussionLikeRecords);
        // 增加讨论点赞数
        // 获取当前数据库中的值
        Discussion discussionCurrent = discussionService.getById(discussion.getDiscussionId());
        // 封装更新对象
        Discussion discussionUpdate = new Discussion();
        discussionUpdate.setLikes(discussionCurrent.getLikes()+1);
        // 封装查询类
        QueryWrapper<Discussion> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("discussion_id", discussionCurrent.getDiscussionId());
        // 调用接口
        return new DEA(discussionService.update(discussionUpdate,queryWrapper) && likeSuccess);
    }

    /**
     * 取消点赞该讨论
     * @param discussion 包含id
     * @return 讨论信息
     */
    @PostMapping("/cancelLike")
    public DEA cancelLike(@RequestBody Discussion discussion, HttpServletRequest request){
        // 减去讨论点赞数
        // 获取当前数据库中的值
        Discussion discussionCurrent = discussionService.getById(discussion.getDiscussionId());
        // 封装更新对象
        Discussion discussionUpdate = new Discussion();
        discussionUpdate.setLikes(discussionCurrent.getLikes()-1);
        // 封装查询类
        QueryWrapper<Discussion> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("discussion_id", discussionCurrent.getDiscussionId());
        boolean update = discussionService.update(discussionUpdate, queryWrapper);
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装查询类
        QueryWrapper<DiscussionLikeRecords> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("discussion_id", discussion.getDiscussionId());
        queryWrapper1.eq("user_id",userId);
        // 调用接口
        return new DEA( discussionLikeRecordsService.remove(queryWrapper1) && update);
    }

}
