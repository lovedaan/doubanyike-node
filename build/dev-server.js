require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var request = require('request')
var proxyMiddleware = require('http-proxy-middleware')
var proxy = require('express-http-proxy')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
//console.log(proxyTable);
var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
//console.log(Object.keys(proxyTable));
// proxy api requests
/*Object.keys(proxyTable).forEach(function (context) {
   // console.log(context);
  var options = proxyTable[context]
  /!*if (typeof options === 'string') {
    options = { target: options }
  }*!/
  var urlPath = '^'+context;
    console.log(urlPath);
  //app.use(proxyMiddleware(options.filter || context, options))
    app.use(context, proxyMiddleware({
        target: options,
        changeOrigin: true,
        pathRewrite : {
            urlPath : ''
        }
    }));
})*/
//获取当前日期时间
var nowDate = function () {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    if(m<9){
        m = '0'+m;
    }
    if(d <9){
        d = '0' + d;
    }
    /*console.log('年：'+y+',月：'+m+',日：'+d);
    console.log(y+'-'+m+'-'+d);*/
    return y+'-'+m+'-'+d;
}
//用node后端请求豆瓣接口，再中转给前端调用，解决跨域问题
//今日一刻(即使当前的数据)内容数据接口


//往期内容的接口，就是日期往前一天
/*app.use('/today', proxyMiddleware({
    target: 'https://moment.douban.com/api/stream/date/'+ nowDate()+'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6',
    changeOrigin: true,
    pathRewrite : {
        '^/today' : ''
    }
}));*/

  /*app.use('/today', proxyMiddleware({
      target: 'https://moment.douban.com/api/stream/date/'+ nowDate()+'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6',
      changeOrigin: true,
      pathRewrite : {
          '^/today' : ''
      }
  }));*/
//今日的内容，往期内容就是今天之前的时间，共用一个接口
app.get('/today',function(req,res){
    console.log(req.param('date'));
    var date = req.param('date');
    request('https://moment.douban.com/api/stream/date/'+ date+'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6',function (error, response, body) {
        //console.log(response);
        res.send(body);
    });

});

app.get('/postcontent',function(req,res){
    console.log(req.param('date'));
    var postId = req.param('id');
    request('https://moment.douban.com/post/'+postId+'/?douban_rec=1',function (error, response, body) {
        //console.log(response);
        res.send(body);
    });

});

//热门作者推荐，全部作者，分页
app.get('/author',function(req,res){
    //console.log(req.param('date'));
    var recType = req.param('type');
    var count = req.param('count');
    //查看当前作者的主页，需要接受当前作者id
    var authorId = req.param('authorid');
    if(authorId){
        var url = 'https://moment.douban.com/api/author/'+authorId+'/posts?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
    }else{
        var url = 'https://moment.douban.com/api/auth_authors/'+recType+'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count='+count+'&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
    }
    request(url,function (error, response, body) {
        //console.log(response);
        res.send(body);
    });

});

//栏目浏览接口
app.get('/columns',function(req,res){
    //查看当前的栏目下的文章列表
    var articleId = req.param('articleid');
    if(articleId){
        var url = 'https://moment.douban.com/api/column/'+articleId+'/posts?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
    }else{
        var url = 'https://moment.douban.com/api/columns?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';
    }
    request(url,function (error, response, body) {
        //console.log(response);
        res.send(body);
    });

});



// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
