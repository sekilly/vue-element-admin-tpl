<template>
  <div>
    <el-input placeholder="请选择"  readonly="readonly"
              v-model="showLabel"
              @click.native="isShowSelect = !isShowSelect">
      <i v-if="isShowSelect" slot="suffix" class="el-icon-arrow-up"></i>
      <i v-else-if="!isShowSelect" slot="suffix" class="el-icon-arrow-down"></i>
    </el-input>
    <el-input type="hidden" v-model="this.$parent.model"></el-input>
    <el-tree v-if="isShowSelect"
             empty-text="暂无数据"
             :expand-on-click-node="false"
             :data="data"
             :props="properties"
             :default-expand-all="defaultExpandAll"
             highlight-current
             @node-click="handleNodeClick"
             class="objectTree">
    </el-tree>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'select-tree',
    props: {
      model: {
        type: String,
        default: function () {
          return ''
        }
      },
      // 这是相应的字段展示
      properties: {
        type: Object,
        default: function () {
          return {
            id: 'id',
            label: 'name',
            children: 'children'
          }
        }
      },
      // 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      // 是否默认展开所有树
      data: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        isShowSelect: false,
        showLabel: ''
      }
    },
    methods: {
      // 显示行
      // 点击巡检对象的选择器的树节点
      handleNodeClick (data, Node) {
        // 如果是顶级父节点
        if (Node.parent.level === 0) {
          // 不会触发事件
        } else {
          console.log(this.model)
          this.$parent.saveBean.parentId = data.id
          this.showLabel = data.name
          console.log(this.$parent.saveBean)
          // this.formData.inspectObject = data.id
          // 关闭选择器
          this.isShowSelect = false
        }
      }
      // 加载树结点
      // loadNode(node, resolve) {
      //   // 如果是顶级的父节点
      //   if (node.level === 0) {
      //     // 查找两个顶级巡检对象
      //     findTopPrincipleTarget().then(res => {
      //       if (res.success) {
      //         return resolve(res.obj);
      //       } else {
      //         this.$message.error(res.msg);
      //       }
      //     });
      //   }
      //   else {
      //     let params = {
      //       parentId: node.data.id,
      //       principleId: this.formData.principleLine
      //     };
      //     // 根据父节点id找寻下一级的所有节点
      //     findPrincipleTarget(params).then(res => {
      //       if (res.success) {
      //         return resolve(res.obj);
      //       } else {
      //         this.$message.error(res.msg);
      //       }
      //     });
      //   }
      // }
    }
  }
</script>
<style scoped>
  .objectTree {
    position: absolute;
    overflow: auto;
    z-index: 100;
    width: 100%;
    height: auto;
    min-height: 200px;
    border: 1px solid #ebeef5;
    border-radius:4px;
  }
</style>

