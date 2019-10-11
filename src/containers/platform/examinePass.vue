<style lang="scss" scoped>
  .input-wrap {
    width: 230px;
  }
  .table-wrap {
    margin-top: 10px;
  }
  .pagination-wrap {
    overflow: hidden;
    >div {
      float: right;
    }
    margin-top: 10px;
  }
  .desc-wrap {
    padding: 10px;
  }
</style>
<template>
  <div>
    <div class="desc-wrap">
      <p>1、本部分所指商户均为已通过审核的商户；</p>
      <p>2、商户续费后会员到期时间会自动更新；</p>
      <p>3、为商户创造的实收营业额：指不扣除平台抽佣的订单回款额；</p>
      <p>4、该商户已完成的订单总数包括：坤仔预订订单数订单数+商户后台下单数；</p>
    </div>
    <div>
      <el-input class="input-wrap" v-model="phone" placeholder="请输入手机号"></el-input>
      <el-button type="primary" @click="goSearch">搜索</el-button>
    </div>
    <div class="table-wrap">
       <el-table
        :border="true"
        :data="tableData.list"
        style="width: 100%">
        <el-table-column
          prop="date"
          width="300"
          label="基础信息">
          <template slot-scope="scope">
            <p>手机号：{{ scope.row.filed.phone }}</p>
            <p>老板或管家姓名：{{ scope.row.filed.name }}</p>
            <p>邮箱：{{ scope.row.filed.email }}</p>
            <p>会员类型: {{ vipStatus[scope.row.vip] }}</p>
            <p>会员过期时间: {{ scope.row.filed.expTime }}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="name"
          label="商户后台信息">
          <template slot-scope="scope">
            <router-link to="examinePassDetail"><el-button type="text" size="small">订单回款</el-button></router-link>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="创建数量">
          <template slot-scope="scope">
            <p>场馆：{{ scope.row.num1 }}</p>
            <p>项目：{{ scope.row.num2 }}</p>
            <p>活动：{{ scope.row.num3 }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="succMoney"
          label="为商户创造的实收营业额(元)">
          <template slot-scope="scope">
            <div>{{ (scope.row.succMoney || 0) / 100 }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="商户状态">
        </el-table-column>
        <el-table-column
          prop="sale"
          label="该商户成功邀请的商户数量">
        </el-table-column>
        <el-table-column
          prop="succRate1"
          label="该商户已完成的订单总数；其中通过坤仔预订成单的比例">
          <template slot-scope="scope">
            <p>{{ scope.row.orderSize }}</p>
            <p>{{ scope.row.succRate }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="goMerchantFreeze(scope.row)" type="text" size="small">{{ scope.row.state === '冻结'?'解冻':'冻结' }}</el-button>
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
  </div>
</template>
<script>
import { merchantInfo, merchantFreeze } from './../../api/platform'
export default {
  data () {
    return {
      vipStatus: {
        0: '普通会员',
        1: '高级会员',
        2: 'VIP'
      },
      phone: '',
      pageNum: 1,
      tableData: []
    }
  },
  beforeMount () {
    this.getMerchantInfo({pageNum: 1})
  },
  methods: {
    goMerchantFreeze (row) {
      merchantFreeze({ filedId: row.filed.id }).then((result) => {
        this.getMerchantInfo()
      })
    },
    getMerchantInfo (params) {
      merchantInfo({ ...params, phone: this.phone, pageNum: this.pageNum }).then((result) => {
        this.tableData = result.data
      })
    },
    goPage (pageNum) {
      this.pageNum = pageNum
      this.getMerchantInfo()
    },
    goSearch () {
      this.pageNum = 1
      this.getMerchantInfo()
    }
  }
}
</script>
