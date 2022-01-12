// api.js
const WORK_BURDEN = 'workBurden';
const TABLE_LIST = 'tableList';
const action = '/mock'
// Service.js
class Service {
  fetchForm = (params) => {
      // return fetch(`${WORK_BURDEN}/xxxxxurl`, params);
      return fetch(`/mock/${WORK_BURDEN}.json`, params).then(res => res.json());
  }

  fetchTableList = (params) => {
    return fetch(`/mock/${TABLE_LIST}.json`, params).then(res => res.json());
  }

  fetchIntervalLine = (params) => {
    return fetch(`${action}/intervalLine.json`, params).then(res => res.json());
  }

  fetchFaceting = (params) => {
    return fetch(`${action}/faceting.json`, params).then(res => res.json());
  }

  fetchSectionList = (params) => {
    return fetch(`${action}/sectionList.json`, params).then(res => res.json());
  }
  // fetchHotelDetail = (params) => {
  //     return fetch(HOTELLIST, params);
  // }
}

export default new Service()

// 这样带来的好处就是，很清楚的知道页面中涉及了哪些请求，如果使用了TypeScript，后续某个请求方法名修改了后，在所有调用的地方也会提示错误，非常方便。