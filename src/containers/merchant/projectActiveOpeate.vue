<style lang="scss" scoped>

</style>
<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane v-if="userInfo.permission.includes(1)" label="编辑信息" name="edit">
        <ProjectActiveEdit :key="activeName" :id="id"></ProjectActiveEdit>
      </el-tab-pane>
      <el-tab-pane v-if="userInfo.permission.includes(2)" label="编辑价格" name="price">
        <ProjectPrice :key="activeName" :id="id"></ProjectPrice>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ProjectPrice from './projectPrice.vue'
import ProjectActiveEdit from './projectActiveEdit'
export default {
  data () {
    return {
      userInfo: this.$store.state.user.info,
      id: this.$route.params.id,
      activeName: 'edit'
    }
  },
  mounted () {
    console.log(this.$route.params.id)
  },
  components: {
    ProjectActiveEdit,
    ProjectPrice
  }
}
</script>
