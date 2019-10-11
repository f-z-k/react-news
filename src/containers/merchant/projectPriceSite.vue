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
        <el-form-item v-if="type === '4'" label="起订人数" prop="num">
          <el-input-number v-model="form.num" :precision="0" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item v-if="type === '4'" label="最多可订人数"  prop="maxNum">
          <el-input-number v-model="form.maxNum" :precision="0" :min="0"></el-input-number>
        </el-form-item>
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
      <el-select v-model="siteId">
        <el-option
          v-for="(item, index) in siteTypeList"
          :key="index"
          :label="item"
          :value="index">
        </el-option>
      </el-select>
      <el-button type="primary" @click="addSite">新增场次</el-button>
    </div>
    <div>
      <el-table
      :border="true"
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="siteId"
          label="场次">
          <template slot-scope="scope">
            <div>{{ siteTypeList[scope.row.siteId] }}</div>
          </template>
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
          prop="price7"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="deleSite(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" @click="onSubmit()">保存</el-button>
  </div>
</template>
<script>
import { priceAddSite, priceDetail, priceAddSiteEdit } from './../../api/merchant'
import { siteTypeList } from './projectConfig'
export default {
  props: ['id', 'isAdd', 'type', 'callBack', 'priceId'],
  data () {
    return {
      isWeekend: [],
      siteId: '1',
      siteTypeList: siteTypeList,
      tableData: [],
      form: {
        // deposit: '0'
      },
      rules: {
        areaName: [{ required: true, message: '请输入套餐名称' }],
        areaNum: [{ required: true, message: '请输入套餐总数量' }],
        num: [{ required: true, message: '请输入起订人数' }],
        maxNum: [{ required: true, message: '请输入最多可订人数' }]
      }
    }
  },
  beforeMount () {
    if (!this.isAdd) {
      priceDetail({
        priceId: this.priceId
      }).then((result) => {
        let { areaName, areaNum, num, maxNum, isWeekend, descInfo, deposit } = result.data.price
        this.form = { areaName, areaNum, num, maxNum, descInfo, deposit }
        let _isWeekend = (isWeekend && isWeekend.split(':')) || []
        _isWeekend.forEach(item => {
          this.$set(this.isWeekend, item - 1, item)
        })
        let keyArr = Object.keys(result.data.price.map)
        keyArr.forEach(key => {
          console.log(key)
          let obj = {}
          result.data.price.map[key].forEach(item => {
            obj['price' + item.weekendId] = item.price / 100 || ''
          })
          this.tableData.push({
            siteId: key,
            ...obj
          })
        })
      })
    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            priceAddSite({
              basicId: this.id,
              priceingMethod: this.type,
              ...this.form,
              list: this.tableData,
              isWeekend: this.isWeekend.filter(item => item).join(':')
            }).then(() => {
              this.callBack()
            })
          } else {
            priceAddSiteEdit({
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
    addSite () {
      let isHasSited = false
      this.tableData.forEach(item => {
        if (item.siteId === this.siteId) {
          isHasSited = true
        }
      })
      if (!isHasSited) {
        this.tableData.push({
          siteId: this.siteId
        })
      } else {
        this.$message({
          message: '不能重复添加',
          type: 'warning'
        })
      }
    },
    deleSite (scope) {
      this.tableData = this.tableData.filter((item, index) => { return scope.$index !== index })
    }
  }
}
</script>
