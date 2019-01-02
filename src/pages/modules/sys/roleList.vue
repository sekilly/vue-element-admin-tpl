<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >角色管理</label>
      <div align="right" class="el-form-item__content">
        <!--<a href="/orgAdd" class="m-button m-button-type-plain"><i class="fa fa-plus"></i> 新增</a>-->
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> {{searchBtnName}}</m-button>
      </div>
    </div>
  </div>

  <div class="box">
    <el-form :inline="true" :model="search"  v-show="searchShow">
      <el-form-item label="角色名称：">
        <el-input v-model="search.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="list">查询</el-button>
        <el-button plain @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pager.list" border v-loading="isLoading" max-height="100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="角色名称" prop="name" header-align="center"></el-table-column>
      <el-table-column label="角色编码" prop="enname" header-align="center"></el-table-column>
      <el-table-column label="是否系统数据" prop="isSys" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.isSys">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="数据范围" prop="dataScope" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dataScope === 1">所有数据</span>
          <span v-else-if="scope.row.dataScope === 2">所在组织数据</span>
          <span v-else-if="scope.row.dataScope === 3">所在组织及以下数据</span>
          <span v-else-if="scope.row.dataScope === 8">仅本人数据</span>
          <span v-else-if="scope.row.dataScope === 9">按明细设置</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="getById(scope.row.id)" title="编辑"><i class="el-icon-edit"></i></a>&nbsp;&nbsp;
          <a href="javascript:void(0)" @click="del(scope.row.id)" title="删除"><i class="el-icon-delete"></i></a>&nbsp;
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pager.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total">
      </el-pagination>
    </div>
  </div>
  <el-dialog :title="saveFormName" :visible.sync="saveFormVisible">
    <el-form :model="saveBean" label-width="130px" :rules="rules" ref="saveForm">
      <m-box>
        <m-container fluid >
          <div class="form-unit">基本信息</div>
          <m-row>
            <m-col md="6">
              <el-form-item label="角色名称：" prop="name">
                <el-input v-model="saveBean.name" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="角色编码：" prop="enname">
                <el-input v-model="saveBean.enname"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="数据范围：">
                <el-select v-model="saveBean.dataScope" placeholder="请选择" style="width: 100%">
                  <el-option key="1" label="所有数据" :value="1"></el-option>
                  <el-option key="2" label="所在组织数据" :value="2"></el-option>
                  <el-option key="3" label="所在组织及以下数据" :value="3"></el-option>
                  <el-option key="4" label="仅本人数据" :value="8"></el-option>
                  <el-option key="5" label="按明细设置" :value="9"></el-option>
                </el-select>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="是否是系统数据：">
                <el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content">“是”代表此数据只有超级管理员能进行修改，<br/>“否”则表示拥有角色修改人员的权限都能进行修改</div>
                  <el-checkbox v-model="saveBean.isSys"></el-checkbox>
                </el-tooltip>
              </el-form-item>
            </m-col>
          </m-row>
          <div class="form-unit">角色授权</div>
          <m-row>
            <m-col md="6">
              <el-form-item>
                <el-tree ref="menuTree" v-if="saveFormVisible" show-checkbox default-expand-all :default-checked-keys="saveBean.menuIdList" :data="menuTree" :highlight-current="true"  node-key="id" :props="{value:'id',label:'name'}"></el-tree>
              </el-form-item>
            </m-col>
            <m-col md="6" >
              <el-form-item >
                <el-tree ref="orgTree" v-if="saveBean.dataScope === 9" show-checkbox default-expand-all :default-checked-keys="saveBean.orgIdList" :data="orgList" :highlight-current="true"  node-key="id" :props="{value:'id',label:'name'}"></el-tree>
              </el-form-item>
            </m-col>
          </m-row>
        </m-container>
      </m-box>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="saveFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save('saveForm')">保 存</el-button>
    </div>
  </el-dialog>
</div>
</template>
<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
  .box-header {
    border-bottom: 1px solid #eee;
    padding: 13px 10px 1px 15px;
  }
  .box .box-header .box-title {
    font-size: 18px;
    font-weight: 100;
    margin: 0;
    float: left;
  }
  .pull-right {
    float: right;
    margin-top: 3px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        search: {
          'page.pageNum': 1,
          'page.pageSize': 10
        },
        pager: {},
        saveBean: {},
        orgList: [],
        menuTree: [],
        searchShow: false,
        saveFormName: '新增',
        searchBtnName: '搜索',
        saveFormVisible: false,
        isLoading: true,
        isOrgLoading: true,
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
          ],
          email: [
            { type: 'enname', message: '请输入角色编码', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    mounted () {
      this.list()
      this.getMenuTree()
      this.getOrgTree()
    },
    methods: {
      reset () {
        this.search = {
          'page.pageNum': 1,
          'page.pageSize': 10
        }
        this.list()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.search['page.pageSize'] = val
        this.list()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.search['page.pageNum'] = val
        this.list()
      },
      list () {
        this.isLoading = true
        console.log(this.search)
        this.$http.get(this.global.serverPath + 'role', {params: this.search}, {emulateJSON: true})
          .then((response) => {
            this.isLoading = false
            this.pager = response.data
          }, (response) => {
            this.isLoading = false
            console.log('error ==== ' + response)
          })
      },
      del (id) {
        console.log('delete ==== id = ' + id)
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(this.global.serverPath + 'role', {params: {'id': id}}, {emulateJSON: true})
            .then((response) => {
              this.list()
              this.getOrgTree()
              this.$message(response.msg)
            }, (response) => {
              console.log('error ==== ' + response)
            })
        }).catch(() => {
          // this.$message('已取消删除')
        })
      },
      getById (id) {
        this.saveFormName = '编辑'
        this.$http.get(this.global.serverPath + 'role/' + id)
          .then((response) => {
            this.saveBean = response.data
            this.saveFormVisible = true
            // console.log(this.$refs.orgTree.getNode([this.saveBean.org.id]))
            // this.$refs.menuTree.setCheckedKeys(this.saveBean.menuIdList)
          }, (response) => {
            console.log('error ==== ' + response)
            // return this.$message.warning('222')
          })
      },
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveBean.menuIdList = this.$refs.menuTree.getCheckedKeys()
            if (this.saveBean.dataScope === 9) {
              this.saveBean.orgIdList = this.$refs.orgTree.getCheckedKeys()
            }
            this.saveBean.menuList = null
            this.saveBean.menuIds = null
            this.saveBean.orgList = null
            this.saveBean.orgIds = null
            console.log(this.saveBean)
            this.$http.post(this.global.serverPath + 'role', this.saveBean, {emulateJSON: true})
              .then((response) => {
                this.saveFormVisible = false
                this.list()
                this.$message(response.msg)
              }, (response) => {
                console.log('error ==== ' + response)
                // return this.$message.warning('222')
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOrgTree () {
        this.$http.get(this.global.serverPath + 'org/tree')
          .then((response) => {
            this.orgList = response.data
          }, (response) => {
            console.log('error ==== ' + response)
          })
      },
      getMenuTree () {
        this.$http.get(this.global.serverPath + 'menu/tree')
          .then((response) => {
            this.menuTree = response.data
          }, (response) => {
            console.log('error ==== ' + response)
          })
      }
    },
    watch: {
      saveFormVisible (val, oldVal) {
        if (val === false) {
          this.saveBean = null
          this.saveBean = {}
          this.$refs['saveForm'].resetFields()
          this.$refs.menuTree.setCheckedKeys([])
          this.saveFormName = '新增'
        } else {

        }
      },
      searchShow (val, oldVal) {
        if (val === true) {
          this.searchBtnName = '隐藏'
        } else {
          this.searchBtnName = '搜索'
        }
      }
    }
  }
</script>
