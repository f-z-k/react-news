<style lang="scss" scoped>
  .pagination-wrap {
    margin-top: 10px;
    overflow: hidden;
    >div {
      float: right;
    }
  }
  .img-wrap {
    width: 60px;
    height: 50;
    img {
      width: 100%;
    }
  }
</style>
<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              label="已发布"
              :value="1">
            </el-option>
            <el-option
              label="未发布"
              :value="2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="(item, index) in articleType"
              :key="index"
              :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/articleAdd"><el-button type="primary">新增文章</el-button></router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData.list"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="文章名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
        <template slot-scope="scope">
          <div>{{ articleType[scope.row.type - 1].lable }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="areaName"
        label="城市">
      </el-table-column>
      <el-table-column
        prop="img"
        label="封面图片">
        <template slot-scope="scope">
          <div class="img-wrap">
            <img :src="scope.row.img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="发布状态">
        <template  slot-scope="scope">
          <div>
            {{ scope.row.status === 1?'已发布':'未发布' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <router-link :to="`/articleEdit/${ scope.row.id }`"><el-button type="text" size="small">编辑</el-button></router-link>
          <el-button v-if="scope.row.status === 2" type="text" size="small" @click="isPublish(scope.row.id)">发布</el-button>
          <el-button v-if="scope.row.status === 1" type="text" size="small" @click="isPublish(scope.row.id)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <div>
        <el-pagination
          background
          @current-change="this.goPage"
          layout="prev, pager, next"
          :total="tableData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { projectList } from './../../api/common'
import articleType from './articleType'
import { bannerInfoList, bannerInfoPublish } from './../../api/platform'
export default {
  data () {
    return {
      form: {},
      articleType: articleType,
      tableData: [{}]
    }
  },
  beforeMount () {
    // this.getProjectList()
    this.getBannerInfoList()
  },
  methods: {
    getProjectList () {
      let _articleType = {
        0: '首页'
      }
      projectList().then((result) => {
        result.data.forEach(element => {
          element.list.forEach(item => {
            _articleType[item.sortId] = item.sortName
          })
        })
        this.articleType = _articleType
      })
    },
    goPage (pageNum) {
      this.getBannerInfoList({ pageNum })
    },
    isPublish (id) {
      bannerInfoPublish({ id }).then((result) => {
        this.getBannerInfoList()
      })
    },
    goSearch () {
      this.getBannerInfoList({ pageNum: 1 })
    },
    getBannerInfoList (params) {
      bannerInfoList({ ...params, ...this.form }).then((result) => {
        this.tableData = result.data
      })
    }
  }
}
</script>
