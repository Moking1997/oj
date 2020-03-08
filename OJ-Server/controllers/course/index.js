const { mysql } = require('../../mysql')
// CONCAT(字段A,字段B,字段C ); 连接字段 ABC
// REPLACE (字段 A, 要替换的字符, 新字符)

// 新建课程
// 1. 选择知识点,将知识点分类的 id 和教师 id 传到后端
// 2. 新增课程, 保存课程 id,
// 3. 将知识点 id,将题库中与 catalogs  id 相同的题目的 course 字段添加上course id
async function course(ctx) {
    // const { tearcher_id = 0 } = ctx.request.query
    // const data = await mysql('problems_course').where({
    //     'tearcher_id': tearcher_id
    // })
    let id = 2
    await mysql('problems_course').where({
        tearcher_id: 8
    }).update({
        title: mysql.raw(`CONCAT(title, ${id}, ',')`)
    })
    ctx.body = {
        // 'data': data,
        'code': 0
    }
}

async function courseAdd(ctx) {
    const { title, array, tearcher_id = 0 } = ctx.request.body
    // console.log(title, array, tearcher_id)
    const catalog = await mysql('problems_course').where({
        'title': title,
        'tearcher_id': tearcher_id
    })

    if (catalog.length == 0) {
        // const id = await mysql('problems_course').insert({
        //     'title': title,
        //     'tearcher_id': tearcher_id
        // })
        let id = 1
        // for (let i = 0; i < array.length; i++) {
        //     let query = '%,' + array[i] + ',%'
        //     await mysql('problem')
        //         .where('catalogs', 'like', query)
        //         .update({
        //             'course': mysql.raw(`CONCAT(course, ${id}, ',')`)
        //         })
        // }

        // 去重
        let query = '%,' + id + ',%'
        let oldStr = ',' + id + ','
        console.log(query)
        let p = await mysql('problem')
            .where('course', 'like', query)
            .update({
                'course': mysql.raw(`REPLACE(course, ',1,', ',')`)
            })

        ctx.body = {
            'p': p,
            'id': id[0],
            'id': 0,
            'title': title,
            'tearcher_id': tearcher_id,
            'array': array,
            'state': 0,
            'msg': "添加课程成功",
            'code': 0
        }
    } else {
        ctx.body = {
            'code': 0,
            'state': 1,
            'msg': '该课程已存在'
        }
    }

}


async function courseDetele(ctx) {
    const { label, id } = ctx.request.body
    const course = await mysql('problems_course').where('id', '=', id).delete()

    ctx.body = {
        'state': 0,
        'msg': "删除知识点成功",
        'code': 0
    }
}

module.exports = {
    course,
    courseAdd,
    courseDetele
}