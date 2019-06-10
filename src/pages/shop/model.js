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
          console.log('debug: location / shop', payload)
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
              // total: data.total,
            },
          },
        })
      }
    },
    async create({ payload }, { call, put }) {
      const data = Object.assign({}, payload)
      data.province = payload.city[0];
      data.city = payload.city[1];
      data.country = payload.city[2];
      delete data['city'];
      const res = await services.createMerchant(data);
      if (res) {
        await put({ type: 'hideModal' })
      } else {
        throw res
      }
    },

    *delete({ payload }, { select, call, put }) { 
      yield services.deleteMerchant({id: payload})
    }
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
