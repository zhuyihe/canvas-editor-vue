const welcomeApi = (get, post, url) => {
  return {
    findWorkerIdDept: (data) => get(`${url('org')}/dept/findWorkGroupDeptByIdEmp`, data)
  }
}

export default welcomeApi
