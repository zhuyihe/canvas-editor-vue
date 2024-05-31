import {
  IControlContext,
  IControlRuleOption
} from './Control'

export interface ValueListOption {
  value: string
  code: string
  startIndex?: number
}



// export interface cursorIndex:number
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
