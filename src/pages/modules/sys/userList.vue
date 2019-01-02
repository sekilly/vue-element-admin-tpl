<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >用户管理</label>
      <div align="right" class="el-form-item__content">
        <!--<a href="/orgAdd" class="m-button m-button-type-plain"><i class="fa fa-plus"></i> 新增</a>-->
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> {{searchBtnName}}</m-button>
      </div>
    </div>
  </div>

  <div class="box">
    <el-container style="height: 100%;">
      <el-aside width="200px">
        <div class="box-header">
          <div class="box-title">
            <i class="fa el-icon-menu"></i> 组织架构
          </div>
          <div class="box-tools pull-right">
            <a href="javascript:void(0)" @click="getOrgTree"><i class="fa fa-refresh"></i></a>
          </div>
        </div>
        <el-aside style="width: 100%; margin-top: 15px">
          <el-tree ref="orgTree" :data="orgList" :highlight-current="true" v-loading="isOrgLoading" @node-click="list" node-key="id" :props="{label:'name'}"></el-tree>
        </el-aside>
      </el-aside>
        <el-main>
          <el-form :inline="true" :model="search"  v-show="searchShow">
            <el-form-item label="姓名：">
              <el-input v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model="search.mobilePhone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="list">查询</el-button>
              <el-button plain @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="pager.list" border v-loading="isLoading" max-height="100%">
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="姓名" prop="name" header-align="center"></el-table-column>
            <!--<el-table-column label="登录账号" prop="name" header-align="center"></el-table-column>-->
            <el-table-column label="所属机构" prop="org.name" align="center"></el-table-column>
            <el-table-column label="性别" prop="sex" align="center">
              <template slot-scope="scope">
                <div class="cell" v-if="scope.row.sex === 0">女</div>
                <div class="cell" v-else-if="scope.row.sex === 1">男</div>
              </template>
            </el-table-column>
            <el-table-column label="生日" prop="birthday" align="center"></el-table-column>
            <el-table-column label="手机号码" prop="mobilePhone" align="center"></el-table-column>
            <el-table-column label="邮箱" prop="email" header-align="center"></el-table-column>
            <el-table-column label="状态" prop="status" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">正常</span>
                <span v-if="scope.row.status === 2">冻结</span>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <a href="javascript:void(0)" @click="getById(scope.row.id)" title="编辑"><i class="el-icon-edit"></i></a>&nbsp;&nbsp;
                <a v-if="scope.row.status === 0" href="javascript:void(0)" @click="frozen(scope.row.id)" title="冻结"><i class="fa fa-ban"></i></a>
                <a v-if="scope.row.status === 2" href="javascript:void(0)" @click="unfrozen(scope.row.id)" title="解冻"><i class="fa fa-level-up"></i></a>&nbsp;&nbsp;
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
        </el-main>
    </el-container>

  </div>
  <el-dialog :title="saveFormName" :visible.sync="saveFormVisible">
    <el-form :model="saveBean" label-width="100px" :rules="rules" ref="saveForm">
      <m-box>
        <m-container fluid >
          <div class="form-unit">基本信息</div>
          <m-row>
            <m-col md="6">
              <el-form-item label="上级组织：" prop="pathArray">
                <el-cascader change-on-select expand-trigger="hover" :show-all-levels="false" :options="orgList" style="width: 100%"
                             @change="handleChange" v-model="saveBean.pathArray" :props="{value:'id',label:'name',disabled:'isLastGrade'}">
                </el-cascader>
              </el-form-item>
            </m-col>
            <m-col md="6"></m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="员工姓名：" prop="name">
                <el-input v-model="saveBean.name" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="saveBean.email" type="email">
                  <template slot="append"><i class="fa fa-fw fa-envelope"></i></template>
                </el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="手机号码：" prop="mobilePhone">
                <el-input v-model="saveBean.mobilePhone" :maxlength="11" :disabled="typeof this.saveBean.id !== 'undefined'"
                          onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))">
                  <template slot="append"><i class="el-icon-mobile-phone"></i></template>
                </el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="联系电话：">
                <el-input v-model="saveBean.phone" :maxlength="20">
                  <template slot="append"><i class="fa fa-fw fa-phone"></i></template>
                </el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <div class="form-unit">详细信息</div>
          <m-row>
            <m-col md="6">
              <el-form-item label="性别：">
                <el-select v-model="saveBean.sex" placeholder="请选择" style="width: 100%">
                  <el-option key="1" label="男" :value="1"></el-option>
                  <el-option key="0" label="女" :value="0"></el-option>
                </el-select>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="出生日期：">
                <el-date-picker v-model="saveBean.birthday" type="date" placeholder="选择日期"
                                value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="员工编号：">
                <el-input v-model="saveBean.no" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="权重(排序)：">
                <el-input type="number" :controls="false" v-model="saveBean.sort" :min="1" :max="999999999"
                          onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
                          placeholder="权重越大排名越靠前，请填写数字。"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="12">
              <el-form-item label="备注信息：">
                <el-input type="textarea" :rows="3" v-model="saveBean.remarks" :maxlength="255" resize="none"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <div class="form-unit">配置角色</div>
          <m-row>
            <m-col md="12">
              <el-checkbox-group v-model="saveBean.roleIdList">
                <el-checkbox v-for="(role, index) in roleList" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
              </el-checkbox-group>
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
          pageNum: 1,
          pageSize: 10
        },
        pager: {},
        saveBean: {
          roleIdList: []
        },
        orgList: [],
        roleList: [],
        searchShow: false,
        saveFormName: '新增',
        searchBtnName: '搜索',
        saveFormVisible: false,
        isLoading: true,
        isOrgLoading: true,
        rules: {
          pathArray: [
            { required: true, message: '请选择所在组织', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          mobilePhone: [
            { required: true, message: '请输入11位手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.getOrgTree()
      this.list()
      this.getRoleList()
    },
    methods: {
      reset () {
        this.search = {
          pageNum: 1,
          pageSize: 10
        }
        this.list()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.search.pageSize = val
        this.list()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.search.pageNum = val
        this.list()
      },
      list () {
        this.isLoading = true
        var selectedOrg = this.$refs.orgTree.getCurrentNode()
        if (selectedOrg !== null) {
          this.search['org.path'] = selectedOrg.path
        }
        // console.log(this.search)
        this.$http.get(this.global.serverPath + 'user', {params: this.search}, {emulateJSON: true})
          .then((response) => {
            this.isLoading = false
            this.pager = response.data
          }, (response) => {
            this.isLoading = false
            console.log('error ==== ' + response)
          })
      },
      frozen (id) {
        this.$confirm('冻结后不可登录系统，确定冻结该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.global.serverPath + 'user/frozen', {params: {'id': id}}, {emulateJSON: true})
            .then((response) => {
              this.list()
              this.$message(response.msg)
            }, (response) => {
              console.log('error ==== ' + response)
            })
        }).catch(() => {
          // this.$message('已取消')
        })
      },
      unfrozen (id) {
        this.$confirm('确定要解冻该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get(this.global.serverPath + 'user/unfrozen', {params: {'id': id}}, {emulateJSON: true})
            .then((response) => {
              this.list()
              this.$message(response.msg)
            }, (response) => {
              console.log('error ==== ' + response)
            })
        }).catch(() => {
          // this.$message('已取消')
        })
      },
      del (id) {
        console.log('delete ==== id = ' + id)
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(this.global.serverPath + 'user', {params: {'id': id}}, {emulateJSON: true})
            .then((response) => {
              this.list()
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
        this.$http.get(this.global.serverPath + 'user/' + id)
          .then((response) => {
            console.log(response.data)
            this.saveBean = response.data
            // console.log(this.$refs.orgTree.getNode([this.saveBean.org.id]))
            if (this.saveBean.org != null && this.saveBean.org.id != null) {
              this.$refs.orgTree.setCurrentKey(this.saveBean.org.id)
            }
            this.saveFormVisible = true
            // let selectedOrg = this.$refs.orgTree.getNode(this.saveBean.org.id)
            //
            // if (selectedOrg !== null) {
            //   var pathArray = selectedOrg.path.split('/')
            //   this.saveBean.pathArray = pathArray
            // }
          }, (response) => {
            console.log('error ==== ' + response)
            // return this.$message.warning('222')
          })
      },
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.saveBean)
            this.$http.post(this.global.serverPath + 'user', this.saveBean, {emulateJSON: true})
              .then((response) => {
                this.saveFormVisible = false
                this.list()
                // this.$message(response.msg)
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
      handleChange (val) {
        this.saveBean.org = {id: val[val.length - 1]}
        console.log(this.saveBean)
      },
      getOrgTree () {
        this.isOrgLoading = true
        this.$http.get(this.global.serverPath + 'organization/tree')
          .then((response) => {
            this.isOrgLoading = false
            this.orgList = []
            this.orgList.push({id: '0', 'name': '全部'})
            for (var index in response.data) {
              this.orgList.push(response.data[index])
            }
          }, (response) => {
            this.isOrgLoading = false
            console.log('error ==== ' + response)
          })
      },
      getRoleList () {
        this.$http.get(this.global.serverPath + 'role/all')
          .then((response) => {
            this.roleList = response.data
          }, (response) => {
            console.log('error ==== ' + response)
          })
      }
    },
    watch: {
      saveFormVisible (val, oldVal) {
        if (val === false) {
          this.saveBean = {}
          this.$refs['saveForm'].resetFields()
          this.saveFormName = '新增'
        } else {
          var selectedOrg = this.$refs.orgTree.getCurrentNode()
          console.log(selectedOrg)
          if (selectedOrg !== null && selectedOrg.id !== '0') {
            var pathArray = selectedOrg.path.split('/')
            this.saveBean.pathArray = pathArray
          }
          // console.log(this.$refs.orgTree.getCurrentNode().path)
          // this.$refs.orgTree.setCurrentNode(this.$refs.orgTree.getCurrentNode())
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
