<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >组织管理</label>
      <div align="right" class="el-form-item__content">
        <!--<a href="/orgAdd" class="m-button m-button-type-plain"><i class="fa fa-plus"></i> 新增</a>-->
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> {{searchBtnName}}</m-button>
      </div>
    </div>
  </div>

  <div class="box">
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
    <el-table :data="pager.list" border v-loading="isLoading">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="组织名称" prop="name" header-align="center"></el-table-column>
      <el-table-column label="组织编码" prop="code" header-align="center"></el-table-column>
      <el-table-column label="路径" prop="path" header-align="center"></el-table-column>
      <el-table-column label="电话" prop="phone" header-align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <a href="javascript:void(0)" @click="getById(scope.row.id)" title="编辑"><i class="el-icon-edit"></i></a>&nbsp;
          &nbsp;<a href="javascript:void(0)" @click="del(scope.row.id)" title="删除"><i class="el-icon-delete"></i></a>&nbsp;
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
    <el-form :model="saveBean" label-width="20%">
      <el-form-item label="上级组织：">
        <el-cascader change-on-select expand-trigger="hover" :show-all-levels="false" :options="orgList" style="width: 100%"
                     @change="handleChange" v-model="saveBean.pathArray" :props="{value:'id',label:'name',disabled:'isLastGrade'}">
        </el-cascader>
      </el-form-item>
      <el-form-item label="组织名称：">
        <el-input v-model="saveBean.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="组织编码：">
        <el-input v-model="saveBean.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="saveBean.phone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="saveBean.sort" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="saveFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </el-dialog>
</div>
</template>
<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
  .hideStyle {
    background-color: #727B84!important;
    color: #fff!important;
  }
  .el-table th{
    background: #ccc !important;
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
        saveBean: {
          pathArray: ['0']
        },
        orgList: [],
        searchShow: false,
        saveFormName: '新增',
        searchBtnName: '搜索',
        saveFormVisible: false,
        isLoading: true
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
        this.$http.get(this.global.serverPath + 'org', {params: this.search}, {emulateJSON: true})
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
          this.$http.delete(this.global.serverPath + 'org', {params: {'id': id}}, {emulateJSON: true})
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
      save () {
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
      },
      handleChange (val) {
        this.saveBean.parentId = val[val.length - 1]
        console.log(this.saveBean)
      },
      getOrgTree () {
        this.$http.get(this.global.serverPath + 'org/tree')
          .then((response) => {
            this.orgList = []
            this.orgList.push({'id': '0', 'name': '根节点'})
            for (var index in response.data) {
              this.orgList.push(response.data[index])
            }
          }, (response) => {
            console.log('error ==== ' + response)
          })
      }
    },
    watch: {
      saveFormVisible (val, oldVal) {
        if (val === false) {
          this.saveBean = {pathArray: ['0']}
          this.saveFormName = '新增'
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
