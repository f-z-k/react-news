<style lang="scss" scoped>
  .status-desc {
    display: flex;
    background-color: aliceblue;
    padding: 20px 0px;
    span {
      width: 150px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      background-color: #fff;
      margin: 0px 10px;
    }
    span:nth-child(3) {
      background-color: #bdbdbd;
    }
    span:nth-child(4) {
      background-color: #409EFF;
    }
  }
</style>
<template>
  <div>
    <div class="status-desc">
      <span>不营业</span>
      <span v-if="priceMethod.priceMethod === 1 || priceMethod.priceMethod === 4">无</span>
      <span>已售完</span>
      <span>有待支付</span>
    </div>
    <ProjectOrderStatusSite v-if="priceMethod.priceMethod === 1" :id="id" :type="1"/>
    <ProjectOrderStatusSite v-if="priceMethod.priceMethod === 4" :id="id" :type="4"/>
    <ProjectOrderStatusHour v-if="priceMethod.priceMethod === 3" :id="id" :type="3"/>
    <ProjectOrderStatusHour v-if="priceMethod.priceMethod === 6" :id="id" :type="6"/>
    <ProjectOrderStatusDays v-if="priceMethod.priceMethod === 2" :id="id" :type="2"/>
    <ProjectOrderStatusDays v-if="priceMethod.priceMethod === 5" :id="id" :type="5"/>
    <ProjectOrderStatusShare v-if="priceMethod.priceMehtod_7" :id="id" :type="7"/>
  </div>
</template>
<script>
import ProjectOrderStatusSite from './projectOrderStatusSite'
import ProjectOrderStatusHour from './projectOrderStatusHour'
import ProjectOrderStatusDays from './projectOrderStatusDays'
import ProjectOrderStatusShare from './ProjectOrderStatusShare'
import { basicePriceMethod } from './../../api/merchant'
export default {
  data () {
    return {
      id: this.$route.params.id,
      priceMethod: {}
    }
  },
  beforeMount () {
    this.getBasicePriceMethod()
  },
  components: {
    ProjectOrderStatusSite,
    ProjectOrderStatusHour,
    ProjectOrderStatusDays,
    ProjectOrderStatusShare
  },
  methods: {
    getBasicePriceMethod () {
      basicePriceMethod({
        basicId: this.id
      }).then((result) => {
        this.priceMethod = {
          ...result.data
        }
      })
    }
  }
}
</script>
