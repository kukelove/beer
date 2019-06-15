export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'post /account/login',



  // queryUser: '/user/:id',
  // queryUserList: '/users',
  // updateUser: 'Patch /user/:id',
  // createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
  // my api
  queryMerchantList: '/manage/merchant',
  createMerchant: 'post /manage/merchant',
  updateMerchant: 'put /manage/merchant',
  deleteMerchant: 'delete /manage/merchant',

  queryUserList: '/manage/user',
  createUser: 'post /manage/user',
  updateUser: 'put /manage/user',
  deleteUser: 'delete /manage/user',


  queryProductList: '/market/product',
  createProduct: 'post /market/product',
  deleteProduct: 'delete /market/product',
  updateProduct: 'put /market/product',

  createGallery: 'post /operation/gallery',
  queryGalleryList: 'get /operation/gallery',
  deleteGallery:  'delete /operation/gallery',
  updateGallery: 'put /operation/gallery',

  queryGalleryNameList: 'get /operation/gallery/list',
  createGalleryNameList: 'post /operation/gallery/list',
  deleteGalleryNameList: 'delete /operation/gallery/list',
  updateGalleryNameList: 'put /operation/gallery/list'
}
