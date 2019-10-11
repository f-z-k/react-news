<style lang="scss" scoped>
  .input-wrap {
    width: 300px;
  }
  .adress-wrap {
    width: 740px;
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
    .item-wrap {
      width: 400px;
      padding: 10px;
      border: 1px solid #d8d8d8;
      >div {
        margin-bottom: 10px;
      }
    }
  }
  .upload-item {
    display: inline-block;
  }
</style>
<template>
  <div>
    <h2>团建项目基本信息</h2>
    <el-form ref="building" :model="building" :rules="rules" label-width="200px">
      <el-form-item label="团建类型" prop="proId">
        <el-select v-model="building.proId" placeholder="团建类型">
          <el-option v-for="item in projectLists" :key="item.sortId" :label="item.sortName" :value="item.sortId" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="proName">
        <el-input class="input-wrap" v-model="building.proName"></el-input>
      </el-form-item>
      <el-form-item label="列表缩略图" prop="thumbnail">
        <el-upload
          class="upload-wrap"
          :action="config.apiRoot + '/upload'"
          :before-upload="beforeUpload"
          :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'thumbnail') }"
          :on-remove="(file, fileList) => { handleRemove(file, fileList, 'thumbnail') }"
          :file-list="building.thumbnail || []"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="出发城市" prop="areaId">
        <el-select placeholder="省" @change="changeProvince" v-model="provinceId">
          <el-option v-for="item in provinceList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
        <el-select placeholder="市" @change="changeCity" v-model="cityId">
          <el-option v-for="item in cityList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
        <el-select v-model="building.areaId" placeholder="区">
          <el-option v-for="item in areaList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目行程" prop="extend1">
        <el-select v-model="building.extend1" placeholder="区">
          <el-option label="半天及以内" value="1"></el-option>
          <el-option label="1天0晚" value="2"></el-option>
          <el-option label="1天1晚" value="3"></el-option>
          <el-option label="2天1晚" value="4"></el-option>
          <el-option label="2天2晚" value="5"></el-option>
          <el-option label="3天2晚及以上" value="6"></el-option>
        </el-select>
        <!-- <el-input class="input-wrap" v-model="building.extend1" placeholder="几天"></el-input> -->
      </el-form-item>
      <!-- <el-form-item prop="extend2">
        <el-input class="input-wrap" v-model="building.extend2" placeholder="几夜"></el-input>
      </el-form-item> -->
      <el-form-item label="项目包含" prop="equipments">
        <el-select v-model="building.equipments" multiple placeholder="请选择">
          <el-option-group
            v-for="group in equipmentList"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.label"
              :label="item.value"
              :value="item.label">
            </el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input class="input-wrap" type="textarea" placeholder="其他项目描述" v-model="building.otherEq"></el-input>
      </el-form-item>
      <el-form-item label="管理员电话" prop="phone">
        <el-input class="input-wrap" v-model="building.phone"></el-input>
      </el-form-item>
      <el-form-item label="其他管理员电话">
        <el-input class="input-wrap" v-model="building.otherPhone"></el-input>
      </el-form-item>
      <el-form-item label="项目最多参加的人数" prop="stayUpNum">
        <el-input class="input-wrap" v-model="building.stayUpNum" placeholder="人数"></el-input>
      </el-form-item>
      <el-form-item label="有效时间" prop="startTime">
        <el-date-picker
          v-model="building.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="endTime">
        <el-date-picker
          v-model="building.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预订截止日期">
        <el-date-picker
          v-model="building.other5"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="不填则无">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="目的地介绍">
        <el-button type="primary" @click="addItem(1)">添加</el-button>
        <div class="adress-wrap" v-for="(item, index) in building.other" :key="index">
          <div>
            <label>目的地：</label><el-input class="input-wrap" type="text" v-model="item.name"></el-input>
            <el-button type="primary" @click="deleItem(1, index)">删除</el-button>
          </div>
          <div>
            <label>城市：</label>
            <el-select placeholder="省" @change="changeProvince($event, index)" v-model="item.provinceId">
              <el-option v-for="item in provinceList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
            </el-select>
            <el-select placeholder="市" @change="changeCity($event, index)" v-model="item.cityId">
              <el-option v-for="item in item.cityList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
            </el-select>
            <!-- <el-select v-model="item.areaId" placeholder="区">
              <el-option v-for="item in item.areaList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
            </el-select> -->
          </div>
          <div>
            <label>具体地址：</label><el-input class="input-wrap" type="textarea" v-model="item.adress"></el-input>
          </div>
          <div>
            <label>介绍：</label><el-input class="input-wrap" type="textarea" v-model="item.desc"></el-input>
          </div>
          <div class="upload-wrap">
            <label>图片：</label>
            <el-upload
              class="upload-item"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'otherImg', index) }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'otherImg', index) }"
              :file-list="item.img"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="项目介绍">
        <el-button type="primary" @click="addItem(2)">添加</el-button>
        <div class="adress-wrap" v-for="(item, index) in building.other1" :key="index">
          <div>
            <label>项目名称：</label><el-input class="input-wrap" type="text" v-model="item.name"></el-input>
            <el-button type="primary" @click="deleItem(2, index)">删除</el-button>
          </div>
          <div>
            <label>介绍：</label><el-input class="input-wrap" type="textarea" v-model="item.desc"></el-input>
          </div>
          <div class="upload-wrap">
            <label>图片：</label>
            <el-upload
              class="upload-item"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'other1Img', index) }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'other1Img', index) }"
              :file-list="item.img"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="行程介绍">
        <el-button type="primary" @click="addItem(3)">添加</el-button>
        <div class="adress-wrap" v-for="(item, index) in building.other2" :key="index">
          <p>第{{ index + 1 }}天</p>
          <div>
            <label>出发地：</label><el-input class="input-wrap" type="text" placeholder="最多6个字符" v-model="item.adress1"></el-input>
            <el-button type="primary" @click="deleItem(3, index)">删除</el-button>
          </div>
          <div>
            <label>目的地：</label><el-input class="input-wrap" type="text" placeholder="最多6个字符" v-model="item.adress2"></el-input>
          </div>
          <el-button type="primary" @click="addItem(4, index)">添加</el-button>
          <div class="item-wrap" v-for="(ele, key) in item.list" :key="key">
            <div>
              <label>时间：</label>
              <el-time-select
                v-model="ele.time"
                :picker-options="{
                  start: '00:00',
                  end: '24:00'
                }"
                placeholder="选择时间">
              </el-time-select>
              <el-button type="primary" @click="deleItem(4, index, key)">删除</el-button>
            </div>
            <div>
              <label>主题：</label><el-input class="input-wrap" type="text" v-model="ele.title"></el-input>
            </div>
            <div>
              <label>介绍：</label><el-input class="input-wrap" type="textarea" v-model="ele.desc"></el-input>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="收费标准或备注">
        <el-upload
          class="upload-wrap"
          :action="config.apiRoot + '/upload'"
          :before-upload="beforeUpload"
          :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'amount') }"
          :on-remove="(file, fileList) => { handleRemove(file, fileList, 'amount') }"
          :file-list="building.amountImg"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
        <el-input class="input-wrap" placeholder="收费备注" type="textarea" v-model="building.stopAmount"></el-input>
      </el-form-item>
      <el-form-item label="另外收费的服务">
        <el-button size="small" type="primary" @click="addItem(5)">添加</el-button>
        <div class="adress-wrap" v-for="(item, index) in building.other3" :key="index">
          <div>
            <el-input class="input-wrap" placeholder="服务名称" type="text" v-model="item.name"></el-input>
            <el-button size="small" type="primary" @click="deleItem(5, index)">删除</el-button>
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
      <el-form-item label="其他备注">
        <el-input class="input-wrap" placeholder="" type="textarea" v-model="building.other4"></el-input>
      </el-form-item>
      <el-form-item label="退款模式" prop="rateType">
        <el-select v-model="building.rateType" placeholder="请选择">
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
import { areaProvince, areaCity, areaArea, projectList, equipmentList } from './../../api/common'
import { projectEdit, projectVenueDetail } from './../../api/merchant'
import config from './../../config'
export default {
  props: ['id'],
  data () {
    return {
      loading: false,
      config: config,
      building: {
        cg: 2,
        // other: [{}],
        // other1: [{}],
        // other2: [{
        //   list: [{}]
        // }],
        // other3: [{}]
        equipments: []
      },
      equipmentList: [],
      projectLists: [],
      provinceList: [],
      provinceId: '',
      cityId: '',
      cityList: [],
      areaList: [],
      rules: {
        proId: [{ required: true, message: '请选择团建类型' }],
        proName: [{ required: true, message: '请输入项目名称' }],
        areaId: [{ required: true, message: '请选择城市' }],
        extend1: [{ required: true, message: '请输入几天' }],
        extend2: [{ required: true, message: '请输入几夜' }],
        equipments: [{ required: true, message: '请选择项目' }],
        phone: [{ required: true, message: '请输入管理员手机号' }],
        stayUpNum: [{ required: true, message: '请输入项目最多参加的人数' }],
        startTime: [{ required: true, message: '请选择开始日期' }],
        endTime: [{ required: true, message: '请选择结束日期' }],
        rateType: [{ required: true, message: '请选择退款模式' }],
        thumbnail: [{ required: true, validator: this.validateThumbnail }]
        // other5: [{ required: true, message: '请选择预订截止日期' }]
      }
    }
  },
  beforeMount () {
    this.getDetail()
    this.getProvince()
    this.getProjectList()
    this.getEquipmentList()
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
      let { thumbnail = [] } = this.building
      if (!value || !thumbnail.length) {
        return callback(new Error('请上传缩略图'))
      } else {
        callback()
      }
    },
    getEquipmentList () {
      equipmentList().then((result) => {
        this.equipmentList = result.data && [result.data[5], result.data[8]]
      })
    },
    getDetail () {
      projectVenueDetail({ id: this.id }).then((result) => {
        this.provinceId = result.data.province
        this.cityId = result.data.city
        let data = result.data
        data.cg = data.basic.isCg
        data.basic.other = data.basic.other ? JSON.parse(data.basic.other) : [{}]
        data.basic.amountImg = data.basic.amountImg ? JSON.parse(data.basic.amountImg) : []
        data.basic.areaId = data.basic.areaId
        data.otherModular.other1 = data.otherModular.other1 ? JSON.parse(data.otherModular.other1) : [{}]
        data.otherModular.other2 = data.otherModular.other2 ? JSON.parse(data.otherModular.other2) : [{list: [{}]}]
        data.otherModular.other3 = data.otherModular.other3 ? JSON.parse(data.otherModular.other3) : [{}]
        data.otherModular.equipments = data.otherModular.equipments ? data.otherModular.equipments.split(':').map(item => Number(item)) : []
        data.otherModular.thumbnail = data.otherModular.thumbnail ? JSON.parse(data.otherModular.thumbnail) : ''
        this.building = {
          cg: result.data.basic.isCg,
          ...data,
          ...data.otherModular,
          ...data.basic
        }
        data.basic.other.forEach((element, index) => {
          if (element.provinceId) {
            this.getCity(element.provinceId, index)
          }
          if (element.areaId) {
            this.getArea(element.cityId, index)
          }
        })
        if (this.provinceId) {
          this.getCity(this.provinceId)
        }
        if (this.cityId) {
          this.getArea(this.cityId)
        }
      })
    },
    addItem (type, key) {
      if (type === 1) {
        this.building.other.push({})
      } else if (type === 2) {
        this.building.other1.push({})
      } else if (type === 3) {
        this.building.other2.push({})
      } else if (type === 4) {
        this.building.other2[key].list.push({list: [{}]})
      } else if (type === 5) {
        this.building.other3.push({})
      }
    },
    deleItem (type, key, key1) {
      if (type === 1) {
        this.building.other = this.building.other.filter((item, index) => index !== key)
      } else if (type === 2) {
        this.building.other1 = this.building.other1.filter((item, index) => index !== key)
      } else if (type === 3) {
        this.building.other2 = this.building.other2.filter((item, index) => index !== key)
      } else if (type === 4) {
        this.building.other2[key].list = this.building.other2[key].list.filter((item, index) => index !== key1)
      } else if (type === 5) {
        this.building.other3 = this.building.other3.filter((item, index) => index !== key)
      }
    },
    handleRemove (file, fileList, type, key) {
      if (file && file.status === 'success') {
        let _fileList = fileList.map(item => {
          return {
            name: item.name,
            url: config.imgRoot + item.response.data.name
          }
        })
        if (type === 'otherImg') {
          this.building.other[key].img = _fileList
        } else if (type === 'other1Img') {
          this.building.other1[key].img = _fileList
        } else if (type === 'amount') {
          this.building.amountImg = _fileList
        } else if (type === 'service') {
          this.building.other3[key].img = _fileList
        } else if (type === 'thumbnail') {
          this.building.thumbnail = _fileList
        } else if (type === 'thumbnail') {
          this.building.thumbnail = _fileList
        }
      } else {
        return false
      }
    },
    handleSuccess (res, file, fileList, type, key) {
      if (type === 'otherImg') {
        if (!this.building.other[key].img) {
          this.building.other[key].img = []
        }
        this.building.other[key].img.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'other1Img') {
        if (!this.building.other1[key].img) {
          this.building.other1[key].img = []
        }
        this.building.other1[key].img.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'amount') {
        if (!this.building.amountImg) {
          this.building.amountImg = []
        }
        this.building.amountImg.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'service') {
        if (!this.building.other3[key].img) {
          this.building.other3[key].img = []
        }
        this.building.other3[key].img.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'thumbnail') {
        if (!this.building.thumbnail) {
          this.building.thumbnail = []
        }
        this.building.thumbnail = [{
          name: res.data.name,
          url: config.imgRoot + res.data.name
        }]
      }
    },
    // 获取省
    getProvince () {
      areaProvince().then((result) => {
        this.provinceList = result.data
      })
    },
    getCity (id, index) {
      areaCity({ id }).then((result) => {
        if (index === undefined) {
          this.cityList = result.data
        } else {
          let _other = JSON.parse(JSON.stringify(this.building.other))
          _other[index].cityList = result.data
          this.building.other = _other
        }
      })
    },
    getArea (id, index) {
      areaArea({ id }).then((result) => {
        if (index === undefined) {
          this.areaList = result.data
        } else {
          let _other = JSON.parse(JSON.stringify(this.building.other))
          _other[index].areaList = result.data
          this.building.other = _other
        }
      })
    },
    changeProvince (id, index) {
      if (index === undefined) {
        this.cityId = ''
        this.building.areaId = ''
        this.areaList = []
        this.getCity(id)
      } else {
        this.building.other[index].cityId = ''
        this.building.other[index].areaId = ''
        this.building.other[index].areaList = []
        this.getCity(id, index)
      }
    },
    changeCity (id, index) {
      if (index === undefined) {
        this.building.areaId = ''
        this.getArea(id)
      } else {
        this.building.other[index].areaId = ''
        this.getArea(id, index)
      }
    },
    getProjectList () {
      projectList().then((result) => {
        this.projectLists = result.data && result.data[4].list
      })
    },
    onSubmit () {
      this.$refs['building'].validate((valid) => {
        if (valid) {
          this.loading = true
          let _building = Object.assign({}, this.building)
          _building.areaId = _building.areaId
          _building.amountImg = JSON.stringify(_building.amountImg)
          _building.other = _building.other.map(item => {
            delete item.areaList
            delete item.cityList
            return item
          })
          _building.equipments = _building.equipments && _building.equipments.join(':')
          _building.other = JSON.stringify(_building.other)
          _building.other1 = JSON.stringify(_building.other1)
          _building.other2 = JSON.stringify(_building.other2)
          _building.other3 = JSON.stringify(_building.other3)
          projectEdit(_building).then((result) => {
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
