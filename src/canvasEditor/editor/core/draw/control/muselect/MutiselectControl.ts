import {
  EDITOR_COMPONENT,
  EDITOR_PREFIX
} from '../../../../dataset/constant/Editor'
import {
  CONTROL_STYLE_ATTR,
  EDITOR_ELEMENT_STYLE_ATTR
  // TEXTLIKE_ELEMENT_TYPE
} from '../../../../dataset/constant/Element'
import { ControlComponent } from '../../../../dataset/enum/Control'
import { EditorComponent } from '../../../../dataset/enum/Editor'
import { ElementType } from '../../../../dataset/enum/Element'
import { KeyMap } from '../../../../dataset/enum/KeyMap'
import {
  IControlContext,
  IControlInstance,
  IControlRuleOption
} from '../../../../interface/Control'
import { IElement } from '../../../../interface/Element'
import { ValueListOption } from '../../../../interface/MutiSelect'
import { omitObject, pickObject, splitText } from '../../../../utils'
import { formatElementContext } from '../../../../utils/element'
import { Control } from '../Control'

export class MutiselectControl implements IControlInstance {
  private element: IElement
  private control: Control
  private isPopup: boolean
  private selectDom: HTMLDivElement | null

  constructor(element: IElement, control: Control) {
    this.element = element
    this.control = control
    this.isPopup = false
    this.selectDom = null
  }

  public getElement(): IElement {
    return this.element
  }

  public getIsPopup(): boolean {
    return this.isPopup
  }

  public getCode(): string[] {
    return this.element.control?.code?.split(',') || []
  }

  public getValue(context: IControlContext = {}): IElement[] {
    const elementList = context.elementList || this.control.getElementList()
    const { startIndex } = context.range || this.control.getRange()
    const startElement = elementList[startIndex]
    const data: IElement[] = []
    // 向左查找
    let preIndex = startIndex
    while (preIndex > 0) {
      const preElement = elementList[preIndex]
      if (
        preElement.controlId !== startElement.controlId ||
        preElement.controlComponent === ControlComponent.PREFIX
      ) {
        break
      }
      if (preElement.controlComponent === ControlComponent.VALUE) {
        data.unshift(preElement)
      }
      preIndex--
    }
    // 向右查找
    let nextIndex = startIndex + 1
    while (nextIndex < elementList.length) {
      const nextElement = elementList[nextIndex]
      if (
        nextElement.controlId !== startElement.controlId ||
        nextElement.controlComponent === ControlComponent.POSTFIX
      ) {
        break
      }
      if (nextElement.controlComponent === ControlComponent.VALUE) {
        data.push(nextElement)
      }
      nextIndex++
    }
    return data
  }

  public setValue(): number {
    return -1
  }
  // public setValue(
  //   data: IElement[],
  //   context: IControlContext = {},
  //   options: IControlRuleOption = {}
  // ): number {
  //   // 校验是否可以设置
  //   if (!options.isIgnoreDisabledRule && this.control.getIsDisabledControl()) {
  //     return -1
  //   }
  //   const elementList = context.elementList || this.control.getElementList()
  //   const range = context.range || this.control.getRange()
  //   // 收缩边界到Value内
  //   this.control.shrinkBoundary(context)
  //   const { startIndex, endIndex } = range
  //   const draw = this.control.getDraw()
  //   // 移除选区元素
  //   if (startIndex !== endIndex) {
  //     draw.spliceElementList(elementList, startIndex + 1, endIndex - startIndex)
  //   } else {
  //     // 移除空白占位符
  //     this.control.removePlaceholder(startIndex, context)
  //   }

  //   // 非文本类元素或前缀过渡掉样式属性
  //   const startElement = elementList[startIndex]
  //   const anchorElement =
  //     (startElement.type &&
  //       !TEXTLIKE_ELEMENT_TYPE.includes(startElement.type)) ||
  //     startElement.controlComponent === ControlComponent.PREFIX
  //       ? pickObject(startElement, [
  //           'control',
  //           'controlId',
  //           ...CONTROL_STYLE_ATTR,
  //         ])
  //       : omitObject(startElement, ['type'])
  //   // 插入起始位置
  //   const start = range.startIndex + 1

  //   for (let i = 0; i < data.length; i++) {
  //     const newElement: IElement = {
  //       ...anchorElement,
  //       ...data[i],
  //       controlComponent: ControlComponent.VALUE
  //     }
  //     formatElementContext(elementList, [newElement], startIndex)
  //     draw.spliceElementList(elementList, start + i, 0, newElement)
  //   }
  //   // this.setSelect()
  //   const codes=this.element.control!.code!.split(',')
  //   console.log(elementList,data,codes,this.control,this.element, 'context')
  //   return start + data.length - 1
  // }

  public keydown(evt: KeyboardEvent): number | null {
    if (this.control.getIsDisabledControl()) {
      return null
    }
    const elementList = this.control.getElementList()
    const range = this.control.getRange()
    // 收缩边界到Value内
    this.control.shrinkBoundary()
    const { startIndex, endIndex } = range
    const startElement = elementList[startIndex]
    const endElement = elementList[endIndex]
    // backspace
    if (evt.key === KeyMap.Backspace) {
      // 清空选项
      if (startIndex !== endIndex) {
        return this.removeOptions()
      } else {
        if (
          startElement.controlComponent === ControlComponent.PREFIX ||
          endElement.controlComponent === ControlComponent.POSTFIX ||
          startElement.controlComponent === ControlComponent.PLACEHOLDER
        ) {
          // 前缀、后缀、占位符
          return this.control.removeControl(startIndex)
        } else {
          // 清空选项
          return this.removeOptions()
        }
      }
    } else if (evt.key === KeyMap.Delete) {
      // 移除选区元素
      if (startIndex !== endIndex) {
        // 清空选项
        return this.removeOptions()
      } else {
        const endNextElement = elementList[endIndex + 1]
        if (
          (startElement.controlComponent === ControlComponent.PREFIX &&
            endNextElement.controlComponent === ControlComponent.PLACEHOLDER) ||
          endNextElement.controlComponent === ControlComponent.POSTFIX ||
          startElement.controlComponent === ControlComponent.PLACEHOLDER
        ) {
          // 前缀、后缀、占位符
          return this.control.removeControl(startIndex)
        } else {
          // 清空选项
          return this.removeOptions()
        }
      }
    }
    return endIndex
  }
  public setElement(element: IElement) {
    this.element = element
  }
  public cut(): number {
    if (this.control.getIsDisabledControl()) {
      return -1
    }
    this.control.shrinkBoundary()
    const { startIndex, endIndex } = this.control.getRange()
    if (startIndex === endIndex) {
      return startIndex
    }
    // 清空选项
    return this.clearSelect()
  }

  public removeOptions(
    context: IControlContext = {},
    options: IControlRuleOption = {}
  ): number {
    // 校验是否可以设置
    if (!options.isIgnoreDisabledRule && this.control.getIsDisabledControl()) {
      return -1
    }
    const elementList = context.elementList || this.control.getElementList()
    const { startIndex } = context.range || this.control.getRange()
    const startElement = elementList[startIndex]
    let leftIndex = -1
    let rightIndex = -1
    // 向左查找
    let preIndex = startIndex
    while (preIndex > 0) {
      const preElement = elementList[preIndex]
      if (
        preElement.controlId !== startElement.controlId ||
        preElement.controlComponent === ControlComponent.PREFIX
      ) {
        leftIndex = preIndex
        break
      }
      preIndex--
    }
    // 向右查找
    let nextIndex = startIndex + 1
    while (nextIndex < elementList.length) {
      const nextElement = elementList[nextIndex]
      if (
        nextElement.controlId !== startElement.controlId ||
        nextElement.controlComponent === ControlComponent.POSTFIX
      ) {
        rightIndex = nextIndex - 1
        break
      }
      nextIndex++
    }

    if (!~leftIndex || !~rightIndex) return -1

    const { selectCodes } = this.getSelectCodes(context, leftIndex)
    const oldCode = this.element.control!.code || ''
    
    this.setSelect(selectCodes) // 更新选项
    const cursorIndex = this.getCurentIndex(selectCodes, oldCode, leftIndex)
    return cursorIndex
  }

  public getSelectCodes(context: IControlContext = {}, leftIndex: number): any {
    const { startIndex, endIndex } = context.range || this.control.getRange()
    const { valueList } = this.getValueSets()
    let currentIndex = 0,
      selectCodes: string[] = []

    valueList.forEach((obj: ValueListOption, index: number) => {
      if (index === 0) {
        obj.startIndex = 0 // 第一个元素的起始索引显然是0
      } else {
        valueList[index].startIndex =
          currentIndex + valueList[index - 1].value.length
      }

      currentIndex = valueList[index].startIndex
    })
    const start = startIndex - leftIndex,
      end = endIndex - startIndex == 1 ? start : endIndex - startIndex + start
    selectCodes = valueList.reduce((acc: string[], obj: ValueListOption) => {
      const valueStartIdx: number = obj.startIndex || 0
      const valueEndIdx: number = valueStartIdx + obj.value.length - 1
      if (startIndex != endIndex) {
        if (valueStartIdx > end || valueEndIdx < start) {
          acc.push(obj.code)
        }
      } else {
        if (start - 1 > valueEndIdx || start - 1 < valueStartIdx) {
          acc.push(obj.code)
        }
      }
      return acc
    }, [])
    return { selectCodes }
  }

  public getCurentIndex(
    codes: string[],
    oldCode: string,
    leftIndex: number
  ): number {
    console.log(leftIndex)
    let cursorIndex = leftIndex
    const oldCodeArr = oldCode.split(',')
    const commonParts = codes.filter(
      (element, index) => element === oldCodeArr[index]
    )
    if (commonParts.length) {
      const { dataStr } = this.getValueSets(commonParts)
      cursorIndex += dataStr.length
    }
    return cursorIndex
  }

  public clearSelect(
    context: IControlContext = {},
    options: IControlRuleOption = {}
  ): number {
    const { isIgnoreDisabledRule = false, isAddPlaceholder = true } = options
    // 校验是否可以设置
    if (!isIgnoreDisabledRule && this.control.getIsDisabledControl()) {
      return -1
    }
    const elementList = context.elementList || this.control.getElementList()
    const { startIndex } = context.range || this.control.getRange()
    const startElement = elementList[startIndex]
    let leftIndex = -1
    let rightIndex = -1
    // 向左查找
    let preIndex = startIndex
    while (preIndex > 0) {
      const preElement = elementList[preIndex]
      if (
        preElement.controlId !== startElement.controlId ||
        preElement.controlComponent === ControlComponent.PREFIX
      ) {
        leftIndex = preIndex
        break
      }
      preIndex--
    }
    // 向右查找
    let nextIndex = startIndex + 1
    while (nextIndex < elementList.length) {
      const nextElement = elementList[nextIndex]
      if (
        nextElement.controlId !== startElement.controlId ||
        nextElement.controlComponent === ControlComponent.POSTFIX
      ) {
        rightIndex = nextIndex - 1
        break
      }
      nextIndex++
    }
    if (!~leftIndex || !~rightIndex) return -1
    // 删除元素
    const draw = this.control.getDraw()
    draw.spliceElementList(elementList, leftIndex + 1, rightIndex - leftIndex)
    // 增加占位符
    if (isAddPlaceholder) {
      this.control.addPlaceholder(preIndex, context)
    }
    this.element.control!.code = null
    return preIndex
  }

  private getValueSets(codeArr?: string[]): any {
    const control = this.element.control!
    console.log(control, 'control')
    const valueSets = control.valueSets
    const codes = codeArr || this.getCode()

    if (!Array.isArray(valueSets) || !valueSets.length) return {}
    // 转换code
    const valueSet = valueSets.filter(v => codes.includes(v.code))
    if (!valueSet.length) {
      return {}
    }
    const valueList = valueSet.map(item => {
      return { value: `，${item.value}`, code: item.code }
    })
    const startItem = valueList[0]
    startItem.value = startItem.value.replace(/，/g, '')
    valueList[0] = startItem
    let dataStr = ''
    for (const i of valueList) {
      dataStr += i.value
    }
    // dataStr = dataStr.slice(0, -1)
    return {
      dataStr,
      valueList
    }
  }

  public setSelect(
    codes: string[],
    context: IControlContext = {},
    options: IControlRuleOption = {},
  ) {
    // 校验是否可以设置
    if (!options.isIgnoreDisabledRule && this.control.getIsDisabledControl()) {
      return
    }
    const elementList = context.elementList || this.control.getElementList()
    const range = context.range || this.control.getRange()
    const control = this.element.control!
    const oldCode = control.code
    const valueSets = control.valueSets
    // 选项相同时无需重复渲染
    if (codes.join(',') === oldCode) {
      this.control.repaintControl({
        curIndex: range.startIndex,
        isCompute: false,
        isSubmitHistory: false
      })
      this.destroy()
      return
    }
    if (!Array.isArray(valueSets) || !valueSets.length) return
    // 转换code
    const valueSet = valueSets.filter(v => codes.includes(v.code))
    console.log(valueSet, 'valueSet')
    if (!valueSet.length) {
      const prefixIndex = this.clearSelect(context, {
        isAddPlaceholder: true
      })
      if (!~prefixIndex) return
      const start = prefixIndex
      if (!context.range) {
        const newIndex = start
        this.control.repaintControl({
          curIndex: newIndex
        })
        // 设置状态
        control.code = ''
      }
    } else {
      const valueList = valueSet.map(item => {
        return { value: `，${item.value}` }
      })
      let dataStr = ''
      for (const i of valueList) {
        dataStr += i.value
      }
      dataStr = dataStr.substring(1)
      console.log(dataStr, 'dataStr')
      // 样式赋值元素-默认值的第一个字符样式，否则取默认样式
      const valueElement = this.getValue(context)[0]
      const styleElement = valueElement
        ? pickObject(valueElement, EDITOR_ELEMENT_STYLE_ATTR)
        : pickObject(elementList[range.startIndex], CONTROL_STYLE_ATTR)
      // 清空选项
      const prefixIndex = this.clearSelect(context, {
        isAddPlaceholder: false
      })
      if (!~prefixIndex) return
      // 当前无值时清空占位符
      if (!oldCode) {
        this.control.removePlaceholder(prefixIndex, context)
      }
      // 属性赋值元素-默认为前缀属性
      const propertyElement = omitObject(
        elementList[prefixIndex],
        EDITOR_ELEMENT_STYLE_ATTR
      )
      const start = prefixIndex + 1
      const data = splitText(dataStr)
      const draw = this.control.getDraw()
      for (let i = 0; i < data.length; i++) {
        const newElement: IElement = {
          ...styleElement,
          ...propertyElement,
          type: ElementType.TEXT,
          value: data[i],
          controlComponent: ControlComponent.VALUE
        }
        formatElementContext(elementList, [newElement], prefixIndex)
        draw.spliceElementList(elementList, start + i, 0, newElement)
      }
      // 设置状态
      control.code = codes.join(',')
      console.log(context.range, context)
      // 重新渲染控件
      if (!context.range) {
        const newIndex =start + data.length - 1
        this.control.repaintControl({
          curIndex: newIndex
        })
        this.destroy()
      }
    }
  }

  private _createMultiSelectPopupDom() {
    this.destroy()
    const control = this.element.control!
    const valueSets = control.valueSets
    if (!Array.isArray(valueSets) || !valueSets.length) return
    const position = this.control.getPosition()
    if (!position) return

    const selectPopupContainer = document.createElement('div')
    selectPopupContainer.classList.add(
      `${EDITOR_PREFIX}-mutiselect-popup-container`
    )
    selectPopupContainer.setAttribute(EDITOR_COMPONENT, EditorComponent.POPUP)
    const ul = document.createElement('ul')
    const div = document.createElement('div')
    const searchInput = document.createElement('input')
    searchInput.type = 'text'
    searchInput.placeholder = '搜索...'
    div.classList.add(`${EDITOR_PREFIX}-mutiselect-popup-search`)

    div.appendChild(searchInput)

    searchInput.addEventListener('input', function (e) {
      const target = e.target as HTMLInputElement
      const searchText = target.value.toLowerCase()
      const lis = ul.querySelectorAll('li')

      lis.forEach(li => {
        const textValue = li.textContent?.toLowerCase()
        if (textValue?.includes(searchText)) {
          li.style.display = ''
        } else {
          li.style.display = 'none'
        }
      })
    })
    const selectedCodes = this.getCode() || []
    for (let v = 0; v < valueSets.length; v++) {
      const valueSet = valueSets[v]
      const li = document.createElement('li')
      li.setAttribute('data-value', valueSet.code)
      if (selectedCodes.includes(valueSet.code)) {
        li.classList.add('selected')
      }

      li.addEventListener('click', () => {
        const index = selectedCodes.indexOf(valueSet.code)
        if (index > -1) {
          selectedCodes.splice(index, 1)
          li.classList.remove('selected')
        } else {
          selectedCodes.push(valueSet.code)
          li.classList.add('selected')
        }
        console.log(selectedCodes, 'selectedCodes')
        this.setSelect(selectedCodes)
        this.awake()
      })

      li.textContent = valueSet.value
      ul.appendChild(li)
      ul.appendChild(li)
    }
    selectPopupContainer.appendChild(div)
    selectPopupContainer.appendChild(ul)

    // 定位
    const {
      coordinate: {
        leftTop: [left, top]
      },
      lineHeight
    } = position
    const preY = this.control.getPreY()
    selectPopupContainer.style.left = `${left}px`
    selectPopupContainer.style.top = `${top + preY + lineHeight}px`

    const container = this.control.getContainer()
    container.appendChild(selectPopupContainer)
    this.selectDom = selectPopupContainer
  }

  public awake() {
    if (this.isPopup || this.control.getIsDisabledControl()) return
    const { startIndex } = this.control.getRange()
    const elementList = this.control.getElementList()
    if (elementList[startIndex + 1]?.controlId !== this.element.controlId) {
      return
    }
    this._createMultiSelectPopupDom()
    this.isPopup = true
  }

  public destroy() {
    if (!this.isPopup) return
    this.selectDom?.remove()
    this.isPopup = false
  }
}
