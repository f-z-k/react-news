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
    <el-form ref="form" :rules="rules" label-width="200px" :model="form">
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
      <el-form-item label="天数卡数量" prop="totalStock">
        <el-input-number :precision="0" v-model="form.totalStock" :min="0" placeholder="" autocomplete="off"></el-input-number>
      </el-form-item>
      <el-form-item label="享受权益" prop="num">
        <el-input-number :precision="0" v-model="form.num" :min="0" placeholder="" autocomplete="off"></el-input-number>
        <!-- {{ form.price && form.price.priceBasic.priceingMethodId === 5?'天·人':'天' }} -->
        {{ '天' }}
      </el-form-item>
      <el-form-item label="购买价格" prop="disAmount">
        <el-input-number :precision="2" v-model="form.disAmount" :min="0" placeholder="" autocomplete="off"></el-input-number>
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
      form: {},
      rules: {
        name: [{ required: true, message: '请输入名称' }],
        id: [{ required: true, message: '请选择场馆' }],
        totalStock: [{ required: true, message: '请输入天数数量' }],
        num: [{ required: true, message: '请输入享受权益' }],
        disAmount: [{ required: true, message: '请输入购买价格' }],
        weekend: [{ required: true, message: '请选择适用周几' }],
        time: [{ required: true, message: '请选择适用场次' }],
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
        return item.priceBasic && (item.priceBasic.priceingMethodId === 2 || item.priceBasic.priceingMethodId === 5)
      })
      return _priceList
    }
  },
  beforeMount () {
    this.getBasicList()
  },
  methods: {
    getBasicList () {
      basiceTopOrder({}).then((result) => {
        this.areaList = result.data.filter(item => {
          return item.priceMethod.includes(2) || item.priceMethod.includes(5)
        })
      })
    },
    hideModal () {
      this.$emit('hideModal')
    },
    submit () {
      let { form } = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let data = {
            ...form,
            type: 5,
            basicIdList: form.id,
            // priceIdList: [form.price.priceBasic && form.price.priceBasic.id],
            weekend: form.weekend && form.weekend.join(':'),
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
