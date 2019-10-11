<style lang="scss" scoped>
  .price-wrap {
    min-height: 100vh;
    position: relative;
  }
  .price-edit-wrap {
    width: 100%;
    background-color: #fff;
  }
</style>
<template>
  <div class="price-wrap">
    <div v-show="!showType">
      <el-select @change="priceChange" width="300px" v-model="type" placeholder="请选择">
        <el-option
          label="按场计价且所填价格表示总价"
          :disabled="!!canSelectPrice.length && canSelectPrice.indexOf('1') === -1"
          value="1">
        </el-option>
        <el-option
          label="按天计价且所填价格表示总价"
          :disabled="!!canSelectPrice.length && canSelectPrice.indexOf('2') === -1"
          value="2">
        </el-option>
        <el-option
          label="按小时计价且所填价格表示总价"
          :disabled="!!canSelectPrice.length && canSelectPrice.indexOf('3') === -1"
          value="3">
        </el-option>
        <el-option
          label="按场计价且所填价格表示人均价"
          :disabled="!!canSelectPrice.length && canSelectPrice.indexOf('4') === -1"
          value="4">
        </el-option>
        <el-option
          label="按天计价且所填价格表示人均价"
          :disabled="!!canSelectPrice.length && canSelectPrice.indexOf('5') === -1"
          value="5">
        </el-option>
        <el-option
          label="按小时计价且所填价格表示人均价"
          :disabled="!!canSelectPrice.length && canSelectPrice.indexOf('6') === -1"
          value="6">
        </el-option>
        <el-option
          label="按份计价"
          value="7">
        </el-option>
      </el-select>
      <el-button type="primary" @click="this.addPrice">新增套餐</el-button>
    </div>
    <el-table
      v-show="!showType"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="areaName"
        label="套餐名称"
      >
      </el-table-column>
      <el-table-column
        prop="areaNum"
        label="该套餐的总数量"
      >
      </el-table-column>
      <el-table-column
        v-if="type === '7'"
        prop="minPrice"
        label="每份价格"
      >
      </el-table-column>
      <el-table-column
        v-if="type === '7'"
        prop="num"
        label="起订人数"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="isBind"
         v-if="type === '3' || type === '6'"
        label="是否必须连续时间段捆绑预订"
      >
      <template slot-scope="scope">
        <div>
          <p>{{ scope.row.isBind === '1' ? '是' : '否' }}</p>
          <p v-if="scope.row.isBind === '1'">{{ '至少' + scope.row.reserveMethod }}</p>
        </div>
      </template>
      </el-table-column> -->
      <!-- <el-table-column
        v-if="type === '7'"
        prop="isMaster"
        label="是否必选"
      >
      <template slot-scope="scope">
        <div>
          {{ scope.row.isMaster === '1'?'是':'否' }}
        </div>
      </template>
      </el-table-column> -->
      <!-- <el-table-column
        v-if="type === '2' || type === '5'"
        prop="isBind"
        label="是否必须连续多天捆绑预订"
      >
      <template slot-scope="scope">
        <div>
          <p>{{ scope.row.isBind === '1' ? '是' : '否' }}</p>
          <p v-if="scope.row.isBind === '1'">{{ '至少' + scope.row.reserveMethod + '天' }}</p>
        </div>
      </template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editPrice(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delePrice(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="price-edit-wrap" v-show="showType">
      <ProjectPriceShare :callBack="callBack" :type="type" :id="id" :isAdd="isAdd" :priceId="priceId" v-if="showType === '7'"></ProjectPriceShare>
      <ProjectPriceSite :callBack="callBack" :type="type" :id="id" :isAdd="isAdd" :priceId="priceId" v-if="showType === '1' || showType === '4'"></ProjectPriceSite>
      <ProjectPriceDay :callBack="callBack" :type="type" :id="id" :isAdd="isAdd" :priceId="priceId" v-if="showType === '2' || showType === '5'"></ProjectPriceDay>
      <ProjectPriceHour :callBack="callBack" :type="type" :id="id" :isAdd="isAdd" :priceId="priceId" v-if="showType === '3' || showType === '6'"></ProjectPriceHour>
    </div>
  </div>
</template>
<script>
import { priceList, delePrice } from './../../api/merchant'
import ProjectPriceShare from './projectPriceShare'
import ProjectPriceSite from './projectPriceSite'
import ProjectPriceDay from './projectPriceDay'
import ProjectPriceHour from './projectPriceHour'
export default {
  props: ['id'],
  data () {
    return {
      type: '7',
      priceId: '',
      showType: null,
      isAdd: true, // 是否是新增
      tableData: [],
      canSelectPrice: []
    }
  },
  components: {
    ProjectPriceShare,
    ProjectPriceSite,
    ProjectPriceDay,
    ProjectPriceHour
  },
  beforeMount () {
    this.getPriceList()
  },
  methods: {
    priceChange (value) {
      this.type = value
      this.getPriceList()
    },
    delePrice (price) {
      delePrice({
        basicId: this.id,
        priceBasicId: price.id
      }).then((result) => {
        this.getPriceList()
      })
    },
    editPrice (price) {
      this.type = price.preiceMethod
      this.showType = price.preiceMethod
      this.isAdd = false
      this.priceId = price.id
    },
    addPrice () {
      this.showType = this.type
    },
    callBack () {
      this.showType = null
      this.getPriceList()
    },
    getPriceList () {
      priceList({ basicsId: this.id, flag: 1 }).then((result) => {
        this.tableData = result.data.filter(item => {
          return item.preiceMethod === this.type
        })
        let _canSelectPrice = []
        result.data.forEach(element => {
          _canSelectPrice.push(element.preiceMethod)
        })
        this.canSelectPrice = _canSelectPrice.join(',')
      })
    }
  }
}
</script>
