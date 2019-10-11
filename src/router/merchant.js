// 商户路由
import UserInfoEdit from '@/containers/merchant/userInfoEdit'
import UserPwdEdit from '@/containers/merchant/userPwdEdit'
import Project from '@/containers/merchant/project'
import ProjectVenueAdd from '@/containers/merchant/projectVenueAdd'
import ProjectBuildingAdd from '@/containers/merchant/projectBuildingAdd'
import ProjectActiveAdd from '@/containers/merchant/projectActiveAdd'
import ProjectVenueOpeate from '@/containers/merchant/projectVenueOpeate'
import ProjectBuildingOpeate from '@/containers/merchant/projectBuildingOpeate'
import ProjectActiveOpeate from '@/containers/merchant/projectActiveOpeate'
import ProjectOrderList from '@/containers/merchant/projectOrderList'
import ProjectOrderStatusList from '@/containers/merchant/projectOrderStatusList'
import ProjectTopOrder from '@/containers/merchant/projectTopOrder'
import ProjectTopOrderList from '@/containers/merchant/projectTopOrderList'
import ProjectOrder from '@/containers/merchant/ProjectOrder'
import ProjectSetMoney from '@/containers/merchant/projectSetMoney'
import ProjectUserManage from '@/containers/merchant/projectUserManage'
import ProjectMember from '@/containers/merchant/projectMember'
export default [{
  path: '/userInfoEdit',
  component: UserInfoEdit
}, {
  path: '/userPwdEdit',
  component: UserPwdEdit
}, {
  path: '/project',
  component: Project
}, {
  path: '/projectVenueAdd',
  component: ProjectVenueAdd
}, {
  path: '/projectBuildingAdd',
  component: ProjectBuildingAdd
}, {
  path: '/projectBuildingOpeate/:id',
  component: ProjectBuildingOpeate
}, {
  path: '/projectActiveAdd',
  component: ProjectActiveAdd
}, {
  path: '/projectVenueOpeate/:id',
  component: ProjectVenueOpeate
}, {
  path: '/projectActiveOpeate/:id',
  component: ProjectActiveOpeate
}, {
  path: '/projectOrderList',
  component: ProjectOrderList
}, {
  path: '/projectOrderStatusList/:id',
  component: ProjectOrderStatusList
}, {
  path: '/projectOrder',
  component: ProjectOrder
}, {
  path: '/projectTopOrder',
  component: ProjectTopOrder
}, {
  path: '/projectSetMoney',
  component: ProjectSetMoney
}, {
  path: '/projectTopOrderList',
  component: ProjectTopOrderList
}, {
  path: '/projectUserManage',
  component: ProjectUserManage
}, {
  path: '/projectMember',
  component: ProjectMember
}]
