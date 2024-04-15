<template>
  <div class="acom nav-content">
    <div class="nav-con">
      <ul class="font">
        <li id="fontName" title="字体" class="layui-form" lay-filter="family">
          <el-select
            v-model="fontFamily"
            placeholder="请选择"
            size="mini"
            @change="
              val => {
                this.handleEvents('executeFont', val)
              }
            "
          >
            <el-option
              v-for="item in fontFamilyList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li
          id="fontSize"
          class="fontSize layui-form"
          title="字号"
          lay-filter="size"
        >
          <el-select
            v-model="fontSize"
            placeholder="请选择"
            size="mini"
            @change="
              val => {
                this.handleEvents('executeSize', val)
              }
            "
          >
            <el-option
              v-for="item in fontSizeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li
          id="removeformat"
          class="removeformat default"
          title="清除字体格式"
          @click="handleEvents('executeFormat')"
        >
          <img src="../../../assets/image/removeformat.svg" />
        </li>
        <!-- <li id="formatMatch" class="marginTextright default" title="格式刷"><img
                                                src="../../../assets/image/formatMatch.svg" /></li> -->
        <li title="字体颜色" class="marginTextright textColor">
          <!-- <div id="fontColor" class="colorCon"></div> -->
          <img src="../../../assets/image/fontColor.svg" @click="colorClick" />
          <el-color-picker
            v-model="fontColor"
            size="mini"
            id="fontColor"
            ref="fontColor"
            @change="
              val => {
                handleEvents('executeColor', val)
              }
            "
          ></el-color-picker>
          <!-- <input type="color" id="fontColor" v-model="fontColor" /> -->
        </li>
        <li title="背景色" class="bgColor">
          <img src="../../../assets/image/bgColor.svg" @click="bgColorClick" />
          <el-color-picker
            v-model="bgColor"
            size="mini"
            class="bgColorPicker"
            ref="bgColorPicker"
            @change="
              val => {
                handleEvents('executeHighlight', val)
              }
            "
          ></el-color-picker>
        </li>
      </ul>
      <ul class="edit">
        <li id="bold" title="粗体" @click="handleEvents('executeBold')">
          <img src="../../../assets/image/bold.svg" />
        </li>
        <li id="italic" title="斜体" @click="handleEvents('executeItalic')">
          <img src="../../../assets/image/italic.svg" />
        </li>
        <li
          id="strikethrough"
          title="删除线"
          @click="handleEvents('executeStrikeout')"
        >
          <img src="../../../assets/image/strikethrough.svg" />
        </li>
        <li
          id="underline"
          title="下划线"
          @click="handleEvents('executeUnderline')"
        >
          <img src="../../../assets/image/underline.svg" />
        </li>
        <!-- <li id="fontborder" title="字体边框">
          <img src="../../../assets/image/fontborder.svg" />
        </li> -->
        <li
          id="superscript"
          title="上标"
          @click="handleEvents('executeSuperscript')"
        >
          <img src="../../../assets/image/superscript.svg" />
        </li>
        <li
          id="subscript"
          title="下标"
          @click="handleEvents('executeSubscript')"
        >
          <img src="../../../assets/image/subscript.svg" />
        </li>
        <!-- <li id="tolowercase" title="转英文小写">
          <img src="../../../assets/image/zimuzhuanxiaoxie.svg" />
        </li>
        <li id="touppercase" title="转英文大写">
          <img src="../../../assets/image/zimuzhuandaxie.svg" />
        </li> -->
        <li
          id="formatMatch"
          title="格式刷"
          @click="handleEvents('executePainter')"
        >
          <img src="../../../assets/image/formatMatch.svg" />
        </li>
        <!-- <li id="textFont" title="带圈字符"><img src="../../../assets/image/wenzi.svg" /></li> -->
      </ul>
    </div>
    <div class="nav-con">
      <ul class="paragraph">
        <!-- <li id="rowspacingTop" class="spacingLi" title="段前距">
          <img src="../../../assets/image/rowspacingTop.svg" />
          <div class="spacingP">
            <ul class="spacing">
              <li>5</li>
              <li>10</li>
              <li>15</li>
              <li>20</li>
              <li>25</li>
              <li>30</li>
              <li>35</li>
            </ul>
          </div>
        </li>
        <li id="rowspacingBottom" class="spacingLi" title="段后距">
          <img src="../../../assets/image/rowspacingBottom.svg" />
          <div class="spacingP">
            <ul class="spacing">
              <li>5</li>
              <li>10</li>
              <li>15</li>
              <li>20</li>
              <li>25</li>
              <li>30</li>
              <li>35</li>
            </ul>
          </div>
        </li>
        <li id="indent" title="首行缩进" class="default">
          <img src="../../../assets/image/indent.svg" />
        </li> -->
        <li
          id="alignLeft"
          title="左对齐"
          class="default"
          @click="handleEvents('executeRowFlexLeft')"
        >
          <img src="../../../assets/image/alignLeft.svg" />
        </li>
        <li
          id="alignCenter"
          title="居中对齐"
          class="default"
          @click="handleEvents('executeRowFlexCenter')"
        >
          <img src="../../../assets/image/alignCenter.svg" />
        </li>
        <li
          id="alignRight"
          title="右对齐"
          class="default"
          @click="handleEvents('executeRowFlexRight')"
        >
          <img src="../../../assets/image/alignRight.svg" />
        </li>

        <!-- <li id="outline" title="大纲级别" class="spacingLi">
                                            <img src="../../../assets/image/outline.svg" />
                                            <div class="spacingP">
                                                <ul class="spacing">
                                                    <li data-id="0">无</li>
                                                    <li data-id="1">1级</li>
                                                    <li data-id="2">2级</li>
                                                    <li data-id="3">3级</li>
                                                </ul>
                                            </div>
                                        </li> -->
        <!-- <span>|</span> -->
        <!-- <li id="selectall" title="全选" class="default"><img
                                                src="../../../assets/image/selectall.svg" />
                                        </li>
                                        <li id="cleardoc" class="marginRight default" title="清空文档"><img
                                                src="../../../assets/image/cleardoc.svg" />
                                        </li> -->
        <br />
        <li id="lineHeight" class="spacingLi" title="行间距">
          <img
            src="../../../assets/image/lineHeight.svg"
            @click="handleLineHeight"
          />
          <el-select
            v-model="rowmargin"
            placeholder="请选择"
            ref="handleLineHeight"
            class="handleLineHeightS"
            size="mini"
            @change="
              val => {
                this.handleEvents('executeRowMargin', val)
              }
            "
          >
            <el-option
              v-for="item in rowmarginList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>

        <li
          id="alignJustify"
          title="两端对齐"
          class="default"
          @click="handleEvents('executeRowFlexAligin')"
        >
          <img src="../../../assets/image/alignJustify.svg" />
        </li>
        <!-- <li id="section" title="段落" class="default"><img
                                                src="../../../assets/image/section.svg" /></li> -->
        <!-- <span>|</span> -->
        <!-- <li id="insertorderedlist" class="spacingLi" title="有序列表">
                                            <img src="../../../assets/image/insertorderedlist.svg" />
                                            <div class="spacingP">
                                                <ul class="spacing orderList">
                                                    <li data-value="decimal">1,2,3...</li>
                                                    <li data-value="lower-alpha">a,b,c...</li>
                                                    <li data-value="upper-alpha">A,B,C...</li>
                                                    <li data-value="lower-roman">i,ii,iii...</li>
                                                    <li data-value="upper-roman">I,II,III...</li>
                                                </ul>
                                            </div>
                                        </li> -->
        <!-- <li id="insertunorderedlist" class="spacingLi" title="无序列表">
                                            <img src="../../../assets/image/insertunorderedlist.svg" />
                                            <div class="spacingP">
                                                <ul class="spacing unorderList">
                                                    <li data-value="circle">○ 大圆圈</li>
                                                    <li data-value="disc">● 小黑点</li>
                                                    <li data-value="square">■ 小方块</li>
                                                </ul>
                                            </div>
                                        </li> -->
      </ul>
    </div>
    <div class="nav-con">
      <ul class="imgSmall">
        <li id="undo" @click="handleEvents('executeUndo')">
          <img src="../../../assets/image/undo.svg" /><span class="gap"
            >撤销</span
          >
        </li>
        <br />
        <li id="redo" class="splitCell" @click="handleEvents('executeRedo')">
          <img src="../../../assets/image/redo.svg" /><span class="gap"
            >恢复</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fontSizeList, fontFamilyList, rowmarginList } from '../utils/const'
import common from '../mix/common'
export default {
  name: 'acom',
  mixins: [common],
  data() {
    return {
      fontSize: '14',
      fontFamily: '',
      fontColor: '#000000',
      rowmargin: '1',
      bgColor: '',
      fontSizeList,
      fontFamilyList,
      rowmarginList
    }
  },
  methods: {
    colorClick() {
      const showPicker = this.$refs.fontColor.showPicker
      this.$refs.fontColor.showPicker = !showPicker
      // console.log(control,'control')
      // control.click()
    },
    bgColorClick() {
      const showPicker = this.$refs.bgColorPicker.showPicker
      console.log(showPicker, 'showPicker')
      this.$refs.bgColorPicker.showPicker = !showPicker
      // console.log(control,'control')
      // control.click()
    },
    handleLineHeight() {
      console.log(this.$refs.handleLineHeight, 'this.$refs.handleLineHeight')
      const visible = this.$refs.handleLineHeight.visible
      this.$refs.handleLineHeight.visible = !visible
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/editorNav.scss';
.textColor {
  position: relative;
  #fontColor {
    width: 1px;
    height: 1px;
    visibility: hidden;
    outline: none;
    appearance: none;
    position: absolute;
    left: 0;
    top: 20px;
  }
}
.bgColor {
  position: relative;
  .bgColorPicker {
    width: 1px;
    height: 1px;
    visibility: hidden;
    outline: none;
    appearance: none;
    position: absolute;
    left: 0;
    top: 20px;
  }
}
.spacingLi {
  position: relative;
  .handleLineHeightS {
    width: 50px;
    height: 50px;
    // visibility: hidden;
    outline: none;
    appearance: none;
    position: absolute;
    left: -10px;
    top: 10px;
  }
  input,
  .el-input__suffix {
    display: none;
  }
}
</style>
../utils/const
