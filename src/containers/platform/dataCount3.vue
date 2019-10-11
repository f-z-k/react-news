<style lang="scss" scoped>
  .box {
    border: 1px solid #d8d8d8;
    border-radius: 6px;
    padding: 10px;
    p {
      display: flex;
      line-height: 40px;
      span:nth-child(1) {
        width: 200px;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
</style>
<template>
  <div>
    <div class="box">
      <p><span>商户总数量</span>{{ form.bussNum }}</p>
      <p><span>VIP会员数量</span>{{ form.vip }}</p>
      <p><span>高级会员数量</span>{{ form.gj }}</p>
      <p><span>普通会员数量</span>{{ form.pt }}</p>
      <p><span>创建场馆数量(所有商家)</span>{{ form.CG }}</p>
      <p><span>创建团建数量(所有商家)</span>{{ form.TJ }}</p>
      <p><span>创建活动数量(所有商家)</span>{{ form.HD }}</p>
      <p><span>坤仔预订订单数总和</span>{{ form.orderNum }}</p>
      <p><span>坤仔订单总金额</span>{{ form.amount / 100 }}元</p>
      <!-- <p><span>商户推荐入驻总佣金(所有商家)</span>{{ form.yj / 100 }}元</p> -->
    </div>
  </div>
</template>
<script>
import { ptBussList } from './../../api/platform'
export default {
  data () {
    return {
      form: {}
    }
  },
  beforeMount () {
    this.getPtBussList()
  },
  methods: {
    getPtBussList () {
      ptBussList().then((result) => {
        this.form = result.data
      })
    }
  }
}
</script>
