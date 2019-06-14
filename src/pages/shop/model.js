/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'api'
import services from 'services/index'
 
const {
  updateMerchant,
  createMerchant,
} = api

export default modelExtend(pageModel, {
  namespace: 'merchant',

  state: {
    modalVisible: false,
    modalType:'create',
    currentItem: {},
    list:[],
    pagination: {
      current: 0,
      pageSize: 10,
      total: 0,
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/shop', location.pathname)) {
          const payload = Object.keys(location.query).length > 0? location.query : { pn: 0, sz: 10 }
          console.log('debug: location /shop ', payload)
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
      const data = yield services.queryMerchantList(payload)
      if (data) {
        yield put({
          type: 'fetchListSuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.pn) || 0,
              pageSize: Number(payload.ps) || 10,
              total: data.tz || 0,
            },
          },
        })
      }
    },
    async create({ payload }, { call, put }) {
      const res = await services.createMerchant(payload);
      if (res) {
        await put({ type: 'hideModal' })
      } else {
        throw res
      }
    },

    *delete({ payload }, { select, call, put }) { 
      yield services.deleteMerchant({id: payload})
    },
    
    *update({ payload }, { select, call, put }) {
      const id = yield select(({ merchant }) => merchant.currentItem.id)
      const newMerchant = { ...payload, id }
      const data = yield services.updateMerchant(newMerchant)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },

  reducers: {
    fetchListSuccess(state, { payload }) {
      console.log('debug reducers querySuccess :', payload)
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
