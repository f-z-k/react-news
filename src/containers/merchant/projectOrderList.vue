<style lang="scss" scoped>
  .pagination-wrap {
    margin-top: 10px;
    overflow: hidden;
    >div {
      float: right;
    }
  }
</style>
<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="下单日期">
          <el-date-picker
            v-model="form.orderDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动日期">
          <el-date-picker
            v-model="form.activeDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.keyWord" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData.list"
        style="width: 100%">
        <!-- <el-table-column
          prop="channel"
          label="渠道">
        </el-table-column> -->
        <el-table-column
          prop="orderId"
          width="120"
          label="订单号">
        </el-table-column>
        <!-- <el-table-column
          prop="nickName"
          label="用户昵称">
        </el-table-column> -->
        <!-- <el-table-column
          prop="name"
          label="真实姓名">
        </el-table-column> -->
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="item"
          label="购买项目">
          <template slot-scope="scope">
            <div>
              {{ scope.row.goodsName === '支付订单' ? scope.row.basicName :  scope.row.coupon }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="订单额(元)"
          width="100px">
          <template slot-scope="scope">
            <div>
              <p>{{ (scope.row.amount || 0) / 100 }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="coupon"
          label="使用优惠券">
          <template slot-scope="scope">
              <div v-if="scope.row.goodsName === '支付订单'">{{ !scope.row.coupon ? "--" :  scope.row.coupon}}</div>
            <div v-else>{{ '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="accAmount"
          label="应付额(元)">
          <template slot-scope="scope">
            <div>
              <p>{{ scope.row.accAmount / 100 || '--'  }}</p>
              <el-button v-if="scope.row.status === '待支付'" type="text" @click="open(scope.row, 3)">修改金额</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          width="100"
          label="下单日期">
          <template slot-scope="scope">
            <div>
              <p>{{ moment(scope.row.time).format('MM-DD') }}</p>
              <p>{{ moment(scope.row.time).format('HH:mm:ss') }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          width="175"
          label="活动日期">
          <template slot-scope="scope">
            <div>
              <p>{{ scope.row.hdStartTime && scope.row.goodsName === '支付订单'? "开始时间：" + scope.row.hdStartTime : '--' }}</p>
              <p>{{ scope.row.hdEndTime && scope.row.goodsName === '支付订单'? "结束时间：" + scope.row.hdEndTime : '--' }}</p>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="status"
          label="取消订单">
          <template slot-scope="scope">
            <div>
              <el-button v-if="scope.row.status === '待支付'" type="text">取消订单</el-button>
              <p v-else>不能取消</p>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="status"
          label="订单状态">
           <template slot-scope="scope">
            <div>
              {{ scope.row.goodsName === '购买优惠券订单' ? "--" : scope.row.status }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="moneyBack"
          label="是否回款">
            <template slot-scope="scope">
              <div>{{ scope.row.moneyBack?'是':'否' }}</div>
            </template>
        </el-table-column>
        <el-table-column
          prop="moneyBackAmount"
          label="回款额(元)">
          <template slot-scope="scope">
            <div>{{ scope.row.moneyBackAmount / 100 || '--' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkNo"
          width="80"
          label="核验码">
          <template slot-scope="scope">
            <div>
              {{ scope.row.checkNo || '--' }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="desc"
          label="用户评价">
          <template slot-scope="scope">
            <div>
              <p v-if="scope.row.desc">{{ '评价：' + scope.row.desc }}</p>
              <p v-if="!scope.row.desc">--</p>
              <el-button v-if="scope.row.desc && !scope.row.repNo" type="text" @click="open(scope.row, 2)">回复</el-button>
              <p v-if="scope.row.repNo">{{ '回复：' + scope.row.repNo }}</p>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        background
        @current-change="this.goPage"
        layout="prev, pager, next"
        :total="tableData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { orderOwner, orderCheck, orderRep, basicOrderPrice } from './../../api/merchant'
export default {
  data () {
    return {
      moment: moment,
      id: this.$route.params.id,
      pageNum: 1,
      form: {},
      tableData: {
        orderDate: [],
        activeDate: []
      }
    }
  },
  beforeMount () {
    this.getOrderList()
  },
  methods: {
    getOrderList (params) {
      orderOwner({
        basicId: this.id,
        ...params,
        createTime1: this.form.orderDate && this.form.orderDate[0],
        createTime2: this.form.orderDate && this.form.orderDate[1],
        ydTime1: this.form.activeDate && this.form.activeDate[0],
        ydTime2: this.form.activeDate && this.form.activeDate[1],
        keyWord: this.form.keyWord
      }).then((result) => {
        this.tableData = result.data
      })
    },
    goSearch () {
      this.getOrderList({ pageNum: 1 })
    },
    goPage (pageNum) {
      this.getOrderList({ pageNum })
    },
    open (item, type) {
      let msg = {
        1: '请输入核验码',
        2: '请输入回复',
        3: '请输入金额'
      }
      this.$prompt(msg[type], '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (type === 1) {
          orderCheck({ orderNum: item.orderId, checkNo: value }).then((result) => {
            this.getOrderList()
            this.$message({
              type: 'success',
              message: '核验成功'
            })
          })
        } else if (type === 2) {
          orderRep({ orderNum: item.orderId, checkNo: value }).then((result) => {
            this.getOrderList()
            this.$message({
              type: 'success',
              message: '回复成功'
            })
          })
        } else if (type === 3) {
          console.log(Number(value))
          if (!Number(value)) {
            this.$message({
              type: 'error',
              message: '请输入金额！'
            })
            return
          }
          basicOrderPrice({ orderNum: item.orderId, accAmount: value * 100 }).then((result) => {
            this.getOrderList()
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }

}
</script>
