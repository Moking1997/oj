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
router.get('/problem', controllers.problems.index.problme)
router.get('/problems', controllers.problems.index.problmes)
router.post('/problem/add', controllers.problems.index.problmeAdd)
router.post('/problem/edit', controllers.problems.index.problmeEdit)
router.post('/problem/detele', controllers.problems.index.problmeDetele)

// 题目知识点分类相关
router.get('/problems/catalogs', controllers.problems.catalogs.catalogs)
router.post('/problems/catalogs/add', controllers.problems.catalogs.catalogsAdd)
router.post('/problems/catalogs/detele', controllers.problems.catalogs.catalogsDetele)

// 题目标签分类相关
router.get('/problems/tags', controllers.problems.tags.tags)
router.post('/problems/tags/add', controllers.problems.tags.tagsAdd)
router.post('/problems/tags/detele', controllers.problems.tags.tagsDetele)
router.post('/problems/tags/edit', controllers.problems.tags.tagsEdit)

// 题目类型相关
router.get('/problems/type', controllers.problems.type.type)
router.post('/problems/type/add', controllers.problems.type.typeAdd)
router.post('/problems/type/detele', controllers.problems.type.typeDetele)
router.post('/problems/type/edit', controllers.problems.type.typeEdit)

// 课程分类相关
router.get('/course', controllers.course.index.course)
router.get('/courses', controllers.course.index.courses)
router.get('/openCourses', controllers.course.index.openCourses)
router.post('/course/open', controllers.course.index.courseOpen)
router.post('/course/add', controllers.course.index.courseAdd)
router.post('/course/detele', controllers.course.index.courseDetele)
router.post('/course/joinCourse', controllers.course.index.joinCourse)
router.post('/course/addproblem', controllers.course.index.courseAddProblem)
router.post('/course/deteleproblem', controllers.course.index.courseDeteleProblem)
module.exports = router