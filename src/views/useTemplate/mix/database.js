export default {
  data() {
    return {
      showInsertEle: false
    }
  },
  mounted() {
    this.watchHander()
  },
  methods: {
    watchHander() {
      this.$bus.$on('addDatabase', ({ command, context }) => {
        this.getDatabase(command, context)
      })
    },
    async getDatabase(command, context) {
      this.showInsertEle = true
    },
    insertToInputField(eleInfo) {
      console.log(eleInfo, 'eleInfo')
      switch (eleInfo.inputType) {
        case 'text':
          this.resevtInput(eleInfo)
          break
        case 'checkbox' || 'radio':
          this.resevtCheckbox(eleInfo)
          break
      }
      // this.resevtDataBase(eleInfo.inputType,eleInfo)
    },
    resevtInput(eleInfo) {
      
      const control = {
        type: 'control',
        value: '',
        control: {
          conceptId: '1',
          type: 'text',
          value: eleInfo.cascade.defaultValue
            ? [{ value: eleInfo.cascade.defaultValue }]
            : null,
          placeholder: eleInfo.inputPrompt,
          disabled: eleInfo.readonly == 'true' ? true : false,
          eleInfo
        }
      }
      this.handleEvents('executeInsertElementList', [control])
    },
    resevtCheckbox(eleInfo) {
      console.log(eleInfo, ' eleInfo.inputPrompt')
      const valueSets=eleInfo.items.map(item=>{
        return {
          code:item.optionCode,
          value:item.value
        }
      })
      const control = [
        { value:`${eleInfo.alias|| eleInfo.elementName}:`},
        {
          type: 'control',
          value: '',
          control: {
            conceptId: '1',
            code:'',
            type: 'radio'||eleInfo.inputType,
            prefix:' ',
            postfix:" ",
            value:'',
            valueSets,
            disabled: eleInfo.readonly == 'true' ? true : false,
            eleInfo
          }
        }
      ]
      this.handleEvents('executeInsertElementList', [...control])
    }
  }
}
