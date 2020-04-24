import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
import axios from '../api/js/request'
let store = new vuex.Store({
    state:{
        // 管理员id
        adminId:'',
        // 用户人员id
        userId:'',
        userName:'',
        adminName:"",
        bookId:'',
        pramas:{}
    },
    actions:{
        // 用户注册
        onRegister({commit},data) {
            axios.post('/loginRegist/user/regist', data).then(res => {
            }).catch(err =>  err)
        },
        // 登录
        logIn({commit},data) {
            axios.post('/loginRegist/user/login',data).then((res) =>{
                console.log(33333)
                commit('getLogIn',res)
                this.$commonUtils.setMessage('success','登录成功') 
                this.$router.push({
                        name:'bookStoreHome',   
                    })
                return Promise.resolve(res)
            }).catch(err =>  {
                console.log(22222)
                console.log('登录错误err', err)
                console.log(Vue)
                this.$router.push({
                    name:'bookStoreHome',   
                })
                return Promise.reject(err)
            })
        },
        // 商家登录,
        adminLogin({commit},data) {
            axios.post('/loginRegist/admin/login',data).then(res =>{
                console.log(res)
                commit('getAdminLogin',res)
                return res
            }).catch(err =>{
                console.log(err)
                return err
            })
        },
        // 商家注册
        adminRegister({commit},data) {
            axios.post('/loginRegist/admin/regist',data).then(res =>{
                
                commit('getAdminLogin',res)
                this.$commonUtils.setMessage('success','注册成功')
            })
        }
    },
    mutations:{
        // 用户登录
        getLogIn(state,data) {
            // 用户id
            state.userId = data.userId
        },
        // 管理员登录
        getAdminLogin(state,data) {
            // 管理员id
            state.adminId = data.adminId
            console.log('state.adminId',state.adminId)
        },
        // 管理員註冊，
        getAdminRegister(state,data) {
            console.log('data',data)
        }
    }
})
export default store;