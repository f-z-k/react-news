<style lang="scss" scoped>

</style>
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="basicName"
          label="场馆（分店）/团建项目">
        </el-table-column>
        <el-table-column
          prop="priceName"
          label="套餐名称">
          <template slot-scope="scope">
            <div>
              {{ scope.row.priceBasicInfo.priceName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="site"
          label="场次/时间段">
           <template slot-scope="scope">
            <div>
              <p v-for="item in (scope.row.priceBasicInfo.priceInfo || [])" :key="item.siteId">{{ siteTypeList[item.siteId] }}</p>
              <p v-for="item in (scope.row.priceBasicInfo.priceInfo || [])" :key="item.timeId">{{ item.timeId }}</p>

            </div>
           </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog title="设置" :visible.sync="dialogVisible ">
        <el-form ref="form" :rules="rules" :model="form" label-width="150px">
          <el-form-item label="场馆/项目/活动" prop="basicIds">
            <el-select v-model="form.basicIds" placeholder="请选择">
              <el-option
                v-for="(item, index) in areaList"
                :key="index"
                :label="item.basic && item.basic.proName"
                :value="item.basic && item.basic.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="套餐" prop="priceIds">
            <el-select v-model="form.priceIds" value-key="priceBasic" placeholder="请选择">
              <el-option
                v-for="(item, index) in priceList"
                :key="index"
                :label="item.priceBasic && item.priceBasic.areaName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.priceIds && form.priceIds.site" label="场次/时段" prop="regionIds">
            <el-select multiple v-if="form.priceIds && form.priceIds.priceBasic && (form.priceIds.priceBasic.priceingMethodId === 1 || form.priceIds.priceBasic.priceingMethodId === 4)" v-model="form.regionIds" placeholder="请选择">
              <el-option
                v-for="(item, index) in form.priceIds.site"
                :key="index"
                :label="siteTypeList[item]"
                :value="item"
              ></el-option>
            </el-select>
            <el-select multiple v-if="form.priceIds && form.priceIds.priceBasic && (form.priceIds.priceBasic.priceingMethodId === 3 || form.priceIds.priceBasic.priceingMethodId === 6)" v-model="form.regionIds" placeholder="请选择">
              <el-option
                v-for="(item, index) in form.priceIds.site"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelDialog">取 消</el-button>
          <el-button type="primary" @click="setConfig">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { regionInfo, basiceTopOrder, regionAdd, regionDele } from './../../api/merchant'
import { siteTypeList } from './projectConfig'
export default {
  data () {
    return {
      siteTypeList: siteTypeList,
      dialogVisible: false,
      tableData: [],
      form: {},
      areaList: [],
      rules: {
        basicIds: [{ required: true, message: '请选择场馆、项目、活动' }],
        priceIds: [{ required: true, message: '请选择套餐' }],
        regionIds: [{ required: true, message: '请选择场次' }]
      }
    }
  },
  beforeMount () {
    this.getRegionInfo()
    this.getBasiceTopOrder()
  },
  computed: {
    priceList: function () {
      let _areaList = []
      _areaList = this.areaList.filter(item => {
        return item.basic && item.basic.id === this.form.basicIds
      })
      return _areaList[0] && _areaList[0].price
    }
  },
  methods: {
    cancelDialog () {
      this.form = {}
      this.dialogVisible = false
    },
    setConfig () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { form } = this
          regionAdd({
            basicIds: form.basicIds,
            priceIds: form.priceIds && form.priceIds.priceBasic.id,
            regionIds: form.regionIds ? form.regionIds.join(',') : null
          }).then((result) => {
            this.getRegionInfo()
            this.dialogVisible = false
          })
        }
      })
    },
    deleItem (item) {
      regionDele({
        id: item.id
      }).then((result) => {
        this.getRegionInfo()
      })
    },
    getRegionInfo () {
      regionInfo().then((result) => {
        this.tableData = result.data || []
      })
    },
    getBasiceTopOrder () {
      basiceTopOrder().then((result) => {
        this.areaList = result.data
      })
    }
  }
}
</script>
