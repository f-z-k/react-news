<style lang="scss" scoped>

</style>
<template>
  <div>
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="佣金设置" name="1">
        <DataCount1></DataCount1>
      </el-tab-pane>
      <el-tab-pane label="推广统计" name="2">
        <DataCount2></DataCount2>
      </el-tab-pane>
      <el-tab-pane label="商户统计" name="3">
        <DataCount3></DataCount3>
      </el-tab-pane>
      <el-tab-pane label="场馆统计" name="4">
        <DataCount4 type="1"></DataCount4>
      </el-tab-pane>
      <el-tab-pane label="团建统计" name="5">
        <DataCount4 type="2"></DataCount4>
      </el-tab-pane>
      <el-tab-pane label="活动统计" name="6">
        <DataCount4 type="3"></DataCount4>
      </el-tab-pane>
      <el-tab-pane label="用户统计" name="7">
        <DataCount5></DataCount5>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DataCount1 from './dataCount1'
import DataCount2 from './dataCount2'
import DataCount3 from './dataCount3'
import DataCount4 from './dataCount4'
import DataCount5 from './dataCount5'
export default {
  data () {
    return {
      active: '1'
    }
  },
  components: {
    DataCount1,
    DataCount2,
    DataCount3,
    DataCount4,
    DataCount5
  }
}
</script>
