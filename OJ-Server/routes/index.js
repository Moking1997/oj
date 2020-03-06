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

// 题目相关
router.get('/problems', controllers.problems.index.problmes)
// router.post('/problems/catalogs/add', controllers.problems.index.catalogsAdd)
// router.post('/problems/catalogs/detele', controllers.problems.index.catalogsDetele)

// 题目知识点分类相关
router.get('/problems/catalogs', controllers.problems.catalogs.catalogs)
router.post('/problems/catalogs/add', controllers.problems.catalogs.catalogsAdd)
router.post('/problems/catalogs/detele', controllers.problems.catalogs.catalogsDetele)

// 题目标签分类相关
router.get('/problems/tags', controllers.problems.tags.tags)
router.post('/problems/tags/add', controllers.problems.tags.tagsAdd)
router.post('/problems/tags/detele', controllers.problems.tags.tagsDetele)
module.exports = router