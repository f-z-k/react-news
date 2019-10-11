<style lang="scss">
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
          <el-input style="width: 283px" type="text" placeholder="输入验证码" v-model="user.code" autocomplete="off"></el-input>
          <el-button style="width: 162px" :disabled="times !== 60" class="code-btn" type="primary" @click="getCode">
            {{ times !== 60 ? times : '获取验证码' }}
          </el-button>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="输入新密码" v-model="user.pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm('user')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { forgetPwd, getCode } from './../api/common'
export default {
  data () {
    return {
      timer: null,
      times: 60,
      user: {}
    }
  },
  methods: {
    getCode () {
      if (!this.user.phone) {
        return
      }
      getCode({
        phone: this.user.phone
      }).then((result) => {
        this.timer = setInterval(() => {
          this.times = this.times - 1
          if (this.times === 0) {
            clearInterval(this.timer)
            this.times = 60
          }
        }, 1000)
      })
    },
    submitForm () {
      forgetPwd(this.user).then((result) => {
        localStorage.removeItem('kztoken')
        localStorage.removeItem('kzid')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '修改成功，请重新登录！'
        })
      })
    }
  }
}
</script>
