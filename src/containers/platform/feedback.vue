<style lang="scss" scoped>
  .pagination-wrap {
    float: right;
    margin-top: 10px;
  }
</style>
<template>
  <div>
    <el-table
      :data="tableData.list"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
       <el-table-column
        prop="descId"
        label="类型">
        <template slot-scope="scope">
          <div>
            {{ type[scope.row.descId] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="descInfo"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="imgFeedBack"
        label="图片">
        <template slot-scope="scope">
          <img style="height: 100px" :src="'http://139.224.234.37:8088/uploadimg/' + scope.row.imgFeedBack" alt="">
        </template>
      </el-table-column>
    </el-table>
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
import { getFeedList } from './../../api/platform'
export default {
  data () {
    return {
      tableData: {},
      type: {
        1: '功能异常：功能故障或不可用',
        2: '服务问题：对我们的服务有建议或不满',
        3: '产品建议：用的不爽，我有建议',
        4: '其他问题'

      }
    }
  },
  created () {
    this.getFeedList()
  },
  methods: {
    getFeedList (params) {
      getFeedList({
        typeId: 3,
        ...params
      }).then(result => {
        this.tableData = result.data || {}
      })
    },
    goPage (pageNum) {
      this.getFeedList({ pageNum })
    }
  }
}
</script>
