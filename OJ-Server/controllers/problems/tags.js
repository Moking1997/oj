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
        'msg': "删除知识点成功",
        'code': 0
    }
}

module.exports = {
    tags,
    tagsAdd,
    tagsDetele
}