<template>
  <div class="canvansEditor" ref="canvansEditor"></div>
</template>

<script>
import Editor, { RowFlex } from '../../canvasEditor/editor'
import { handleEditorEvent, instanceListeners } from './handleEditor.js'
import { MENULIST, html } from './const'
export default {
  data() {
    return {
      editorInstance: null,
      editorOptions: {
        margins: [100, 120, 100, 120],
        // watermark: {
        //   data: "CANVAS-EDITOR",
        //   size: 120,
        // },
        pageNumber: {
          format: '第{pageNo}页/共{pageCount}页'
        },
        placeholder: {
          data: '请编写病历'
        },
        zone: {
          tipDisabled: false
        },
        maskMargin: [110, 0, 30, 0], // 菜单栏高度60，底部工具栏30为遮盖层
        tdPadding: [0, 5, 0, 5],
        defaultFont: '宋体',
        table:{
          tdPadding: [0, 5, 0, 5],
          defaultTrMinHeight: 26 , // 最小行高
        },
        
        control: {
          prefix: '[',
          postfix: ']',
          bracketColor: '#ef5350',
          placeholderColor: '#999'
        }
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const container = this.$refs.canvansEditor
      this.editorInstance = new Editor(
        container,
        {
          header: [
            {
              value: '北京高博医院',
              size: 32,
              rowFlex: RowFlex.CENTER
            },
            {
              value: '\n门诊病历',
              size: 18,
              rowFlex: RowFlex.CENTER
            }
          ],
          main: [
            {
          type: 'control',
          value: '',
          control: {
            conceptId: '1',
            code:'11,22,33,44',
            placeholder:"请填写",
            type: 'mutiselect',
            // prefix:' ',
            // postfix:" ",
            value:[],
            valueSets:[{value:'我做',code:'11'},{value:'做1',code:'22'},{value:'哈哈',code:'33'},{value:'呵呵',code:'44'}],
          }
        },
        {
          type: 'control',
          value: '',
          control: {
            conceptId: '1',
            code:null,
            placeholder:"请填写",
            type: 'text',
            // prefix:' ',
            // postfix:" ",
            value:[{value:"1111"}],
            
          }
        },
        {
          type: 'control',
          value: '',
          control: {
            conceptId: '1',
            code:'11',
            placeholder:"请填写",
            type: 'select',
            // prefix:' ',
            // postfix:" ",
            value:[],
            valueSets:[{value:'11',code:'11'},{value:'22',code:'22'}],
          }
        }
      ]
        },
        this.editorOptions
      )
      this.registerMeunList()
      instanceListeners(this, this.editorInstance)
      // const a=document.createElement('div')
      // a.innerHTML=html
      // console.log(a.innerHTML,'.innerHTML')
      // this.editorInstance.command.executeSetHTML({
      //   main:a.innerHTML
      // })
    },
    handleEditor(type, data) {
      handleEditorEvent[type](this.editorInstance, data)
    },
    async registerMeunList() {
      console.log(MENULIST(this), 'MENULIST(this)')
      this.editorInstance.register.contextMenuList(MENULIST(this))
      // const contextMenuList = await this.editorInstance.register.getContextMenuList()
      console.log(this.editorInstance, ' this.editorInstance')
    },
    menuListHandler(type, command, context) {
      console.log(command, context)
      switch (type) {
        case 'addDatabase':
          console.log('addDatabase')
          this.$bus.$emit('addDatabase', { command, context })
          break
      }
    }
    // listener.rangeStyleChange
  }
}
</script>
<style lang="scss">
.canvansEditor {
  height: calc(100vh - 120px);
  overflow: auto;
  & > div {
    margin: 0 auto 80px auto;
  }
  .ce-page-container canvas {
    box-shadow: #9ea1a566 0 2px 12px;
  }
}
</style>
