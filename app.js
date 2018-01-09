const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const request = require('request-promise');

router.get('/', ctx => {
    ctx.render('public/index.html');
});

router.get('/api/get/weather', async ctx => {
    const options = {
        method: `get`
        ,json: true
        ,url: `http://www.sojson.com/open/api/weather/json.shtml`
        ,qs: { 'city': `北京` }
    };
    let res = await request(options);
    ctx.body = res;
});

router.get('/api/get/calendar', async ctx => {
    const options = {
        method: `get`
        ,json: true
        ,url: `http://www.sojson.com/open/api/lunar/json.shtml`
    };
    let res = await request(options);
    ctx.body = res;
});

app.use(bodyParser());
app.use(serve(path.join(__dirname, './public')));
app.use(logger());
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
console.log('Running site at: http://localhost:3000');

