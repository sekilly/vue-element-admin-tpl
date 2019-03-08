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
                 @node-click="getById" node-key="id" :props="{label:'name'}" :render-content="renderContent">
        </el-tree>
      </el-aside>
      <el-container v-if="saveFormVisible">
        <el-main>
          <el-form :model="saveBean" label-width="20%" v-loading="detailLoading">
            <!--<el-form-item label="上级组织：" v-if="saveBean.parentId !== '0'">
              <el-cascader change-on-select expand-trigger="hover" :show-all-levels="false" :options="orgList" style="width: 100%"
                           @change="handleChange" v-model="saveBean.pathArray" :props="{value:'id',label:'name',disabled:'isLastGrade'}">
              </el-cascader>
            </el-form-item>-->
            <el-form-item label="上级组织：" v-if="saveBean.parentId !== '0'">
              <el-input v-model="saveBean.parent.name" auto-complete="off" :readonly="true"></el-input>
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
        isOrgLoading: true,
        detailLoading: false
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
          this.$http.delete(this.global.serverPath + 'organization/'+id)
            .then((response) => {
              this.getOrgTree()
              this.$message(response.msg)
            }, (response) => {
              console.log('error ==== ' + response)
            })
        }).catch(() => {
        })
      },
      getById (org, node, obj) {
        this.detailLoading = true
        console.log('getById ==== id = ' + org.id)
        this.$http.get(this.global.serverPath + 'organization/' + org.id)
          .then((response) => {
            this.saveBean = response.data
            this.saveFormVisible = true
            this.detailLoading = false
          }, (response) => {
            this.detailLoading = false
            console.log('error ==== ' + response)
          })
      },
      save () {
        console.log(this.saveBean)
        this.$http.post(this.global.serverPath + 'organization', this.saveBean, {emulateJSON: true})
          .then((response) => {
            this.getOrgTree()
            this.$message(response.msg)
          }, (response) => {
            console.log('error ==== ' + response)
          })
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
        this.saveBean = {parentId: '0'}
        this.saveFormVisible = true
      },
      addOrg () {
        var node = this.$refs.orgTree.getCurrentNode()
        console.log(node)
        if (node === null) {
          this.$message('请选择父级节点')
          return
        }
        this.saveBean = {parentId: node.id, parent: node}
        this.saveFormVisible = true
      },
      renderContent(h, { node, data, store }) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
        </span>
        <span>
        <a href="javascript:void(0)" on-click={ () => this.del(data.id) } title="删除"><i class="el-icon-delete"></i></a>
        </span>
        </span>);
      }
    },
    watch: {
      filterText (val) {
        this.$refs.orgTree.filter(val)
      }
    }
  }
</script>
