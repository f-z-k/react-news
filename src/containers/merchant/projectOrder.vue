<style lang="scss" scoped>
  .pagination-wrap {
    overflow: hidden;
    margin-top: 10px;
    >div {
      float: right;
    }
  }
</style>
<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增预订</el-button>
    <div>
      <el-table
        :data="tableData.list"
        style="width: 100%">
        <el-table-column
          prop="basicName"
          label="场馆（分店）/团建项目">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="priceBasicMethod"
          label="套餐类型">
          <template slot-scope="scope">
            <div>
              {{ priceStatus[scope.row.priceBasicMethod - 1] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="预订时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop="time"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleOrder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrap">
        <div>
          <el-pagination
            background
            @current-change="this.goPage"
            layout="prev, pager, next"
            :total="tableData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <el-dialog title="预订"  :visible.sync="dialogVisible">
        <el-form :model="form" label-width="100px">
          <el-form-item label="名称">
            <el-select v-model="form.id" placeholder="请选择类别">
              <el-option
                v-for="(item, index) in areaList"
                :key="index"
                :label="item.basic && item.basic.proName"
                :value="item.basic && item.basic.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="套餐">
            <el-select v-model="form.price" value-key="priceBasic" placeholder="请选择类别">
              <el-option
                v-for="(item, index) in priceList"
                :key="index"
                :label="item.priceBasic && item.priceBasic.areaName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.price && form.price.site" label="场次/时间段">
            <el-select v-if="form.price && form.price.priceBasic && (form.price.priceBasic.priceingMethodId === 1 || form.price.priceBasic.priceingMethodId === 4)" v-model="form.index" placeholder="请选择类别">
              <el-option
                v-for="(item, index) in form.price.site"
                :key="index"
                :label="siteTypeList[item]"
                :value="item"
              ></el-option>
            </el-select>
            <el-select  v-if="form.price && form.price.priceBasic && (form.price.priceBasic.priceingMethodId === 3 || form.price.priceBasic.priceingMethodId === 6)"  v-model="form.index" placeholder="请选择类别">
              <el-option
                v-for="(item, index) in form.price.site"
                :key="index"
                :label="item"
                :value="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="form.price.priceBasic.priceingMethodId === 7?'份数':'人数'" v-if="form.price && form.price.priceBasic && [4, 5, 6, 7].indexOf(form.price.priceBasic.priceingMethodId > -1)">
            <div style="width: 220px;">
              <el-input-number v-model="form.num" :min="form.price && form.price.priceBasic.num" :max="form.price && form.price.priceBasic.maxNum" placeholder="请输入"></el-input-number>
            </div>
          </el-form-item>
          <el-form-item label="时间">
             <el-date-picker
                v-model="form.time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="备注" v-if="form.price && (form.price.priceBasic.priceingMethodId === 2 || form.price.priceBasic.priceingMethodId === 5) && form.price.priceBasic.isBind === '1'">
            由于此套餐设置了连续预订{{ form.price && form.price.priceBasic.reserveMethod }}天，所有你选择的时间为：
            <div>
              {{ continuityDay.join('，') }}
            </div>
          </el-form-item>
          <el-form-item label="备注" v-if="form.price && (form.price.priceBasic.priceingMethodId === 3 || form.price.priceBasic.priceingMethodId === 6) && (form.price.priceBasic.priceingMethodId === 3 || form.price.priceBasic.priceingMethodId === 6) && form.price.priceBasic.isBind === '1'">
            由于此套餐设置了连续预订{{ form.price.priceBasic.reserveMethod }}时间段，所有你选择的时间段为：
            <div>
              {{ continuityHour.join('，') }}
            </div>
          </el-form-item>
          <el-form-item label="预订人手机号">
            <div style="width: 220px;">
              <el-input v-model="form.phone" placeholder="请输入"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="goOrder">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { siteTypeList } from './projectConfig'
import { basiceTopOrder, tradeOrder, orderOwner, tradeOrderDele } from './../../api/merchant'
export default {
  data () {
    return {
      dialogVisible: false,
      priceStatus: ['按场计价且所填价格表示总价', '按天计价且所填价格表示总价', '按小时计价且所填价格表示总价', '按场计价且所填价格表示人均价', '按天计价且所填价格表示人均价', '按小时计价且所填价格表示均价', '按份计价'],
      siteTypeList: siteTypeList,
      moment: moment,
      form: {},
      tableData: [],
      areaList: []
    }
  },
  computed: {
    priceList: function () {
      let _areaList = []
      _areaList = this.areaList.filter(item => {
        return item.basic && item.basic.id === this.form.id
      })
      return _areaList[0] && _areaList[0].price
    },
    continuityDay: function () {
      let { form } = this
      if (form.time && form.price && form.price.priceBasic && (form.price.priceBasic.priceingMethodId === 2 || form.price.priceBasic.priceingMethodId === 5) && form.price.priceBasic.isBind === '1') {
        let _index = Number(form.price.priceBasic.reserveMethod)
        let _time = []
        for (let i = 0; i < _index; i++) {
          _time.push(moment(form.time).add(i, 'days').format('YYYY-MM-DD'))
        }
        return _time
      } else {
        return []
      }
    },
    continuityHour: function () {
      let { form } = this
      if (form.index >= 0 && form.price && form.price.priceBasic && (form.price.priceBasic.priceingMethodId === 3 || form.price.priceBasic.priceingMethodId === 6) && form.price.priceBasic.isBind === '1') {
        let _site = form.price.site.concat(form.price.site)
        return _site.splice(form.index, form.price.priceBasic.reserveMethod)
      } else {
        return []
      }
    }
  },
  beforeMount () {
    this.getOrderList()
    this.getBasiceTopOrder()
  },
  methods: {
    deleOrder (item) {
      tradeOrderDele({
        orderId: item.orderId,
        channel: 1
      }).then((result) => {
        this.getOrderList()
      })
    },
    getOrderList (params) {
      orderOwner({
        channel: 1,
        ...params
      }).then((result) => {
        this.tableData = result.data
      })
    },
    goPage (pageNum) {
      this.getOrderList({ pageNum })
    },
    getBasiceTopOrder () {
      basiceTopOrder().then((result) => {
        this.areaList = result.data
      })
    },
    orderShare () {
      let { form } = this
      let data = {
        list: [{
          reserveDate: form.time
        }],
        num: form.num
      }
      return data
    },
    orderDay () {
      let { form, continuityDay } = this
      let data = {
        list: [],
        num: form.num
      }
      if (continuityDay.length > 0) {
        continuityDay.forEach(element => {
          data.list.push({
            reserveDate: element
          })
        })
      } else {
        data.list = [{
          reserveDate: form.time
        }]
      }
      return data
    },
    orderHour () {
      let { form, continuityHour } = this
      let data = {
        list: [],
        num: form.num
      }
      if (continuityHour.length > 0) {
        continuityHour.forEach(element => {
          data.list.push({
            regionId: element,
            reserveDate: form.time
          })
        })
      } else {
        data.list = [{
          regionId: form.price && form.price.site[form.index],
          reserveDate: form.time
        }]
      }
      return data
    },
    orderSite () {
      let { form } = this
      let data = {
        list: [
          {
            regionId: form.index,
            reserveDate: form.time
          }
        ],
        num: form.num
      }
      return data
    },
    goOrder () {
      let { form } = this
      let basicData = {
        channel: 1, //
        payType: 1,
        phone: form.phone,
        priceBasicId: form.price && form.price.priceBasic.id
      }
      let sendData = {}
      if (form.price && (form.price.priceBasic.priceingMethodId === 1 || form.price.priceBasic.priceingMethodId === 4)) {
        sendData = {
          ...basicData,
          ...this.orderSite()
        }
      } else if (form.price && (form.price.priceBasic.priceingMethodId === 3 || form.price.priceBasic.priceingMethodId === 6)) {
        sendData = {
          ...basicData,
          ...this.orderHour()
        }
      } else if (form.price && (form.price.priceBasic.priceingMethodId === 2 || form.price.priceBasic.priceingMethodId === 5)) {
        sendData = {
          ...basicData,
          ...this.orderDay()
        }
      } else if (form.price && form.price.priceBasic.priceingMethodId === 7) {
        sendData = {
          ...basicData,
          ...this.orderShare()
        }
      }
      tradeOrder({ ...sendData }).then((result) => {
        this.dialogVisible = false
        this.getOrderList()
      })
    }
  }
}
</script>
