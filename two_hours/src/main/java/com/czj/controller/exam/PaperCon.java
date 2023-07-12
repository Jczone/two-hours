package com.czj.controller.exam;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.czj.controller.util.DEA;
import com.czj.pojo.exam.*;
import com.czj.pojo.util.Subject;
import com.czj.service.exam.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/Paper")
public class PaperCon {

    @Autowired
    private PaperService paperService;
    @Autowired
    private ChoiceService choiceService;
    @Autowired
    private ChoiceOptionService choiceOptionService;
    @Autowired
    private FillingService fillingService;
    @Autowired
    private FillingBlankService fillingBlankService;
    @Autowired
    private TrueFalseService trueFalseService;
    @Autowired
    private QuestionAnswerService questionAnswerService;

    static class SubjectInfo{
        public Subject subject;
        public Integer examId;
    }

    /**
     * 查询考试对应的试题集合
     * @param exam 包含ID
     * @return Subject 试题集合
     */
    @PostMapping("/getPaperByExamId")
    public DEA getPaperByExamId(@RequestBody Exam exam){
        QueryWrapper<Paper> paperQueryWrapper = new QueryWrapper<>();
        paperQueryWrapper.eq("exam_id", exam.getExamId());
        // 按题目序号升序排列
        paperQueryWrapper.orderByAsc("subject_num");
        // 初始化试题列表
        List<Paper> paper = paperService.list(paperQueryWrapper);
        // 初始化题目列表
        List<Subject> subjects = new ArrayList<>();
        // 通过试题列表初始化每一条题目
        for(Paper i : paper){
            Subject subject = new Subject();
            subject.setPaperId(i.getPaperId());
            subject.setSubjectId(i.getSubjectId());      // 设置题目id
            subject.setSubjectType(i.getSubjectType());  // 设置类型
            subject.setSubjectNum(i.getSubjectNum());    // 设置题号
            // 检查试题类型并设置题目内容
            switch (i.getSubjectType()){
                case Paper.TChoice:         // 选择题
                    Choice choice = choiceService.getById(i.getSubjectId());
                    subject.setChoice(choice);
                    // 获取选项
                    QueryWrapper<ChoiceOption> cQueryWrapper = new QueryWrapper<>();
                    cQueryWrapper.eq("subject_id", choice.getSubjectId());
                    // 选项排序
                    cQueryWrapper.orderByAsc("num");
                    subject.setChoiceOptions(choiceOptionService.list(cQueryWrapper));
                    break;
                case Paper.TFilling:        // 填空题
                    Filling filling = fillingService.getById(i.getSubjectId());
                    subject.setFilling(filling);
                    // 获取填空
                    QueryWrapper<FillingBlank> fQueryWrapper = new QueryWrapper<>();
                    fQueryWrapper.eq("subject_id", filling.getSubjectId());
                    // 选项排序
                    fQueryWrapper.orderByAsc("num");
                    // 设置填空项
                    subject.setFillingBlanks(fillingBlankService.list(fQueryWrapper));
                    break;
                case Paper.TTrueFalse:      // 判断题
                    TrueFalse truefalse = trueFalseService.getById(i.getSubjectId());
                    subject.setTrueFalse(truefalse);
                    break;
                case Paper.TQuestionAnswer: // 简答题
                    QuestionAnswer questionAnswer = questionAnswerService.getById(i.getSubjectId());
                    subject.setQuestionAnswer(questionAnswer);
                    break;
            }
            // 加入题目序列
            subjects.add(subject);
        }
        // 返回题目序列
        return new DEA(subjects);
    }

    /**
     * 创建题目
     * @param subjectInfo 题目数据
     * @return 成功标记
     */
    @PostMapping("/createPaper")
    public DEA createPaper(@RequestBody SubjectInfo subjectInfo){
        Subject subject = subjectInfo.subject;
        int subjectId;
        // 保存题目数据
        switch (subject.getSubjectType()){
            case Paper.TChoice:
                choiceService.save(subject.getChoice());
                // 获取subjectId
                QueryWrapper<Choice> choiceQueryWrapper = new QueryWrapper<>();
                choiceQueryWrapper.eq("content", subject.getChoice().getContent());
                choiceQueryWrapper.eq("analysis", subject.getChoice().getAnalysis());
                Choice choice = choiceService.getOne(choiceQueryWrapper);
                subjectId = choice.getSubjectId();
                // 存储选项
                List<ChoiceOption> choiceOptions = subject.getChoiceOptions();
                for(ChoiceOption i:choiceOptions){
                    i.setSubjectId(choice.getSubjectId());
                    choiceOptionService.save(i);
                }
                break;
            case Paper.TFilling:
                fillingService.save(subject.getFilling());
                // 获取subjectId
                QueryWrapper<Filling> fillingQueryWrapper = new QueryWrapper<>();
                fillingQueryWrapper.eq("content", subject.getFilling().getContent());
                fillingQueryWrapper.eq("analysis", subject.getFilling().getAnalysis());
                Filling filling = fillingService.getOne(fillingQueryWrapper);
                subjectId = filling.getSubjectId();
                // 存储空项
                List<FillingBlank> fillingBlanks = subject.getFillingBlanks();
                for(FillingBlank i:fillingBlanks){
                    i.setSubjectId(filling.getSubjectId());
                    fillingBlankService.save(i);
                }
                break;
            case Paper.TTrueFalse:
                trueFalseService.save(subject.getTrueFalse());
                // 获取subjectId
                QueryWrapper<TrueFalse> trueFalseQueryWrapper = new QueryWrapper<>();
                trueFalseQueryWrapper.eq("content", subject.getTrueFalse().getContent());
                trueFalseQueryWrapper.eq("analysis", subject.getTrueFalse().getAnalysis());
                TrueFalse trueFalse = trueFalseService.getOne(trueFalseQueryWrapper);
                subjectId = trueFalse.getSubjectId();
                break;
            case Paper.TQuestionAnswer:
                questionAnswerService.save(subject.getQuestionAnswer());
                // 获取subjectId
                QueryWrapper<QuestionAnswer> answerQueryWrapper = new QueryWrapper<>();
                answerQueryWrapper.eq("content", subject.getQuestionAnswer().getContent());
                answerQueryWrapper.eq("analysis", subject.getQuestionAnswer().getAnalysis());
                QuestionAnswer questionAnswer = questionAnswerService.getOne(answerQueryWrapper);
                subjectId = questionAnswer.getSubjectId();
                break;
            default:
                return new DEA("题目类型错误！");
        }
        // 保存paper数据
        Paper paper = new Paper();
        paper.setExamId(subjectInfo.examId);
        paper.setSubjectId(subjectId);
        paper.setSubjectNum(subject.getSubjectNum());
        paper.setSubjectType(subject.getSubjectType());
        return new DEA(paperService.save(paper));
    }

    /**
     * 更新题目
     * @param subjectInfo 题目数据
     * @return 成功标记
     */
    @PostMapping("/updatePaper")
    public DEA updatePaper(@RequestBody SubjectInfo subjectInfo){
        Subject subject = subjectInfo.subject;
        // 保存题目数据
        switch (subject.getSubjectType()){
            case Paper.TChoice:
                // 先删除原选项
                QueryWrapper<ChoiceOption> optionQueryWrapper = new QueryWrapper<>();
                optionQueryWrapper.eq("subject_id", subject.getSubjectId());
                List<ChoiceOption> options = choiceOptionService.list(optionQueryWrapper);
                for(ChoiceOption i:options){
                    choiceOptionService.removeById(i.getOptionId());    // 删除每一条选项
                }
                // 再存入新选项
                for(ChoiceOption i:subject.getChoiceOptions()){
                    // 设置题目id
                    i.setSubjectId(subject.getSubjectId());
                    choiceOptionService.save(i);
                }
                return new DEA(choiceService.updateById(subject.getChoice()));
            case Paper.TFilling:
                // 删除填空项
                QueryWrapper<FillingBlank> fillingBlankQueryWrapper = new QueryWrapper<>();
                fillingBlankQueryWrapper.eq("subject_id", subject.getSubjectId());
                List<FillingBlank> blanks = fillingBlankService.list(fillingBlankQueryWrapper);
                for(FillingBlank i:blanks){
                    fillingBlankService.removeById(i.getBlankId());    // 删除每一条填空项
                }
                // 保存新的填空项
                for(FillingBlank i:subject.getFillingBlanks()){
                    // 设置题目id
                    i.setSubjectId(subject.getSubjectId());
                    fillingBlankService.save(i);
                }
                return new DEA(fillingService.updateById(subject.getFilling()));
            case Paper.TTrueFalse:
                return new DEA(trueFalseService.updateById(subject.getTrueFalse()));
            case Paper.TQuestionAnswer:
                return new DEA(questionAnswerService.updateById(subject.getQuestionAnswer()));
            default:
                return new DEA("题目类型错误！");
        }
    }

    /**
     * 删除题目及对应数据 todo 对应答案也应被删除，使用paperId作为外键来级联删除
     * @param paper 包含ID
     * @return 成功标记
     */
    @PostMapping("/deletePaperById")
    public DEA deletePaperById(@RequestBody Paper paper){
        Paper paperCurrent = paperService.getById(paper.getPaperId());
        // 根据类型删除对应数据
        switch (paperCurrent.getSubjectType()){
            case Paper.TChoice:
                // 删除选项
                QueryWrapper<ChoiceOption> optionQueryWrapper = new QueryWrapper<>();
                optionQueryWrapper.eq("subject_id", paperCurrent.getSubjectId());
                List<ChoiceOption> options = choiceOptionService.list(optionQueryWrapper);
                for(ChoiceOption i:options){
                    choiceOptionService.removeById(i.getOptionId());    // 删除每一条选项
                }
                // 删除选择题本体
                choiceService.removeById(paperCurrent.getSubjectId());
                break;
            case Paper.TFilling:
                // 删除填空项
                QueryWrapper<FillingBlank> fillingBlankQueryWrapper = new QueryWrapper<>();
                fillingBlankQueryWrapper.eq("subject_id", paperCurrent.getSubjectId());
                List<FillingBlank> blanks = fillingBlankService.list(fillingBlankQueryWrapper);
                for(FillingBlank i:blanks){
                    fillingBlankService.removeById(i.getBlankId());    // 删除每一条填空项
                }
                // 删除填空本体
                fillingService.removeById(paperCurrent.getSubjectId());
                break;
            case Paper.TTrueFalse:
                trueFalseService.removeById(paperCurrent.getSubjectId());
                break;
            case Paper.TQuestionAnswer:
                questionAnswerService.removeById(paperCurrent.getSubjectId());
                break;
        }
        // 最后删除paper数据
        return new DEA(paperService.removeById(paperCurrent.getPaperId()));
    }

    /**
     * 获取一道封装题目
     * @param subjectType 题目类型
     * @param subjectId 题目id
     * @return
     */
    public Subject getOneSubject(Integer subjectType, Integer subjectId){
        Subject subject = new Subject();
        subject.setSubjectId(subjectId);
        subject.setSubjectType(subjectType);
        switch (subjectType){
            case Paper.TChoice:
                // 封装题目
                subject.setChoice(choiceService.getById(subjectId));
                // 封装选项
                QueryWrapper<ChoiceOption> wrapper = new QueryWrapper<>();
                wrapper.eq("subject_id",subjectId);
                wrapper.orderByAsc("num");
                subject.setChoiceOptions(choiceOptionService.list(wrapper));
                break;
            case Paper.TFilling:
                // 封装题目
                subject.setFilling(fillingService.getById(subjectId));
                // 封装选项
                QueryWrapper<FillingBlank> fillingBlankQueryWrapper = new QueryWrapper<>();
                fillingBlankQueryWrapper.eq("subject_id",subjectId);
                fillingBlankQueryWrapper.orderByAsc("num");
                subject.setFillingBlanks(fillingBlankService.list(fillingBlankQueryWrapper));
                break;
            case Paper.TTrueFalse:
                subject.setTrueFalse(trueFalseService.getById(subjectId));
                break;
            case Paper.TQuestionAnswer:
                subject.setQuestionAnswer(questionAnswerService.getById(subjectId));
                break;
            default:
                return null;
        }
        return subject;
    }

}
