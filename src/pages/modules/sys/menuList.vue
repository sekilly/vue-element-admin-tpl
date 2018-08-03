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

    <!--<el-table :data="menuTree" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.children" style="width: 100%">
            <el-table-column
              label="菜单名"
              prop="name">
            </el-table-column>
          </el-table>
          &lt;!&ndash;<el-form label-position="left" inline class="demo-table-expand">

            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>

          </el-form>&ndash;&gt;
        </template>
      </el-table-column>
      <el-table-column
        label="菜单名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
    </el-table>-->


  </div>
  <el-dialog :title="saveFormName" :visible.sync="saveFormVisible">
    <el-form :model="saveBean" label-width="100px" :rules="rules" ref="saveForm">
      <m-box>
        <m-container fluid >
          <m-row>
            <m-col md="6">
              <el-form-item label="上级菜单：">
                <el-input v-model="saveBean.icon" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="菜单名称：" prop="name">
                <el-input v-model="saveBean.name"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="选择图标：">
                <el-input v-model="saveBean.icon" :maxlength="20"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="链接：">
                <el-input v-model="saveBean.href"></el-input>
              </el-form-item>
            </m-col>
            <!--<m-col md="6">
              <el-form-item label="目标：">
                <el-input v-model="saveBean.target"></el-input>
              </el-form-item>
            </m-col>-->
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="权限标识：">
                <el-input v-model="saveBean.permission"></el-input>
              </el-form-item>
            </m-col>
            <m-col md="6">
              <el-form-item label="排序(升序)：">
                <el-input type="number" :controls="false" v-model="saveBean.sort" :min="1" :max="999999999"
                          onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-form-item>
            </m-col>
          </m-row>
          <m-row>
            <m-col md="6">
              <el-form-item label="是否显示：">
                <el-checkbox v-model="saveBean.isShow"></el-checkbox>
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
    font-size: 16px;
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
          this.$http.delete(this.global.serverPath + 'menu', {params: {'id': data.id}}, {emulateJSON: true})
            .then((response) => {
              this.list()
              // this.getOrgTree()
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
        this.$http.get(this.global.serverPath + 'menu/' + id)
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
            <span><i class={data.icon}></i> {node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.show(node, data) }><i class="fa fa-plus"></i></el-button>
              <el-button size="mini" type="text" on-click={ () => this.del(node, data) }><i class="el-icon-delete"></i></el-button>
            </span>
          </span>)
      },
      show (node, data) {
        // alert(data.icon)
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
