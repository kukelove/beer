export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
  // my api
  queryMerchantList: '/manage/merchant',
  createMerchant: 'post /manage/merchant',
  updateMerchant: 'put /manage/merchant',
  deleteMerchant: 'delete /manage/merchant' 
}
