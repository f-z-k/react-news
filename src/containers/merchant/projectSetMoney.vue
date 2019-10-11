<style lang="scss" scoped>
  .el-input-number {
    width: 220px;
  }
  .pagination-wrap {
    overflow: hidden;
    div {
      float: right;
    }
    margin-top: 20px;
  }
</style>
<template>
  <div>
    <div>
      <el-form :inline="true" :model="form">
        <el-form-item label="类型">
          <el-select v-model="form.type" @change="goSearch" placeholder="请选择">
            <el-option
              v-for="(item, index) in typeStatus"
              :key="index"
              :label="item"
              :value="index + 1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!form.type" @click="dialogVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :key="form.type"
      :data="tableData.list || []"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        v-if="userInfo.userType === 2 || userInfo.userType === 3"
        prop="type"
        label="适用范围">
        <template slot-scope="scope">
          <div>
            <p v-for="item in scope.row.other" :key="item.id">{{ item.other2 && item.other2.proName }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type === 3 || form.type === 4 || form.type === 5"
        prop="disAmount"
        label="购买价格">
        <template slot-scope="scope">
            <div>{{ scope.row.disAmount / 100 || '' }}元</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type === 1"
        prop="amount"
        label="面值"
      >
        <template slot-scope="scope">
            <div>{{ scope.row.amount / 100 || '' }}元</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type !== 1 && form.type !== 2"
        prop="num"
        label="享受权益"
      >
        <template slot-scope="scope">
          <div>
            <p v-if="form.type === 3">{{ scope.row.num }}小时</p>
            <p v-if="form.type === 4">{{ scope.row.num }}场</p>
            <p v-if="form.type === 5">{{ scope.row.num }}天</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type === 1"
        prop="disAmount"
        label="满多少可用">
        <template slot-scope="scope">
          <div>{{ scope.row.disAmount / 100 || '' }}元</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type === 2"
        prop="amount"
        label="折扣">
        <template slot-scope="scope">
          <div>{{ `${ scope.row.amount }折` }}</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type !== 1 && form.type !== 2"
        prop="weekend"
        label="适用周几"
      >
        <template slot-scope="scope">
          <div>
            <p v-for="item in scope.row.weekend && scope.row.weekend.split(':')" :key="item">{{ weekStatus[item - 1] }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type !== 1 && form.type !== 2 && form.type !== 5"
        prop="weekend"
        label="适用时段"
      >
        <template slot-scope="scope">
          <div>
            <p v-for="item in scope.row.time && scope.row.time.split(',')" :key="item">{{ form.type === 4?siteTypeList[item]:item }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="有效日期">
        <template slot-scope="scope">
          <div>
            <p>{{ moment(scope.row.startTime).format('YYYY-MM-DD') }}</p>
            <p>{{ moment(scope.row.endTime).format('YYYY-MM-DD') }}</p>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        v-if="form.type !== 1 && form.type !== 2"
        prop="isDis"
        label="有效期内场次卡用完后预订是否打折"
      >
        <template slot-scope="scope">
          <div>
            <p>{{ scope.row.isDis?'是':'否' }}</p>
            <p>{{ scope.row.disInfo?(scope.row.disInfo + '折'):'' }}</p>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        v-if="form.type !== 1 && form.type !== 2"
        prop="desInfo"
        label="备注"
      >
      </el-table-column>
      <el-table-column
        prop="aa"
        label="总数/已领数">
        <template slot-scope="scope">
          {{ (scope.row.totalStock || 0) + '/' + ((scope.row.totalStock || 0) - (scope.row.supStock || 0))}}
        </template>
      </el-table-column>
      <el-table-column
        prop="opeate"
        label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="goDeleCoupon(scope.row.id)">删除</el-button>
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
    <div>
      <el-dialog width="700px" title="" v-if="dialogVisible" :visible.sync="dialogVisible">
        <ProjectSetMoneyPackage v-if="form.type === 1 && dialogVisible" @hideModal="goHideModal"/>
        <ProjectSetMoneyDiscount v-if="form.type === 2 && dialogVisible"  @hideModal="goHideModal"/>
        <ProjectSetMoneyHour v-if="form.type === 3 && dialogVisible" @hideModal="goHideModal"/>
        <ProjectSetMoneySite v-if="form.type === 4 && dialogVisible" @hideModal="goHideModal"/>
        <ProjectSetMoneyDay v-if="form.type === 5 && dialogVisible" @hideModal="goHideModal"/>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getCouponList, deleCoupon } from './../../api/merchant'
import ProjectSetMoneyPackage from './projectSetMoneyPackage'
import ProjectSetMoneyDiscount from './projectSetMoneyDiscount'
import ProjectSetMoneyHour from './projectSetMoneyHour'
import ProjectSetMoneySite from './projectSetMoneySite'
import ProjectSetMoneyDay from './projectSetMoneyDay'
import { siteTypeList } from './projectConfig'
import moment from 'moment'
export default {
  data () {
    return {
      moment: moment,
      userInfo: this.$store.state.user.info,
      siteTypeList: siteTypeList,
      weekStatus: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      dialogVisible: false,
      form: {
        type: 1
      },
      tableData: {}
    }
  },
  computed: {
    typeStatus: function () {
      if (this.userInfo.userType === 0 || this.userInfo.userType === 1) {
        return ['红包券', '折扣券']
      } else {
        return ['红包券', '折扣券', '小时卡', '场次卡', '天数卡']
      }
    }
  },
  components: {
    ProjectSetMoneyPackage,
    ProjectSetMoneyDiscount,
    ProjectSetMoneyHour,
    ProjectSetMoneySite,
    ProjectSetMoneyDay
  },
  beforeMount () {
    this.getCouponList()
  },
  methods: {
    goDeleCoupon (id) {
      deleCoupon({
        id
      }).then((result) => {
        this.getCouponList()
      })
    },
    goSearch () {
      this.getCouponList()
    },
    goHideModal () {
      this.dialogVisible = false
      this.getCouponList()
    },
    goPage (pageNum) {
      this.getCouponList(pageNum)
    },
    getCouponList (pageNum) {
      getCouponList({
        type: this.form.type,
        pageNum
      }).then((result) => {
        this.tableData = result.data
        this.tableData.list = result.data.list.map(item => {
          return {
            ...item.conf,
            ...item
          }
        })
      })
    }
  }
}
</script>
