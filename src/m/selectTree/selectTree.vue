<template>
  <el-select v-model="model" placeholder="请选择">
    <el-option v-for="(item, index) in data" :key="item.id" :label="item.name" :value="item.id">
      <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in item._level" class="ms-tree-space"></span>
      <span v-if="toggleIconShow(index,item)" @click="toggle(item.$index)">
          <i v-if="!item._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
          <i v-if="item._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
        </span>
      <span v-else-if="index===0" class="ms-tree-space"></span>
      {{item.name}}
    </el-option>
  </el-select>
</template>
<script type="text/javascript">
  import Utils from '../tableTree/utils/index.js'
  export default {
    name: 'select-tree',
    props: {
      model: {
        type: String,
        default: function () {
          return ''
        }
      },
      // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      // 这是相应的字段展示
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 这是数据源
      dataSource: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: function () {
          return ''
        }
      },
      // 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      // 格式化数据源
      data: function () {
        let me = this
        if (me.treeStructure) {
          let data = Utils.MSDataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
          console.log('data === ' + data)
          return data
        }
        return me.dataSource
      }
    },
    methods: {
      // 显示行
      showTr: function ({row, index}) {
        let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
        row._show = show
        return show ? '' : 'display:none;'
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this
        let record = me.data[trIndex]
        record._expanded = !record._expanded
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      del (id) {
        this.$parent.del(id)
      },
      getById (id) {
        this.$parent.getById(id)
      }
    }
  }
</script>
<style scoped>
  .ms-tree-space{
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before{
    content: ''
  }
  table td{
    line-height: 26px;
  }
</style>

