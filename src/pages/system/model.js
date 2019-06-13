/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'api'
import services from 'services/index'


export default modelExtend(pageModel, {
  namespace: 'system',

  state: {
    modalVisible: false,
    modalType:'create',
    currentItem: {},
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
        if (pathMatchRegexp('/system', location.pathname)) {
          const payload = Object.keys(location.query).length > 0? location.query : { pn: 0, sz: 10 }
          dispatch({
            type: 'fetchList',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *fetchList({ payload = {} }, { call, put }) {
      // 过滤会员类型
      payload.type = '3,4'
      const data = yield services.queryUserList(payload)
      if (data) {
        yield put({
          type: 'fetchListSuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.pn) || 0,
              pageSize: Number(payload.ps) || 10,
              // total: data.total,
              tp: 0,
              tz: 2,
            },
          },
        })
      }
    },
    async create({ payload }, { call, put }) {
      const data = await services.createUser(payload);
      if (data.success) {
        await put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *delete({ payload }, { select, call, put }) { 
      yield services.deleteUser({id: payload})
    },
    
    *update({ payload }, { select, call, put }) {
      // const id = yield select(({ system }) => system.currentItem.id)
      const newModel = payload
      const data = yield services.updateUser(newModel)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    fetchListSuccess(state, { payload }) {
      return { ...state, ...payload }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
