const { mysql } = require('../../mysql')

async function catalogs(ctx) {
    const { parentID } = ctx.request.query
    const data = await mysql('problems_catalogs').where({
        'parentID': parentID
    })

    ctx.body = {
        'data': data,
        'code': 0
    }
}

async function catalogsAdd(ctx) {
    const { label, parentID = 0 } = ctx.request.body
    const catalog = await mysql('problems_catalogs').where({
        'label': label,
        'parentID': parentID
    })

    if (catalog.length == 0) {
        const id = await mysql('problems_catalogs').insert({
            'label': label,
            'parentID': parentID,
        })

        ctx.body = {
            'id': id[0],
            'state': 0,
            'msg': "添加知识点成功",
            'code': 0
        }
    } else {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '该知识点已存在'
        }
    }

}


async function catalogsDetele(ctx) {
    const { label, id } = ctx.request.body
    const catalogs = await mysql('problems_catalogs').where('id', '=', id).delete()

    ctx.body = {
        'state': 0,
        'msg': "删除知识点成功",
        'code': 0
    }
}

module.exports = {
    catalogs,
    catalogsAdd,
    catalogsDetele
}