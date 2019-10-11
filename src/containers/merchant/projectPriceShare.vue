<style lang="scss" scoped>
  .edit-wrap {
    width: 500px;
    min-height: 100vh;
  }
</style>
<template>
  <div class="edit-wrap">
    <el-form ref="form" :rules="rules" :model="form" label-width="200px">
      <el-form-item label="套餐名称" prop="areaName">
        <el-input v-model="form.areaName" placeholder=""></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否必选">
        <el-radio-group v-model="form.isMaster">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="该套餐总数量" prop="areaNum">
        <el-input-number v-model="form.areaNum" :precision="0" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="每份价格" prop="price">
        <el-input-number v-model="form.price" :precision="2" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="起订份数" prop="num">
        <el-input-number v-model="form.num" :precision="0" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="最多可订份数" prop="maxNum">
        <el-input-number v-model="form.maxNum" :precision="0" :min="0"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="截止日期">
        <el-date-picker
          v-model="form.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="不填则无">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="备注">
        <el-input type="textarea" rows="4" v-model="form.descInfo" placeholder="(若填写，内容将显示在预订系统下方，不超过25个字符)如：费用包含：。。。押金500，到店时另外收取，离店时退还；清洁费说明"></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否另收押金">
        <el-radio-group v-model="form.deposit">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
        <p>如选是，统一采用线下收</p>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { priceEditShare, priceAddShare, priceDetail } from './../../api/merchant'
export default {
  props: ['id', 'isAdd', 'type', 'callBack', 'priceId'],
  data () {
    return {
      form: {
        // isMaster: '1',
        // deposit: '0'
      },
      rules: {
        areaName: [{ required: true, message: '请输入套餐名称' }],
        areaNum: [{ required: true, message: '请输入套餐总数量' }],
        price: [{ required: true, message: '请输入每份价格' }],
        num: [{ required: true, message: '请输入起订份数' }],
        maxNum: [{ required: true, message: '请输入最多可订份数' }]
      }
    }
  },
  beforeMount () {
    if (!this.isAdd) {
      priceDetail({
        priceId: this.priceId
      }).then((result) => {
        this.form = result.data && result.data.price
        this.form.price = this.form.price / 100 || null
      })
    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            priceAddShare({
              basicId: this.id,
              priceingMethod: this.type,
              ...this.form
            }).then(() => {
              this.callBack()
            })
          } else {
            priceEditShare({
              priceBasicId: this.priceId,
              basicId: this.id,
              priceingMethod: this.type,
              ...this.form
            }).then(() => {
              this.callBack()
            })
          }
        }
      })
    }
  }
}
</script>
