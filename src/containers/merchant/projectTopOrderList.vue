<style lang="scss" scoped>
  .tips-wrap {
    display: flex;
    background-color: #65afff;
    padding: 10px;
    margin-top: 10px;
    .dark-wrap {
      width: 150px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      background-color: #bdbdbd;
      margin-left: 10px;
    }
    .no-wrap {
      width: 150px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      background-color: #fff;
      margin-left: 10px;
    }
  }
  .table-wrap {
    background-color:#65afff;
    margin-top: 40px;
    padding: 20px 0px;
    .header {
      display: flex;
      height: 80px;
      padding-left: 150px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        margin-right: 10px;
      }
    }
    .content {
      display: flex;
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 80px;
        text-align: center;
      }
      .num-wrap {
        display: flex;
        flex: 1;
        span {
          flex: 1;
          height: 80px;
          text-align: center;
          line-height: 80px;
          background-color: #fff;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .active {
          background-color: #bdbdbd;
        }
      }
    }
  }
</style>
<template>
  <div>
    <div>
      <el-date-picker
        v-model="time"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" @click="timeChange">查询</el-button>
    </div>
    <div class="tips-wrap">
      <div class="dark-wrap">已售完</div>
      <div class="dark-wrap">不营业</div>
      <div class="no-wrap">未售完 剩余/总数</div>
    </div>
    <div class="table-wrap">
      <div class="header">
        <span v-for="item in ((talbeData[0] || {}).times || [])" :key="item.time">
          {{ moment(item.time).format('MM-DD') }} <br/>
          {{ moment(item.time).format('dddd') }}
        </span>
      </div>
      <div class="content" v-for="(item, index) in talbeData" :key="index">
        <div class="title">
          <div>{{ item.basicName }}</div>
          <div>{{ item.preiceName }}</div>
          <div v-if="item.priceMethod === 1 || item.priceMethod === 4">{{ siteTypeList[item.regionId] }}</div>
          <div v-if="item.priceMethod === 3 || item.priceMethod === 6">{{ item.regionId }}</div>
        </div>
        <div class="num-wrap">
          <span :class="((!ele.isweek)?'':'active')||((ele.least)?'':'active')" v-for="(ele, key) in item.times" :key="key">{{ ele.isweek?'不营业':(ele.least !== 0 ? `${ ele.least }/${ ele.total }`:'已售完 ') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { siteTypeList } from './projectConfig'
import { topOrderList } from './../../api/merchant'
export default {
  data () {
    return {
      moment: moment,
      siteTypeList: siteTypeList,
      time: [moment().format('YYYY-MM-DD'), moment().add(7, 'days').format('YYYY-MM-DD')],
      talbeData: []
    }
  },
  beforeMount () {
    moment.locale('zh-cn', {
      weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_')
    })
    this.timeChange()
  },
  methods: {
    timeChange () {
      let { time } = this
      let list = []
      if (time) {
        list.push(`${time[0]} 00:00:00,${time[0]} 23:59:59`)
        if (time[0] !== time[1]) {
          var tmp = moment(time[0]).add(1, 'days').format('YYYY-MM-DD')
          while (tmp !== time[1]) {
            list.push(`${tmp} 00:00:00,${tmp} 23:59:59`)
            tmp = moment(tmp).add(1, 'days').format('YYYY-MM-DD')
          }
          list.push(`${time[1]} 00:00:00,${time[1]} 23:59:59`)
        }
      }
      topOrderList({
        dateList: list
      }).then((result) => {
        this.talbeData = result.data || []
      })
    }
  }
}
</script>
