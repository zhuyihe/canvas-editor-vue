<template>
  <div class="templateEditor">
    <div class="header">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="v.label"
          :name="v.name"
          v-for="v in tabList"
          :key="v.name"
        >
          <component
            :is="`${v.name}com`"
            :key="v.name"
            @customEvent="handleEvents"
          ></component>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="temContent">
      <Editor ref="canvansEditor"></Editor>
    </div>
    <!-- 插入数据元 -->
    <el-dialog
      custom-class="eleDialog"
      v-if="showInsertEle"
      title="插入数据元"
      :close-on-click-modal="false"
      :visible.sync="showInsertEle"
      width="1000px"
      height="80%"
      append-to-body
      top="5vh"
    >
      <!-- v-dialogDrag -->
      <newInsertElement
        :showFlag="showInsertEle"
        @insertToInputField="insertToInputField"
      ></newInsertElement>
    </el-dialog>
    <el-button type="primary" class="bc" @click="save">保存</el-button>
    <div class="menu-item__table__collapse">
      <div class="table-close">×</div>
      <div class="table-title">
        <span class="table-select">插入</span>
        <span>表格</span>
      </div>
      <div class="table-panel"></div>
    </div>
  </div>
</template>

<script>
import importComponents from './utils/importComponents'
import Editor from '@/components/editor'
import apis from '@/apis'
import database from './mix/database'
const componentsContext = require.context('./components', false, /\.vue$/)

export default {
  data() {
    return {
      tabList: [
        {
          name: 'a',
          label: '编辑'
        },
        {
          name: 'b',
          label: '插入'
        },
        {
          name: 'c',
          label: '表格'
        },
        {
          name: 'd',
          label: '布局'
        }
      ],
      activeName: 'b'
    }
  },
  mixins: [database],
  components: {
    ...importComponents(componentsContext),
    Editor
  },
  mounted() {
    this.watchHander()
  },
  methods: {
    handleClick(e) {},
    handleEvents(type, data) {
      console.log('handleEvents')
      this.$refs.canvansEditor.handleEditor(type, data)
    },
    save() {
      const editorInstance = this.$refs.canvansEditor.editorInstance
      const info = editorInstance.command.getValue()
      console.log(info, 'asas')
    }
  }
}
</script>

<style lang="scss">
.templateEditor {
  .el-tabs__header {
    margin: 0 0 5px;
  }
}
.temContent {
  background: #f1f1f1;
  padding-top: 20px;
}
.eleDialog .el-dialog__body {
  padding: 5px 20px 20px;
}
// .EditElement {
//   max-height: calc(100vh - 200px);
//   overflow: auto;
// }
#dialogStyle {
  margin: 0 auto 10px;
}
.bc {
  position: fixed;
  right: 0;
  top: 150px;
  text-align: center;
}
</style>
