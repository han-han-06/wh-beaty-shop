import axios from 'axios'
import commonUtil from '../../assets/js/common_util';
axios.defaults.timeout=60000
axios.defaults.baseURL = 'http://192.168.10.83:8888'
    
// axios.create
//请求拦截器
axios.interceptors.request.use(config=>{
    return config
},error=>{
    return error
});

//响应拦截器
axios.interceptors.response.use(response => {
    let { message, result, code } = response.data
    if(code===1000) {
        return result
    }else {
        commonUtil.setMessage('warning', message)
        return Promise.reject({ message, code })
    }
}, function (error) {
    // console.log('报错了')
    commonUtil.setMessage('error', message)
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default axios