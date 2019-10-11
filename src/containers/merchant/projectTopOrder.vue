<style lang="scss" scoped>

</style>
<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="设置" name="set">
        <ProjectTopOrderSet v-if="activeName === 'set'"></ProjectTopOrderSet>
      </el-tab-pane>
      <el-tab-pane label="显示" name="show">
        <ProjectTopOrderList v-if="activeName === 'show'"></ProjectTopOrderList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ProjectTopOrderSet from './projectTopOrderSet'
import ProjectTopOrderList from './projectTopOrderList'
export default {
  data () {
    return {
      activeName: 'set'
    }
  },
  components: {
    ProjectTopOrderSet,
    ProjectTopOrderList
  }
}
</script>
