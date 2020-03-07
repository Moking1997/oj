const { mysql } = require('../../mysql')
const guld = require('uuid/v4')

async function loginCheck(ctx) {
    const { name, password } = ctx.request.body
    const users = await mysql('user_table').where({
        'name': name
    })

    if (users.length == 0) {
        ctx.body = {
            'state': 1,
            'msg': '用户不存在'
        }
    } else {
        let user = users[0]
        if (user.password != password) {
            ctx.body = {
                'state': 2,
                'msg': '密码错误'
            }
        } else {
            let token = guld().replace(/\-/g, '')
            let expires = 7 * 86400 * 1000 // 设置 token 过期时间一周
            let token_expires = Math.floor((Date.now() + expires) / 1000)

            let data = await mysql('user_table').where({
                'name': name,
                'password': password,
            }).update({
                'token': token,
                'token_expires': token_expires
            })

            ctx.body = {
                'id': user.id,
                'name': user.name,
                'state': 0,
                'msg': '登入成功',
                'token': token,
                'token_expires': token_expires,
                'limit': user.limit,
                'code': 0
            }
        }
    }

}

module.exports = {
    loginCheck
}