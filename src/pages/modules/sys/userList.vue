<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >业务表配置</label>
      <div align="right" class="el-form-item__content">
        <a href="/genAdd" class="m-button m-button-type-plain"><i class="fa fa-plus"></i> 新增</a>
        <m-button plain @click="toggleSearch" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> 隐藏</m-button>
      </div>
    </div>
  </div>

  <div class="box">
    <el-form :inline="true" :model="genTable"  v-show="searchShow">
      <el-form-item label="表名：">
        <el-input v-model="genTable.name"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="genTable.comments"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="list">查询</el-button>
        <el-button plain @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="pager.list" v-loading="isLoading">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="表名" prop="name"></el-table-column>
      <el-table-column label="类名" prop="className"></el-table-column>
      <el-table-column label="描述" prop="comments"></el-table-column>
      <el-table-column label="父表" prop="parentTable"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
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
    background: #a5ddf4 !important;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        genTable: {
          'page.pageNum': 1,
          'page.pageSize': 10
        },
        pager: {},
        searchShow: false,
        isLoading: true
      }
    },
    mounted () {
      this.list()
    },
    methods: {
      toggleSearch () {
        this.searchShow = !this.searchShow
      },
      reset () {
        this.genTable = {
          'page.pageNum': 1,
          'page.pageSize': 10
        }
        this.list()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.genTable['page.pageSize'] = val
        this.list()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.genTable['page.pageNum'] = val
        this.list()
      },
      list () {
        console.log(this.genTable)
        this.$http.get(this.global.serverPath + 'gen/genTable', {params: this.genTable}, {emulateJSON: true})
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
        this.$http.delete(this.global.serverPath + 'gen/genTable', {params: {'id': id}}, {emulateJSON: true})
          .then((response) => {
            this.list()
            this.$message(response.msg)
          }, (response) => {
            console.log('error ==== ' + response)
            // return this.$message.warning('222')
          })
      },
      getById (id) {
        console.log('getById ==== id = ' + id)
        this.$http.get(this.global.serverPath + 'gen/genTable/' + id)
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
