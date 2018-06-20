<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >新增配置</label>
    </div>
  </div>

  <div class="box">
    <el-form :inline="false" :model="genTable" :rules="rules" ref="genTable" label-width="360px">
      <el-form-item label="请选择表：" prop="name">
        <el-select v-model="genTable.name" placeholder="请选择">
          <el-option v-for="item in options" :key="item.name"
                     :label="item.name + ':' + item.comments" :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <a href="/genList" class="m-button m-button-type-plain" v-on:click.stop.prevent="checkTableName('genTable')">下一步</a>
        <el-button type="primary" @click="checkTableName('genTable')">下一步</el-button>
        <el-button plain @click="back">返回</el-button>
      </el-form-item>
    </el-form>



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
        options: [],
        genTable: {},
        rules: {
          name: [
            { required: true, message: '请选择一张表', trigger: 'change' }
          ]
        }
      }
    },
    mounted () {
      this.getTableListFormDb()
    },
    methods: {
      getTableListFormDb () {
        this.$http.get(this.global.serverPath + 'gen/genTable/getTableListFormDb', {params: this.genTable}, {emulateJSON: true})
          .then((response) => {
            this.options = response.data
          }, (response) => {
            console.log('error ==== ' + response)
          })
      },
      checkTableName (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$http.get(this.global.serverPath + 'gen/genTable/checkTableName', {params: this.genTable}, {emulateJSON: true})
              .then((response) => {
                console.log(response)
                return true
              }, (response) => {
                console.log('error ==== ' + response)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      back () {
        history.go(-1)
      }
    }
  }
</script>
