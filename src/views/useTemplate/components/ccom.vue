<template>
  <div class="nav-content ccom">
    <div class="nav-con">
      <ul>
        <li
          id="insertTable"
          class="combination insertTable"
          @click="insertTable"
        >
          <img src="../../../assets/image/insertTable.svg" /><span
            >插入表格</span
          >
        </li>
        <li id="deleteTable" class="combination" @click="handleEvents('executeDeleteTable')">
          <img src="../../../assets/image/deleteTable.svg" /><span
            >删除表格</span
          >
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul class="imgSmall">
        <li id="insertRowUp" @click="handleEvents('executeInsertTableTopRow')">
          <img src="../../../assets/image/insertRowUp.svg" /><span class="gap"
            >行前插入</span
          >
        </li>
        <li id="insertRowDown" class="tdMargin" @click="handleEvents('executeInsertTableBottomRow')">
          <img src="../../../assets/image/insertRowDown.svg" /><span class="gap"
            >行后插入</span
          >
        </li>
        <li id="deleteRow" class="deleteRow" @click="handleEvents('executeDeleteTableRow')">
          <img src="../../../assets/image/deleteRow.svg" /><span class="gap"
            >删除行</span
          >
        </li>
        <br />
        <li id="insertColumnLeft" @click="handleEvents('executeInsertTableLeftCol')">
          <img src="../../../assets/image/insertColumnLeft.svg" /><span
            class="gap"
            >列前插入</span
          >
        </li>
        <li id="insertColumnRight" class="tdMargin" @click="handleEvents('executeInsertTableRightCol')">
          <img src="../../../assets/image/insertColumnRight.svg" /><span
            class="gap"
            >列后插入</span
          >
        </li>
        <li id="deleteColumn" class="deleteColumn"  @click="handleEvents('executeDeleteTableCol')">
          <img src="../../../assets/image/deleteColumn.svg" /><span class="gap"
            >删除列</span
          >
        </li>
      </ul>
    </div>
    <div class="nav-con">
      <ul class="imgSmall">
        <li id="mergeright" @click="handleEvents('executeMergeTableCell')">
          <img src="../../../assets/image/mergeright.svg" /><span class="gap"
            >合并单元格</span
          >
        </li>
        
        <br />
        <li id="splitCols" class="deleteColumn" @click="handleEvents('executeCancelMergeTableCell')">
          <img src="../../../assets/image/splitCols.svg" /><span class="gap"
            >拆分单元格</span
          >
        </li>
        <!-- <li id="mergedown">
          <img src="../../../assets/image/mergedown.svg" /><span class="gap"
            >下合并单元格</span
          >
        </li>
        <li id="splitRows" class="splitCell tdLeft">
          <img src="../../../assets/image/splitRows.svg" /><span class="gap"
            >拆分成行</span
          >
        </li> -->
      </ul>
    </div>
    <!-- <div class="nav-con">
      <ul class="imgSmall">
        <li id="tableAttr">
          <img src="../../../assets/image/tableAttr.svg" /><span class="gap"
            >表格属性</span
          >
        </li>
        <li id="copyRow" class="tdLeft">
          <img src="../../../assets/image/copyRow.svg" /><span class="gap"
            >复制一行</span
          >
        </li>
        <br />
        <li id="tdAttr" class="splitCell">
          <img src="../../../assets/image/tdAttr.svg" /><span class="gap"
            >单元格属性</span
          >
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import common from '../mix/common'
import { createTable } from '../utils/createTable'
export default {
  mixins: [common],
  data() {
    return {
      tablePanelshow: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      createTable(this)
      // this.drawTablePanel()
      // this.addListenerTablePanel()
    },
    insertTable() {
      const tablePanelContainer = document.querySelector(
        '.menu-item__table__collapse'
      )
      tablePanelContainer.style.display = 'block'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/editorNav.scss';
.menu-item__table__collapse {
  width: 270px;
  height: 310px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(56, 56, 56, 20%);
  border: 1px solid #e2e6ed;
  box-sizing: border-box;
  border-radius: 2px;
  position: absolute;
  display: none;
  z-index: 99;
  top: 110px;
  left: 20px;
  padding: 14px 27px;
  cursor: auto;
}

.menu-item__table__collapse .table-close {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

.menu-item__table__collapse .table-close:hover {
  color: #7d7e80;
}

.menu-item__table__collapse:hover {
  background: #fff;
}

.menu-item__table__collapse .table-title {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 5px;
  border-bottom: 1px solid #e2e6ed;
}

.table-title span {
  font-size: 12px;
  color: #3d4757;
  display: inline;
  margin: 0;
}
.table-panel {
  cursor: pointer;
}
.table-panel .table-row {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 10px;
  pointer-events: none;
}
.table-panel .table-cel {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 1px solid #e2e6ed;
  background: #fff;
  position: relative;
  margin-right: 6px;
  pointer-events: none;
}

.table-panel .table-cel.active {
  border: 1px solid rgba(73, 145, 242, 0.2);
  background: rgba(73, 145, 242, 0.15);
}

.table-panel .table-row .table-cel:last-child {
  margin-right: 0;
}
.ccom {
}
</style>
