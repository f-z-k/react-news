<style lang="scss" scoped>
  .dialog-footer {
    overflow: hidden;
    button {
      float: right;
      margin-left: 10px;
    }
  }
</style>
<template>
  <div>
    <el-form ref="form" :rules="rules" label-width="240px" :model="form">
      <el-form-item label="名称" prop="name">
        <div style="width: 220px;">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="适用类目" prop="id">
        <el-select v-model="form.id" multiple placeholder="适用类目">
          <el-option
            v-for="(item, index) in areaList"
            :key="index"
            :label="item.basic && item.basic.proName"
            :value="item.basic && item.basic.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="套餐">
        <el-select v-model="form.price" value-key="priceBasic" placeholder="请选择类别">
          <el-option
            v-for="(item, index) in priceList"
            :key="index"
            :label="item.priceBasic && item.priceBasic.areaName"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="小时卡数量" prop="totalStock">
        <el-input-number width="220px" v-model="form.totalStock" :precision="0" :min="0" placeholder="" autocomplete="off"></el-input-number>
      </el-form-item>
      <el-form-item label="享受权益" prop="num">
        <el-input-number width="220px" v-model="form.num" :precision="1" :min="0" placeholder="" autocomplete="off"></el-input-number>
        <!-- {{ form.price && form.price.priceBasic.priceingMethodId === 6?'小时·人':'小时' }} -->
        {{ '小时' }}
      </el-form-item>
      <el-form-item label="购买价格" prop="disAmount">
        <el-input-number width="220px" v-model="form.disAmount" :precision="2" :min="0" placeholder="" autocomplete="off"></el-input-number>
      </el-form-item>
      <el-form-item label="适用周几" prop="weekend">
        <el-select v-model="form.weekend" multiple placeholder="周几">
          <el-option label="周一" value="1"></el-option>
          <el-option label="周二" value="2"></el-option>
          <el-option label="周三" value="3"></el-option>
          <el-option label="周四" value="4"></el-option>
          <el-option label="周五" value="5"></el-option>
          <el-option label="周六" value="6"></el-option>
          <el-option label="周日" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用时间段(开始)" prop="startDate">
        <el-time-select
          placeholder="起始时间"
          v-model="form.startDate"
          @change="changeStartTime"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00'
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item label="适用时间段(结束)" prop="endDate">
        <el-time-select
          placeholder="结束时间"
          v-model="form.endDate"
          :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '24:00',
            minTime: form.startTime
          }">
        </el-time-select>
      </el-form-item>
      <el-form-item label="有效日期" prop="expTimes">
        <div style="width: 220px;">
          <el-date-picker
            v-model="form.expTimes"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <!-- <el-form-item label="有效期内小时卡用完后预订是否打折">
        <div style="width: 220px;">
          <el-radio-group v-model="form.isDis">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="折扣" v-if="form.isDis">
        <el-input-number v-model="form.disInfo" :min="0" placeholder="" autocomplete="off"></el-input-number>
        折（例如：9折表示原价×90%）
      </el-form-item> -->
      <el-form-item label="备注">
        <div style="width: 220px;">
          <el-input type="textarea" v-model="form.desInfo"></el-input>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="hideModal">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { basiceTopOrder, addCoupon } from './../../api/merchant'
export default {
  data () {
    return {
      areaList: [],
      form: {
        endDate: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称' }],
        id: [{ required: true, message: '请选择场馆' }],
        totalStock: [{ required: true, message: '请输入小时卡数量' }],
        num: [{ required: true, message: '请输入享受权益' }],
        disAmount: [{ required: true, message: '请输入购买价格' }],
        weekend: [{ type: 'array', required: true, trigger: 'blur', message: '请选择适用周几' }],
        startDate: [{ required: true, message: '请选择适用时间段(开始)' }],
        endDate: [{ required: true, message: '请选择适用时间段(结束)' }],
        expTimes: [{ required: true, message: '请选择有效期' }]
      }
    }
  },
  computed: {
    priceList: function () {
      let _areaList = []
      _areaList = this.areaList.filter(item => {
        return item.basic && item.basic.id === this.form.id
      })
      let _priceList = _areaList[0] && _areaList[0].price.filter(item => {
        return item.priceBasic && (item.priceBasic.priceingMethodId === 3 || item.priceBasic.priceingMethodId === 6)
      })
      return _priceList
    }
  },
  beforeMount () {
    this.getBasicList()
  },
  methods: {
    changeStartTime () {
      this.form.endTime = ''
    },
    getBasicList () {
      basiceTopOrder({}).then((result) => {
        this.areaList = result.data.filter(item => {
          return item.priceMethod.includes(3) || item.priceMethod.includes(6)
        })
      })
    },
    hideModal () {
      this.$emit('hideModal')
    },
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let { form } = this
          let data = {
            ...form,
            type: 3,
            basicIdList: form.id,
            // priceIdList: [form.price.priceBasic && form.price.priceBasic.id],
            weekend: form.weekend && form.weekend.join(':'),
            time: `${form.startDate}-${form.endDate}`,
            startTime: form.expTimes && form.expTimes[0],
            endTime: form.expTimes && form.expTimes[1],
            disAmount: form.disAmount * 100 || null
          }
          delete data.id
          addCoupon(data).then((result) => {
            this.$emit('hideModal')
          })
        }
      })
    }
  }
}
</script>
