<style lang="scss" scoped>
  .table-wrap {
    border-radius: 6px;
    background-color: #DCDFE6;
    padding: 20px;
    h1 {
      padding: 10px;
      text-align: center;
    }
    .header-wrap {
      display: flex;
      span {
        flex: 1;
        text-align: center;
        margin: 10px;
      }
    }
    .content-wrap {
      display: flex;
      span {
        flex: 1;
        text-align: center;
        background-color: #fff;
        margin: 10px;
        padding: 10px 0px;
      }
    }
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
          <el-button type="primary" :disabled="form.cityId === ''" @click="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <h1 v-if="!tableData.length">暂无数据</h1>
      <div class="header-wrap">
        <span v-for="item in tableData" :key="item.proId">{{ item.proSortName }}</span>
      </div>
      <div class="content-wrap">
        <span v-for="item in tableData" :key="item.proId">{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { areaProvince, areaCity } from './../../api/common'
import { ptCgList } from './../../api/platform'
export default {
  props: ['type'],
  data () {
    return {
      form: {
        cityId: ''
      },
      provinceList: [],
      cityList: [],
      tableData: []
    }
  },
  beforeMount () {
    this.getProvince()
  },
  methods: {
    submit () {
      this.getPtCgList()
    },
    getPtCgList () {
      ptCgList({
        isCg: this.type,
        cityId: this.form.cityId
      }).then((result) => {
        this.tableData = result.data
      })
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
