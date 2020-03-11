const { mysql } = require('../../mysql')

async function type(ctx) {
    const data = await mysql('problems_type')
    ctx.body = {
        'type': data,
        'code': 0
    }
}

async function typeAdd(ctx) {
    const { label } = ctx.request.fields
    const type = await mysql('problems_type').where({
        'label': label
    })

    if (type.length == 0) {
        const id = await mysql('problems_type').insert({
            'label': label,
        })
        ctx.body = {
            'id': id[0],
            'state': 0,
            'msg': "添加类型成功",
            'code': 0
        }
    } else {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '该类型已存在'
        }
    }

}


async function typeDetele(ctx) {
    const { label, id } = ctx.request.fields
    const type = await mysql('problems_type').where('id', '=', id).delete()

    ctx.body = {
        'state': 0,
        'msg': "删除类型成功",
        'code': 0
    }
}

async function typeEdit(ctx) {
    const { id, label } = ctx.request.fields
    const type = await mysql('problems_type').where({
        'id': id
    })
    const names = await mysql('problems_type').where({
        'label': label
    })
    const us = type
    if (type.length == 0) {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '该类型不存在'
        }
    } else if (names.length == 1) {
        ctx.body = {
            'code': 0,
            'state': 2,
            'msg': '该类型已存在'
        }
    } else {
        const u = await mysql('problems_type').where('id', '=', id).update({
            'label': label,
        })
        ctx.body = {
            'state': 0,
            'msg': "修改类型成功",
            'code': 0
        }
    }

}
module.exports = {
    type,
    typeAdd,
    typeDetele,
    typeEdit,
}