<template>
  <div class="bcom nav-content">
    <div class="nav-con">
      <ul>
        <li class="insertHeader combination spacingLi">
          <img src="../../../assets/image/insertHeader.svg" />
          <span>页眉</span>
          <div class="docP">
            <ul class="spacing doc">
              <li data-value="setheader">插入页眉</li>
              <li data-value="delheader">删除页眉</li>
              <li data-value="editheader">编辑页眉</li>
              <li data-value="canceleditheader">取消编辑</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li class="insertFooter combination spacingLi">
          <img src="../../../assets/image/insertFooter.svg" />
          <span>页脚</span>
          <div class="docP">
            <ul class="spacing doc">
              <li data-value="setfooter">插入页脚</li>
              <li data-value="delfooter">删除页脚</li>
              <li data-value="editfooter">编辑页脚</li>
              <li data-value="canceleditfooter">取消编辑</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li id="insertImage" class="combination">
          <input
            id="imageInput"
            name="file"
            type="file"
            accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp"
            title=""
            @change="uploadChange"
          /><img src="../../../assets/image/insertImage.svg" /><span>图片</span>
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li id="date" class="combination spacingLi">
          <!-- <div class="docP"> -->
          <el-dropdown trigger="click" @command="datePiker">
            <span class="el-dropdown-link">
              <img src="../../../assets/image/date.svg" />
              <span>日期</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(i, v) in datatype"
                :key="v"
                :command="i.value"
                >{{ i.value }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <ul class="spacing size">
              <li data-value="hh时mm分ss秒">hh时mm分ss秒</li>
              <li data-value="hh:mm:ss">hh:mm:ss</li>
              <li data-value="YYYY年MM月DD日">YYYY年MM月DD日</li>
              <li data-value="YYYY年MM月DD日 hh时mm分ss秒">
                YYYY年MM月DD日 hh时mm分ss秒
              </li>
              <li data-value="YYYY/MM/DD">YYYY/MM/DD</li>
              <li data-value="YYYY/MM/DD hh:mm:ss">YYYY/MM/DD hh:mm:ss</li>
              <li data-value="YYYY-MM-DD">YYYY-MM-DD</li>
              <li data-value="YYYY-MM-DD hh:mm:ss">YYYY-MM-DD hh:mm:ss</li>
            </ul> -->
          <!-- </div> -->
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li id="hyperlink" class="combination" @click="hyperlinkClick">
          <img src="../../../assets/image/hyperlink.svg" /><span>超链接</span>
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li id="spechars" class="combination" @click="specialCharsClick">
          <img src="../../../assets/image/spechars.svg" /><span>特殊字符</span>
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li id="element" class="combination" @click="databaseClick">
          <img src="../../../assets/image/element.svg" /><span>数据元</span>
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li id="medicalExpression" class="combination">
          <img src="../../../assets/image/medicalExpression.svg" /><span
            >医学表达式</span
          >
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul>
        <li id="pageBreak" class="combination">
          <el-dropdown trigger="click" @command="linetypePiker">
            <span class="el-dropdown-link">
              <img src="../../../assets/image/medicalExpression.svg" /><span
                >分页符</span
              >
            </span>
            <el-dropdown-menu slot="dropdown" class="linetypePiker">
              <el-dropdown-item
                v-for="(i, v) in linetype"
                :key="v"
                :command="i.label"
                ><div :data-separator="i.label"></div
              ></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <el-dialog
      :title="dialogConfig.title"
      :visible.sync="dialogConfig.dialogVisible"
      :width="dialogConfig.width"
      :top="dialogConfig.top"
    >
      <component
        :is="dialogConfig.dialogFormComponent"
        :ref="dialogConfig.dialogFormComponent"
        @componentConfirm="componentConfirm"
        :key="dialogConfig.key"
        v-on="dialogConfig.events"
      ></component>
      <span slot="footer" class="dialog-footer" v-if="dialogConfig.showFooter">
        <el-button @click="dialogConfig.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfig['dialogConfirm']"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from '../mix/common'
import { datatype, linetype } from '../utils/const'
import hyperlink from './hyperlink.vue'
import specialChars from './specialChars.vue'
import database from '../mix/database'
import newInsertElement from './newInsertElement'
export default {
  mixins: [common, database],
  data() {
    return {
      datatype,
      linetype,
      dialogConfig: {
        width: '600px',
        dialogVisible: false,
        title: '提示',
        dialogFormComponent: null,
        dialogConfirm: this.dialogConfirm,
        key: null,
        showFooter: true,
        top: '5vh',
        events: {}
      }
    }
  },
  components: {
    hyperlink,
    specialChars,
    newInsertElement
  },
  methods: {
    uploadImg(e) {
      console.log(e, 'wdqwd')
    },
    uploadChange(e) {
      console.log(e, e.target.files, 'uploadChange')
      const file = e.target.files[0]
      const fileReader = new FileReader()
      const that = this
      fileReader.readAsDataURL(file)
      fileReader.onload = function () {
        // 计算宽高
        const image = new Image()
        const value = fileReader.result
        image.src = value
        image.onload = function () {
          that.handleEvents('executeImage', {
            value,
            width: image.width,
            height: image.height
          })
          // instance.command.executeImage({
          //   value,
          //   width: image.width,
          //   height: image.height
          // })
          e.target.value = ''
        }
      }
    },
    datePiker(value) {
      console.log(value, 'value')
      const dataop = {
        value: this.getFormatDate(value)
      }
      this.handleEvents('executeInsertElementList', [dataop])
    },
    linetypePiker(value) {
      console.log(value, 'linetypePiker')
      const separatorDash = value.split(',').map(Number)
      let payload = []
      if (separatorDash) {
        const isSingleLine = separatorDash.every(d => d === 0)
        if (!isSingleLine) {
          payload = separatorDash
        }
      }
      this.handleEvents('executeSeparator', payload)
    },
    getFormatDate(rule) {
      var result = ''
      var date = new Date()
      var year = ('000' + date.getFullYear()).slice(-4),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2),
        hour = ('0' + date.getHours()).slice(-2),
        minute = ('0' + date.getMinutes()).slice(-2),
        second = ('0' + date.getSeconds()).slice(-2)
      result = rule
        .replace(/YYYY/g, year)
        .replace(/MM/g, month)
        .replace(/DD/g, day)
        .replace(/hh/g, hour)
        .replace(/mm/g, minute)
        .replace(/ss/g, second)
      return result
    },
    hyperlinkClick() {
      this.getDialogkey('hyperlink')
      this.dialogConfig.title = '超链接'
      this.dialogConfig.dialogFormComponent = 'hyperlink'

      this.dialogConfig.dialogVisible = true
    },
    specialCharsClick() {
      this.getDialogkey('specialChars')
      this.dialogConfig.title = '特殊字符'
      this.dialogConfig.dialogFormComponent = 'specialChars'
      this.dialogConfig.dialogVisible = true
      console.log(this.dialogConfig, 'this.dialogConfig')
    },
    dialogConfirm() {
      const type = this.dialogConfig.dialogFormComponent
      console.log(type, 'typetypetype')
      if (type == 'hyperlink') {
        this.$refs[type].submitForm()
      } else if (type == 'specialChars') {
        const chart = this.$refs[type].getChars()
        console.log(chart, 'chart')
        if (chart) {
          this.handleEvents('executeInsertElementList', [{ value: chart }])
          this.dialogConfig.dialogVisible = false
        }
      }
    },
    getDialogkey() {
      this.dialogConfig.key = `${
        this.dialogConfig.dialogFormComponent
      }?v=${new Date().getTime()}`
    },
    componentConfirm({ type, data }) {
      console.log('hyperlink', type, data)
      if (type == 'hyperlink') {
        this.handleEvents('executeHyperlink', data)
      }
      this.dialogConfig.dialogVisible = false
    },
    databaseClick() {
      this.getDialogkey('database')
      this.dialogConfig.title = '插入数据元'
      this.dialogConfig.width = '1000px'
      this.dialogConfig.dialogFormComponent = 'newInsertElement'
      this.dialogConfig.events = {
        insertToInputField: this.insertToInputField
      }
      this.dialogConfig.showFooter = false
      this.dialogConfig.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
.bcom {
  .el-dropdown {
    margin-top: -9px;
  }
}
.linetypePiker {
  padding: 10px;
  li {
    width: 128px;
    padding: 5px 10px;
    user-select: none;
    transition: all 0.3s;
  }
  div {
    padding: 1px 5px;
    height: 20px;
  }
}
.linetypePiker div[data-separator='0,0'] {
  background-image: url('../../../canvasEditor/assets/images/line-single.svg');
}

.linetypePiker div[data-separator='1,1'] {
  background-image: url('../../../canvasEditor/assets/images/line-dot.svg');
}

.linetypePiker div[data-separator='3,1'] {
  background-image: url('../../../canvasEditor/assets/images/line-dash-small-gap.svg');
}

.linetypePiker div[data-separator='4,4'] {
  background-image: url('../../../canvasEditor/assets/images/line-dash-large-gap.svg');
}

.linetypePiker div[data-separator='7,3,3,3'] {
  background-image: url('../../../canvasEditor/assets/images/line-dash-dot.svg');
}

.linetypePiker div[data-separator='6,2,2,2,2,2'] {
  background-image: url('../../../canvasEditor/assets/images/line-dash-dot-dot.svg');
}
</style>
