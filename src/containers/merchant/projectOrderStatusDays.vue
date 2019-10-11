<style lang="scss" scoped>
  .status-wrap {
    border-radius: 6px;
    background-color: aliceblue;
    margin-bottom: 20px;
    padding: 10px;
    h2 {
      padding: 10px 0px;
    }
  }
  .num-wrap {
    background-color: #65afff;
    padding: 20px 0px;
  }
  .no-data {
    text-align: center;
    background-color: #65afff;
    padding: 20px 0px;
  }
  .header-wrap {
    display: flex;
    justify-content: space-between;
    span {
      flex: 1;
      text-align: center;
    }
  }
  .count-wrap {
    p {
      float: left;
      width: 80px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .num {
      display: flex;
      justify-content: space-between;
      .content {
        display: table;
        flex: 1;
        height: 50px;
        font-size: 12px;
        // line-height: 50px;
        text-align: center;
        background-color: #fff;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-left: 10px;
        span {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
        }
      }
      .wait-active {
         background-color: #409EFF;
      }
      .surplus-active {
        background-color: #bdbdbd;
      }
    }
  }
  .buyed-wrap {
    margin-top: 20px;
    .buy-tag-wrap {

    }
  }
</style>
<template>
  <div class="status-wrap">
    <h2 v-if="type === 2">按天计价且所填价格表示总价</h2>
    <h2 v-if="type === 5">按天计价且所填价格表示人均价</h2>
    <div>
      <el-form :inline="true" :model="form" class="demo-ruleForm">
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="num-wrap" v-if="resultList.length">
      <div class="header-wrap">
        <span v-for="(item, index) in resultList" :key="index">{{ item.areaName }}</span>
      </div>
      <div class="count-wrap">
        <div class="num">
          <span class="content" v-for="(ele, index) in resultList" :key="index" :class="ele.surplus===0?'surplus-active':ele.wait?'wait-active':''">
            <span v-if="ele.isweek">
              {{ (ele.price / 100) + '元' }}<br/>
              {{ '（剩' + ele.surplus + '）' }}<br/>
            </span>
            <span v-if="!ele.isweek">
              不营业
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="no-data" v-else>此套餐无数据</div>
    <div class="buyed-wrap">
      <el-form :inline="true" :model="buyEd" class="demo-ruleForm">
        <el-form-item label="套餐">
          <el-select v-model="buyEd.areaId" placeholder="请选择">
            <el-option
              v-for="item in resultList"
              :key="item.id"
              :label="item.areaName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setBuyEd">设置为已售状态</el-button>
        </el-form-item>
      </el-form>
      <div class="buy-tag-wrap">
        <el-tag
          v-for="item in buyDisabledList"
          :key="item.id"
          closable
          @close="deleBuyDiabled(item.id)"
          type="info">
          <span v-if="item.type === 2">{{ '套餐：' + item.priceName }}</span>
          <span v-if="item.type === 3">{{ '时间段：' + item.recordId }}</span>
        </el-tag>
      </div>
    </div>
  </div>
</template>
<script>
import { orderStatusDays, disabledBuy, disabledBuyList, disabledBuyDele } from './../../api/merchant'
import moment from 'moment'
export default {
  props: ['id', 'type'],
  data () {
    return {
      form: {
        time: moment().format('YYYY-MM-DD')
      },
      resultList: [],
      buyEd: {}, // 已售
      buyDisabledList: []
    }
  },
  beforeMount () {
    this.getOrderStatus()
    this.getDisabledBuyList()
  },
  methods: {
    getDisabledBuyList () {
      disabledBuyList({
        time: this.form.time,
        priceMethodId: this.type,
        basicId: this.id
      }).then((result) => {
        this.buyDisabledList = result.data || []
      })
    },
    deleBuyDiabled (id) {
      disabledBuyDele({ id }).then((result) => {
        this.getDisabledBuyList()
      })
    },
    setBuyEd () {
      let { buyEd } = this
      if (!buyEd.areaId) {
        this.$message.error('请选择套餐')
        return
      }
      if (buyEd.areaId) {
        let { time } = this.form
        disabledBuy({
          time,
          recordId: buyEd.areaId,
          type: 2,
          priceMethodId: this.type,
          basicId: this.id
        }).then((result) => {
          this.getDisabledBuyList()
        })
      }
    },
    onSubmit () {
      this.getOrderStatus()
    },
    getOrderStatus () {
      orderStatusDays({
        startTime: this.form.time + ' 00:00:00',
        endTime: this.form.time + ' 23:59:59',
        basicId: this.id,
        priceMethodId: this.type
      }).then((result) => {
        this.resultList = result.data || []
      })
    }
  }
}
</script>
