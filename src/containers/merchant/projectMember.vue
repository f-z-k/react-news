<style lang="scss" scoped>

</style>
<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="descInfo"
        label="会员权益"
      >
      </el-table-column>
      <el-table-column
        prop="commRate"
        :label="'普通会员-免费'"
      >
      <template slot-scope="scope">
        <div>
          <p v-if="scope.row.commRate === '-1' || scope.row.commRate === '-2' ||  scope.row.commRate === '-3'">
            {{ scope.row.commRate === '-1'?'✘':(scope.row.commRate === '-2'?'✓':'不限')}}
          </p>
          <p v-else>
            {{ (scope.row.descInfo === '场馆/团建/会议类手续费' || scope.row.descInfo === '活动项目类手续费' || scope.row.descInfo === '走独立小程序时的手续费(人工月结)')?((scope.row.commRate * 100).toFixed(2) + '%'):scope.row.commRate }}
          </p>
        </div>
      </template>
      </el-table-column>
      <el-table-column
        prop="vipRate"
          label="高级会员-月会员99元-年会员999元">
        <template slot-scope="scope">
          <div>
            <p v-if="scope.row.vipRate === '-1' || scope.row.vipRate === '-2' ||  scope.row.vipRate === '-3'">
              {{ scope.row.vipRate === '-1'?'✘':(scope.row.vipRate === '-2'?'✓':'不限')}}
            </p>
            <p v-else>
              {{ (scope.row.descInfo === '场馆/团建/会议类手续费' || scope.row.descInfo === '活动项目类手续费' || scope.row.descInfo === '走独立小程序时的手续费(人工月结)')?((scope.row.vipRate * 100).toFixed(2) + '%'):scope.row.vipRate }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="seniorRate"
        label="VIP会员-月会员199元-年会员1999元">
        >
        <template slot-scope="scope">
          <div>
            <p v-if="scope.row.seniorRate === '-1' || scope.row.seniorRate === '-2' ||  scope.row.seniorRate === '-3'">
              {{ scope.row.seniorRate === '-1'?'✘':(scope.row.seniorRate === '-2'?'✓':'不限')}}
            </p>
            <p v-else>
              {{ (scope.row.descInfo === '场馆/团建/会议类手续费' || scope.row.descInfo === '活动项目类手续费' || scope.row.descInfo === '走独立小程序时的手续费(人工月结)')?((scope.row.seniorRate * 100).toFixed(2) + '%'):scope.row.seniorRate }}
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 600px;padding: 10px 20px 80px">
      <p>备注：</p>
      <p>1、已完成订单手续费的基数均是客户实际支付的费用</p>
      <p>2、所有订单的结算事件均为活动完成的日期后12小时之内，回款金额会自动扣除手续费后到达商户账户（如有一个订单有多个活动日期，以最后一个活动的日期为准）</p>
      <p>3、VIP商户如果需要开发一个独立小程序，请联系客服咨询详情</p>
      <p>4、如对会员权益及费用有疑问，欢迎拨打热线4000-855-919咨询</p>
    </div>
  </div>
</template>
<script>
import { memberInfo } from './../../api/merchant'
export default {
  data () {
    return {
      tableData: [],
      vip: []
    }
  },
  created () {
    this.getMemberInfo()
  },
  methods: {
    getMemberInfo () {
      memberInfo().then(result => {
        this.vip = result.data.vip
        this.tableData = result.data.rate
      })
    }
  }
}
</script>
