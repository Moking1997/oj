const { mysql } = require('../../mysql')
const fs = require('fs');

async function problme(ctx) {
    let { id = 1006 } = ctx.request.query
    const data = await mysql('problem').where({
        problem_id: id
    })

    ctx.body = {
        'data': data,
        'code': 0
    }
}
async function problmes(ctx) {
    let {
        search = '',
        catalog = 0,
        course = 0,
        tag = 0,
        type = '',
        currentPage = 1,
        limit = 10,
        personal = 0
    } = ctx.request.query
    let offset = (currentPage - 1) * limit;
    catalog = '%,' + catalog + ',%'
    course = '%,' + course + ',%'
    tag = '%,' + tag + ',%'
    type = '%' + type + '%'
    search = '%' + search + '%'
    const total = await mysql('problem').where('tags', 'like', tag)
        .andWhere('catalogs', 'like', catalog)
        .andWhere('course', 'like', course)
        .andWhere('type', 'like', type)
        .andWhere('title', 'like', search)
        .andWhere('personal', '=', personal)

    const data = await mysql('problem').where('tags', 'like', tag)
        .andWhere('catalogs', 'like', catalog)
        .andWhere('course', 'like', course)
        .andWhere('type', 'like', type)
        .andWhere('title', 'like', search)
        .andWhere('personal', '=', personal)
        .limit(limit)
        .offset(offset)
    // console.log("search", search)
    // console.log("catalog", catalog)
    // console.log("course", course)
    // console.log("tag", tag)
    // console.log("offset", offset)
    // console.log("currentPage", currentPage)
    // console.log("total", total.length)
    // console.log("------")

    ctx.body = {
        'total': total.length,
        'problems': data,
        'code': 0
    }
}

async function problmeAdd(ctx) {
    const {
        score = 0,
        source = "",
        description = "",
        input = "",
        output = "",
        sample_input = "",
        sample_output = "",
        title = '',
        catalogs = ',0,',
        tags = ',0,',
        type = '',
        personal = 0
    } = ctx.request.fields
    console.log(ctx.request.fields)
    const id = await mysql('problem').insert({
        'score': score,
        'source': source,
        'description': description,
        'input': input,
        'output': output,
        'sample_input': sample_input,
        'sample_output': sample_output,
        'title': title,
        'catalogs': catalogs,
        'tags': tags,
        'type': type,
        'personal': personal
    })
    let fileState = {}
    fs.mkdir("upload/" + id, function (err) {
        if (err) {
            fileState.file = "id目录创建失败"
            return console.error(err);
        }
        console.log("id目录创建成功。");
        fileState.file = "id目录创建成功"
    });
    fs.writeFile('./upload/' + id + "/sample_input.in", `${sample_input}`, function (err) {
        if (err) {
            console.log("sample_input失败", err)
            fileState.sample_input = "sample_input失败"
        } else {
            console.log("sample_input成功");
            fileState.sample_input = "sample_input成功"
        }
    })
    fs.writeFile('./upload/' + id + "/sample_output.in", `${sample_output}`, function (err) {
        if (err) {
            console.log("sample_output失败", err)
            fileState.sample_output = "sample_output失败"
        } else {
            console.log("sample_output成功");
            fileState.sample_output = "sample_output成功"
        }
    })

    if (id) {
        ctx.body = {
            'id': id,
            'state': 0,
            'msg': "新增题目成功",
            'code': 0
        }
    } else {
        ctx.body = {
            'state': 1,
            'msg': "新增题目失败",
            'code': 0
        }
    }

}

async function problmeEdit(ctx) {
    const {
        problem_id,
        score = 0,
        source = "",
        description = "",
        input = "",
        output = "",
        sample_input = "",
        sample_output = "",
        title = '',
        catalogs = ',0,',
        tags = ',0,',
        type = '',
        personal = 0
    } = ctx.request.fields
    const id = await mysql('problem').where({
        problem_id: problem_id
    }).update({
        'score': score,
        'source': source,
        'description': description,
        'input': input,
        'output': output,
        'sample_input': sample_input,
        'sample_output': sample_output,
        'title': title,
        'catalogs': catalogs,
        'tags': tags,
        'type': type,
        'personal': personal
    })
    console.log(id)
    if (id) {
        ctx.body = {
            'id': id,
            'state': 0,
            'msg': "修改题目成功",
            'code': 0
        }
    } else {
        ctx.body = {
            'state': 1,
            'msg': "修改题目失败",
            'code': 0
        }
    }

}

async function problmeDetele(ctx) {
    const { problem_id } = ctx.request.fields
    const problem = await mysql('problem').where('problem_id', '=', problem_id).delete()

    ctx.body = {
        'problem': problem,
        'state': 0,
        'msg': "删除知识点成功",
        'code': 0
    }
}

module.exports = {
    problme,
    problmes,
    problmeAdd,
    problmeEdit,
    problmeDetele
}