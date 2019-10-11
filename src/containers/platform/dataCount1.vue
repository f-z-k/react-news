<style lang="scss" scoped>
  h1 {
    padding: 20px 0px;
  }
  h2 {
    padding: 10px 0px;
  }
  .box-wrap {
    display: flex;
  }
  .box {
    width: 400px;
    border: 1px solid #d8d8d8;
    border-radius: 6px;
    padding: 10px;
    margin-right: 50px;
  }
</style>
<template>
  <div>
    <h1>设置不同会员类型推广结算金额(元)</h1>
    <div class="box-wrap">
      <div class="box">
        <h2>地推人员</h2>
        <el-form ref="form1" :rules="rules1" :model="form1" label-width="80px" class="demo-form-inline">
          <el-form-item label="普通会员" prop="vipPt">
            <el-input-number v-model="form1.vipPt" :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item label="高级会员" prop="vip">
            <el-input-number v-model="form1.vip" :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item label="VIP会员" prop="vipHighter">
            <el-input-number v-model="form1.vipHighter" :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goCommEdit(1)">设置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="box">
        <h2>商户人员</h2>
        <el-form ref="form2" :rules="rules2" :model="form2" label-width="80px" class="demo-form-inline">
          <el-form-item label="普通会员" prop="vipPt">
            <el-input-number v-model="form2.vipPt" :precision="2" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="高级会员" prop="vip">
            <el-input-number v-model="form2.vip" :precision="2" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="VIP会员" prop="vipHighter">
            <el-input-number v-model="form2.vipHighter" :precision="2" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="goCommEdit(2)">设置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { commEdit, commCofGet } from './../../api/platform'
export default {
  data () {
    return {
      form1: {},
      form2: {},
      rules1: {
        vipPt: [{ required: true, message: '请输入普通会员佣金' }],
        vip: [{ required: true, message: '请输入高级会员佣金' }],
        vipHighter: [{ required: true, message: '请输入VIP会员佣金' }]
      },
      rules2: {
        vipPt: [{ required: true, message: '请输入普通会员佣金' }],
        vip: [{ required: true, message: '请输入高级会员佣金' }],
        vipHighter: [{ required: true, message: '请输入VIP会员佣金' }]
      }
    }
  },
  beforeMount () {
    this.getCommCofGet()
  },
  methods: {
    getCommCofGet () {
      commCofGet().then((result) => {
        result.data.forEach(element => {
          if (element.userType === 1) {
            this.form1 = {
              id: element.id,
              vipPt: element.vipPt / 100 || null,
              vip: element.vip / 100 || null,
              vipHighter: element.vipHighter / 100 || null
            }
          }
          if (element.userType === 2) {
            this.form2 = {
              id: element.id,
              vipPt: element.vipPt / 100 || null,
              vip: element.vip / 100 || null,
              vipHighter: element.vipHighter / 100 || null
            }
          }
        })
      })
    },
    goCommEdit (value) {
      let { form1, form2 } = this
      if (value === 1) {
        this.$refs['form1'].validate((valid) => {
          if (valid) {
            commEdit({
              id: form1.id,
              vipPt: form1.vipPt * 100 || null,
              vip: form1.vip * 100 || null,
              vipHighter: form1.vipHighter * 100 || null,
              userType: value
            }).then((result) => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getCommCofGet()
            })
          }
        })
      } else {
        this.$refs['form2'].validate((valid) => {
          if (valid) {
            commEdit({
              id: form2.id,
              vipPt: form2.vipPt * 100 || null,
              vip: form2.vip * 100 || null,
              vipHighter: form2.vipHighter * 100 || null,
              userType: value
            }).then((result) => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.getCommCofGet()
            })
          }
        })
      }
    }
  }
}
</script>
