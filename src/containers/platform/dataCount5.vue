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
      <p><span>注册用户总数量</span>{{ form.userNum }}</p>
      <p><span>娱乐类场馆预订次数及占比</span>{{ form.yl && form.yl.num }}--{{ form.yl && form.yl.numRate }}%</p>
      <p><span>会议类场馆预订次数及占比</span>{{ form.hy && form.hy.num }}--{{ form.hy && form.hy.numRate }}%</p>
      <p><span>运动类场馆预订次数及占比</span>{{ form.yd && form.yd.num }}--{{ form.yd && form.yd.numRate }}%</p>
      <p><span>团建类场馆预订次数及占比</span>{{ form.tj && form.tj.num }}--{{ form.tj && form.tj.numRate }}%</p>
      <p><span>住宿类场馆预订次数及占比</span>{{ form.zs && form.zs.num }}--{{ form.zs && form.zs.numRate }}%</p>
      <p><span>活动类场馆预订次数及占比</span>{{ form.hd && form.hd.num }}--{{ form.hd && form.hd.numRate }}%</p>
    </div>
  </div>
</template>
<script>
import { ptCgUserList } from './../../api/platform'
export default {
  data () {
    return {
      form: {}
    }
  },
  beforeMount () {
    this.getPtCgUserList()
  },
  methods: {
    getPtCgUserList () {
      ptCgUserList().then((result) => {
        this.form = result.data
      })
    }
  }
}
</script>
