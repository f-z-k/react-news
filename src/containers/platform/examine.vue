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
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              label="待审核"
              value="2">
            </el-option>
            <el-option
              label="未通过"
              value="0">
            </el-option>
            <el-option
              label="已通过"
              value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="推荐码">
          <el-input v-model="form.saleNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
       <el-table
        :data="tableData.list || []"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="老板或管家姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="saleNo"
          label="推荐码">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          label="申请时间">
        </el-table-column>
        <el-table-column
          prop="isPass"
          label="状态">
          <template slot-scope="scope">
            <div>{{ status[scope.row.isPass] }}</div>
            <div v-if="scope.row.isPass === '0'">原因：{{ scope.row.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="身份证信息">
          <template slot-scope="scope">
            <a :href="scope.row.idImg" target="_blank"><el-button type="text" size="small">正面</el-button></a>
          </template>
        </el-table-column>
        <el-table-column
          prop="filedImg"
          label="营业执照">
          <template slot-scope="scope">
            <a :href="scope.row.filedImg" target="_blank"><el-button type="text" size="small">执照</el-button></a>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.isPass === '2'">
              <el-button type="text" size="small" @click="goFiledCheck(scope.row, 1)">通过</el-button>
              <el-button type="text" size="small" @click="open(scope.row, 0)">不通过</el-button>
            </div>
            <div v-else><el-button disabled type="text" size="small">已审核</el-button></div>
          </template>
        </el-table-column>
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
import { getFiled, filedCheck } from './../../api/platform'
export default {
  data () {
    return {
      status: {0: '未通过', 1: '通过', 2: '待审核'},
      form: {
        activeType: ''
      },
      tableData: []
    }
  },
  beforeMount () {
    this.getFiledList()
  },
  methods: {
    getFiledList (params) {
      getFiled({ ...params, ...this.form }).then((result) => {
        this.tableData = result.data
      })
    },
    goSearch () {
      this.getFiledList({ pageNum: 1 })
    },
    goFiledCheck (item, status, describle) {
      filedCheck({
        id: item.id,
        isPass: status,
        describle
      }).then((result) => {
        this.goSearch()
      })
    },
    goPage (pageNum) {
      this.getFiledList({ pageNum })
    },
    open (item, status) {
      this.$prompt('请输入原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.goFiledCheck(item, status, value)
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
