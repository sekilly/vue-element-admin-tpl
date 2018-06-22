<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >新增生成配置</label>
    </div>
  </div>


  <el-form :inline="true" :model="genTable" ref="genTable" label-width="20%">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">基本信息</span>
        <table width="100%">
          <tr>
            <td width="50%">
              <el-form-item label="表名：" prop="name" class="el-form-item-width">
                <el-input v-model="genTable.name"></el-input>
              </el-form-item>
            </td>
            <td width="50%">
              <el-form-item label="描述：" class="el-form-item-width">
                <el-input v-model="genTable.comments" ></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="实体类名：" class="el-form-item-width">
                <el-input v-model="genTable.className"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item label="功能作者：" class="el-form-item-width">
                <el-input v-model="genTable.functionAuthor"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item label="备注信息：" class="el-form-item-width">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" v-model="genTable.className"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!--<el-form-item label="请选择表：" prop="name">
          <el-select v-model="genTable.name" placeholder="请选择">
            <el-option v-for="item in options" :key="item.name"
                       :label="item.name + ':' + item.comments" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>-->
      </el-tab-pane>
      <el-tab-pane label="字段信息">
        <el-table :data="genTable.columnList"  border>
          <el-table-column label="#" type="index" align="center"></el-table-column>
          <el-table-column label="字段信息" align="center">
            <el-table-column label="列名" prop="name"></el-table-column>
            <el-table-column label="描述" prop="comments">
              <template slot-scope="scope">
                <el-input v-model="scope.row.comments"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="字段类型" prop="jdbcType" width="100px"></el-table-column>
            <el-table-column label="属性类型" prop="javaType">
              <template slot-scope="scope">
                <el-select v-model="scope.row.javaType">
                  <el-option key="String" label="String" value="String"></el-option>
                  <el-option key="Integer" label="Integer" value="Integer"></el-option>
                  <el-option key="Long" label="Long" value="Long"></el-option>
                  <el-option key="Double" label="Double" value="Double"></el-option>
                  <el-option key="tinyint" label="Boolean" value="Boolean"></el-option>
                  <el-option key="java.util.Date" label="Date" value="java.util.Date"></el-option>
                  <el-option key="com.aptx.modules.sys.entity.User" label="User" value="com.aptx.modules.sys.entity.User"></el-option>
                  <el-option key="com.aptx.modules.sys.entity.Org" label="Org" value="com.aptx.modules.sys.entity.Org"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="属性名称" prop="javaField">
              <template slot-scope="scope">
                <el-input v-model="scope.row.javaField"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="主键" prop="isPk" align="center" width="50px">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isPk" ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="插入" prop="isInsert" align="center" width="50px">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isInsert" ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="更新" prop="isEdit" align="center" width="50px">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isEdit" ></el-checkbox>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="列表" align="center">
            <el-table-column label="列表" prop="isList" align="center" width="50px">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isList" ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="查询" prop="isQuery" align="center" width="50px">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isQuery" ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="匹配方式" prop="queryType">
              <template slot-scope="scope">
                <el-select v-model="scope.row.queryType">
                  <el-option key="=" label="=" value="="></el-option>
                  <el-option key="!=" label="!=" value="!="></el-option>
                  <el-option key="&gt;" label="&gt;" value="&gt;"></el-option>
                  <el-option key="&lt;" label="&lt;" value="&lt;"></el-option>
                  <el-option key="between" label="Between" value="between"></el-option>
                  <el-option key="like" label="Like" value="like"></el-option>
                  <el-option key="left_like" label="Left Like" value="left_like"></el-option>
                  <el-option key="right_like" label="Right Like" value="right_like"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="表单" align="center">
            <el-table-column label="必填" prop="isNull" align="center" width="50px">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isNull" ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="表单类型" prop="showType"></el-table-column>
            <el-table-column label="字典类型" prop="dictType"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
          </el-table-column>
          <!--<el-table-column label="操作">
            <template slot-scope="scope">
              <a href="#" title="编辑"><i class="el-icon-edit"></i></a>&nbsp;
              <a href="#" @click="del(scope.row.id)" title="删除"><i class="el-icon-delete"></i></a>&nbsp;
            </template>
          </el-table-column>-->
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="生成信息">生成信息</el-tab-pane>
      <el-form-item>
        <el-button type="primary" @click="checkTableName('genTable')">保存</el-button>
        <a href="/genList" class="m-button m-button-type-plain">关闭</a>
        <!--<el-button plain @click="back">返回</el-button>-->
      </el-form-item>
    </el-tabs>

  </el-form>




</div>
</template>
<style>
  .box-body{
    width: 100%;
    overflow: auto;
  }
  .el-form-item__content{
    width: 70%!important;
  }
  .el-form-item-width{
    width: 100%;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        genTable: {}
      }
    },
    mounted () {
      this.getTableFormDb()
    },
    methods: {
      getTableFormDb () {
        this.$http.get(this.global.serverPath + 'gen/genTable/getTableFormDb', {params: {'name': localStorage.getItem('genTableName')}}, {emulateJSON: true})
          .then((response) => {
            console.log(response)
            this.genTable = response.data
          }, (response) => {
            console.log('error ==== ' + response)
          })
      }
    }
  }
</script>
