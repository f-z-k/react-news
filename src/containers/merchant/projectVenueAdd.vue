<style lang="scss" scoped>
  .input-wrap {
    width: 300px;
  }
  .upload-wrap {
    width: 300px;
  }
  .other-wrap {
    width: 400px;
    border: 1px solid #d8d8d8;
    padding: 10px;
    >div {
      margin-bottom: 4px;
    }
  }
  .other-area-wrap {
    width: 750px;
    border: 1px solid #d8d8d8;
    padding: 10px;
    margin-left: 150px;
  }
  .bj-img {
    width: 40px;
    height: 40px;
    position: relative;
    top: 14px;
  }
</style>
<template>
  <div>
    <h2>场馆基本信息</h2>
    <el-form ref="vernue" :model="vernue" :rules="rules" label-width="200px">
      <el-form-item label="场馆类型" prop="proId">
        <el-select v-model="vernue.proId" placeholder="场馆类型">
          <el-option v-for="item in projectLists" :key="item.sortId" :label="item.sortName" :value="item.sortId" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场馆名称" prop="proName">
        <el-input class="input-wrap" v-model="vernue.proName"></el-input>
      </el-form-item>
      <el-form-item label="门店名称">
        <el-input class="input-wrap" v-model="vernue.branchName"></el-input>
      </el-form-item>
      <el-form-item label="列表缩略图" prop="thumbnail">
        <el-upload
          class="upload-wrap"
          :action="config.apiRoot + '/upload'"
          :before-upload="beforeUpload"
          :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'thumbnail') }"
          :on-remove="(file, fileList) => { handleRemove(file, fileList, 'thumbnail') }"
          :file-list="vernue.thumbnail"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="所在城市及区域" prop="areaId">
        <el-select placeholder="省" v-model="provinceId" @change="changeProvince">
          <el-option v-for="item in provinceList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
        <el-select v-model="cityId" placeholder="市" @change="changeCity">
          <el-option v-for="item in cityList" :key="item.areaId" :label="item.name" :value="item.areaId"></el-option>
        </el-select>
        <el-select v-model="vernue.areaId" placeholder="区">
          <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体地址" prop="address">
        <el-input class="input-wrap" v-model="vernue.address"></el-input>
      </el-form-item>
      <el-form-item label="每天营业时间(开始)" prop="startTime">
        <el-time-select
          v-model="vernue.startTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00'
          }"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <el-form-item label="每天营业时间(结束)" prop="endTime">
        <el-time-select
          v-model="vernue.endTime"
          :picker-options="{
            start: '00:00',
            step: '00:15',
            end: '24:00',
            minTime: vernue.startTime
          }"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <el-form-item label="每周营业天数" prop="days">
        <el-select v-model="vernue.days" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员电话" prop="phone">
        <el-input class="input-wrap" v-model="vernue.phone"></el-input>
      </el-form-item>
      <el-form-item label="其他管理员电话">
        <el-input class="input-wrap" v-model="vernue.otherPhone"></el-input>
      </el-form-item>
      <el-form-item label="最近一次装修时间" prop="newTime">
        <el-date-picker
          v-model="vernue.newTime"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="停车及收费指南" prop="stopCart">
        <el-input class="input-wrap" type="textarea" v-model="vernue.stopCart"></el-input>
      </el-form-item>
      <el-form-item label="收费标准或备注" prop="stopAmount">
        <el-upload
          class="upload-wrap"
          :action="config.apiRoot + '/upload'"
          :before-upload="beforeUpload"
          :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'amount') }"
          :on-remove="(file, fileList) => { handleRemove(file, fileList, 'amount') }"
          :file-list="vernue.amountImg"
          list-type="picture">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
        <el-input class="input-wrap" placeholder="收费备注" type="textarea" v-model="vernue.stopAmount"></el-input>
      </el-form-item>
      <el-form-item label="其他服务套餐">
        <el-button size="small" type="primary" @click="addMeal">添加</el-button>
        <div class="other-wrap" v-for="(item, index) in vernue.other" :key="index">
          <div>
            <el-input class="input-wrap" placeholder="套餐名称" type="text" v-model="item.name"></el-input>
            <el-button size="small" type="primary" v-if="index !== 0" @click="deleMeal(index)">删除</el-button>
          </div>
          <div>
            <el-input class="input-wrap" placeholder="套餐备注" type="textarea" v-model="item.dsc"></el-input>
          </div>
          <div>
            <el-upload
              class="upload-wrap"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'meal', index) }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'meal', index) }"
              :file-list="item.img"
              list-type="picture">
              <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="其他须知事项">
        <el-input class="input-wrap" type="textarea" v-model="vernue.extend1"></el-input>
      </el-form-item>
      <div v-if="[7, 8, 9].indexOf(vernue.proId) > -1">
        <h2>场馆总体信息</h2>
        <el-form-item label="总面积" prop="area">
          <el-input class="input-wrap" type="text" placeholder="m2" v-model="vernue.area"></el-input>
        </el-form-item>
        <el-form-item label="层高" prop="height">
          <el-input class="input-wrap" type="text" placeholder="m" v-model="vernue.height"></el-input>
        </el-form-item>
        <el-form-item label="最多接待人数" prop="countNum">
          <el-input class="input-wrap" placeholder="人" type="text" v-model="vernue.countNum"></el-input>
        </el-form-item>
        <el-form-item label="设施设备/服务">
          <el-select v-model="vernue.equipments" multiple placeholder="请选择">
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
          <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="vernue.otherEq"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upload-wrap">
            <el-upload
              class="upload-demo"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'img') }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'img') }"
              :file-list="vernue.img"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="简介">
          <el-input class="input-wrap" type="textarea" v-model="vernue.descInfo"></el-input>
        </el-form-item>
        <h2>场馆分区域描述</h2>
        <el-form-item label="">
          <el-button size="small" type="primary" @click="addOtherArea">添加</el-button>
        </el-form-item>
        <div class="other-area-wrap" v-for="(item, index) in vernue.other1" :key="index">
          <el-form-item label="该区域名称">
            <el-input class="input-wrap" type="text" v-model="item.name"></el-input>
            <el-button size="small" v-if="index !== 0" type="primary" @click="deleOtherArea(index)">删除</el-button>
          </el-form-item>
          <el-form-item label="该区域面积">
            <el-input class="input-wrap" placeholder="m2" type="text" v-model="item.area"></el-input>
          </el-form-item>
          <el-form-item label="该区域最多容纳人数">
            <el-input class="input-wrap" type="text" placeholder="人" v-model="item.count"></el-input>
          </el-form-item>
          <el-form-item label="设施设备/服务">
            <el-select v-model="item.equipments" value-key="label" multiple placeholder="请选择">
              <el-option-group
                v-for="group in equipmentList"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.label"
                  :label="item.value"
                  :value="item"
                >
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="item.otherEq"></el-input>
          </el-form-item>
          <el-form-item label="添加图片">
            <div class="upload-wrap">
              <el-upload
                class="upload-demo"
                :before-upload="beforeUpload"
                :action="config.apiRoot + '/upload'"
                :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'otherImg', index) }"
                :on-remove="(file, fileList) => { handleRemove(file, fileList, 'otherImg', index) }"
                :file-list="item.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input class="input-wrap" type="textarea" v-model="item.desc"></el-input>
          </el-form-item>
        </div>
        <h2>其他标准化信息</h2>
        <el-form-item label="有无厨房">
          <el-radio-group v-model="vernue.kitchen">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.kitchenInfo"></el-input>
        </el-form-item>
        <el-form-item label="可否火锅">
          <el-radio-group v-model="vernue.hotPot">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.hotPotInfo"></el-input>
        </el-form-item>
        <el-form-item label="可否自助烧烤">
          <el-radio-group v-model="vernue.barbecue">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.barbecueInfo"></el-input>
        </el-form-item>
        <el-form-item label="有无餐厅/餐桌">
          <el-radio-group v-model="vernue.restaurant">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.restaurantInfo"></el-input>
        </el-form-item>
        <el-form-item label="有无会议室">
          <el-radio-group v-model="vernue.boardroom">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.brInfo"></el-input>
        </el-form-item>
        <el-form-item label="有无舞台">
          <el-radio-group v-model="vernue.stage">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.stageInfo"></el-input>
        </el-form-item>
        <el-form-item label="是否有服务人员">
          <el-radio-group v-model="vernue.waiter">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.waiterInfo"></el-input>
        </el-form-item>
        <el-form-item label="KTV时间有无限制">
          <el-radio-group v-model="vernue.ktvTime">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.ktvInfo"></el-input>
        </el-form-item>
        <el-form-item label="是否可以自带零食酒水饮料">
          <el-radio-group v-model="vernue.drinks">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.drinksInfo"></el-input>
        </el-form-item>
        <el-form-item label="是否提供场地布置策划服务">
          <el-radio-group v-model="vernue.field">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.fieldInfo"></el-input>
        </el-form-item>
        <el-form-item label="是否提供轰趴师或主持人服务">
          <el-radio-group v-model="vernue.host">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.hostInfo"></el-input>
        </el-form-item>
        <el-form-item label="是否提供住宿">
          <el-radio-group v-model="vernue.stay">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="住宿人数上限">
          <el-input class="input-wrap" v-model="vernue.stayUpNum"></el-input>
        </el-form-item>
        <el-form-item label="是否提供一次性洗漱用品">
          <el-radio-group v-model="vernue.stayIsXs">
            <el-radio label="1">有</el-radio>
            <el-radio label="0">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input class="input-wrap" type="textarea" v-model="vernue.stayInfo"></el-input>
        </el-form-item>
      </div>
      <div v-if="[10, 11, 12, 14, 15, 16, 17, 18, 19, 26, 44].indexOf(vernue.proId) > -1">
        <h2>场馆总体信息</h2>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="vernue.type">
            <el-radio label="0">全室外</el-radio>
            <el-radio label="1">全室内</el-radio>
            <el-radio label="2">室内室外都有</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设施设备/服务">
          <el-select v-model="vernue.equipments" multiple placeholder="请选择">
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
          <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="vernue.otherEq"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upload-wrap">
            <el-upload
              class="upload-demo"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'img') }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'img') }"
              :file-list="vernue.img"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="简介">
          <el-input class="input-wrap" type="textarea" v-model="vernue.descInfo"></el-input>
        </el-form-item>
        <h2>场馆分区域描述</h2>
        <el-form-item label="">
          <el-button size="small" type="primary" @click="addOtherArea">添加</el-button>
        </el-form-item>
        <div class="other-area-wrap" v-for="(item, index) in vernue.other1" :key="index">
          <el-form-item label="该区域名称">
            <el-input class="input-wrap" type="text" v-model="item.name"></el-input>
            <el-button size="small" type="primary" v-if="index !== 0" @click="deleOtherArea(index)">删除</el-button>
          </el-form-item>
          <el-form-item label="该区域类型">
            <el-radio-group v-model="item.type">
              <el-radio :label="0">全室外</el-radio>
              <el-radio :label="1">全室内</el-radio>
              <el-radio :label="2">室内室外都有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="设施设备/服务">
            <el-select v-model="item.equipments" multiple placeholder="请选择">
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
            <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="item.otherEq"></el-input>
          </el-form-item>
          <el-form-item label="添加图片">
            <div class="upload-wrap">
              <el-upload
                class="upload-demo"
                :action="config.apiRoot + '/upload'"
                :before-upload="beforeUpload"
                :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'otherImg', index) }"
                :on-remove="(file, fileList) => { handleRemove(file, fileList, 'otherImg', index) }"
                :file-list="item.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input class="input-wrap" type="textarea" v-model="item.desc"></el-input>
          </el-form-item>
        </div>
      </div>
      <div v-if="[24, 42].indexOf(vernue.proId) > -1">
        <h2>场馆总体信息</h2>
        <el-form-item label="酒店星级" prop="hotelStar" v-if="vernue.proId === 24">
          <el-select v-model="vernue.hotelStar">
            <el-option label="五星级酒店" value="5"></el-option>
            <el-option label="四星级酒店" value="4"></el-option>
            <el-option label="三星级以下" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="酒店总面积" prop="area">
          <el-input class="input-wrap" type="text" placeholder="m2" v-model="vernue.area"></el-input>
        </el-form-item>
        <el-form-item label="客房总数" prop="roomNum">
          <el-input class="input-wrap" type="text" placeholder="间" v-model="vernue.roomNum"></el-input>
        </el-form-item>
        <el-form-item label="设施设备/服务">
          <el-select v-model="vernue.equipments" multiple placeholder="请选择">
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
          <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="vernue.otherEq"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upload-wrap">
            <el-upload
              class="upload-demo"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'img') }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'img') }"
              :file-list="vernue.img"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="简介">
          <el-input class="input-wrap" type="textarea" v-model="vernue.descInfo"></el-input>
        </el-form-item>
        <h2>场馆分区域描述</h2>
        <el-form-item label="">
          <el-button size="small" type="primary" @click="addOtherArea">添加</el-button>
        </el-form-item>
        <div class="other-area-wrap" v-for="(item, index) in vernue.other1" :key="index">
          <el-form-item label="该区域名称">
            <el-input class="input-wrap" type="text" v-model="item.name"></el-input>
            <el-button size="small" type="primary" v-if="index !== 0" @click="deleOtherArea(index)">删除</el-button>
          </el-form-item>
          <el-form-item label="该区域面积">
            <el-input class="input-wrap" placeholder="m2" type="text" v-model="item.area"></el-input>
          </el-form-item>
          <el-form-item label="该区域/类型客房数">
            <el-input class="input-wrap" placeholder="间" type="text" v-model="item.count"></el-input>
          </el-form-item>
          <el-form-item label="设施设备/服务">
            <el-select v-model="item.equipments" multiple placeholder="请选择">
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
            <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="item.otherEq"></el-input>
          </el-form-item>
          <el-form-item label="添加图片">
            <div class="upload-wrap">
              <el-upload
                class="upload-demo"
                :action="config.apiRoot + '/upload'"
                :before-upload="beforeUpload"
                :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'otherImg', index) }"
                :on-remove="(file, fileList) => { handleRemove(file, fileList, 'otherImg', index) }"
                :file-list="item.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="简介">
            <el-input class="input-wrap" type="textarea" v-model="item.desc"></el-input>
          </el-form-item>
        </div>
        <h2>入离须知</h2>
        <el-form-item label="入住时间" prop="checkInTime">
          <el-time-select
            v-model="vernue.checkInTime"
            :picker-options="{
              start: '00:00',
              end: '24:00'
            }"
            placeholder="选择时间">
          </el-time-select>之后
        </el-form-item>
        <el-form-item label="退房时间" prop="checkOutTime">
          <el-time-select
            v-model="vernue.checkOutTime"
            :picker-options="{
              start: '00:00',
              end: '24:00'
            }"
            placeholder="选择时间">
          </el-time-select>
          之前
        </el-form-item>
        <h2>其他标准化信息</h2>
        <el-form-item label="是否允许做饭">
          <el-radio-group v-model="vernue.extend2.zf">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许吸烟">
          <el-radio-group v-model="vernue.extend2.xy">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许聚会">
          <el-radio-group v-model="vernue.extend2.jh">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许带宠物">
          <el-radio-group v-model="vernue.extend2.cw">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否允许带外籍人士">
          <el-radio-group v-model="vernue.extend2.wj">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否接待无监护人陪同未满18岁客户">
          <el-radio-group v-model="vernue.extend2.xh">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div v-if="[20, 21, 22, 23].indexOf(vernue.proId) > -1">
        <h2>场馆总体信息</h2>
        <el-form-item label="酒店星级" prop="hotelStar" v-if="vernue.proId === 20">
          <el-select v-model="vernue.hotelStar">
            <el-option label="五星级酒店" value="5"></el-option>
            <el-option label="四星级酒店" value="4"></el-option>
            <el-option label="三星级以下" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会场数量" prop="venueNum">
          <el-input class="input-wrap" type="text" v-model="vernue.venueNum"></el-input>
        </el-form-item>
        <el-form-item label="最大会场面积" prop="maxVenue">
          <el-input class="input-wrap" type="text" v-model="vernue.maxVenue"></el-input>
        </el-form-item>
        <el-form-item label="最大可容纳人数" prop="maxVenueNum">
          <el-input class="input-wrap" type="text" v-model="vernue.maxVenueNum"></el-input>
        </el-form-item>
        <el-form-item label="设施设备/服务">
          <el-select v-model="vernue.equipments" multiple placeholder="请选择">
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
          <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="vernue.otherEq"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <div class="upload-wrap">
            <el-upload
              class="upload-demo"
              :action="config.apiRoot + '/upload'"
              :before-upload="beforeUpload"
              :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'img') }"
              :on-remove="(file, fileList) => { handleRemove(file, fileList, 'img') }"
              :file-list="vernue.img"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="简介">
          <el-input class="input-wrap" type="textarea" v-model="vernue.descInfo"></el-input>
        </el-form-item>
        <h2>场馆分区域描述</h2>
        <el-form-item label="">
          <el-button size="small" type="primary" @click="addOtherArea">添加</el-button>
        </el-form-item>
        <div class="other-area-wrap" v-for="(item, index) in vernue.other1" :key="index">
          <el-form-item label="该区域名称">
            <el-input class="input-wrap" type="text" v-model="item.name"></el-input>
            <el-button size="small" type="primary" v-if="index !== 0" @click="deleOtherArea(index)">删除</el-button>
          </el-form-item>
          <el-form-item label="该区域面积">
            <el-input class="input-wrap" type="text" v-model="item.area"></el-input>
          </el-form-item>
          <el-form-item label="该区域层高">
            <el-input class="input-wrap" type="text" v-model="item.height"></el-input>
          </el-form-item>
          <el-form-item label="该区域最多容纳人数">
            <el-input class="input-wrap" type="text" v-model="item.count"></el-input>
          </el-form-item>
          <el-form-item label="场地特点">
            <el-radio-group v-model="item.feature">
              <el-radio :label="1">有柱</el-radio>
              <el-radio :label="0">无柱</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="布局方式">
            <el-checkbox-group v-model="item.layout">
              <img class="bj-img" src="./../../static/img/bj-jy.png"/>
              <el-checkbox label="剧院式"></el-checkbox>
              <img class="bj-img" src="./../../static/img/bj-kz.png"/>
              <el-checkbox label="课桌式"></el-checkbox>
              <img class="bj-img" src="./../../static/img/bj-yh.png"/>
              <el-checkbox label="宴会式"></el-checkbox>
              <img class="bj-img" src="./../../static/img/bj-u.png"/>
              <el-checkbox label="U型"></el-checkbox>
              <img class="bj-img" src="./../../static/img/bj-yg.png"/>
              <el-checkbox label="鱼骨式"></el-checkbox>
              <img class="bj-img" src="./../../static/img/bj-ds.png"/>
              <el-checkbox label="董事会"></el-checkbox>
              <img class="bj-img" src="./../../static/img/bj-jh.png"/>
              <el-checkbox label="酒会式"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="设施设备/服务">
            <el-select v-model="item.equipments" multiple placeholder="请选择">
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
            <el-input class="input-wrap" type="textarea" placeholder="其他设备描述" v-model="item.otherEq"></el-input>
          </el-form-item>
          <el-form-item label="添加图片">
            <div class="upload-wrap">
              <el-upload
                class="upload-demo"
                :action="config.apiRoot + '/upload'"
                :before-upload="beforeUpload"
                :on-success="(res, file, fileList) => { handleSuccess(res, file, fileList, 'otherImg', index) }"
                :on-remove="(file, fileList) => { handleRemove(file, fileList, 'otherImg', index) }"
                :file-list="item.img"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </div>
      </div>
      <br/>
      <el-form-item label="退款模式" prop="rateType">
        <el-select v-model="vernue.rateType" placeholder="请选择">
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
        <el-button type="primary" :loading="loading" @click="onSubmit(vernue)">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
  </div>
</template>
<script>
import moment from 'moment'
import { areaProvince, areaCity, areaArea, equipmentList, projectList } from './../../api/common'
import { projectAdd } from './../../api/merchant'
import config from './../../config'
export default {
  data () {
    return {
      loading: false,
      config: config,
      vernue: {
        cg: 1,
        proId: null,
        days: [],
        areaId: '',
        extend2: {},
        amountImg: [],
        equipments: [],
        other: [{}], // 其他服务套餐
        other1: [{
          layout: []
        }]
      },
      projectLists: [], // 项目列表
      equipmentList: [],
      provinceList: [],
      provinceId: '',
      cityId: '',
      cityList: [],
      areaList: [],
      fileList: [],
      options: [{
        label: '周一',
        value: 1
      }, {
        label: '周二',
        value: 2
      }, {
        label: '周三',
        value: 3
      }, {
        label: '周四',
        value: 4
      }, {
        label: '周五',
        value: 5
      }, {
        label: '周六',
        value: 6
      }, {
        label: '周日',
        value: 7
      }],
      rules: {
        proId: [{ required: true, message: '请选择场馆类型' }],
        proName: [{ required: true, message: '请输入场馆名称' }],
        areaId: [{ required: true, message: '请选择区域' }],
        address: [{ required: true, message: '请输入具体地址' }],
        // time: [{ required: true, message: '请选择营业时间' }],
        startTime: [{ required: true, message: '请选择开始营业时间' }],
        endTime: [{ required: true, message: '请选择结束营业时间' }],
        days: [{ required: true, message: '请选择营业天数' }],
        phone: [{ required: true, message: '请输入管理员手机号' }],
        // otherPhone: [{ required: true, message: '请输入其他管理员手机号' }],
        newTime: [{ required: true, message: '请选择最近一次装修时间' }],
        stopCart: [{ required: true, message: '请输入停车或收费指南' }],
        stopAmount: [{ validator: this.validateAmount }],
        area: [{ required: true, message: '请输入总面积' }],
        height: [{ required: true, message: '请输入层高' }],
        countNum: [{ required: true, message: '请输入最多接待人数' }],
        type: [{ required: true, message: '请选择类型' }],
        roomNum: [{ required: true, message: '请输入客房总数' }],
        hotelStar: [{ required: true, message: '请选择酒店星级' }],
        checkInTime: [{ required: true, message: '请选择时间' }],
        checkOutTime: [{ required: true, message: '请选择时间' }],
        venueNum: [{ required: true, message: '请输入会场数量' }],
        maxVenue: [{ required: true, message: '请输入最大会场面积' }],
        maxVenueNum: [{ required: true, message: '最大可容纳人数' }],
        rateType: [{ required: true, message: '请选择退款模式' }],
        thumbnail: [{ required: true, validator: this.validateThumbnail }]
      }
    }
  },
  beforeMount () {
    this.getProvince()
    this.getEquipmentList()
    this.getProjectList()
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
      let { thumbnail = [] } = this.vernue
      if (!value || !thumbnail.length) {
        return callback(new Error('请上传缩略图'))
      } else {
        callback()
      }
    },
    validateAmount (rule, value, callback) {
      if (!value && (this.vernue.amountImg && !this.vernue.amountImg.length)) {
        return callback(new Error('图片备注二选一'))
      } else {
        callback()
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
        if (type === 'amount') {
          this.vernue.amountImg = _fileList
        } else if (type === 'meal') {
          this.vernue.other[key].img = _fileList
        } else if (type === 'img') {
          this.vernue.img = _fileList
        } else if (type === 'otherImg') {
          this.vernue.other1[key].img = _fileList
        } else if (type === 'thumbnail') {
          this.vernue.thumbnail = _fileList
        }
      } else {
        return false
      }
    },
    handleSuccess (res, file, fileList, type, key) {
      if (type === 'amount') {
        if (!this.vernue.amountImg) {
          this.vernue.amountImg = []
        }
        this.vernue.amountImg.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'meal') {
        if (!this.vernue.other[key].img) {
          this.vernue.other[key].img = []
        }
        this.vernue.other[key].img.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'img') {
        if (!this.vernue.img) {
          this.vernue.img = []
        }
        this.vernue.img.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'otherImg') {
        if (!this.vernue.other1[key].img) {
          this.vernue.other1[key].img = []
        }
        this.vernue.other1[key].img.push({
          name: res.data.name,
          url: config.imgRoot + res.data.name
        })
      } else if (type === 'thumbnail') {
        if (!this.vernue.thumbnail) {
          this.vernue.thumbnail = []
        }
        this.vernue.thumbnail = [{
          name: res.data.name,
          url: config.imgRoot + res.data.name
        }]
      }
    },
    // 套餐增加 删除
    addMeal () {
      this.vernue.other.push({})
    },
    deleMeal (index) {
      this.vernue.other = this.vernue.other.filter((item, key) => key !== index)
    },
    addOtherArea () {
      this.vernue.other1.push({
        layout: []
      })
    },
    deleOtherArea (index) {
      this.vernue.other1 = this.vernue.other1.filter((item, key) => key !== index)
    },
    getProjectList () {
      projectList().then((result) => {
        result.data && result.data.slice(0, 4).forEach(element => {
          this.projectLists = this.projectLists.concat(element.list)
        })
      })
    },
    getEquipmentList () {
      equipmentList().then((result) => {
        this.equipmentList = result.data && result.data.slice(0, 5).concat(result.data.slice(6, 8))
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
        this.areaList = result.data.map(item => {
          return {
            id: item.areaId,
            name: item.name
          }
        })
      })
    },
    changeProvince (id) {
      this.cityId = ''
      this.vernue.areaId = ''
      this.areaList = []
      this.getCity(id)
    },
    changeCity (id) {
      this.vernue.areaId = ''
      this.getArea(id)
    },
    onSubmit () {
      this.$refs['vernue'].validate((valid) => {
        if (valid) {
          this.loading = true
          let _vernue = Object.assign({}, this.vernue)
          // _vernue.startTime = this.vernue.time && moment(this.vernue.time[0]).format('HH:mm')
          // _vernue.endTime = this.vernue.time && moment(this.vernue.time[1]).format('HH:mm')
          _vernue.days = this.vernue.days.join(':')
          _vernue.newTime = this.vernue.newTime ? moment(this.vernue.newTime).format('YYYY-MM') : ''
          _vernue.amountImg = (this.vernue.amountImg && this.vernue.amountImg.length) ? JSON.stringify(this.vernue.amountImg) : ''
          _vernue.other = this.vernue.other && JSON.stringify(this.vernue.other)
          _vernue.equipments = _vernue.equipments && _vernue.equipments.join(':')
          _vernue.extend2 = _vernue.extend2 && JSON.stringify(_vernue.extend2)
          _vernue.img = this.vernue.img && JSON.stringify(this.vernue.img)
          _vernue.other1 = this.vernue.other1 && JSON.stringify(this.vernue.other1)
          projectAdd(_vernue).then((result) => {
            this.$router.push('/project')
          }, () => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
