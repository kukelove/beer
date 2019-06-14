/* global window */
import routes from 'utils/routes'
import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import { ROLE_TYPE } from 'utils/constant'
import { queryLayout, pathMatchRegexp } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import services from 'services'
import config from 'config'

const { queryRouteList, logoutUser, queryUserInfo } = api

export default {
  namespace: 'app',
  merchants: [],
  merchantMap: {},
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    routeList: [
      {
        // id: '1',
        // icon: 'laptop',
        // name: 'Dashboard',
        // zhName: '仪表盘',
        // router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'fetchMerchants' })
    },
  },
  effects: {
    *loginV2({ payload }, { put, call, select }) {
      payload.type = 3
      const data = yield services.loginUser(payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (!pathMatchRegexp('/login', from)) {
          if (from === '/') router.push('/shop')
          else router.push(from)
        } else {
          router.push('/shop')
        }
      }
    },
    *query({ payload }, { call, put, select }) {
      console.log('11111')
      const user = {avatar: "",
      id: 1,
      permissions: {visit: ["1", "2", "21", "7", "5", "51", "52", "53", "9", "8"], role: "guest"},
      username: "guest"}
      // const { success, user } = yield call(queryUserInfo, payload)
      const { locationPathname } = yield select(_ => _.app)

      if ( user) {
        // const { list } = yield call(queryRouteList)
        const list = routes;
        const { permissions } = user
        let routeList = list
        if (
          permissions.role === ROLE_TYPE.ADMIN ||
          permissions.role === ROLE_TYPE.DEVELOPER
        ) {
          permissions.visit = list.map(item => item.id)
        } else {
          routeList = list.filter(item => {
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid
                ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            routeList,
          },
        })
        if (pathMatchRegexp(['/','/login'], window.location.pathname)) {
          router.push({
            pathname: '/shop',
          })
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      // const data = yield call(logoutUser)
        console.log('%c⧭', 'color: #aa00ff', '???');
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            permissions: { visit: [] },
            menu: [
            ],
          },
        })
        router.push({
          pathname: '/login',
        })
    },
    
    *fetchMerchants({ payload }, { call, put }) {
      const res = yield services.queryMerchantList({pn: 0, sz: 500});

      if(res && res.data) {
        let merchantMap = {}
        res.data.map(item => {
          merchantMap[item.id] = item.name
        })

        yield put({
          type: 'updateState',
          payload: {
            merchantMap,
            merchants:res.data
          },
        })
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
   
  },
}
