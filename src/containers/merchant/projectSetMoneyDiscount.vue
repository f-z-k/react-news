<style lang="scss" scoped>
  .dialog-footer {
    overflow: hidden;
    button {
      float: right;
      margin-left: 10px;
    }
  }
</style>
<template>
  <div>
    <el-form label-width="200px" ref="form" :rules="rules" :model="form">
      <el-form-item label="名称" prop="name">
        <div style="width: 220px;">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="折扣" prop="amount">
        <el-input-number v-model="form.amount" :precision="1" :min="0" :max="10" autocomplete="off"></el-input-number>
        折（例如：9折表示原价×90%，优惠10%）
      </el-form-item>
      <el-form-item label="适用类目" prop="id" v-if="userInfo.userType === 2 || userInfo.userType === 3">
        <el-select style="width: 300px;" multiple v-model="form.id" placeholder="适用类目">
          <el-option
            v-for="(item, index) in areaList"
            :key="index"
            :label="item.basic && item.basic.proName"
            :value="item.basic && item.basic.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效日期" prop="expTimes">
        <div style="width: 220px;">
          <el-date-picker
            v-model="form.expTimes"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="折扣券数量" prop="totalStock">
        <el-input-number width="220px" :precision="0" v-model="form.totalStock" :min="0" placeholder="" autocomplete="off"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="hideModal">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { basiceTopOrder, addCoupon } from './../../api/merchant'
export default {
  data () {
    return {
      userInfo: this.$store.state.user.info,
      areaList: [],
      form: {},
      rules: {
        name: [{ required: true, message: '请输入名称' }],
        amount: [{ required: true, message: '请输入折扣' }],
        id: [{ required: true, message: '请选择适用范围' }],
        expTimes: [{ required: true, message: '请选择适用日期' }],
        totalStock: [{ required: true, message: '请输入折扣券数量' }]
      }
    }
  },
  beforeMount () {
    if (this.userInfo.userType === 2 || this.userInfo.userType === 3) {
      this.getBasicList()
    }
  },
  methods: {
    getBasicList () {
      basiceTopOrder().then((result) => {
        this.areaList = result.data
      })
    },
    hideModal () {
      this.$emit('hideModal')
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { form } = this
          let data = {
            ...form,
            type: 2,
            basicIdList: form.id,
            startTime: form.expTimes && form.expTimes[0],
            endTime: form.expTimes && form.expTimes[1]
          }
          delete data.id
          addCoupon(data).then((result) => {
            this.$emit('hideModal')
          })
        }
      })
    }
  }
}
</script>
