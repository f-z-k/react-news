<style lang="scss" scoped>
  .layout-content {
    display: flex;
  }
  .header-wrap {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    background-color: #1989fa;
    padding: 0px 10px;
    span {
      color: #fff;
      font-size: 20px;
    }
    .role-wrap {
      font-size: 18px;
    }
  }
  .menu-wrap {
    flex: 0 0 170px;
    overflow: hidden;
    background-color: #545c64;
  }
  .content-wrap {
    flex: 1;
    padding: 10px;
  }
  .content-wrap>div {
    border-radius: 6px;
    background-color: #fff;
    padding: 10px;
  }
  .login-out {
    font-size: 18px;
    cursor: pointer;
    padding-left: 10px;
  }
</style>
<template>
  <div class="layout-wrap">
    <div class="header-wrap">
      <div>
        <span v-if="userInfo.userType === 0 || userInfo.userType === 1">平台工作人员管理系统</span>
        <span v-else>商户后台管理系统</span>
        <span style="paddingLeft: 20px" v-if="userInfo.userType === 2 || userInfo.userType === 3">欢迎您，{{ userInfo.vipType }}商户</span>
        <span style="paddingLeft: 20px" v-if="userInfo.saleNo">推荐码：{{ userInfo.saleNo }}</span>
      </div>
      <div>
        <span v-if="(userInfo.userType === 2 || userInfo.userType === 3) && userInfo.expTime && userInfo.vipType !== '普通会员'">会员到期日：{{ moment(userInfo.expTime).format('YYYY-MM-DD') }}</span>
        <span style="paddingLeft: 20px" v-if="userInfo.userType === 2 || userInfo.userType === 3">
          您已累计入账：{{ (userInfo.totalAmount || 0)/100 }}元，
          累计佣金：{{ (userInfo.yjAmount || 0)/100 }}元
        </span>
        <span class="role-wrap" v-if="userInfo.userType === 0">您的身份：工作人员</span>
        <span class="role-wrap" v-if="userInfo.userType === 1">您的身份：最高权限者</span>
        <span class="login-out" @click="toLoginOut">退出登录</span>
      </div>
    </div>
    <div class="layout-content" :style="{ minHeight: height + 'px' }">
      <div class="menu-wrap">
        <el-menu
          :router="true"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#888"
          active-text-color="#fff">
          <el-menu-item v-for="(item, index) in menuList" :key="index" :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content-wrap" v-if="userInfo.adminId">
        <div :style="{ minHeight: height-40 + 'px' }">
         <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { loginOut } from './../api/common'
import { platformList, merchantList } from './menuConfig.js'
export default {
  data () {
    return {
      moment: moment,
      height: document.documentElement.clientHeight - 60
    }
  },
  computed: {
    userInfo: function () {
      return this.$store.state.user.info
    },
    menuList: function () {
      let { permission = [], role } = this.$store.state.user.info
      if (role === 0) {
        return platformList.filter(item => { return permission.includes(item.role) })
      } else if (role === 1) {
        return merchantList.filter(item => { return permission.includes(item.role) })
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('getUserInfo')
  },
  methods: {
    toLoginOut () {
      loginOut().then((result) => {
        localStorage.removeItem('kztoken')
        localStorage.removeItem('kzid')
        this.$router.push('/login')
      })
    }
  }
}
</script>
