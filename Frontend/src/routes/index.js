import CompManagement from '../pages/admin/compManagement'
import PageNotFound from '../pages/pageNotFound'
import PostPage from '../pages/findteam/PostPage'
import FindTeam from '../pages/findteam/FindTeam'
import ProjectTrain from '../pages/projectTrain/projectTrain'
import CompetitionPage from '../pages/competition/competitionPage'
import AllCompetitionPage from '../pages/competition/allCompetitionPage'
import Homepage from '../pages/homepage'
import Login from '../pages/login'
import Register from '../pages/register'
import DeliverSystemAnnouncement from '../pages/admin/deliverSystemAnnouncement'
import EditTeam from '../pages/personal/editTeam'
import Editinform from '../pages/personal/editInform'
import Community from '../pages/community/Community'
import Moment from '../pages/community/Moment'
import QuestionManagement from '../pages/admin/questionManagement'
import teamChat from '../pages/personal/teamChat'
import privateChat from '../pages/personal/privateChat'
export const adminRoutes = [
  {
    path: '/admin/comp',
    title: '比赛管理',
    component: CompManagement,
  },
  {
    path: '/admin/sysannounce',
    title: '发布系统公告',
    component: DeliverSystemAnnouncement,
  },
  {
    path: '/admin/question',
    title: '练习题管理',
    component: QuestionManagement,
  },
]

export const mainRoutes = [
  {
    path: '/404',
    component: PageNotFound,
  },
  {
    path: '/home',
    title: '主页',
    component: Login,
  },
  {
    path: '/homePage',
    title: '主页公告',
    component: Homepage,
  },
  {
    path: '/postpage/MatchId=:ProjctId/groupId=:groupId',
    title: '寻找队伍帖',
    component: PostPage,
  },
  {
    path: '/findTeam/id=:compID',
    title: '寻找队伍',
    component: FindTeam,
  },
  {
    path: '/projectTrain/id=:compID',
    title: '比赛训练',
    component: ProjectTrain,
  },
  {
    path: '/compPage/id=:compID',
    title: '比赛页面',
    component: CompetitionPage,
  },
  {
    path: '/editinform',
    title: '编辑个人资料',
    component: Editinform,
  },
  {
    path: '/editTeam/:teamID',
    title: '编辑小队',
    component: EditTeam,
  },
  {
    path: '/login',
    title: '登录',
    component: Login,
  },
  {
    path: '/register',
    title: '注册',
    component: Register,
  },
  {
    path: '/allCompPage',
    title: '比赛列表',
    component: AllCompetitionPage,
  },
  {
    path:'/community',
    title:'社区',
    component:Community
  },
  {
    path:'/moment/:id',
    title:'动态',
    component:Moment
  },
  {
    path:'/teamChat/account=:accountID',
    title: '聊天室',
    component: teamChat,
  },
  {
    path:'/privateChat/account=:accountID',
    title: '私聊室',
    component: privateChat,
  }
]

