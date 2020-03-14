import axios from 'axios'
import {
    cookie
} from './cookies.js'
// 后端给的服务器基址
let urlHeard
if (process.env.NODE_ENV == 'development') {
    urlHeard = 'http://106.54.55.98:5757/api/'
} else {
    urlHeard = 'http://106.54.55.98:5757/api/'
}
axios.defaults.baseURL = urlHeard;
// axios.defaults.timeout = 60000;

// 这里是自定义 token, 需要和后端沟通，一般用来和后端的 jwt（json token） 对应,前端这里不用关心的，加上去就行了
// 这样 http 请求报文 的请求头里就会带上这个
// axios.defaults.headers.get['aiit-zhyl-auth'] = cookie.get('后端约定的token');
// axios.defaults.headers.post['aiit-zhyl-auth'] = cookie.get('后端约定的token');

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = config.data;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么, 这里的 response 就是后端发过来的 response报文的内容，这里判断后端返回的状态码，
    // 来调整判断，这是 需要和后端约定，一般 0 表示响应成功，当然其他无所谓，1也可以，看后端代码里怎么写
    // 状态码 
    // console.log(response);
    //成功请求
    if (response.data.code == 0) {
        return response;
    } else if (response.data.code == 1001007 || response.data.code == 1001006) {
        //失败状态码处理
        alert(response.data.msg);
        // console.log(response.data);
    } else {
        console.log(response.data);
        // return response.data
    }

}, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        if (error.response.status == 401) {
            // 返回 401 清除token信息并跳转到登录页面
            // alert('登录状态过期失效')
            console.log('登录状态过期失效');
            // cookie.delete("后端约定的token");
            // location.href = "login.html";
            window.location.reload()
        }
    }
    return Promise.reject(error);
});


export default axios;