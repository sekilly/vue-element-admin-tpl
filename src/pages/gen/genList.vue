<template>
<div class="page-body">
  <div class="page-header">
    <el-breadcrumb>
      <el-breadcrumb-item >业务表配置</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="box">
    <el-table :data="pager.list">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="表名" prop="name"></el-table-column>
      <el-table-column label="结果" prop="result"></el-table-column>
      <el-table-column label="描述" prop="desctiption"></el-table-column>
      <el-table-column label="状态" prop="show" width="80" ></el-table-column>
      <el-table-column label="创建时间" prop="createdAt">
        <!--<template slot-scope="scope">
          {{format(scope.row.createdAt)}}
        </template>-->
      </el-table-column>
      <el-table-column label="最后更新" prop="updatedAt">
        <!--<template slot-scope="scope">
          {{format(scope.row.updatedAt)}}
        </template>-->
      </el-table-column>
      <el-table-column label="操作">
        <!--<template slot-scope="scope">
          <m-button type="danger">删除</m-button>
        </template>-->
      </el-table-column>

    </el-table>
    </div>
  </div>

</div>
</template>
<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        genTable: {
          'page.pageNum': 1,
          'page.pageSize': 3
        },
        pager: {
          list: []
        }
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.$http.get('http://127.0.0.1:8088/gen/genTable', {params: this.genTable}, {emulateJSON: true})
          .then(
            function (res) {
              // let temp = JSON.stringify(res)
              console.log(res.code)
              console.log(res.data)
              if (res.code === 0) {
                // this.result = JSON.stringify(res.data.data)
                this.pager = res.data
                console.log(JSON.stringify(this.result))
              }
              console.log('success ==== ' + JSON.stringify(res.data))
            }, function (res) {
              console.log('error ==== ' + res.status)
            })
      }
    }
  }
</script>
