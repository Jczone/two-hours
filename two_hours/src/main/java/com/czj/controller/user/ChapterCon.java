package com.czj.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.czj.controller.util.DEA;
import com.czj.pojo.com.Chapter;
import com.czj.pojo.com.ChapterLikeRecords;
import com.czj.service.com.ChapterLikeRecordsService;
import com.czj.service.com.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;

/**
 * 该服务负责提供对章节视频的管理
 * 1、上传视频后组织相关数据到数据库
 * 2、可以查寻所有视频
 * 3、可以修改视频相关数据
 */
@RestController
@RequestMapping("/Chapter")
public class ChapterCon {
    @Autowired
    private ChapterService chapterService;
    @Autowired
    private ChapterLikeRecordsService chapterLikeRecordsService;

    /**
     * 创建chapter
     * @param chapter 包含title和url
     * @return 成功标记
     */
    @PostMapping("/createChapter")
    public DEA createChapter(@RequestBody Chapter chapter, HttpServletRequest request){
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        Date date = new Date();
        chapter.setCourseId(courseId);
        chapter.setLikes(0);
        chapter.setViews(0);
        chapter.setCreateTime(date);
        return new DEA(chapterService.save(chapter));
    }

    /**
     * 查找chapter
     * @param chapter 包含title
     * @return 成功标记
     */
    @PostMapping("/selectChapterByTitle")
    public DEA selectChapterByTitle(@RequestBody Chapter chapter, HttpServletRequest request){
        HttpSession session = request.getSession();
        int courseId = (int) session.getAttribute("courseId");
        QueryWrapper<Chapter> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("course_id", courseId);
        queryWrapper.like("title",chapter.getTitle());
        return new DEA(chapterService.list(queryWrapper));
    }
    /**
     * 获取一条章节
     * @param chapter 包含id
     * @return 章节信息
     */
    @PostMapping("/getChapterById")
    public DEA getChapterById(@RequestBody Chapter chapter){
        return new DEA(chapterService.getById(chapter.getChapterId()));
    }

    /**
     * 编辑chapter
     * @param chapter 包含chapterId、title和url
     * @return 成功标记
     */
    @PostMapping("/updateChapter")
    public DEA updateChapter(@RequestBody Chapter chapter){
        int chapterId = chapter.getChapterId();
        UpdateWrapper<Chapter> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("chapter_id", chapterId);
        return new DEA(chapterService.update(chapter,updateWrapper));
    }

    /**
     * 章节播放量增加
     * @param chapter 章节id
     */
    @PostMapping("/addViews")
    public DEA addViews(@RequestBody Chapter chapter){
        Chapter chapterCurrent = chapterService.getById(chapter.getChapterId());
        // 封装更新对象
        Chapter chapterUpdate = new Chapter();
        chapterUpdate.setViews(chapterCurrent.getViews()+1);
        // 封装查询类
        QueryWrapper<Chapter> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("chapter_id", chapterCurrent.getChapterId());
        // 调用接口
        return new DEA(chapterService.update(chapterUpdate,queryWrapper));
    }

    /**
     * 删除chapter
     * @param chapter 包含chapterId
     * @return 成功标记
     */
    @PostMapping("/deleteChapter")
    public DEA deleteChapter(@RequestBody Chapter chapter){
        int chapterId = chapter.getChapterId();
        return new DEA(chapterService.removeById(chapterId));
    }

    /**
     * 是否赞过该章节
     * @param chapter 包含id
     * @return 讨论信息
     */
    @PostMapping("/isLiked")
    public DEA isLiked(@RequestBody Chapter chapter, HttpServletRequest request){
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装查询类
        QueryWrapper<ChapterLikeRecords> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("chapter_id", chapter.getChapterId());
        queryWrapper.eq("user_id",userId);
        // 查询点赞记录
        return new DEA(chapterLikeRecordsService.count(queryWrapper));
    }

    /**
     * 点赞该章节
     * @param chapter 包含id
     * @return 讨论信息
     */
    @PostMapping("/likeThis")
    public DEA likeThis(@RequestBody  Chapter chapter, HttpServletRequest request){
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装实体类
        ChapterLikeRecords chapterLikeRecords = new ChapterLikeRecords();
        chapterLikeRecords.setChapterId(chapter.getChapterId());
        chapterLikeRecords.setUserId(userId);
        // 添加点赞记录
        boolean likeSuccess = chapterLikeRecordsService.save(chapterLikeRecords);
        // 增加讨论点赞数
        // 获取当前数据库中的值
        Chapter chapterCurrent = chapterService.getById(chapter.getChapterId());
        // 封装更新对象
        Chapter chapterUpdate = new Chapter();
        chapterUpdate.setLikes(chapterCurrent.getLikes()+1);
        // 封装查询类
        QueryWrapper<Chapter> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("chapter_id", chapterCurrent.getChapterId());
        // 调用接口
        return new DEA(chapterService.update(chapterUpdate,queryWrapper) && likeSuccess);
    }

    /**
     * 取消点赞该章节
     * @param chapter 包含id
     * @return 讨论信息
     */
    @PostMapping("/cancelLike")
    public DEA cancelLike(@RequestBody  Chapter chapter, HttpServletRequest request){
        // 减去讨论点赞数
        // 获取当前数据库中的值
        Chapter chapterCurrent = chapterService.getById(chapter.getChapterId());
        // 封装更新对象
        Chapter chapterUpdate = new Chapter();
        chapterUpdate.setLikes(chapterCurrent.getLikes()-1);
        // 封装查询类
        QueryWrapper<Chapter> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("chapter_id", chapterCurrent.getChapterId());
        boolean update = chapterService.update(chapterUpdate, queryWrapper);
        // 获取用户id
        String userId = (String) request.getSession().getAttribute("userId");
        // 封装查询类
        QueryWrapper<ChapterLikeRecords> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("chapter_id", chapter.getChapterId());
        queryWrapper1.eq("user_id",userId);
        // 调用接口
        return new DEA( chapterLikeRecordsService.remove(queryWrapper1) && update);
    }

}
