<style lang="scss" scoped>
  .pagination-wrap {
    float: right;
    margin-top: 10px;
  }
</style>
<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="推荐码">
          <el-input v-model="form.saleNo"></el-input>
        </el-form-item>
        <el-form-item label="月份">
          <el-date-picker
            v-model="form.createTime"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">查询</el-button>
        </el-form-item>
        <el-form-item>
          酬劳总价{{ ((tableData.sum || 0) / 100) }}元
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="tableData.result && tableData.result.list"
        style="width: 100%">
        <el-table-column
          prop="type"
          label="推广来源"
        >
        </el-table-column>
        <el-table-column
          prop="sale_no"
          label="推荐码"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          prop="admin_name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="member_name"
          label="会员类型"
        >
        </el-table-column>
        <el-table-column
          prop="gmTime"
          label="会员购买时间"
        >
        </el-table-column>
        <el-table-column
          prop="amount"
          label="酬劳(元)"
        >
          <template slot-scope="scope">
            <p>{{ (scope.row.amount || 0) / 100 }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        background
        @current-change="this.goPage"
        layout="prev, pager, next"
        :total="tableData.result && tableData.result.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { ptDtList } from './../../api/platform.js'
export default {
  data () {
    return {
      form: {},
      tableData: {}
    }
  },
  beforeMount () {
    this.getPtDtList()
  },
  methods: {
    submit () {
      this.getPtDtList(1)
    },
    goPage (pageNum) {
      this.getPtDtList(pageNum)
    },
    getPtDtList (pageNum) {
      ptDtList({
        ...this.form,
        pageNum: pageNum || 1
      }).then((result) => {
        this.tableData = result.data
      })
    }
  }
}
</script>
