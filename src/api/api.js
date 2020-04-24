import axios from './js/request'
// import axios from 'axios'
export default {
    // 注册
    onRegister(data) {
        return axios.post('/loginRegist/user/regist', data)
    },
    // 获取信息
    getInfo() {
        return axios.get('/boku/dictionary/sex')
    },
    // 登录
    logIn(data) {
        return axios.post('/loginRegist/user/login',data)
    },
    // 修改的获取
    upload(data) {
        return axios.post('/bokustore/book/upload',data)
    },
    // 新增
    addBook(data) {
        return axios.post('/cosmeticsmall/Cosmetics/addCosmetics',data)
    },
    // 删除
    deleteBook(cosmeticsId) {
        return axios.post(`/cosmeticsmall/Cosmetics/deleteCosmetics/${cosmeticsId}`)
    },
    // 根据商家id查询图书信息 GET /bokustore/book/book1s/{adminId}
    getListInfo(page,size,adminId) {
        // let {adminId} = data
        return axios.get(`/cosmeticsmall/Cosmetics/book1s/${page}/${size}/${adminId}`)
    },
    // 获取修改信息
    getModify(cosmeticsId) {
        return axios.get(`/cosmeticsmall/Cosmetics/singleDataCosmetics/${cosmeticsId}`)
    },
    // 根据图书类别查询相应图书
    getDiffBook(page,size,category) {
        return axios.get(`/cosmeticsmall/Cosmetics/books/${page}/${size}/${category}`)
    },
    // 商家登录
    adminLogin(data) {
        return axios.post('/loginRegist/admin/login',data)
    },
    // 商家注册
    adminRegister(data) {  
        return axios.post('/loginRegist/admin/regist',data)
    },
    // 修改的保存
    saveModifyFrom(cosmeticsId,data) {
        return axios.post(`/cosmeticsmall/Cosmetics/modifyCosmetics/${cosmeticsId}`,data)
    },
    // 加入购物车
    addShopCar(data) {
        return axios.post('/cosmeticsmall/cart/addToCart',data)
    },
    // 获取图书详情
    getBookDetail(cosmeticsId) {
        return axios.get(`/cosmeticsmall/Cosmetics/singleDataCosmetics/${cosmeticsId}`)
    },
    // 获取图书评论
    getBookCom(page,size,cosmeticsId) {
        return axios.get(`/cosmeticsmall/comment/comments/${page}/${size}/${cosmeticsId}`)
    },
    // 获取购物车信息
    getCarMess(customId) {
        return axios.get(`/cosmeticsmall/cart/allCart/${customId}`)
    },
    // 获取首页信息
    getHomeInfo(page,size) {
        return axios.get(`/cosmeticsmall/Cosmetics/firstPage/${page}/${size}`)
    },
    // 添加购物车
    addToCar(data) {
        return axios.post(`/cosmeticsmall/cart/addToCart`,data)
    },
    // 根据顾客id和图书id集合查出已选中商品的信息，并显示在结账页
    getOrderInfo(data) {
        return axios.post(`/cosmeticmall/order/findCosmeticsToSettleAccountPage`,data)
    },
    // GET 根据订单号查询订单
    getOrder() {
        return axios.get(`/bokustore/order/queryOrderByOrderNum/${orderNumber}`)
    },
    // 根据用户id查询订单
    getOrderUser(page,size,userId) {
        return axios.get(`/cosmeticmall/order/queryOrderByUserId/${page}/${size}/${userId}`)
    },
    // 保存订单
    savaOrder(data) {
        return axios.post(`/cosmeticmall/order/saveCosmeticsToOrder`,data)
    },
    // 添加评论
    addComments(data) {
        return axios.post(`/cosmeticsmall/comment/addComments`,data)
    },
    // 根据bookId查询评论信息
    viewComments(page,size,cosmeticsId) {
        return axios.get(`/cosmeticsmall/comment/comments/${page}/${size}/${cosmeticsId}`)
    },
    // 删除购物车中的商品 
    deleteCarInfo(customId,cosmeticsId) {
        return axios.post(`/cosmeticsmall/cart/deleteCartCosmeticsmall/${customId}/${cosmeticsId}`)
    },
    // 修改购物车中的商品
    modifyCarInfo(data) {
        return axios.post(`/cosmeticsmall/cart/modifyCartCosmeticsmall`,data)
    },
    // 根据用户id查询收获地址
    getAddressId(userId) {
        return axios.get(`/cosmeticsmall/address/findOrderListByUserId/${userId}`)
    },
    // 通过地址id查询收货地址
    getAddress(addressId) {
        return axios.get(`/cosmeticsmall/address/findByAddressId/${addressId}`)
    },
    // 删除收获地址
    delAddress(addressId) {
        return axios.post(`/cosmeticsmall/address/deleteAddress/${addressId}`)
    },
    // 添加收获地址
    addAddressHs(data) {
        return axios.post(`/cosmeticsmall/address/addAddress`,data)
    },
    // 查询图书信息
    searchBook(cosmeticsName) {
        return axios.get(`/cosmeticsmall/Cosmetics/findCosmeticsByName/${cosmeticsName}`)
    }
}