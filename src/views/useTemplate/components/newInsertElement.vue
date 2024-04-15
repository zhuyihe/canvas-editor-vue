<template>
  <div class="insertElement">
    <div class="searchBlock">
      <el-input
        class="elementType"
        v-model="showTypeName"
        placeholder="请选择数据元分类"
        clearable
        @clear="clearValue"
        size="medium"
      ></el-input>
      <el-input
        class="elementInput"
        v-model="searchInfo.mrElementName"
        @keyup.enter.native="getElementData"
        placeholder="请输入数据元名称"
        clearable
        ref="elementInput"
        size="medium"
      ></el-input>
    </div>
    <div class="contentBlock" :style="{ height: treeHeight }">
      <div class="treeContent">
        <el-tree
          class="common-tree"
          accordion
          ref="tree"
          :data="treeData"
          :props="defaultProps"
          :node-key="this.defaultProps.value"
          :check-strictly="false"
          default-expand-all
          :expand-on-click-node="false"
          :highlight-current="true"
          @node-click="handleNodeClick"
          size="medium"
        ></el-tree>
      </div>
      <div class="tableContent">
        <el-table
          ref="table"
          v-loading="elementLoading"
          :data="elementData"
          highlight-current-row
          @row-dblclick="insertEle"
          @row-click="rowClick"
          :header-cell-style="tableTitleStyle"
          :cell-style="cellStyle"
          border
        >
          <el-table-column
            prop="elementCode"
            label="数据元编码"
          ></el-table-column>
          <el-table-column
            prop="elementName"
            label="数据元名称"
          ></el-table-column>
          <el-table-column prop="alias" label="数据元别名"></el-table-column>
          <el-table-column prop="toolTip" label="输入提示"></el-table-column>
          <el-table-column
            prop="sdElementDataTypeDesc"
            label="控件类型"
            width="100"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="pageSizeChange"
          @current-change="pageCurrentChange"
          :current-page="searchInfo.page"
          :page-sizes="pageSizes"
          :page-size="searchInfo.limit"
          layout="total, sizes, prev, pager, next"
          :total="pageTotal"
          background
        ></el-pagination>
      </div>
    </div>
    <div class="btns">
      <el-button class="btnInsert" type="primary" @click="insertEle"
        >插 入</el-button
      >
    </div>
  </div>
</template>
<script>
// const publicServiceParentUrl = globalUrl.publicServiceParentUrl;
// import { INPUTTYPELIST } from "baseService/common/js/common.js";
import apis from '@/apis'
export default {
  props: {
    showFlag: {
      type: Boolean // 接受父组件是否展示状态
    },
    inputType: {
      type: String, // 如果光标定位在数据元中,则为该数据元的类型,否则为空
      default: ''
    }
  },
  data() {
    return {
      searchInfo: {
        // 查询列表相关
        mrElementName: '',
        mrElementCode: '',
        idParent: '',
        enabled: 1,
        page: 1,
        limit: 10,
        isDirectory: 0
      },
      // 定时器
      timeout: null,
      elementLoading: false,
      elementData: [],
      rowInfo: {},
      pageSizes: [10, 20, 30, 40, 50],
      pageTotal: 0,
      treeData: [], // 数据元分类树状结构
      treeHeight: 0,
      defaultProps: {
        value: 'elementId', // ID字段名
        label: 'elementName', // 显示名称
        children: 'voList' // 子级字段名
      },
      showTypeName: '',
      tableTitleStyle: {
        fontSize: '14px',
        color: '#000',
        background: '#FAFAFA'
      },
      cellStyle: {
        fontSize: '14px',
        height: '26px',
        color: '#606266',
        fontWeight: '400'
      }
    }
  },
  created() {
    this.getElementData()
    this.getTreeData()
  },
  mounted() {
    this.autoHeight()
    window.onresize = () => {
      this.autoHeight()
    }
  },
  watch: {
    'searchInfo.mrElementName': function (curVal, oldVal) {
      clearTimeout(this.timeout)
      if (curVal) {
        this.timeout = setTimeout(() => {
          this.getElementData()
        }, 200)
      }
    },
    showFlag: {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.elementInput.focus()
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    autoHeight() {
      this.treeHeight = window.innerHeight - 250 + 'px'
    },
    calcType(type) {
      // 控件类型下拉
      // const inputTypeList = INPUTTYPELIST;
      // let info = inputTypeList.find((list) => {
      //     return type == list.value;
      // });
      // return info.label;
    },
    clearValue() {
      this.searchInfo.idParent = ''
      this.getElementData()
    },
    // filterNode(value, data) {
    //     if (!value) return true;
    //     return data[`${this.defaultProps.label}`].indexOf(value) !== -1;
    // },
    handleNodeClick(data) {
      this.searchInfo.idParent = data[this.defaultProps.value]
      this.showTypeName = data[this.defaultProps.label]
      if (this.searchInfo.idParent) {
        this.getElementData()
      }
    },
    rowClick(row) {
      this.rowInfo = JSON.parse(row.elementContent)
    },
    insertEle() {
      if (!this.rowInfo.elementName) {
        this.$message({
          message: '请先选择一行数据',
          type: 'warning'
        })
        return
      }
      this.$emit('insertToInputField', this.rowInfo)
    },
    // 获取列表数据
    async getElementData() {
      this.elementLoading = true
      let [err, res] = await this.$to(
        apis.getElementDictPageList(this.searchInfo)
      )
      console.log(err, res, 'err,reserr,res')
      this.elementLoading = false
      if (err) return
      if (res.success) {
        let data = res.data
        let records = data.records
        records.forEach(list => {
          list.sdElementDataTypeDesc = this.calcType(
            JSON.parse(list.elementContent).inputType
          )
        })
        this.elementData = records
        this.pageTotal = data.total
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
      // this.$axios
      //     ._post(
      //         publicServiceParentUrl +
      //             "baseservice/element/getElementDictPageList",
      //         this.searchInfo
      //     )
      //     .then((res) => {
      //         this.elementLoading = false;
      //         if (res.success) {
      //             let data = res.data;
      //             let records = data.records;
      //             records.forEach((list) => {
      //                 list.sdElementDataTypeDesc = this.calcType(
      //                     JSON.parse(list.elementContent).inputType
      //                 );
      //             });
      //             this.elementData = records;
      //             this.pageTotal = data.total;
      //         } else {
      //             this.$message({
      //                 message: res.message,
      //                 type: "warning",
      //             });
      //         }
      //     });
    },
    // 获取数据元分类树状结构
    async getTreeData() {
      let [err, res] = await this.$to(
        apis.getElementDictTreeList({ isDirectory: 1 })
      )
      console.log(err, res, 'getTreeData')
      if (err) return
      if (res.success) {
        this.treeData = res.data
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
      // this.$axios
      //     ._post(
      //         publicServiceParentUrl +
      //             "baseservice/element/getElementDictTreeList",
      //         { isDirectory: 1 }
      //     )
      //     .then((res) => {
      //         if (res.success) {
      //             this.treeData = res.data;
      //         } else {
      //             this.$message({
      //                 message: res.message,
      //                 type: "warning",
      //             });
      //         }
      //     });
    },
    pageSizeChange(val) {
      this.searchInfo.limit = val
      this.getElementData()
    },
    pageCurrentChange(val) {
      this.searchInfo.page = val
      this.getElementData()
    }
  }
}
</script>
<style lang="scss" scoped>
.insertElement {
  .btns {
    text-align: right;
    // .el-pagination {
    //     display: inline-block;
    //     margin-top: 20px;
    // }
    // .btnInsert {
    //     transform: translateY(5px);
    // }
  }
  .searchBlock {
    display: flex;
    font-size: 14px;
    color: #606266;
    .elementType {
      width: 200px;
      margin-right: 10px;
    }
    .elementInput {
      flex: 1;
    }
  }
  .contentBlock {
    display: flex;
    margin-top: 10px;
    .treeContent {
      width: 200px;
      margin-right: 10px;
      overflow: auto;

      .common-tree {
        // width: 200px;
        // margin-right: 10px;
        // min-height: 393px;
        background-color: #fafafa;
        font-size: 14px;
        color: #606266;
      }
    }
    .tableContent {
      flex: 1;
      overflow: auto;
      .el-pagination {
        margin-top: 10px;
        margin-bottom: 5px;
        text-align: right;
      }
    }
  }
}
</style>
