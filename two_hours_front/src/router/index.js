// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 修复vue项目在点击重复路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// 平台主页
import MainPage from "@/pages/main/MainPage";
import SystemNotice from "@/pages/main/SystemNotice";
import Login from "@/pages/login/Login";
import Register from "@/pages/login/Register";
import PrivacyPolicy from "@/pages/login/PrivacyPolicy";
import ForgetPsw from "@/pages/login/ForgetPsw";
import MyLogicFlow from "@/components/myLogicFlow/MyLogicFlow";
// 用户界面
import UserMainPage from "@/pages/user/UserMainPage";
import NoticePage from "@/pages/user/NoticePage";
import LearningPage from "@/pages/user/LearningPage";
import Management from "@/pages/user/Management";
// 教师端组件
import ChapterTab from "@/pages/user/teacherComponents/ChapterTab";
import ChapterView from "@/pages/user/teacherComponents/ChapterView";
import CourseTab from "@/pages/user/teacherComponents/CourseTab";
import NoticeTab from "@/pages/user/teacherComponents/NoticeTab";
import FileTab from "@/pages/user/teacherComponents/FileTab";
import DiscussionTab from "@/pages/user/teacherComponents/DiscussionTab";
import DiscussionView from "@/pages/user/teacherComponents/DiscussionView";
import ExamTab from "@/pages/user/teacherComponents/ExamTab";
import ExamInfoView from "@/pages/user/teacherComponents/ExamInfoView";
import ExamPaperManage from "@/pages/user/teacherComponents/ExamPaperManage";
import UserManage from "@/pages/user/teacherComponents/UserManage";
import ExperimentTab from "@/pages/user/teacherComponents/ExperimentTab";
import ExperimentView from "@/pages/user/teacherComponents/ExperimentView";
// 学生端组件
import StuChapterTab from "@/pages/user/studentComponents/StuChapterTab";
import StuChapterView from "@/pages/user/studentComponents/StuChapterView";
import StuCourseTab from "@/pages/user/studentComponents/StuCourseTab";
import StuNoticeTab from "@/pages/user/studentComponents/StuNoticeTab";
import StuFileTab from "@/pages/user/studentComponents/StuFileTab";
import StuDiscussionTab from "@/pages/user/studentComponents/StuDiscussionTab";
import StuDiscussionView from "@/pages/user/studentComponents/StuDiscussionView";
import StuExamTab from "@/pages/user/studentComponents/StuExamTab";
import StuExamDoing from "@/pages/user/studentComponents/StuExamDoing";
import StuExamScore from "@/pages/user/studentComponents/StuExamScore";
import StuExperimentTab from "@/pages/user/studentComponents/StuExperimentTab";
// 管理员界面
import AdminMainPage from "@/pages/admin/AdminMainPage";
import AdmNoticeTab from "@/pages/admin/components/AdmNoticeTab";
import AdmCourseTab from "@/pages/admin/components/AdmCourseTab";
import AdmCourseManage from "@/pages/admin/components/AdmCourseManage";
import AdmUserManage from "@/pages/admin/components/AdmUserManage";
//创建并暴露一个路由器
const router =  new VueRouter({
    routes:[
        {   // 主页
            name:"MainPage",
            path:'/',
            component:MainPage,
            meta:{
                title:'繁星之辰'
            }
        },
        {   // 平台公告
            name: "SystemNotice",
            path:'/SystemNotice',
            component:SystemNotice,
            meta:{
                title:'平台消息'
            }
        },
        {   // 登陆
            name: "Login",
            path:'/Login',
            component:Login,
            meta:{
                title:'欢迎登陆'
            }
        },
        {   // 注册
            name: "Register",
            path:'/Register',
            component:Register,
            meta:{
                title:'欢迎注册'
            }
        },
        {   // 忘记密码
            name: "ForgetPsw",
            path:'/ForgetPsw',
            component:ForgetPsw,
            meta:{
                title:'找回密码'
            }
        },
        {   // 隐私政策
            name: "PrivacyPolicy",
            path:'/PrivacyPolicy',
            component:PrivacyPolicy,
            meta:{
                title:'隐私政策'
            }
        },
        {   // 用户界面
            name: "UserMainPage",
            path:'/UserMainPage',
            component:UserMainPage,
            meta:{
                title:'欢迎访问'
            }
        },
        {   // 课程通知
            name: "NoticePage",
            path:'/NoticePage',
            component:NoticePage,
            meta:{
                title:'课程通知'
            }
        },
        {   // 绘图区
            name: "MyLogicFlow",
            path:'/MyLogicFlow',
            component:MyLogicFlow,
            meta:{
                title:'绘图区'
            }
        },
        {   // 管理课程
            name: "Management",
            path:'/Management',
            component:Management,
            meta:{
                title:'课程管理'
            },
            //通过children配置子级路由
            children:[
                // 章节
                {
                    name:'ChapterTab',
                    path:'ChapterTab', // 子路由此处不要带斜杠
                    component:ChapterTab,
                    meta:{
                        title:'章节'
                    },
                },
                // 章节浏览
                {
                    name:'ChapterView',
                    path:'ChapterView', // 子路由此处不要带斜杠
                    component:ChapterView,
                    meta:{
                        title:'浏览'
                    },
                },
                // 课程管理区
                {
                    name:'CourseTab',
                    path:'CourseTab', // 子路由此处不要带斜杠
                    component:CourseTab,
                    meta:{
                        title:'课程区'
                    },
                },
                // 通知区
                {
                    name:'NoticeTab',
                    path:'NoticeTab',
                    component:NoticeTab,
                    meta:{
                        title:'通知区'
                    },
                },
                // 课件区
                {
                    name:'FileTab',
                    path:'FileTab',
                    component:FileTab,
                    meta:{
                        title:'资料区'
                    },
                },
                // 讨论区
                {
                    name:'DiscussionTab',
                    path:'DiscussionTab',
                    component:DiscussionTab,
                    meta:{
                        title:'讨论区'
                    },
                },
                // 讨论详情
                {
                    name:'DiscussionView',
                    path:'DiscussionView',
                    component:DiscussionView,
                    meta:{
                        title:'讨论详情'
                    },
                },
                // 实验区
                {
                    name:'ExperimentTab',
                    path:'ExperimentTab',
                    component:ExperimentTab,
                    meta:{
                        title:'实验区'
                    },
                },
                // 实验报告
                {
                    name:'ExperimentView',
                    path:'ExperimentView',
                    component:ExperimentView,
                    meta:{
                        title:'实验报告'
                    },
                },
                // 考试系统
                {
                    name:'ExamTab',
                    path:'ExamTab',
                    component:ExamTab,
                    meta:{
                        title:'考试系统'
                    },
                },
                // 考试数据统计
                {
                    name:'ExamInfoView',
                    path:'ExamInfoView',
                    component:ExamInfoView,
                    meta:{
                        title:'考试数据统计'
                    },
                },
                // 试卷管理
                {
                    name:'ExamPaperManage',
                    path:'ExamPaperManage',
                    component:ExamPaperManage,
                    meta:{
                        title:'试卷管理'
                    },
                },
                // 用户管理
                {
                    name:'UserManage',
                    path:'UserManage',
                    component:UserManage,
                    meta:{
                        title:'用户管理'
                    },
                },
            ]
        },
        {   // 学习课程
            name: "LearningPage",
            path:'/LearningPage',
            component:LearningPage,
            meta:{
                title:'学习课程'
            },
            children:[ //通过children配置子级路由
                // 章节
                {
                    name:'StuChapterTab',
                    path:'StuChapterTab', // 子路由此处不要带斜杠
                    component:StuChapterTab,
                    meta:{
                        title:'章节'
                    },
                },
                // 章节查看
                {
                    name:'StuChapterView',
                    path:'StuChapterView', // 子路由此处不要带斜杠
                    component:StuChapterView,
                    meta:{
                        title:'查看章节'
                    },
                },
                // 课程区
                {
                    name:'StuCourseTab',
                    path:'StuCourseTab', // 子路由此处不要带斜杠
                    component:StuCourseTab,
                    meta:{
                        title:'课程区'
                    },
                },
                // 通知区
                {
                    name:'StuNoticeTab',
                    path:'StuNoticeTab',
                    component:StuNoticeTab,
                    meta:{
                        title:'通知区'
                    },
                },
                // 课件区
                {
                    name:'StuFileTab',
                    path:'StuFileTab',
                    component:StuFileTab,
                    meta:{
                        title:'资料区'
                    },
                },
                // 讨论区
                {
                    name:'StuDiscussionTab',
                    path:'StuDiscussionTab',
                    component:StuDiscussionTab,
                    meta:{
                        title:'讨论区'
                    },
                },
                // 讨论详情
                {
                    name:'StuDiscussionView',
                    path:'StuDiscussionView',
                    component:StuDiscussionView,
                    meta:{
                        title:'讨论详情'
                    },
                },
                // 实验区
                {
                    name:'StuExperimentTab',
                    path:'StuExperimentTab',
                    component:StuExperimentTab,
                    meta:{
                        title:'实验区'
                    },
                },
                // 考试系统
                {
                    name:'StuExamTab',
                    path:'StuExamTab',
                    component:StuExamTab,
                    meta:{
                        title:'考试系统'
                    },
                },
                // 开始考试
                {
                    name:'StuExamDoing',
                    path:'StuExamDoing',
                    component:StuExamDoing,
                    meta:{
                        title:'开始考试'
                    },
                },
                // 考试结果
                {
                    name:'StuExamScore',
                    path:'StuExamScore',
                    component:StuExamScore,
                    meta:{
                        title:'考试成绩'
                    },
                },
            ]
        },
        {   // 管理员界面
            name: "AdminMainPage",
            path:'/AdminMainPage',
            component:AdminMainPage,
            meta:{
                title:'系统管理'
            },
            children: [
                {
                    name:'AdmNoticeTab',
                    path:'AdmNoticeTab',
                    component:AdmNoticeTab,
                    mete:{
                        title:'系统通知'
                    }
                },
                {
                    name:'AdmCourseTab',
                    path:'AdmCourseTab',
                    component:AdmCourseTab,
                    mete:{
                        title:'课程管理'
                    }
                },
                {
                    name:'AdmCourseManage',
                    path:'AdmCourseManage',
                    component:AdmCourseManage,
                    mete:{
                        title:'课程管理'
                    }
                },
                {
                    name:'AdmUserManage',
                    path:'AdmUserManage',
                    component:AdmUserManage,
                    mete:{
                        title:'课程管理'
                    }
                },
            ]
        },
    ]
})

/*//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to,from,next)=>{
    console.log('前置路由守卫',to,from)
    if(to.name !== 'MainPage'
        || to.name !== 'SystemNotice'
        || to.name !== 'Login'
        || to.name !== 'Register'
        || to.name !== 'ForgetPsw'
        || to.name !== 'PrivacyPolicy'){ //判断是否需要拦截
        this.$axios.get("/Users/isUserLogin").then((res)=>{
            if(res.data.flag){
                // 登陆成功
                next();
            }else{
                // 未登陆
                this.$message.success("登陆失败！将为您跳转到登陆界面！");
               /!* // 2秒后跳转登陆界面
                setTimeout(()=> {next({ path: '/Login' })}, 2000);*!/
            }
        });
    }else{  // 公开页面-无需拦截
        next()
    }
})*/

//全局后置路由守卫————标题切换
router.afterEach((to,from)=>{
    if(to.meta.title !== undefined) {
        document.title = to.meta.title;
    }
    else{
        document.title = '繁星之辰';
    }
})
export default router;