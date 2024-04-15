import {
  BlockType,
  Command,
  ControlType,
  EditorMode,
  EditorZone,
  ElementType,
  IBlock,
  ICatalogItem,
  IElement,
  KeyMap,
  ListStyle,
  ListType,
  PageMode,
  PaperDirection,
  RowFlex,
  TextDecorationStyle,
  TitleLevel,
  splitText
} from '../../canvasEditor/editor'

const handleEditorEvent = {
  executeSize: (instance, data) => {
    instance.command.executeSize(Number(data))
  },
  executeFont: (instance, data) => {
    instance.command.executeFont(data)
  },
  executeFormat: (instance, data) => {
    instance.command.executeFormat()
  },
  executeColor: (instance, data) => {
    instance.command.executeColor(data)
  },
  executeHighlight: (instance, data) => {
    instance.command.executeHighlight(data)
  },
  executeBold: (instance, data) => {
    instance.command.executeBold()
  },
  executeItalic: (instance, data) => {
    instance.command.executeItalic()
  },
  executeUnderline: (instance, data) => {
    instance.command.executeUnderline()
  },
  executeStrikeout: (instance, data) => {
    instance.command.executeStrikeout()
  },
  executeSuperscript: (instance, data) => {
    instance.command.executeSuperscript()
  },
  executeSubscript: (instance, data) => {
    instance.command.executeSubscript()
  },
  executeUndo: (instance, data) => {
    instance.command.executeUndo()
  },
  executeRowFlexLeft: (instance, data) => {
    instance.command.executeRowFlex(RowFlex.LEFT)
  },
  executeRowFlexRight: (instance, data) => {
    instance.command.executeRowFlex(RowFlex.RIGHT)
  },
  executeRowFlexCenter: (instance, data) => {
    instance.command.executeRowFlex(RowFlex.CENTER)
  },
  executeRowFlexAligin: (instance, data) => {
    instance.command.executeRowFlex(RowFlex.ALIGNMENT)
  },
  executeRowMargin: (instance, data) => {
    instance.command.executeRowMargin(Number(data))
  },
  executePainter: (instance, data) => {
    instance.command.executePainter({ isDblclick: true })
  },
  executeRedo: (instance, data) => {
    instance.command.executeRedo()
  },
  executeInsertTable: (instance, data) => {
    const { rowIndex, colIndex } = data
    instance.command.executeInsertTable(rowIndex, colIndex)
  },
  executeDeleteTable: (instance, data) => {
    instance.command.executeDeleteTable()
  },
  executeMergeTableCell: (instance, data) => {
    instance.command.executeMergeTableCell()
  },
  executeCancelMergeTableCell: (instance, data) => {
    instance.command.executeCancelMergeTableCell()
  },
  executeTableTdVerticalAlign: (instance, data) => {
    instance.command.executeTableTdVerticalAlign(data)
  },
  executeTableBorderType: (instance, data) => {
    instance.command.executeTableBorderType(data)
  },
  executeTableTdBorderType: (instance, data) => {
    instance.command.executeTableTdBorderType(data)
  },
  executeTableTdSlashType: (instance, data) => {
    instance.command.executeTableTdSlashType(data)
  },
  executeTableTdBackgroundColor: (instance, data) => {
    instance.command.executeTableTdBackgroundColor(data)
  },
  executeTableSelectAll: (instance, data) => {
    instance.command.executeTableSelectAll()
  },
  executeInsertTableTopRow: (instance, data) => {
    instance.command.executeInsertTableTopRow()
  },
  executeInsertTableBottomRow: (instance, data) => {
    instance.command.executeInsertTableBottomRow()
  },
  executeInsertTableLeftCol: (instance, data) => {
    instance.command.executeInsertTableLeftCol()
  },
  executeInsertTableRightCol: (instance, data) => {
    instance.command.executeInsertTableRightCol()
  },
  executeDeleteTableRow: (instance, data) => {
    instance.command.executeDeleteTableRow()
  },
  executeDeleteTableCol: (instance, data) => {
    instance.command.executeDeleteTableCol()
  },
  executeImage: (instance, data) => {
    instance.command.executeImage({ ...data })
  },
  executeInsertElementList: (instance, data) => {
    instance.command.executeInsertElementList(data)
  },
  executeAppendElementList: (instance, data) => {
    instance.command.executeAppendElementList(data)
  },
  executeSeparator: (instance, data) => {
    instance.command.executeSeparator(data)
  },
  executeHyperlink: (instance, data) => {
    instance.command.executeHyperlink({
      type: ElementType.HYPERLINK,
      value: '',
      url: data.url,
      valueList: splitText(data.name).map(n => ({
        value: n,
        size: 16
      }))
    })
  }
}

const instanceListeners = (vm, instance) => {
  instance.listener.rangeStyleChange = payload => {
    vm.$bus.$emit('rangeStyleChange', payload)
  }
}
export { handleEditorEvent, instanceListeners }
