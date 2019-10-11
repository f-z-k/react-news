// 平台路由
import ArticleList from '@/containers/platform/articleList'
import ArticleAdd from '@/containers/platform/ArticleAdd'
import ArticleEdit from '@/containers/platform/ArticleEdit'
import Examine from '@/containers/platform/examine'
import ExaminePass from '@/containers/platform/examinePass'
import ExaminePassDetail from '@/containers/platform/examinePassDetail'
import FindHelp from '@/containers/platform/findHelp'
import UserManage from '@/containers/platform/userManage'
import DataCount from '@/containers/platform/dataCount'
import FeedBack from '@/containers/platform/feedBack'
export default [{
  path: '/articleList',
  component: ArticleList
}, {
  path: '/articleAdd',
  component: ArticleAdd
}, {
  path: '/articleEdit/:id',
  component: ArticleEdit
}, {
  path: '/examine',
  component: Examine
}, {
  path: '/examinePass',
  component: ExaminePass
}, {
  path: '/examinePassDetail',
  component: ExaminePassDetail
}, {
  path: '/findHelp',
  component: FindHelp
}, {
  path: '/userManage',
  component: UserManage
}, {
  path: '/dataCount',
  component: DataCount
}, {
  path: '/feedBack',
  component: FeedBack
}]
