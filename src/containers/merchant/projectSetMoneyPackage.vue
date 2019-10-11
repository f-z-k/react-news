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
    <el-form ref="form" :rules="rules" label-width="240px" :model="form">
      <el-form-item label="名称" prop="name">
        <div style="width: 240px;">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="红包金额(元)" prop="amount">
        <div style="width: 220px;">
          <el-input-number v-model="form.amount" :precision="2" :min="0" autocomplete="off"></el-input-number>
        </div>
      </el-form-item>
      <el-form-item label="满多少可用(元)" prop="disAmount">
        <div style="width: 220px;">
          <el-input-number v-model="form.disAmount" :precision="2" :min="0" autocomplete="off"></el-input-number>
        </div>
      </el-form-item>
      <el-form-item label="适用类目" v-if="userInfo.userType === 2 || userInfo.userType === 3" prop="id">
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
      <el-form-item label="红包券数量" prop="totalStock">
        <el-input-number :precision="0" width="220px" v-model="form.totalStock" :min="0" placeholder="" autocomplete="off"></el-input-number>
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
        amount: [{ required: true, message: '请输入红包金额' }],
        disAmount: [{ required: true, message: '请输入满多少可用' }],
        id: [{ required: true, message: '请选择适用范围', trigger: 'change' }],
        expTimes: [{ required: true, message: '请选择适用日期' }],
        totalStock: [{ required: true, message: '请输入红包券数量' }]
      }
    }
  },
  mounted () {
    if (this.userInfo.userType === 2 || this.userInfo.userType === 3) {
      this.getBasicList()
    }
  },
  methods: {
    getBasicList () {
      basiceTopOrder({}).then((result) => {
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
            type: 1,
            basicIdList: form.id,
            amount: form.amount * 100 || null,
            disAmount: form.disAmount * 100 || null,
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
