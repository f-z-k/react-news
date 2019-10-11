<style lang="scss" scoped>
  .edit-wrap {
    min-height: 100vh;
    .form-wrap {
      width: 500px;
    }
  }
</style>
<template>
  <div class="edit-wrap">
    <div class="form-wrap">
      <el-form ref="form" :rules="rules" :model="form" label-width="200px">
        <el-form-item label="套餐名称" prop="areaName">
          <el-input v-model="form.areaName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="该套餐总数量" prop="areaNum">
          <el-input-number v-model="form.areaNum" :precision="0" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item v-if="type === '5'" label="起订人数" prop="num">
          <el-input-number v-model="form.num" :precision="0" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item v-if="type === '5'" label="最多可订人数" prop="maxNum">
          <el-input-number v-model="form.maxNum" :precision="0" :min="0"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="是否必须连续多天捆绑预订" prop="isBind">
          <el-radio-group v-model="form.isBind">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="连续预订方式设置" v-if="form.isBind === '1'" prop="reserveMethod">
          <el-select v-model="form.reserveMethod" placeholder="请选择">
            <el-option
              v-for="index in 9"
              :key="index"
              :label="(index + 1) + '天'"
              :value="index + 1">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input type="textarea" rows="4" v-model="form.descInfo" placeholder="(若填写，内容将显示在预订系统下方，不超过25个字符)如：费用包含：。。。押金500，到店时另外收取，离店时退还；清洁费说明"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否另收押金" prop="deposit">
          <el-radio-group v-model="form.deposit">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
          <p>如选是，统一采用线下收</p>
        </el-form-item> -->
      </el-form>
    </div>
    <div>
      <el-table
      :border="true"
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="price1"
          label="周一"
        >
          <template slot="header" slot-scope="scope">
            周一
            <el-checkbox true-label="1" v-model="isWeekend[0]">不营业</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.price1"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="price2"
          label="周二"
        >
          <template slot="header" slot-scope="scope">
            周二
            <el-checkbox true-label="2" v-model="isWeekend[1]">不营业</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.price2"></el-input>
          </template>>
        </el-table-column>
        <el-table-column
          prop="price3"
          label="周三">
          <template slot="header" slot-scope="scope">
            周三
            <el-checkbox true-label="3" v-model="isWeekend[2]">不营业</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.price3"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="price4"
          label="周四"
        >
          <template slot="header" slot-scope="scope">
            周四
            <el-checkbox true-label="4" v-model="isWeekend[3]">不营业</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.price4"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="price5"
          label="周五"
        >
          <template slot="header" slot-scope="scope">
            周五
            <el-checkbox true-label="5" v-model="isWeekend[4]">不营业</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.price5"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="price6"
          label="周六">
          <template slot="header" slot-scope="scope">
            周六
            <el-checkbox true-label="6" v-model="isWeekend[5]">不营业</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.price6"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="price7"
          label="周日">
          <template slot="header" slot-scope="scope">
            周日
            <el-checkbox true-label="7" v-model="isWeekend[6]">不营业</el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-input v-model="scope.row.price7"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" @click="onSubmit()">保存</el-button>
  </div>
</template>
<script>
import { priceAddDay, priceAddDayEdit, priceDetail } from './../../api/merchant'
export default {
  props: ['id', 'isAdd', 'type', 'callBack', 'priceId'],
  data () {
    return {
      isWeekend: [],
      tableData: [],
      form: {
        isBind: '0'
        // deposit: '0'
      },
      rules: {
        areaName: [{ required: true, message: '请输入套餐名称' }],
        areaNum: [{ required: true, message: '请输入套餐总数量' }],
        num: [{ required: true, message: '请输入起订人数' }],
        maxNum: [{ required: true, message: '请输入最多可订人数' }],
        reserveMethod: [{ required: true, message: '请选择连续预订方式设置' }]
      }
    }
  },
  beforeMount () {
    if (!this.isAdd) {
      priceDetail({
        priceId: this.priceId
      }).then((result) => {
        let { areaName, areaNum, num, maxNum, isBind, reserveMethod, isWeekend, descInfo, deposit } = result.data.price
        this.form = { areaName, areaNum, num, maxNum, isBind, reserveMethod: (Number(reserveMethod) || ''), descInfo, deposit }
        let _isWeekend = (isWeekend && isWeekend.split(':')) || []
        _isWeekend.forEach(item => {
          this.$set(this.isWeekend, item - 1, item)
        })
        let obj = {}
        result.data.price.list.forEach(item => {
          obj['price' + item.weekendId] = item.price / 100 || ''
        })
        this.tableData.push({
          ...obj
        })
      })
    } else {
      this.tableData = [{}]
    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            priceAddDay({
              basicId: this.id,
              priceingMethod: this.type,
              ...this.form,
              list: this.tableData,
              isWeekend: this.isWeekend.filter(item => item).join(':')
            }).then(() => {
              this.callBack()
            })
          } else {
            priceAddDayEdit({
              priceBasicId: this.priceId,
              basicId: this.id,
              priceingMethod: this.type,
              ...this.form,
              list: this.tableData,
              isWeekend: this.isWeekend.filter(item => item).join(':')
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
