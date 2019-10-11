<style lang="scss" scoped>
  .pagination-wrap {
    float: right;
    margin-top: 10px;
  }
</style>
<template>
  <div>
    <div>
      <el-select v-model="status" placeholder="请选择" @change="statusChange">
        <el-option
          label="全部"
          :value="''">
        </el-option>
        <el-option
          label="未处理"
          :value="1">
        </el-option>
        <el-option
          label="已处理"
          :value="2">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-table
        :data="tableData.list"
        style="width: 100%">
        <el-table-column
          prop="proName"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="城市">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="日期">
          <template slot-scope="scope">
            <div>
              <p>{{ moment(scope.row.startTime).format('MM-DD') }}</p>
              <p>{{ moment(scope.row.endTime).format('MM-DD') }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="timeInfo"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="day"
          label="天数">
        </el-table-column>
        <el-table-column
          prop="num"
          label="人数">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="equs"
          label="功能">
        </el-table-column>
        <el-table-column
          prop="descInfo"
          label="需求描述">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <div>
              {{ scope.row.status === 1?'未处理':'已处理' }}
              <div v-if="scope.row.status !== 1">备注：{{ scope.row.handleInfo }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              <div><el-button type="text" size="small" @click="open(scope.row.id, 2)">处理</el-button></div>
              <!-- <div><el-button type="text" size="small" @click="goDemandHandle(scope.row.status, 3)">联系不到</el-button></div> -->
            </div>
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
import moment from 'moment'
import { demandList, demandHandle } from './../../api/platform'
export default {
  data () {
    return {
      moment: moment,
      status: '',
      tableData: []
    }
  },
  beforeMount () {
    this.getDemandList()
  },
  methods: {
    goPage (pageNum) {
      this.getDemandList({ pageNum })
    },
    statusChange () {
      this.getDemandList()
    },
    getDemandList (params) {
      demandList({ ...params, status: this.status }).then((result) => {
        this.tableData = result.data
      })
    },
    goDemandHandle (id, status, value) {
      demandHandle({ id, status, handleInfo: value }).then((result) => {
        this.getDemandList()
      })
    },
    open (id, status) {
      this.$prompt('回复用户的内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.goDemandHandle(id, status, value)
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
