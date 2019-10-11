<style lang="scss" scoped>

</style>
<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogVisible = true">新增子账号</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="project"
        label="管辖场馆"
      >
      <template slot-scope="scope">
        <div>
          <p v-for="(item, index) in scope.row.project" :key="index">{{ item }}</p>
        </div>
      </template>
      </el-table-column>
      <el-table-column
        prop="permissionList"
        label="操作权限"
      >
      <template slot-scope="scope">
        <div>
          <p v-for="(item, index) in scope.row.permissionList" :key="index">{{ item.name }}</p>
        </div>
      </template>
      </el-table-column>
      <el-table-column
        prop="permissionList"
        label="操作"
      >
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="deleUser(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="设置" v-if="dialogVisible" :visible.sync="dialogVisible">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="用户名" prop="subName">
            <el-input style="width: 194px" v-model="form.subName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="subPhone">
            <el-input style="width: 194px" v-model="form.subPhone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="subPwd">
            <el-input style="width: 194px" v-model="form.subPwd" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="管理范围" prop="cgList">
            <el-select style="width: 100%" multiple v-model="form.cgList" placeholder="请选择">
              <el-option
                v-for="(item, index) in areaList"
                :key="index"
                :label="item.basic && item.basic.proName"
                :value="item.basic && item.basic.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作权限" prop="permissionList">
            <el-select style="width: 100%" multiple v-model="form.permissionList" placeholder="请选择">
              <el-option
                v-for="(item, index) in permissionList"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setPermission">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { userManageList, basiceTopOrder, permissionList, userAdd, userEdit } from './../../api/merchant'
export default {
  data () {
    return {
      form: {},
      tableData: [],
      areaList: [],
      permissionList: [],
      dialogVisible: false,
      rules: {
        subName: [{ required: true, message: '请输入用户名' }],
        subPhone: [{ required: true, message: '请输入手机号' }],
        subPwd: [{ required: true, message: '请输入密码' }],
        cgList: [{ required: true, message: '请选择管理范围' }],
        permissionList: [{ required: true, message: '请选择操作权限' }]
      }
    }
  },
  beforeMount () {
    this.getUserList()
    this.getAreaList()
    this.getPermissionList()
  },
  methods: {
    deleUser ({ adminId }) {
      userEdit({ id: adminId }).then((result) => {
        this.getUserList()
      })
    },
    getUserList () {
      userManageList({
        type: 1
      }).then((result) => {
        this.tableData = result.data || []
      })
    },
    getAreaList () {
      basiceTopOrder().then((result) => {
        this.areaList = result.data || []
      })
    },
    getPermissionList () {
      permissionList({
        type: 1
      }).then((result) => {
        this.permissionList = (result.data || []).filter(item => { return item.id !== 20 })
      })
    },
    setPermission () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          userAdd({
            ...this.form,
            type: 1,
            cgList: (this.form.cgList || []).join(':'),
            permissionList: (this.form.permissionList || []).join(':')
          }).then((result) => {
            this.dialogVisible = false
            this.getUserList()
          })
        }
      })
    }
  }
}
</script>
