// 全局声明文件，比如 types.d.ts
declare module 'libs/tools/bus' {
    import {bus} from 'libs/tools/bus';
    export const bus: any;
  }

  declare module 'libs/http/request' {
    import request from 'libs/http/request';
    export const request: any;
  }

declare 