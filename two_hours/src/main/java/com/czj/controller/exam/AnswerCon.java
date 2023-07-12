package com.czj.controller.exam;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.czj.controller.util.DEA;
import com.czj.pojo.exam.*;
import com.czj.pojo.util.Solution;
import com.czj.pojo.util.StudentExam;
import com.czj.pojo.util.Subject;
import com.czj.pojo.view.CourseUserView;
import com.czj.service.exam.*;
import com.czj.service.exam.impl.ScoreServiceImpl;
import com.czj.service.view.CourseUserViewService;
import org.apache.logging.log4j.message.ReusableMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.SortedSet;

@RestController
@RequestMapping("/Answer")
public class AnswerCon {

    // 用户提交试卷后，会有一条提交记录存入score表中，用于记录用户分数
    @Autowired
    private ScoreService scoreService;
    @Autowired
    private AnswerService answerService;
    @Autowired
    private AnswerOptionService answerOptionService;
    @Autowired
    private CourseUserViewService courseUserViewService;
    @Autowired
    private PaperCon paperCon;

    /**
     * 提交试卷
     * 用户答案持久化-学生端功能
     * @param solutions 答案列表
     * @return 成功标记
     */
    @PostMapping("/submitAnswer")
    public DEA submitAnswer(@RequestBody  List<Solution> solutions){

        // 检查是否已提交
        QueryWrapper<Score> wrapper = new QueryWrapper<>();
        wrapper.eq("exam_id", solutions.get(0).getExamId());
        wrapper.eq("user_id", solutions.get(0).getUserId());
        List<Score> list = scoreService.list(wrapper);
        if(list.size()>0){
            return new DEA(false,"您已参加过本次考试！");
        }
        // 持久化
        for(Solution solution : solutions){
            // 对每个solution预装配为对应的answer对象
            Answer answer = new Answer(null,
                    solution.getExamId(),
                    solution.getSubjectType(),
                    solution.getSubjectId(),
                    solution.getSubjectNum(),
                    solution.getUserId(),
                    solution.getAnswerNum(),
                    solution.getAnswer(),
                    null);
            // answer对象的独有数据装配和持久化
            switch (solution.getSubjectType()){
                case Paper.TChoice:
                    if(solution.getAnswerNum() > 1){// 多选题
                        // 先持久化answer并拿到id
                        answerService.save(answer);
                        QueryWrapper<Answer> queryWrapper = new QueryWrapper<>();
                        queryWrapper.eq("subject_type",answer.getSubjectType());
                        queryWrapper.eq("user_id", answer.getUserId());
                        queryWrapper.eq("subject_id", answer.getSubjectId());
                        Answer one = answerService.getOne(queryWrapper);
                        // 多选题给每个选项单独存储
                        for(AnswerOption answerOption : solution.getAnswerOptions()){
                            answerOption.setAnswerId(one.getAnswerId());
                            answerOptionService.save(answerOption);
                        }
                        break;
                    }                       // 单选题
                case Paper.TTrueFalse:      // 判断题
                case Paper.TQuestionAnswer: // 简答题
                    answerService.save(answer);
                    break;
                case Paper.TFilling:        // 填空题
                    // 先持久化answer并拿到id
                    answerService.save(answer);
                    QueryWrapper<Answer> queryWrapper = new QueryWrapper<>();
                    queryWrapper.eq("subject_type",answer.getSubjectType());
                    queryWrapper.eq("user_id", answer.getUserId());
                    queryWrapper.eq("subject_id", answer.getSubjectId());
                    Answer one = answerService.getOne(queryWrapper);
                    // 填空题需要给每个空进行单独存储
                    for(AnswerOption answerOption : solution.getAnswerOptions()){
                        answerOption.setAnswerId(one.getAnswerId());
                        answerOptionService.save(answerOption);
                    }
                    break;
                default:
                    return new DEA(false,"题目类型错误！请稍后重试！");
            }
        }

        Score score = new Score(null, solutions.get(0).getExamId(), solutions.get(0).getUserId(),0,0,0,0);
        score.setObjectiveScore(this.judgeUserAnswers(score));   // 机器判卷并拿到客观题分数
        score.setSystemChecked(1);
        // 系统判卷
        return new DEA(scoreService.save(score));
    }

    /**
     * 获取用户自己的答题数据-学生端功能
     * @param exam 考试id
     * @param request 获取用户id
     * @return 答题数据
     */
    @PostMapping("/getAnswer")
    public DEA getAnswer(@RequestBody Exam exam, HttpServletRequest request){
        // 获取答案列表
        String userId = (String) request.getSession().getAttribute("userId");
        QueryWrapper<Answer> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("exam_id",exam.getExamId());
        queryWrapper.eq("user_id",userId);
        queryWrapper.orderByAsc("subject_num");
        List<Answer> answers = answerService.list(queryWrapper);
        // 封装为solutions
        List<Solution> solutions = new ArrayList<>();
        if(answers.size() > 0){
            for(Answer answer:answers){
                Solution solution = new Solution(
                    answer.getAnswerId(),
                    answer.getExamId(),
                    answer.getSubjectType(),
                    answer.getSubjectId(),
                    answer.getSubjectNum(),
                    answer.getUserId(),
                    answer.getAnswerNum(),
                    null,
                    answer.getAnswer(),
                    answer.getScore()
                );
                // 项数据组织
                switch (solution.getSubjectType()){
                    case Paper.TChoice:
                        if(solution.getAnswerNum() == 1) break;
                    case Paper.TFilling:    // 多选题和填空题
                        for(int i = 0; i < solution.getAnswerNum(); i++){
                            QueryWrapper<AnswerOption> wrapper = new QueryWrapper<>();
                            wrapper.eq("answer_id",solution.getAnswerId());
                            wrapper.orderByAsc("num");
                            List<AnswerOption> options = answerOptionService.list(wrapper);
                            solution.setAnswerOptions(options);
                        }
                        break;
                }
                solutions.add(solution);
            }
        }
        return new DEA(solutions);
    }

    /**
     * 获取所有用户的答题数据-教师端功能
     * @param exam 考试id
     * @return List<StudentExam>
     */
    @PostMapping("/getAllUserAnswer")
    public DEA getAllUserAnswer(@RequestBody Exam exam, HttpServletRequest request){
        // 筛选出所有用户数据
        QueryWrapper<CourseUserView> courseUserQueryWrapper = new QueryWrapper<>();
        courseUserQueryWrapper.eq("course_id", request.getSession().getAttribute("courseId"));
        List<CourseUserView> courseUsers = courseUserViewService.list(courseUserQueryWrapper);
        // 根据用户id筛选出对应提交数据
        List<StudentExam> studentExams = new ArrayList<>();
        for(CourseUserView i : courseUsers){
            // 匹配组织数据
            StudentExam studentExam = new StudentExam();
            studentExam.setExamId(exam.getExamId());
            studentExam.setUserId(i.getUserId());
            studentExam.setUsername(i.getUsername());
            studentExam.setUserAvatar(i.getUserAvatar());
            // 考试数据获取
            QueryWrapper<Score> scoreQueryWrapper = new QueryWrapper<>();
            scoreQueryWrapper.eq("exam_id",exam.getExamId());
            scoreQueryWrapper.eq("user_id",i.getUserId());
            Score userScore = scoreService.getOne(scoreQueryWrapper);
            if(userScore != null){              // 用户已参与该考试
                studentExam.setSubmit(true);    // 提交试卷状态
                studentExam.setScore(userScore.getScore());
                studentExam.setObjectiveScore(userScore.getObjectiveScore());
                studentExam.setIsChecked(userScore.getIsChecked());
                studentExam.setSystemChecked(userScore.getSystemChecked());
            }else{                              // 未找到考试数据
                studentExam.setSubmit(false);   // 未提交试卷
                studentExam.setScore(0);
                studentExam.setObjectiveScore(0);
                studentExam.setIsChecked(0);
                studentExam.setSystemChecked(0);
            }
            // 初始化solutions列表
            List<Solution> solutions = new ArrayList<>();
            QueryWrapper<Answer> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("exam_id",exam.getExamId());
            queryWrapper.eq("user_id",i.getUserId());
            // 获取到全部answer数据
            List<Answer> answers = answerService.list(queryWrapper);
            // 封装到solutions中
            for(Answer j:answers){
                Solution solution = new Solution(
                        j.getAnswerId(),
                        j.getExamId(),
                        j.getSubjectType(),
                        j.getSubjectId(),
                        j.getSubjectNum(),
                        j.getUserId(),
                        j.getAnswerNum(),
                        null,
                        j.getAnswer(),
                        j.getScore()
                );
                // solution中数据项的封装
                switch (j.getSubjectType()){
                    case Paper.TChoice:
                        if(j.getAnswerNum() == 1) break;
                    case Paper.TFilling:    // 多选题和填空题
                        for(int k = 0; k < j.getAnswerNum(); k++){
                            QueryWrapper<AnswerOption> wrapper = new QueryWrapper<>();
                            wrapper.eq("answer_id",j.getAnswerId());
                            wrapper.orderByAsc("num");
                            List<AnswerOption> options = answerOptionService.list(wrapper);
                            solution.setAnswerOptions(options);
                        }
                        break;
                }
                solutions.add(solution);
            }
            // 添加所有答案
            studentExam.setSolutions(solutions);
            if(studentExam.getSystemCheckedBool()){ // 已提交-前插
                studentExams.add(0,studentExam);
            }else{  // 未提交-后插 - 加入所有用户的考试数据
                studentExams.add(studentExam);
            }
        }
        // 返回装配后的数据列表
        return new DEA(studentExams);
    }

    // Fixme 以上两个方法及本方法中有大量重复代码片段，时间关系来不及重新组合，之后可以修复，提高程序可读性和代码利用率
    /**
     * 获取用户的考试数据
     * @param exam  考试id
     * @param request 用户id
     * @return StudentExam
     */
    @PostMapping("/getOneUserAnswer")
    public DEA getOneUserAnswer(@RequestBody Exam exam, HttpServletRequest request){

        String userId = (String) request.getSession().getAttribute("userId");
        Integer courseId = (Integer) request.getSession().getAttribute("courseId");
        // 获取用户数据
        QueryWrapper<CourseUserView> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",userId);
        queryWrapper.eq("course_id",courseId);
        CourseUserView userInfo = courseUserViewService.getOne(queryWrapper);
        // 匹配组织数据
        StudentExam studentExam = new StudentExam();
        studentExam.setExamId(exam.getExamId());
        studentExam.setUserId(userId);
        studentExam.setUsername(userInfo.getUsername());
        studentExam.setUserAvatar(userInfo.getUserAvatar());
        // 考试数据获取
        QueryWrapper<Score> scoreQueryWrapper = new QueryWrapper<>();
        scoreQueryWrapper.eq("exam_id",exam.getExamId());
        scoreQueryWrapper.eq("user_id",userId);
        Score userScore = scoreService.getOne(scoreQueryWrapper);
        if(userScore != null){              // 用户已参与该考试
            studentExam.setSubmit(true);    // 提交试卷状态
            studentExam.setScore(userScore.getScore());
            studentExam.setObjectiveScore(userScore.getObjectiveScore());
            studentExam.setIsChecked(userScore.getIsChecked());
            studentExam.setSystemChecked(userScore.getSystemChecked());
        }else{                              // 未找到考试数据
            studentExam.setSubmit(false);   // 未提交试卷
            studentExam.setScore(0);
            studentExam.setObjectiveScore(0);
            studentExam.setIsChecked(0);
            studentExam.setSystemChecked(0);
        }
        // 初始化solutions列表
        List<Solution> solutions = new ArrayList<>();
        QueryWrapper<Answer> queryWrapper1 = new QueryWrapper<>();
        queryWrapper1.eq("exam_id",exam.getExamId());
        queryWrapper1.eq("user_id",userId);
        // 获取到全部answer数据
        List<Answer> answers = answerService.list(queryWrapper1);
        // 封装到solutions中
        for(Answer j:answers){
            Solution solution = new Solution(
                    j.getAnswerId(),
                    j.getExamId(),
                    j.getSubjectType(),
                    j.getSubjectId(),
                    j.getSubjectNum(),
                    j.getUserId(),
                    j.getAnswerNum(),
                    null,
                    j.getAnswer(),
                    j.getScore()
            );
            // solution中数据项的封装
            switch (j.getSubjectType()){
                case Paper.TChoice:
                    if(j.getAnswerNum() == 1) break;
                case Paper.TFilling:    // 多选题和填空题
                    for(int k = 0; k < j.getAnswerNum(); k++){
                        QueryWrapper<AnswerOption> wrapper = new QueryWrapper<>();
                        wrapper.eq("answer_id",j.getAnswerId());
                        wrapper.orderByAsc("num");
                        List<AnswerOption> options = answerOptionService.list(wrapper);
                        solution.setAnswerOptions(options);
                    }
                    break;
            }
            solutions.add(solution);
        }
        // 添加所有答案
        studentExam.setSolutions(solutions);
        return new DEA(studentExam);
    }


    /**
     * 教师判题后的提交，将判题结果持久化
     * @param studentExam 学生的考试数据和判题数据
     * @return 成功标记
     */
    @PostMapping("/judgeOnesPaper")
    public DEA judgeOnesPaper(@RequestBody StudentExam studentExam){
        // 更新主观题得分
        for(Solution solution:studentExam.getSolutions()){
            if(solution.getSubjectType() == Paper.TQuestionAnswer){
                // 主观题
                UpdateWrapper<Answer> answerUpdate = new UpdateWrapper<>();
                answerUpdate.eq("answer_id",solution.getAnswerId());
                answerUpdate.set("score",solution.getScore());
                answerService.update(answerUpdate);
            }
        }
        // 更新总分和分数记录
        UpdateWrapper<Score> scoreUpdate = new UpdateWrapper<>();
        scoreUpdate.eq("exam_id",studentExam.getExamId());
        scoreUpdate.eq("user_id",studentExam.getUserId());
        scoreUpdate.set("score",studentExam.getScore());    // 更新总分
        scoreUpdate.set("is_checked",1);    // 设置已判题标记
        return new DEA(scoreService.update(scoreUpdate));
    }

    /**
     * 重新判卷-设置判卷标志为0
     * @param studentExam score数据
     * @return 成功标记
     */
    @PostMapping("/reJudge")
    public DEA reJudge(@RequestBody StudentExam studentExam){
        // 更新总分和分数记录
        UpdateWrapper<Score> scoreUpdate = new UpdateWrapper<>();
        scoreUpdate.eq("exam_id",studentExam.getExamId());
        scoreUpdate.eq("user_id",studentExam.getUserId());
        scoreUpdate.set("is_checked",0);    // 设置已判题标记
        return new DEA(scoreService.update(scoreUpdate));
    }

    /**
     * 自动判题模块-对用户提交的答案进行评判
     * 评判范围：选择/填空/判断题
     * 评判完成后其结果持久化，并返回成功标记
     * @param score 包含用户的答题信息
     * @return 客观题总分
     */
    public Integer judgeUserAnswers(Score score){
        // 获取用户的回答数据-按题号排序
        QueryWrapper<Answer> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("exam_id",score.getExamId());
        queryWrapper.eq("user_id",score.getUserId());
        queryWrapper.orderByAsc("subject_num");
        List<Answer> answers = answerService.list(queryWrapper);
        int totalScore = 0;     // 当前总分
        // 对选择/填空/判断题进行判分
        for(Answer answer:answers){
            // 获取当前所判题的标准答案
            Subject subject = paperCon.getOneSubject(answer.getSubjectType(),answer.getSubjectId());
            // 判题
            switch (answer.getSubjectType()){
                case Paper.TChoice:  // 选择
                    if(answer.getAnswerNum() > 1){  // 多选题
                        QueryWrapper<AnswerOption> optionQueryWrapper = new QueryWrapper<>();
                        optionQueryWrapper.eq("answer_id",answer.getAnswerId());
                        optionQueryWrapper.orderByAsc("num");   // 选项获取时均要按num升序，确保答案和标准答案一一对应
                        // 用户所有选项的答案
                        List<AnswerOption> options = answerOptionService.list(optionQueryWrapper);
                        // 对比选项
                        boolean flag = true;  // 正确标记
                        // 标准答案
                        List<ChoiceOption> stdChoiceOption = subject.getChoiceOptions();
                        for(int i = 0; i < options.size(); i++){
                            if(options.get(i).getAnswerBool() != stdChoiceOption.get(i).getIsAnswerBool()){
                                flag = false;
                                break;
                            }
                        }
                        if(flag){   // 选项答案一致
                            answer.setScore(subject.getChoice().getScore());
                        }else{
                            answer.setScore(0);
                        }
                    }else{  // 单选题
                        List<ChoiceOption> options =  subject.getChoiceOptions();
                        for(ChoiceOption option:options){
                            if(option.getNum() == Integer.parseInt(answer.getAnswer())){
                                if(option.getIsAnswerBool()){   // 所选项为正确答案
                                    answer.setScore(subject.getChoice().getScore());
                                }else{
                                    answer.setScore(0);
                                }
                                break;
                            }
                        }
                    }
                    break;
                case Paper.TFilling: // 填空
                    answer.setScore(0); // 初始化分数
                    QueryWrapper<AnswerOption> optionQueryWrapper = new QueryWrapper<>();
                    optionQueryWrapper.eq("answer_id",answer.getAnswerId());
                    optionQueryWrapper.orderByAsc("num");   // 选项获取时均要按num升序，确保答案和标准答案一一对应
                    List<AnswerOption> options = answerOptionService.list(optionQueryWrapper);  // 所有答案填空
                    List<FillingBlank> blanks = subject.getFillingBlanks(); // 所有标准填空
                    if(subject.getFilling().getIsOrderBool()){      // 答案有序-需按顺序对比
                        for(int i = 0; i < options.size(); i++){
                            if(subject.getFilling().getIsCapitalBool()){
                                // 区分大小写
                                if(options.get(i).getAnswer().trim().equals(blanks.get(i).getContent().trim())){
                                    options.get(i).setScore(subject.getFilling().getScore()/subject.getFilling().getAnswerNum());
                                    answer.setScore(answer.getScore() + options.get(i).getScore()); // 分数累加
                                }
                            }else{
                                // 不区分大小写
                                if(options.get(i).getAnswer().trim().equalsIgnoreCase(blanks.get(i).getContent().trim())){
                                    options.get(i).setScore(subject.getFilling().getScore()/subject.getFilling().getAnswerNum());
                                    answer.setScore(answer.getScore() + options.get(i).getScore()); // 分数累加
                                }
                            }
                        }
                    }else{  // 答案无序-存在一致即可-需要对答案进行遍历查找
                        for (AnswerOption option : options) {
                            if (subject.getFilling().getIsCapitalBool()) {
                                // 区分大小写
                                for (FillingBlank blank : blanks) {
                                    if (option.getAnswer().trim().equals(blank.getContent().trim())) {
                                        // 标准答案只能被匹配一次
                                        blank.setContent("");   // 清空已被匹配的值，避免重复匹配
                                        option.setScore(subject.getFilling().getScore() / subject.getFilling().getAnswerNum());
                                        answer.setScore(answer.getScore() + option.getScore()); // 分数累加
                                        break;
                                    }
                                }
                            } else {
                                // 不区分大小写-添加trim方法去除前后空格
                                for (FillingBlank blank : blanks) {
                                    if (option.getAnswer().trim().equalsIgnoreCase(blank.getContent().trim())) {
                                        blank.setContent("");   // 清空已被匹配的值，避免重复匹配
                                        option.setScore(subject.getFilling().getScore() / subject.getFilling().getAnswerNum());
                                        answer.setScore(answer.getScore() + option.getScore()); // 分数累加
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case Paper.TTrueFalse:  // 判断
                    if(subject.getTrueFalse().getAnswerBool() == answer.getAnswerBool()){
                        answer.setScore(subject.getTrueFalse().getScore());
                    }else{
                        answer.setScore(0);
                    }
                    break;
                case Paper.TQuestionAnswer: // 预设为0-需要老师评判
                    answer.setScore(0);
            }
            // 持久化
            UpdateWrapper<Answer> updateWrapper = new UpdateWrapper<>();
            updateWrapper.eq("answer_id",answer.getAnswerId());
            updateWrapper.set("score", answer.getScore());
            // 更新分数列
            answerService.update(updateWrapper);
            totalScore += answer.getScore();
        }
        return totalScore;
    }

}
