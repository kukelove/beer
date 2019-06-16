/* global window */
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'api'
import services from 'services/index'

export default modelExtend(pageModel, {
  namespace: 'message',
  state: {
    galleryNameList: [],
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/message', location.pathname)) {
          dispatch({
            type: 'queryGalleryNameList',
            payload: {
              "pn": 0,
              "sz": 100
            }
          })
        }
      })
    },
  },
  effects: {
    *queryGalleryNameList({ payload = {} }, { call, put }) {
      const res = yield services.queryGalleryNameList(payload);
      if(res) {
        yield put({
          type: 'updateState',
          payload: { galleryNameList: res.data }
        })
      }
    },
    *updateMessage({ payload = {} }, { call, put }) {
        yield services.updateMessage(payload);
        message.success('保存成功')
    },
    *createMessage({ payload = {} }, { call, put }) {
      yield services.createMessage(payload);
      message.success('保存成功')
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
