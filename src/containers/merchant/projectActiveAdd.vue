<style lang="scss" scoped>
  .input-wrap {
    width: 300px;
  }
  .box-wrap {
    width: 400px;
    padding: 10px;
    border: 1px solid #d8d8d8;
    label {
      display: inline-block;
      width: 80px;
      text-align: right;
    }
    >div {
      margin-bottom: 10px;
    }
  }
  .postion {
    position: relative;
    z-index: 0;
  }
</style>
<template>
  <div>
    <h2>活动基本信息</h2>
    <el-form ref="active" :model="active" :rules="rules" label-width="130px">
      <el-form-item label="活动类型" prop="proId">
        <el-select v-model="active.proId" placeholder="活动类型">
          <el-option v-for="item in projectLists" :key="item.sortId" :label="item.sortName" :value="item.sortId" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否收费" prop="isFree">
        <el-select v-model="active.isFree" placeholder="是否收费">
          <el-option label="是" :value="1" ></el-option>
          <el-option label="否" :value="0" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称" prop="proName">
        <el-input class="input-wrap" v-model="active.proName"></el-input>
      </el-form-item>
      <el-form-item label="列表缩略图" prop="thumbnail">
        <el-upload
          class="upload-wrap"
          :action="config.apiRoot + '/upload'"
          :before-upload="beforeUpload"
          :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'thumbnail') }"
          :on-remove="(file, fileList) => { handleRemove(file, fileList, 'thumbnail') }"
          :file-list="active.thumbnail"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动城市" prop="areaId">
        <el-select placeholder="省" @change="changeProvince" v-model="provinceId">
          <el-option v-for="item in provinceList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
        <el-select placeholder="市" @change="changeCity" v-model="cityId">
          <el-option v-for="item in cityList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
        <el-select v-model="active.areaId" placeholder="区">
          <el-option v-for="item in areaList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体地址" prop="address">
        <el-input class="input-wrap" v-model="active.address"></el-input>
      </el-form-item>
      <el-form-item label="管理员电话" prop="phone">
        <el-input class="input-wrap" v-model="active.phone"></el-input>
      </el-form-item>
      <el-form-item label="其他管理员电话">
        <el-input class="input-wrap" v-model="active.otherPhone"></el-input>
      </el-form-item>
      <el-form-item label="有效时间" prop="startTime">
        <el-date-picker
          v-model="active.startTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="endTime">
        <el-date-picker
          v-model="active.endTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预订截止日期">
        <el-date-picker
          v-model="active.other5"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="不填则无">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="图文详情">
        <div id="editorElem" class="postion" style="text-align:left"></div>
      </el-form-item>
      <el-form-item label="收费标准或备注">
        <el-upload
          class="upload-wrap"
          :action="config.apiRoot + '/upload'"
          :before-upload="beforeUpload"
          :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'amount') }"
          :on-remove="(file, fileList) => { handleRemove(file, fileList, 'amount') }"
          :file-list="active.amountImg"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
        <el-input class="input-wrap" placeholder="收费备注" type="textarea" v-model="active.stopAmount"></el-input>
      </el-form-item>
      <el-form-item label="另外收费的服务">
        <el-button size="small" type="primary" @click="addItem()">添加</el-button>
        <div class="box-wrap" v-for="(item, index) in active.other3" :key="index">
          <div>
            <el-input class="input-wrap" placeholder="服务名称" type="text" v-model="item.name"></el-input>
            <el-button size="small" type="primary" @click="deleItem(index)">删除</el-button>
          </div>
          <div>
            <el-input class="input-wrap" placeholder="服务备注" type="textarea" v-model="item.desc"></el-input>
          </div>
          <div>
            <el-upload
              class="upload-wrap"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'service', index) }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'service', index) }"
              :file-list="item.img"
              list-type="picture">
              <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注">
        <el-input class="input-wrap" type="textarea" v-model="active.other"></el-input>
      </el-form-item>
      <el-form-item label="退款模式" prop="rateType">
        <el-select v-model="active.rateType" placeholder="请选择">
          <el-option label="模式1" :value="1"></el-option>
          <el-option label="模式2" :value="2"></el-option>
          <el-option label="模式3" :value="3"></el-option>
          <el-option label="模式4" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="退款模式描述">
        <div>
          模式1：随时退：不扣违约金。
        </div>
        <div>
          模式2：不可退：退订扣支付金额100%作为违约金。
        </div>
        <div>
          模式3：部分可退：时间之前≥24小时退订的，不扣违约金；时间之前24~12小时退订的，支付违约金为实际支付金额的5%；时间之前12~6小时退订的，支付违约金为实际支付金额的10%；时间之前6~2小时退订的，支付违约金为实际支付金额的20%；时间之前≤2小时退订的，支付违约金为实际支付金额的50%；时间之后退订的，支付违约金为实际支付金额的100%。【时间指的是套餐活动生效开始时间或使用套餐的截止时间】。
        </div>
        <div>
          模式4：部分可退：当日0:00之前14天（336小时）退订的，不扣违约金；当日0:00之前14~7天（336~168小时）退订的，支付违约金为实际支付金额的10%；当日0:00之前7~3天（168~72小时）退订的，支付违约金为实际支付金额的20%；当日0:00之前3~1天（72~24小时）退订的，支付违约金为实际支付金额的50%；当日0:00之前≤1天（24小时）退订的，支付违约金为实际支付金额的80%；当日0:00之后退订的，支付违约金为实际支付金额的100%。【当日0:00指的是套餐活动生效日或使用套餐的截止日】。
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" :loading="loading" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { areaProvince, areaCity, areaArea, projectList } from './../../api/common'
import { projectAdd } from './../../api/merchant'
import E from 'wangeditor'
import config from './../../config'
export default {
  data () {
    return {
      loading: false,
      config: config,
      active: {
        cg: 3,
        other3: [],
        areaId: ''
      },
      projectLists: [],
      provinceList: [],
      provinceId: '',
      cityId: '',
      cityList: [],
      areaList: [],
      rules: {
        proId: [{ required: true, message: '请选择团建类型' }],
        isFree: [{ required: true, message: '请选择是否收费' }],
        proName: [{ required: true, message: '请输入项目名称' }],
        areaId: [{ required: true, message: '请选择城市' }],
        address: [{ required: true, message: '请填写具体地址' }],
        phone: [{ required: true, message: '请输入管理员手机号' }],
        startTime: [{ required: true, message: '请选择开始日期' }],
        endTime: [{ required: true, message: '请选择结束日期' }],
        rateType: [{ required: true, message: '请选择退款模式' }],
        thumbnail: [{ required: true, validator: this.validateThumbnail }]
        // other5: [{ required: true, message: '请选择预订截止日期' }]
      }
    }
  },
  beforeMount () {
    this.getProjectList()
    this.getProvince()
  },
  mounted () {
    this.editor = new E('#editorElem')
    this.editor.customConfig.uploadImgServer = this.config.apiRoot + '/upload'
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.uploadImgHooks = {
      customInsert: (insertImg, result, editor) => {
        let url = this.config.imgRoot + (result.data && result.data.name)
        insertImg(url)
      }
    }
    this.editor.customConfig.onchange = (html) => {
      this.active.other1 = html
    }
    this.editor.create()
  },
  methods: {
    beforeUpload (file) {
      const isLt2kb = file.size / 1024 <= 200
      if (!isLt2kb) {
        this.$message.error('上传图片大小不能超过 200kb!')
      }
      return isLt2kb
    },
    validateThumbnail (rule, value, callback) {
      let { thumbnail = [] } = this.active
      if (!value || !thumbnail.length) {
        return callback(new Error('请上传缩略图'))
      } else {
        callback()
      }
    },
    addItem () {
      this.active.other3.push({})
    },
    deleItem (key) {
      this.active.other3 = this.active.other3.filter((item, index) => index !== key)
    },
    handleRemove (file, fileList, type, key) {
      if (file && file.status === 'success') {
        let _fileList = fileList.map(item => {
          return {
            name: item.name,
            url: config.imgRoot + item.response.data.name
          }
        })
        if (type === 'service') {
          this.active.other3[key].img = _fileList
        } else if (type === 'amount') {
          this.active.amountImg = _fileList
        } else if (type === 'thumbnail') {
          this.active.thumbnail = _fileList
        }
      } else {
        return false
      }
    },
    handleSuccess (res, file, fileList, type, key) {
      if (type === 'service') {
        if (!this.active.other3[key].img) {
          this.active.other3[key].img = []
        }
        this.active.other3[key].img.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'amount') {
        if (!this.active.amountImg) {
          this.active.amountImg = []
        }
        this.active.amountImg.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'thumbnail') {
        if (!this.active.thumbnail) {
          this.active.thumbnail = []
        }
        this.active.thumbnail = [{
          name: res.data.name,
          url: config.imgRoot + res.data.name
        }]
      }
    },
    getProjectList () {
      projectList().then((result) => {
        this.projectLists = result.data && result.data[5].list
      })
    },
    // 获取省
    getProvince () {
      areaProvince().then((result) => {
        this.provinceList = result.data
      })
    },
    getCity (id) {
      areaCity({ id }).then((result) => {
        this.cityList = result.data
      })
    },
    getArea (id) {
      areaArea({ id }).then((result) => {
        this.areaList = result.data
      })
    },
    changeProvince (id) {
      this.cityId = ''
      this.active.areaId = ''
      this.areaList = []
      this.getCity(id)
    },
    changeCity (id) {
      this.getArea(id)
    },
    onSubmit () {
      this.$refs['active'].validate((valid) => {
        if (valid) {
          this.loading = true
          let _active = Object.assign({}, this.active)
          _active.other3 = JSON.stringify(_active.other3)
          _active.amountImg = JSON.stringify(_active.amountImg)
          projectAdd(_active).then((result) => {
            this.$router.push('/project')
          }, () => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
