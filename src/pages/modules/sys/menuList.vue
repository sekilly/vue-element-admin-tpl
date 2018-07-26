<template>
<div class="page-body">
  <div class="page-header">
    <div class="el-form-item">
      <label class="el-form-item__label" >菜单管理</label>
      <div align="right" class="el-form-item__content">
        <m-button plain @click="saveFormVisible = true"><i class="fa fa-plus"></i> 新增</m-button>
        <m-button plain @click="searchShow = !searchShow" :class="{ hideStyle: !searchShow }"><i class="fa fa-filter"></i> {{searchBtnName}}</m-button>
      </div>
    </div>
  </div>

  <div class="box">

    <el-tree :data="menuTree" :highlight-current="true" v-loading="isLoading" node-key="id" :props="{label:'name'}" :expand-on-click-node="false" default-expand-all :render-content="renderContent">
      <!--<span class="custom-tree-node" slot-scope="{node, data }">
        <span>{{ node.id }}</span>
        <span>
          <m-button plain type="text" @click="saveFormVisible = true"> <i class="fa fa-plus"></i> dsdsds </m-button>
        </span>
      </span>-->
    </el-tree>

  </div>
  <el-dialog :title="saveFormName" :visible.sync="saveFormVisible">
    <el-form :model="saveBean" label-width="130px" :rules="rules" ref="saveForm">
      <m-box>
        <m-container fluid >
          <m-row>
            <m-col md="6">
              <el-form-item label="角色名称：" prop="name">
                <el-input v-model="saveBean.name" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="角色编码：" prop="enname">
                <el-input v-model="saveBean.enname"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="数据范围：">
                <el-select v-model="saveBean.dataScope" placeholder="请选择" style="width: 100%">
                  <el-option key="1" label="所有数据" :value="1"></el-option>
                  <el-option key="2" label="所在组织数据" :value="2"></el-option>
                  <el-option key="3" label="所在组织及以下数据" :value="3"></el-option>
                  <el-option key="8" label="仅本人数据" :value="8"></el-option>
                  <el-option key="9" label="按明细设置" :value="9"></el-option>
                </el-select>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="是否是系统数据：">
                <el-tooltip class="item" effect="dark" placement="right">
                  <div slot="content">“是”代表此数据只有超级管理员能进行修改，<br/>“否”则表示拥有角色修改人员的权限都能进行修改</div>
                  <el-checkbox v-model="saveBean.isSys"></el-checkbox>
                </el-tooltip>
              </el-form-item>
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
  .box .box-header .box-title {
    font-size: 18px;
    font-weight: 100;
    margin: 0;
    float: left;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
<script>
  export default {
    data: function () {
      return {
        menuTree: [],
        saveBean: {},
        searchShow: false,
        saveFormName: '新增',
        searchBtnName: '搜索',
        saveFormVisible: false,
        isLoading: true,
        rules: {
          name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' }
          ],
          email: [
            { type: 'enname', message: '请输入角色编码', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    mounted () {
      this.list()
    },
    methods: {
      reset () {
        this.list()
      },
      list () {
        this.isLoading = true
        this.$http.get(this.global.serverPath + 'menu/tree')
          .then((response) => {
            this.isLoading = false
            this.menuTree = response.data
          }, (response) => {
            this.isLoading = false
            console.log('error ==== ' + response)
          })
      },
      del (node, data) {
        console.log('delete ==== data = ' + data.id)
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(this.global.serverPath + 'role', {params: {'id': data.id}}, {emulateJSON: true})
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
        this.$http.get(this.global.serverPath + 'role/' + id)
          .then((response) => {
            this.saveBean = response.data
            // console.log(this.$refs.orgTree.getNode([this.saveBean.org.id]))
            if (this.saveBean.org != null && this.saveBean.org.id != null) {
              this.$refs.orgTree.setCurrentKey(this.saveBean.org.id)
            }
            this.saveFormVisible = true
          }, (response) => {
            console.log('error ==== ' + response)
          })
      },
      save (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.saveBean)
            this.$http.post(this.global.serverPath + 'role', this.saveBean, {emulateJSON: true})
              .then((response) => {
                this.saveFormVisible = false
                this.list()
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
      renderContent (h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.show(node, data) }><i class="fa fa-plus"></i></el-button>
              <el-button size="mini" type="text" on-click={ () => this.del(node, data) }><i class="el-icon-delete"></i></el-button>
            </span>
          </span>)
      },
      show (node, data) {
        this.saveFormVisible = true
      }
    },
    watch: {
      saveFormVisible (val, oldVal) {
        if (val === false) {
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
