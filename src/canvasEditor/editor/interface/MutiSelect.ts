import {
  IControlContext,
  IControlRuleOption
} from './Control'

export interface NoDeleteOptions {
  [key: number]: {
    value: string
    code: string
    startIndex?: number
  }
}

export interface ValueListOption {
  value: string
  code: string
  startIndex?: number
}

export interface ReduceAccumulator {
  isContinuous: boolean
  discontinuousItems:DiscontinuousItem 
  totalLengthUntilDiscontinuity: number // 累积到不连续处的value总长度
  processLength: boolean // 指示当前是否在累积长度
}

export interface CurentIndex {
  cursorIndex:number,
  sIndex:number,
  eIndex:number
}
export interface SetSelectParams  {
  codes: string[];
  context?: IControlContext;
  options?: IControlRuleOption;
  isSubmitHistory?: boolean;
  cursorIndex?:number
}
interface DiscontinuousItem {
  previous?: number
  current?: number
  missingLength?: number // 缺失项的长度
  startIndex?: number // 起始位置
  endIndex?: number // 结束位置
}
