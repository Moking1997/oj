const router = require('koa-router')({
    prefix: '/api'
})
// 引入接口配置
const controllers = require('../controllers')

// 首页
router.get('/index', controllers.home.index)

// 登入验证
router.post('/login', controllers.login.index.loginCheck)

// 用户相关
router.get('/users', controllers.user.index.users)
router.post('/users/add', controllers.user.index.usersAdd)
router.post('/users/detele', controllers.user.index.usersDetele)
router.post('/users/edit', controllers.user.index.usersEdit)

module.exports = router