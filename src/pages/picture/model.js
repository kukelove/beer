/* global window */
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'api'
import services from 'services/index'

export default modelExtend(pageModel, {
  namespace: 'picture',
  state: {
    bannersList: [],
    galleryList: [],
    list:[],
    pagination: {
      current: 0,
      pageSize: 10,
      tp: 0,
      tz: 2,
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/picture', location.pathname)) {
          const payload = Object.keys(location.query).length > 0? location.query : { pn: 0, sz: 10 }
          console.log('debug: location / picture', payload)
          dispatch({
            type: 'queryGalleryList',
            payload,
          })
        }
      })
    },
  },
  effects: {
    *queryGalleryList({ payload = {} }, { call, put }) {
      const data = yield services.queryGalleryList(payload)
      if (data) {
        yield put({
          type: 'queryGalleryListSuccess',
          payload: {
            galleryList: data.data,
            pagination: {
              current: Number(payload.pn) || 0,
              pageSize: Number(payload.ps) || 10,
              // total: data.total,
              // tp: 0,
              // tz: 2,
            },
          },
        })
      }
    },
    
    *deleteGallery({ payload }, { select, call, put }) { 
      yield services.deleteGallery({id: payload})
      yield put({
        type: 'queryGalleryList',
        payload: { pn: 0, sz: 10 }
      })
    },

    async createGallery({ payload = {} }, { call, put }) {
      const res = await services.createGallery(payload);
      if(res) {
        message.success('上传首页轮播图成功！')
      }
    },
    
  },

  reducers: {
    queryGalleryListSuccess(state, { payload }) {
      console.log('debug reducers queryGalleryListSuccess :', payload)
      return { ...state, ...payload }
    },
    
  },
})
