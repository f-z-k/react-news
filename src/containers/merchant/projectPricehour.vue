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
        <el-form-item v-if="type === '6'" label="起订人数" prop="num">
          <el-input-number v-model="form.num" :precision="0" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item v-if="type === '6'" label="最多可订人数" prop="maxNum">
          <el-input-number v-model="form.maxNum" :precision="0" :min="0" place></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="是否必须连续时间段" prop="isBind">
          <el-radio-group v-model="form.isBind">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="连续预订方式设置" v-if="form.isBind === '1'" prop="reserveMethod">
          <el-select v-model="form.reserveMethod" placeholder="请选择">
            <el-option
              v-for="index in 4"
              :key="index"
              :label="'至少' + (index + 1) + '时间段'"
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
    <div v-if="isFirst">
      <el-time-select
        placeholder="起始时间"
        v-model="startTime"
        @change="changeStartTime"
        :picker-options="{
          start: '00:00',
          step: '01:00',
          end: '24:00'
        }">
      </el-time-select>
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        :picker-options="{
          start: '00:00',
          step: '01:00',
          end: '24:00',
          minTime: startTime
        }">
      </el-time-select>
      <el-button type="primary" :disabled="!endTime" @click="addTime">新增时间段</el-button>
    </div>
    <div>
      <el-table
      :border="true"
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="timeId"
          label="时间段">
        </el-table-column>
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
        <el-table-column
          v-if="isFirst"
          prop="price7"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="deleTime(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" @click="onSubmit()">保存</el-button>
  </div>
</template>
<script>
import { priceAddTime, priceDetail, priceAddTimeEdit, getHourList } from './../../api/merchant'
export default {
  props: ['id', 'isAdd', 'type', 'callBack', 'priceId'],
  data () {
    return {
      isWeekend: [],
      startTime: null,
      endTime: null,
      tableData: [],
      form: {
        // deposit: '0'
      },
      rules: {
        areaName: [{ required: true, message: '请输入套餐名称' }],
        areaNum: [{ required: true, message: '请输入套餐总数量' }],
        num: [{ required: true, message: '请输入起订人数' }],
        maxNum: [{ required: true, message: '请输入最多可订人数' }],
        reserveMethod: [{ required: true, message: '请选择连续预订方式设置' }]
      },
      isFirst: false // 是否第一次添加
    }
  },
  beforeMount () {
    this.getHourList()
    if (!this.isAdd) {
      priceDetail({
        priceId: this.priceId
      }).then((result) => {
        let { areaName, areaNum, num, maxNum, reserveMethod, isWeekend, isBind, descInfo, deposit } = result.data.price
        this.form = { areaName, areaNum, num, maxNum, isBind, reserveMethod: (Number(reserveMethod) || ''), descInfo, deposit }
        let _isWeekend = (isWeekend && isWeekend.split(':')) || []
        _isWeekend.forEach(item => {
          this.$set(this.isWeekend, item - 1, item)
        })
        let keyArr = Object.keys(result.data.price.map)
        keyArr.forEach(key => {
          let obj = {}
          result.data.price.map[key].forEach(item => {
            obj['price' + item.weekId] = item.price / 100 || ''
          })
          this.tableData.push({
            timeId: key,
            ...obj
          })
        })
      })
    }
  },
  methods: {
    getHourList () {
      getHourList({
        basicId: this.id
      }).then((result) => {
        if ((result.data || []).length === 0) {
          this.isFirst = true
        } else if (this.isAdd) {
          (result.data || []).map(item => {
            this.tableData.push({
              timeId: item.timeId
            })
          })
        }
      })
    },
    changeStartTime () {
      this.endTime = ''
    },
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            priceAddTime({
              basicId: this.id,
              priceingMethod: this.type,
              ...this.form,
              list: this.tableData,
              isWeekend: this.isWeekend.filter(item => item).join(':')
            }).then(() => {
              this.callBack()
            })
          } else {
            priceAddTimeEdit({
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
    },
    addTime () {
      let flag = false
      this.tableData.forEach(item => {
        let _startTime = item.timeId.split('-')[0]
        let _endTime = item.timeId.split('-')[1]
        if (this.startTime >= _endTime || this.endTime <= _startTime) {
          flag = false
        } else {
          flag = true
        }
      })
      if (flag) {
        this.$message.error('不允许重叠时间段')
        return
      }
      this.tableData.push({
        timeId: this.startTime + '-' + this.endTime
      })
    },
    deleTime (scope) {
      this.tableData = this.tableData.filter((item, index) => { return scope.$index !== index })
    }
  }
}
</script>
