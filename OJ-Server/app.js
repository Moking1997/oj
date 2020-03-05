const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

const app = new Koa()

const router = require('./routes')
app.use(bodyParser())

app.use(async (ctx, next) => {

    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
})

app.use(router.routes())

app.listen(config.port, () => {
    console.log(`server is started at port  ${config.port}`)
})
