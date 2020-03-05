const { mysql } = require('../../mysql')

module.exports = async (ctx) => {
    const catalogs = await mysql('catalogs').select()

    ctx.body = {
        'catalogs': catalogs,
    }
}