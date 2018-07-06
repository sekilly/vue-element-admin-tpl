<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >用户管理</label>
      <div align="right" class="el-form-item__content">
        <!--<a href="/orgAdd" class="m-button m-button-type-plain"><i class="fa fa-plus"></i> 新增</a>-->
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> 隐藏</m-button>
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
          <el-tree :data="orgList"  v-loading="isOrgLoading" @node-click="list" node-key="id" :props="{label:'name'}"></el-tree>
        </el-aside>
      </el-aside>
        <el-main>
          <el-form :inline="true" :model="search"  v-show="searchShow">
            <el-form-item label="组织名称：">
              <el-input v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item label="组织编码：">
              <el-input v-model="search.code"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="list">查询</el-button>
              <el-button plain @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="pager.list" border v-loading="isLoading" max-height="100%">
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="姓名" prop="name" header-align="center"></el-table-column>
            <el-table-column label="登录账号" prop="name" header-align="center"></el-table-column>
            <el-table-column label="所属机构" prop="name" header-align="center"></el-table-column>
            <el-table-column label="性别" prop="code" header-align="center"></el-table-column>
            <el-table-column label="生日" prop="path" header-align="center"></el-table-column>
            <el-table-column label="电话" prop="phone" header-align="center"></el-table-column>
            <el-table-column label="邮箱" prop="phone" header-align="center"></el-table-column>
            <el-table-column label="状态" prop="phone" header-align="center"></el-table-column>
            <el-table-column label="更新时间" prop="phone" header-align="center"></el-table-column>
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
              <el-form-item label="上级组织：">
                <el-cascader change-on-select expand-trigger="hover" :show-all-levels="false" :options="orgList" style="width: 100%"
                             @change="handleChange" v-model="saveBean.pathArray" :props="{value:'id',label:'name',disabled:'isLastGrade'}">
                </el-cascader>
              </el-form-item>
            </m-col>
            <m-col md="6"></m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="员工姓名：">
                <el-input v-model="saveBean.name" :maxlength="20" prop="name"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="电子邮箱：">
                <el-input v-model="saveBean.email" type="email">
                  <template slot="append"><i class="fa fa-fw fa-envelope"></i></template>
                </el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="手机号码：">
                <el-input v-model="saveBean.mobile">
                  <template slot="append"><i class="el-icon-mobile-phone"></i></template>
                </el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="联系电话：">
                <el-input v-model="saveBean.phone">
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
                  <el-option key="1" label="男" value="1"></el-option>
                  <el-option key="0" label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="出生日期：">
                <el-date-picker v-model="saveBean.birthday" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="员工编号：">
                <el-input v-model="saveBean.name" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="权重(排序)：">
                <el-input type="number" :controls="false" v-model="saveBean.sort":min="1" :max="999999999"
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
            <m-col md="6">

            </m-col>
            <m-col md="6">

            </m-col>
          </m-row>
        </m-container>
      </m-box>


    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="saveFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save('saveForm')">确 定</el-button>
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
        searchShow: false,
        saveFormName: '新增',
        saveFormVisible: false,
        isLoading: true,
        isOrgLoading: true,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.list()
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
        this.$http.get(this.global.serverPath + 'user', {params: this.search}, {emulateJSON: true})
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
          this.$http.delete(this.global.serverPath + 'user', {params: {'id': id}}, {emulateJSON: true})
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
        console.log('getById ==== id = ' + id)
        this.$http.get(this.global.serverPath + 'org/' + id)
          .then((response) => {
            this.saveFormVisible = true
            this.saveBean = response.data
            var pathArray = this.saveBean.path.split('/')
            //  删除第一个空字符串 splice第一个参数是从第几个元素开始删除， 第2个参数是删除多少个
            pathArray.splice(0, 1)
            //  删除最后一个本身的id
            pathArray.splice(pathArray.length - 1, 1)
            if (pathArray.length === 0) {
              pathArray.push('0')
            }
            this.saveBean.pathArray = pathArray
          }, (response) => {
            console.log('error ==== ' + response)
            // return this.$message.warning('222')
          })
      },
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.saveBean)
            this.$http.post(this.global.serverPath + 'org', this.saveBean, {emulateJSON: true})
              .then((response) => {
                this.saveFormVisible = false
                this.list()
                this.getOrgTree()
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
        this.saveBean.parentId = val[val.length - 1]
        console.log(this.saveBean)
      },
      getOrgTree () {
        this.isOrgLoading = true
        this.$http.get(this.global.serverPath + 'org/tree')
          .then((response) => {
            this.isOrgLoading = false
            this.orgList = response.data
          }, (response) => {
            this.isOrgLoading = false
            console.log('error ==== ' + response)
          })
      }
    },
    watch: {
      saveFormVisible (val, oldVal) {
        if (val === false) {
          this.saveBean = {}
          this.saveFormName = '新增'
        }
      }
    }
  }
</script>
