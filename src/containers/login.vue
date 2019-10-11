<style lang="scss" scoped>
  .login-wrap {
    height: 100vh;
    background: url('./../static/img/bg.jpeg') no-repeat #EFF5FD;
    background-size: cover;
    position: relative;
    >div {
      h2 {
        width: 300px;
        height: 100px;
        font-size: 26px;
        color: #333;
        text-align: center;
        background: url('./../static/img/logo.jpeg') no-repeat center center;
        background-size: 100% 100%;
        margin: 0px auto;
      }
      h5 {
        font-weight: normal;
        text-align: center;
        padding: 20px;
      }
      width: 450px;
      height: 400px;
      background-color: #fff;
      box-shadow:0px 0px 20px 0px rgba(165,192,205,0.17);
      border-radius: 10px;
      padding: 20px;
      background:rgba(255,255,255,1);
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      margin: auto;
    }
    .pwd {
      a {
        text-align: right;
        cursor: pointer;
        color: #409EFF;
        text-decoration: none;
      }
    }
  }
</style>
<template>
  <div class="login-wrap">
    <div>
      <h2></h2>
      <h5>用心为商户提供实用且高效的预订管理服务</h5>
      <el-form :model="user">
        <el-form-item prop="phone">
          <el-input type="text" placeholder="输入手机号" v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" @keyup.enter.native="submitForm" placeholder="输入密码" v-model="user.pwd" autocomplete="off"></el-input>
          <div class="pwd">
            <router-link to="/forgetPwd"><p>忘记密码？</p></router-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm('user')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { platformList, merchantList } from './menuConfig.js'
import { login } from './../api/common'
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    submitForm () {
      login(this.user).then((result) => {
        localStorage.removeItem('kztoken')
        localStorage.removeItem('kzid')
        localStorage.setItem('kztoken', result.data.token)
        localStorage.setItem('kzid', result.data.adminId)
        let menuList = platformList.concat(merchantList)
        let menuListSeted = result.data.permission.filter(item => { return item.menu === '1' })
        let path = ''
        menuList.forEach(item => {
          if (item.role === menuListSeted[0].id) {
            path = item.path
          }
        })
        this.$router.replace(path)
      })
    }
  }
}
</script>
