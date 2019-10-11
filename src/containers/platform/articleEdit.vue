<style lang="scss" scoped>
  .input-wrap {
    width: 300px;
  }
  .postion {
    position: relative;
    z-index: 0;
  }
</style>
<template>
  <div>
    <div class="form-wrap">
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="文章类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="(item, index) in articleType"
              :key="index"
              :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select placeholder="省" @change="changeProvince" v-model="form.proviceId">
            <el-option v-for="item in provinceList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
          </el-select>
          <el-select placeholder="市" v-model="form.areaId">
            <el-option v-for="item in cityList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章名称">
          <el-input class="input-wrap" type="text" v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            class="upload-demo"
            :before-upload="beforeUpload"
            :action="config.apiRoot + '/upload'"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture-card">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="">
          <div id="editorElem" class="postion" style="width: 800px;text-align:left"></div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import config from './../../config'
import articleType from './articleType'
import E from 'wangeditor'
import { projectList, areaProvince, areaCity } from './../../api/common'
import { bannerInfoEdit, bannerInfoDetail } from './../../api/platform'
export default {
  data () {
    return {
      config: config,
      articleType: articleType,
      form: {
        info: '',
        areaId: null
      },
      provinceList: [],
      cityList: [],
      fileList: [],
      rules: {
        type: [{ required: true, message: '请选择文章类型' }],
        areaId: [{ required: true, message: '请选择城市' }],
        title: [{ required: true, message: '请填写文章名称' }]
      }
    }
  },
  mounted () {
    this.getProvince()
    // this.getProjectList()
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
      this.form.info = html
    }
    this.editor.create()
    this.getDetail()
  },
  methods: {
    beforeUpload (file) {
      const isLt2kb = file.size / 1024 <= 200
      if (!isLt2kb) {
        this.$message.error('上传图片大小不能超过 200kb!')
      }
      return isLt2kb
    },
    changeProvince (id) {
      this.form.areaId = ''
      this.getCity(id)
    },
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
    getProjectList () {
      let arr = [{
        sortId: 0,
        sortName: '首页'
      }]
      projectList().then((result) => {
        result.data.forEach(element => {
          arr = arr.concat(element.list)
        })
        this.articleType = arr
      })
    },
    submitForm () {
      bannerInfoEdit({
        id: this.$route.params.id,
        ...this.form,
        img: this.fileList[0].url
      }).then((result) => {
        this.$router.push('/articleList')
      })
    },
    getDetail () {
      bannerInfoDetail({ id: this.$route.params.id }).then((result) => {
        this.form = { ...result.data }
        this.fileList = [{
          name: result.data.img,
          url: result.data.img
        }]
        if (this.form.proviceId) {
          this.getCity(this.form.proviceId)
        }
        this.editor.txt.html(result.data.info)
      })
    },
    handleSuccess (res, file, fileList) {
      this.fileList = [{
        name: file.name,
        url: config.imgRoot + file.response.data.name
      }]
    },
    handleRemove (file, fileList) {
      if (file && file.status === 'success') {
        this.fileList = []
      } else {
        // this.fileList.splice(this.fileList.findIndex(item => item.url === file.url), 1)
        // this.fileList = []
        return false
      }
    }
  }
}
</script>
