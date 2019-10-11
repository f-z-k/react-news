<style lang="scss" scoped>

</style>
<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane v-if="userInfo.permission.includes(1)" label="编辑信息" name="edit">
        <ProjectBuildingEdit :key="activeName" :id="id"></ProjectBuildingEdit>
      </el-tab-pane>
      <el-tab-pane v-if="userInfo.permission.includes(2)" label="编辑价格" name="price">
        <ProjectPrice :key="activeName" :id="id"></ProjectPrice>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ProjectBuildingEdit from './projectBuildingEdit'
import ProjectPrice from './projectPrice.vue'
export default {
  data () {
    return {
      userInfo: this.$store.state.user.info,
      id: this.$route.params.id,
      activeName: 'edit'
    }
  },
  components: {
    ProjectBuildingEdit,
    ProjectPrice
  }
}
</script>
