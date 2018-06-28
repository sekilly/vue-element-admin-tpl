<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >业务表配置</label>
      <div align="right" class="el-form-item__content">
        <!--<a href="/orgAdd" class="m-button m-button-type-plain"><i class="fa fa-plus"></i> 新增</a>-->
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> 隐藏</m-button>
      </div>
    </div>
  </div>

  <div class="box">
    <el-form :inline="true" :model="search"  v-show="searchShow">
      <el-form-item label="表名：">
        <el-input v-model="search.name"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="search.comments"></el-input>
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
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <a href="#" title="编辑"><i class="el-icon-edit"></i></a>&nbsp;
          <a href="#" @click="del(scope.row.id)" title="删除"><i class="el-icon-delete"></i></a>&nbsp;
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[3, 10, 20, 30, 40, 50]"
        :page-size="pager.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total">
      </el-pagination>
    </div>
  </div>
  <el-dialog title="新增" :visible.sync="saveFormVisible">
    <el-form :model="saveBean" label-width="20%">
      <el-form-item label="上级组织：">
        <el-cascader expand-trigger="hover" :options="orgList" v-model="saveBean.parentId" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="组织名称：">
        <el-input v-model="saveBean.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="组织编码：">
        <el-input v-model="saveBean.code" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="saveBean.sort" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="saveFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
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
        saveBean: {},
        orgList:[],
        searchShow: false,
        saveFormVisible: false,
        isLoading: true
      }
    },
    mounted () {
      this.list()
    },
    methods: {
      reset () {
        this.org = {
          'page.pageNum': 1,
          'page.pageSize': 10
        }
        this.list()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.org['page.pageSize'] = val
        this.list()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.org['page.pageNum'] = val
        this.list()
      },
      list () {
        console.log(this.search)
        this.$http.get(this.global.serverPath + 'org', {params: this.search}, {emulateJSON: true})
          .then((response) => {
            this.pager = response.data
            this.isLoading = false
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
              this.$message(response.msg)
            }, (response) => {
              console.log('error ==== ' + response)
              // return this.$message.warning('222')
            })
        }).catch(() => {
          // this.$message('已取消删除')
        })
      },
      getById (id) {
        console.log('getById ==== id = ' + id)
        this.$http.get(this.global.serverPath + 'org/' + id)
          .then((response) => {
            // this.$message(response.msg)
          }, (response) => {
            console.log('error ==== ' + response)
            // return this.$message.warning('222')
          })
      },
      save () {
        console.log(this.saveBean)
        this.$http.post(this.global.serverPath + 'org', this.saveBean, {emulateJSON: true})
          .then((response) => {
            // this.$message(response.msg)
          }, (response) => {
            console.log('error ==== ' + response)
            // return this.$message.warning('222')
          })
      }
    }
  }
</script>
