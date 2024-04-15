// const port = {
//   bus: 'bus',
//   log: 'log'
// }
import { get, post } from 'libs/http/index.js'
import commonApi from './module/common.js'
const defaultEcrfUrl = "http://10.202.6.21:9001/"

const uri = defaultEcrfUrl || process.env.VUE_APP_HOST_DEV
const url = (name = 'upm') => `${uri}${name}`

export default {
  ...commonApi(get, post, url),
}
