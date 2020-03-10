const { mysql } = require('../../mysql')

async function tags(ctx) {
    const { id, label } = ctx.request.query
    const data = await mysql('problems_tags')

    ctx.body = {
        'tags': data,
        'code': 0
    }
}

async function tagsAdd(ctx) {
    const { label } = ctx.request.body
    const tags = await mysql('problems_tags').where({
        'label': label
    })

    if (tags.length == 0) {
        const id = await mysql('problems_tags').insert({
            'label': label,
        })

        ctx.body = {
            'id': id[0],
            'state': 0,
            'msg': "添加标签成功",
            'code': 0
        }
    } else {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '该标签已存在'
        }
    }

}


async function tagsDetele(ctx) {
    const { label, id } = ctx.request.body
    const tags = await mysql('problems_tags').where('id', '=', id).delete()

    ctx.body = {
        'state': 0,
        'msg': "删除标签成功",
        'code': 0
    }
}

async function tagsEdit(ctx) {
    const { id, label } = ctx.request.body
    const tags = await mysql('problems_tags').where({
        'id': id
    })
    const names = await mysql('problems_tags').where({
        'label': label
    })
    const us = tags
    if (tags.length == 0) {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '该标签不存在'
        }
    } else if (names.length == 1) {
        ctx.body = {
            'code': 0,
            'state': 2,
            'msg': '该标签已存在'
        }
    } else {
        const u = await mysql('problems_tags').where('id', '=', id).update({
            'label': label,
        })
        ctx.body = {
            'state': 0,
            'msg': "修改标签成功",
            'code': 0
        }
    }

}
module.exports = {
    tags,
    tagsAdd,
    tagsDetele,
    tagsEdit,
}