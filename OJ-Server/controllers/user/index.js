const { mysql } = require('../../mysql')

async function users(ctx) {
    const { currentPage = 1, limit = 10, like } = ctx.request.query
    let offset = (currentPage - 1) * limit;
    let query = '%' + like + '%'
    const data = await mysql('user_table').where('name', 'like', query)
    const users = await mysql('user_table').where('name', 'like', query).limit(limit).offset(offset)

    ctx.body = {
        'users': users,
        'data': data,
        'total': data.length,
        'code': 0
    }
}

async function usersAdd(ctx) {
    const { name, password, limit } = ctx.request.fields
    const users = await mysql('user_table').where({
        'name': name
    })

    if (users.length == 0) {
        const users = await mysql('user_table').insert({
            'name': name,
            'password': password,
            'limit': limit
        })

        ctx.body = {
            'state': 0,
            'msg': "添加用户成功",
            'code': 0
        }
    } else {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '用户名已存在'
        }
    }

}
async function usersEdit(ctx) {
    const { id, name, password, limit } = ctx.request.fields
    const users = await mysql('user_table').where({
        'id': id
    })
    const names = await mysql('user_table').where({
        'name': name
    })
    const us = users
    if (users.length == 0) {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '该用户不存在'
        }
    } else if (names.length == 1) {
        ctx.body = {
            'code': 0,
            'state': 2,
            'msg': '该用户名已存在'
        }
    } else {
        const u = await mysql('user_table').where('id', '=', id).update({
            'name': name,
            'password': password,
            'limit': limit
        })
        ctx.body = {
            'state': 0,
            'msg': "修改用户信息成功",
            'code': 0
        }
    }

}

async function usersDetele(ctx) {
    const { name, password } = ctx.request.fields
    const users = await mysql('user_table').where('name', '=', name).delete()

    ctx.body = {
        'state': 0,
        'msg': "删除用户成功",
        'code': 0
    }
}

module.exports = {
    users,
    usersAdd,
    usersDetele,
    usersEdit,
}