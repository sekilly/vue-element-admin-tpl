<template>
<div class="">
  <div class="box">
    <el-main>
      <div align="left" class="el-form-item__content" style="margin-bottom: 5px">
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> {{searchBtnName}}</m-button>
      </div>
      <el-form :inline="true" :model="search"  v-show="searchShow">
        <el-form-item label="书名：">
          <el-input v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <el-input v-model="search.author"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input v-model="search.status"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="list">查询</el-button>
          <el-button plain @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>


    <el-table :data="pager.list" border v-loading="isLoading" max-height="100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="书名" prop="name" align="center"></el-table-column>
      <el-table-column label="作者" prop="author" align="center"></el-table-column>
      <el-table-column label="评分" prop="score" align="center"></el-table-column>
      <el-table-column label="下载量" prop="downloadCount" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">上架</span>
          <span v-else-if="scope.row.status === 2">草稿</span>
          <span v-else-if="scope.row.status === 3">下架</span>
        </template>
      </el-table-column>

      <el-table-column label="创建人" prop="createUser.name" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
      <el-table-column label="更新人" prop="updateUser.name" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link tag="a" target="_blank" :to="{name:'bookDetail',query:{id:scope.row.id}}"><i class="el-icon-edit"></i></router-link>&nbsp;&nbsp;
          <!--<a href="javascript:void(0)" @click="getById(scope.row.id)" title="编辑"><i class="el-icon-edit"></i></a>&nbsp;&nbsp;-->
          <a href="javascript:void(0)" @click="getById(scope.row.id)" title="上架"><i class="el-icon-edit"></i></a>&nbsp;&nbsp;
          <a href="javascript:void(0)" @click="getById(scope.row.id)" title="下架"><i class="el-icon-edit"></i></a>&nbsp;&nbsp;
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
            <m-col md="10">
              <el-form-item label="书名：" prop="name">
                <el-input v-model="saveBean.name" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="10">
              <el-form-item label="作者：">
                <el-input v-model="saveBean.author"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="10">
              <el-form-item label="评分：" vertical-align="middle">
                <el-rate v-model="saveBean.score" :allow-half="true" show-score style="padding-top: 10px"></el-rate>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="10">
              <el-form-item label="简介：" vertical-align="middle">
                <TinymceEditor v-model="saveBean.description"
                                :disabled="false"
                                ref="editor"></TinymceEditor>
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
          pageNum: 1,
          pageSize: 10
        },
        pager: {},
        saveBean: {},
        searchShow: false,
        saveFormName: '新增',
        searchBtnName: '搜索',
        saveFormVisible: false,
        isLoading: true,
        rules: {
          name: [
            {required: true, message: '请录入书名', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur'}
          ]
        },
        init: {
          language_url: '/static/tinymce/langs/zh_CN.js',// 语言包的路径
          language: 'zh_CN',//语言
          skin_url: '/static/tinymce/skins/lightgray',// skin路径
          height: 300,// 编辑器高度
          branding: false,// 是否禁用“Powered by TinyMCE”
          menubar: false,// 顶部菜单栏显示
        }
      }
    },
    mounted () {
      this.list()
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
        this.$http.get(this.global.serverPath + 'book', {params: this.search}, {emulateJSON: true})
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
          this.$http.delete(this.global.serverPath + 'book/' + id)
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
        this.$http.get(this.global.serverPath + 'book/' + id)
          .then((response) => {
            this.saveBean = response.data
            this.saveFormVisible = true
          }, (response) => {
            console.log('error ==== ' + response)
          })
      },
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.saveBean)
            this.$http.post(this.global.serverPath + 'book', this.saveBean, {emulateJSON: true})
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
      }
    },
    watch: {
      saveFormVisible (val, oldVal) {
        if (val === false) {
          this.saveBean = null
          this.saveBean = {}
          this.$refs['saveForm'].resetFields()
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
