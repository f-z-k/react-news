<style lang="scss" scoped>
  .user-wrap {
    width: 500px;
  }
</style>
<template>
  <div class="user-wrap">
    <el-form :model="user" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label-width="130px" label="原密码：" prop="oriPwd">
        <el-input type="text" v-model="user.oriPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label-width="130px" label="新密码：" prop="pwd">
        <el-input type="text" v-model="user.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label-width="130px">
        <el-button type="primary" @click="submitForm()">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { userInfoModitify } from './../../api/common'
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    submitForm () {
      if (!this.user.oriPwd || !this.user.pwd) {
        return
      }
      userInfoModitify({
        ...this.user
      }).then((result) => {
        this.$message({
          message: '修改成功！请重新登录！',
          type: 'success'
        })
        this.$router.push('/login')
      })
    }
  }
}
</script>
