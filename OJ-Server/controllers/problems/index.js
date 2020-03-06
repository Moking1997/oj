const { mysql } = require('../../mysql')

async function problmes(ctx) {
    let { catalog = 0, tag = '', type = '', currentPage = 1, limit = 10 } = ctx.request.query
    let offset = (currentPage - 1) * limit;
    catalog = '%,' + catalog + ',%'
    tag = '%' + tag + '%'
    type = '%' + type + '%'
    const total = await mysql('problem').where('tags', 'like', tag)
        .andWhere('catalogs', 'like', catalog)
        .andWhere('type', 'like', type)
    const data = await mysql('problem').where('tags', 'like', tag)
        .andWhere('catalogs', 'like', catalog)
        .andWhere('type', 'like', type)
        .limit(limit)
        .offset(offset)

    ctx.body = {
        'total': total.length,
        'problems': data,
        'code': 0
    }
}

async function problmesAdd(ctx) {
    const { label, parentID } = ctx.request.body
    const catalog = await mysql('problems_catalogs').where({
        'label': label
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


async function problmesDetele(ctx) {
    const { label, id } = ctx.request.body
    const catalogs = await mysql('problems_catalogs').where('id', '=', id).delete()

    ctx.body = {
        'state': 0,
        'msg': "删除知识点成功",
        'code': 0
    }
}

module.exports = {
    problmes,
    problmesAdd,
    problmesDetele
}