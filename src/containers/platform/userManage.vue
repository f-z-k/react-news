<style lang="scss" scoped>

</style>
<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogVisible = true">新增用户</el-button>
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
      <el-dialog title="设置"  :visible.sync="dialogVisible">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="用户名" prop="subName">
            <el-input style="width: 194px" v-model="form.subName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="subPhone">
            <el-input style="width: 194px" v-model="form.subPhone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="subPwd">
            <el-input style="width: 194px" v-model="form.subPwd" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="地推">
            <el-radio-group v-model="form.isSale">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
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
import { userManageList, permissionList, userAdd, userEdit } from './../../api/merchant'
export default {
  data () {
    return {
      form: {
        isSale: 2
      },
      tableData: [],
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
        type: 2
      }).then((result) => {
        this.tableData = result.data || []
      })
    },
    getPermissionList () {
      permissionList({
        type: 2
      }).then((result) => {
        this.permissionList = (result.data || []).filter(item => { return item.id !== 11 })
      })
    },
    setPermission () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          userAdd({
            ...this.form,
            type: 2,
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
