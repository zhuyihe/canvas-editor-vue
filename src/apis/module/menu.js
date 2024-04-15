/* eslint-disable no-unused-vars */
const menuApi = (get, post, url) => {
  return {
    getModuleList: () => get(`/mock/menu.json`),
    getPrint: () => get('http://127.0.0.1:13333/exe'),
    //获取二级菜单
    getListPageBySystemWithId: (data) => get(`${url()}/listPageBySystemWithId`, data),
    //获取侧边栏
    getlistResBySystemWithId: (data) => get(`${url()}/listResBySystemWithId`, data),
    listResBtnByPageId: (data) => get(`${url()}/listResBtnByPageId`, data)
  }
}

export default menuApi
