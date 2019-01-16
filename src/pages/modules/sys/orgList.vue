<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >组织管理</label>
    </div>
  </div>

  <div class="box">
    <div align="left" class="el-form-item__content">

      <m-button plain  @click="addRootOrg"><i class="fa fa-plus"></i> 新建顶级</m-button>
      <m-button plain  @click="addOrg"><i class="fa fa-plus"></i> 添加下级</m-button>
    </div>
    <el-container>
      <el-aside min-width="500px" width="40%">
        <el-input placeholder="输入关键字进行过滤"  v-model="filterText" style="margin-top: 5px; margin-bottom: 5px"></el-input>
        <el-tree :data="orgList" :highlight-current="true" v-loading="isOrgLoading" ref="orgTree"
                 :filter-node-method="filterNode" :default-expand-all="true"
                 @node-click="getById" node-key="id" :props="{label:'name'}">
        </el-tree>
      </el-aside>
      <el-container :visible="saveFormVisible">
        <el-main>
          <el-form :model="saveBean" label-width="20%">
            <el-form-item label="上级组织：" v-if="saveBean.parentId !== '0'">
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
        </el-main>
        <el-footer align="center">
          <el-button type="primary" @click="save">保 存</el-button>
        </el-footer>

      </el-container>
    </el-container>

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
    background: #ccc !important;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        filterText: '',
        saveBean: {
          parentId: ''
        },
        orgList: [],
        saveFormVisible: false,
        isOrgLoading: true
      }
    },
    mounted () {
      this.getOrgTree()
    },
    methods: {
      filterNode (value, data) {
        if (!value) {
          return true
        }
        return data.name.indexOf(value) !== -1
      },
      del (id) {
        console.log('delete ==== id = ' + id)
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(this.global.serverPath + 'organization', {params: {'id': id}}, {emulateJSON: true})
            .then((response) => {
              this.getOrgTree()
              this.$message(response.msg)
            }, (response) => {
              console.log('error ==== ' + response)
            })
        }).catch(() => {
          // this.$message('已取消删除')
        })
      },
      getById (org, node, obj) {
        this.saveFormName = '编辑'
        console.log('getById ==== id = ' + org.id)
        this.$http.get(this.global.serverPath + 'organization/' + org.id)
          .then((response) => {
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
        this.$http.post(this.global.serverPath + 'organization', this.saveBean, {emulateJSON: true})
          .then((response) => {
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
        this.$http.get(this.global.serverPath + 'organization/tree')
          .then((response) => {
            this.orgList = response.data
            this.isOrgLoading = false
          }, (response) => {
            console.log('error ==== ' + response)
            this.isOrgLoading = false
          })
      },
      addRootOrg () {
        this.saveBean.parentId = '0'
        this.saveBean.saveFormVisible = true
      },
      addOrg () {
        this.saveBean.saveFormVisible = true
      }
    },
    watch: {
      filterText (val) {
        this.$refs.orgTree.filter(val)
      }
    }
  }
</script>
