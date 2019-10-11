<style lang="scss" scoped>
  .table-wrap {
    margin-top: 20px;
  }
  .pagination-wrap {
    float: right;
    margin-top: 10px;
  }
</style>
<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="">
          <el-select placeholder="省" @change="changeProvince" v-model="form.provinceId">
            <el-option v-for="item in provinceList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select placeholder="市" v-model="form.cityId">
            <el-option v-for="item in cityList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getProjectList">查询</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/projectActiveAdd"><el-button v-if="userInfo.userType === 3" type="primary">新增活动</el-button></router-link>
        </el-form-item>
        <el-form-item>
          <div>总数量：{{ tableData.total || 0 }}</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData.list || []"
        border
        style="width: 100%">
        <el-table-column
          prop="areaCity"
          label="活动城市"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="活动名称"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <p>{{ scope.row.status === '1'?'上线':'下线' }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="goProjectVenueXx(scope.row.id)" type="text" size="small">{{ scope.row.status === '1'?'下线':'上线' }}</el-button>
            <!-- <router-link v-if="userInfo.permission.includes(21)" :to="'projectOrderList/' + scope.row.id">
              <el-button type="text" size="small">查看订单</el-button>
            </router-link>
            <router-link v-if="userInfo.permission.includes(3)" :to="'projectOrderStatusList/' + scope.row.id">
              <el-button type="text" size="small">状态</el-button>
            </router-link> -->
            <router-link v-if="userInfo.permission.includes(1) || userInfo.permission.includes(2)" :to="'/projectActiveOpeate/' + scope.row.id">
              <el-button type="text" size="small">编辑</el-button>
            </router-link>
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
import { areaProvince, areaCity } from './../../api/common'
import { projectList, projectVenueXx } from './../../api/merchant'
export default {
  data () {
    return {
      // userInfo: this.$store.state.user.info,
      form: {
        cityId: ''
      },
      provinceList: [],
      cityList: [],
      tableData: {
        total: 0,
        list: []
      }
    }
  },
  computed: {
    userInfo: function () {
      return this.$store.state.user.info
    }
  },
  beforeMount () {
    this.getProjectList()
    this.getProvince()
  },
  methods: {
    goProjectVenueXx (basicId) {
      projectVenueXx({ basicId }).then((result) => {
        this.getProjectList()
      })
    },
    getProjectList (params) {
      projectList({ cg: 3, ...params, areaId: this.form.cityId }).then((result) => {
        this.tableData = result.data
      })
    },
    goPage (pageNum) {
      this.getProjectList({ pageNum })
    },
    changeProvince (id) {
      this.form.cityId = ''
      this.getCity(id)
    },
    getProvince () {
      areaProvince().then((result) => {
        this.provinceList = result.data
      })
    },
    getCity (id) {
      areaCity({ id }).then((result) => {
        this.cityList = result.data
      })
    }
  }
}
</script>
