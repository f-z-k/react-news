<style lang="scss" scoped>
  .user-wrap {
    width: 500px;
  }
</style>
<template>
  <div class="user-wrap">
    <el-form :model="user" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label-width="130px" label="老板或管家姓名：" prop="userName">
        <el-input type="text" v-model="user.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label-width="130px" label="邮箱：" prop="email">
        <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label-width="130px" label="手机号：" prop="phone">
        <el-input type="text" v-model="user.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label-width="130px">
        <el-button type="primary" @click="submitForm('user')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { userInfoModitify } from './../../api/common'
export default {
  data () {
    return {
      user: {
        userName: this.$store.state.user.info.name,
        email: this.$store.state.user.info.email,
        phone: this.$store.state.user.info.phone
      }
    }
  },
  methods: {
    submitForm () {
      userInfoModitify({
        ...this.user
      }).then((result) => {
        this.$store.dispatch('getUserInfo')
        this.$message({
          message: '修改成功！',
          type: 'success'
        })
      })
    }
  }
}
</script>
