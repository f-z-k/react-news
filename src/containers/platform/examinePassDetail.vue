<style lang="scss" scoped>
  .table-wrap {
    margin-top: 10px;
  }
</style>
<template>
  <div>
    <div>
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <el-select v-model="value" placeholder="款项状态">
        <el-option
          label="全部"
          value="">
        </el-option>
        <el-option
          label="待结算"
          value="">
        </el-option>
        <el-option
          label="已结算"
          value="">
        </el-option>
      </el-select>
      <el-button type="primary">搜索</el-button>
    </div>
    <div class="table-wrap">
      <el-table
        :border="true"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="下单日期">
        </el-table-column>
        <el-table-column
          prop="date"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="date"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="date"
          label="共计">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      date: '',
      tableData: []
    }
  }
}
</script>
