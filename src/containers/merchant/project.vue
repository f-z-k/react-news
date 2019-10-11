<style lang="sass" scoped>

</style>
<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="场馆项目" name="venue">
        <ProjectVenueList></ProjectVenueList>
      </el-tab-pane>
      <el-tab-pane label="团建项目" name="building">
        <ProjectBuildingList></ProjectBuildingList>
      </el-tab-pane>
      <el-tab-pane label="活动项目" name="active">
        <ProjectActiveList></ProjectActiveList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ProjectVenueList from './projectVenueList'
import ProjectBuildingList from './projectBuildingList'
import ProjectActiveList from './projectActiveList'
export default {
  data () {
    return {
      activeName: 'venue'
    }
  },
  components: {
    ProjectBuildingList,
    ProjectVenueList,
    ProjectActiveList
  }
}
</script>
