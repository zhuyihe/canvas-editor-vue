const loginApi = (get, post, url) => {
  return {
    // findWorkGroupDeptByIdEmp: (data) => get(`${url()}v1/api/baseservice/element/getElementDictPageList`, data),
    getElementDictPageList: (data) => post(`${url()}v1/api/baseservice/element/getElementDictPageList`, data, { isJson: true }),
    getElementDictTreeList: (data) => post(`${url()}v1/api/baseservice/element/getElementDictTreeList`, data, { isJson: true })
  }
}

export default loginApi
