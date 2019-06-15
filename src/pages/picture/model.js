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
    galleryNameList: [],
    bannersList: [],
    galleryList: [],
    galleryListMap: {},
    list:[],
    pagination: {
      current: 0,
      pageSize: 100,
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
    *queryGalleryList({ payload = {} }, { call, put }) {
      const data = yield services.queryGalleryList(payload)
      const galleryListMap = {}
      const galleryList = data.data

      galleryList.map(item=>{
        if(!galleryListMap[item.galleryListId]){
          galleryListMap[item.galleryListId] = [item]
        }else {
          galleryListMap[item.galleryListId].push(item)
        }
      })
      if (data) {
        yield put({
          type: 'queryGalleryListSuccess',
          payload: {
            galleryListMap,
            galleryList: data.data,
          },
        })
      }
    },
    
    *deleteGallery({ payload }, { select, call, put }) { 
      yield services.deleteGallery({id: payload.id})
      const { galleryListMap, galleryList } = yield select(_ => _.picture)
      galleryList.splice(galleryList.findIndex(item=>item.id === payload.id), 1)
      let list = galleryListMap[payload.galleryListId];
      list.splice(list.findIndex(item=>item.id === payload.id), 1)
      yield put({
        type: 'updateState',
        payload: { galleryList, galleryListMap }
      })
      message.success('删除成功')
    },

    *updateGallery({ payload }, { select, call, put }) {
      yield services.updateGallery(payload)
      let { galleryListMap, galleryList } = yield select(_ => _.picture)
      galleryList = galleryList.map(item => {
        if(item.id === payload.id){
          return payload
        }
      })
      let list = galleryListMap[payload.galleryListId];
      galleryListMap[payload.galleryListId] = list.map(item => {
        if(item.id === payload.id){
          return payload
        }
        return;
      })
      yield put({
        type: 'updateState',
        payload: { galleryList, galleryListMap }
      })
      message.success('修改成功')
    },

   *createGallery({ payload = {} }, { call, put }) {
      const res = yield services.createGallery(payload);
      if(res) {
        message.success('上传首页轮播图成功！')
        yield put({
          type: 'queryGalleryList',
          payload: { pn: 0, sz: 100 }
        })
      }
    },

    *queryGalleryNameList({ payload = {} }, { call, put }) {
      const res = yield services.queryGalleryNameList(payload);
      if(res) {
        yield put({
          type: 'updateState',
          payload: { galleryNameList: res.data }
        })
      }
    },

    *createGalleryList({ payload = {} }, { call, put, select }) {
      const res = yield services.createGalleryNameList(payload);
      const { galleryNameList } = yield select(_ => _.picture)
      galleryNameList.unshift(payload)
      yield put({
        type: 'updateState',
        payload: { galleryNameList }
      })
    },
    

    *updateGalleryList({ payload = {} }, { call, put, select }) {
      const res = yield services.updateGalleryNameList(payload);
      const { galleryNameList } = yield select(_ => _.picture)
      galleryNameList.map(item => {
        if(payload.id === item.id) {
          item.name = res.name
        }
        return item;
      })
      yield put({
        type: 'updateState',
        payload: { galleryNameList }
      })
      message.success('修改成功')
    },

    *deleteGalleryList({ payload = null }, { call, put, select }) {
      const res = yield services.deleteGalleryNameList({id: payload});
      const { galleryNameList } = yield select(_ => _.picture)
      const index = galleryNameList.findIndex((item, index) => {
        return payload === item.id
      })
      galleryNameList.splice(index, 1);
      message.success('删除列表成功！')
      yield put({
        type: 'updateState',
        payload: { galleryNameList }
      })
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    queryGalleryListSuccess(state, { payload }) {
      console.log('debug reducers queryGalleryListSuccess :', payload)
      return { ...state, ...payload }
    },
    
  },
})
