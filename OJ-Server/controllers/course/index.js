const { mysql } = require('../../mysql')


// 新建课程
// 1. 选择知识点,将知识点分类的 id 和教师 id 传到后端
// 2. 新增课程, 保存课程 id,
// 3. 将知识点 id,将题库中与 catalogs  id 相同的题目的 course 字段添加上course id
async function course(ctx) {
    const { tearcher_id = 0 } = ctx.request.query
    const data = await mysql('problems_course').where({
        'tearcher_id': tearcher_id
    })
    ctx.body = {
        'data': data,
        'code': 0
    }
}

async function courseAdd(ctx) {
    const { title, array, tearcher_id = 0, konwleges } = ctx.request.body
    const catalog = await mysql('problems_course').where({
        'title': title,
        'tearcher_id': tearcher_id
    })

    if (catalog.length == 0) {
        const id = await mysql('problems_course').insert({
            'title': title,
            'tearcher_id': tearcher_id,
            'konwleges': konwleges
        })
        for (let i = 0; i < array.length; i++) {
            let query = '%,' + array[i] + ',%'
            await mysql('problem')
                .where('catalogs', 'like', query)
                .update({
                    'course': mysql.raw(`CONCAT(course, ${id}, ',')`)
                })
        }

        // 去重
        let query = '%,' + id + ',' + id + ',%'
        let p = 1
        while (p) {
            p = await mysql('problem')
                .where('course', 'like', query)
                .update({
                    'course': mysql.raw(`REPLACE(course, ',${id},${id},', ',${id},')`)
                })
        }

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
    const { title, id } = ctx.request.body
    const course = await mysql('problems_course').where('id', '=', id).delete()

    ctx.body = {
        'state': 0,
        'msg': "删除课程成功",
        'code': 0
    }
}
async function courseAddProblem(ctx) {
    const { problem_id, course_id } = ctx.request.body
    let query = '%,' + course_id + ',%'
    let p = await mysql('problem')
        .where('course', 'like', query)
        .andWhere({
            problem_id: problem_id
        })
    if (p.length) {
        ctx.body = {
            'state': 1,
            'msg': "该题目已存在",
            'code': 0
        }
    } else {
        let res = await mysql('problem')
            .where({
                problem_id: problem_id
            })
            .update({
                'course': mysql.raw(`CONCAT(course, ${course_id}, ',')`)
            })
        ctx.body = {
            'state': 0,
            'msg': "增加成功",
            'code': 0
        }
    }
}
async function courseDeteleProblem(ctx) {
    const { problem_id, course_id } = ctx.request.body

    let p = await mysql('problem')
        .where({
            problem_id: problem_id
        })
        .update({
            'course': mysql.raw(`REPLACE(course, ',${course_id},' , ',')`)
        })
    ctx.body = {
        'state': 0,
        'msg': "成功将题目从课程中删除",
        'code': 0
    }
}

module.exports = {
    course,
    courseAdd,
    courseDetele,
    courseAddProblem,
    courseDeteleProblem
}