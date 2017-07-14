var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
console.log(config.module.name)
var entries = utils.getEntries('./src/module/**/'+config.module.name+'.js')// 获得入口js文件
var libs=path.resolve(__dirname, '../static/libs')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  //entry: {
  //  app: './src/main.js'
  //},
  entry:entries,
  output: {
    path: config.build.assetsRoot,
    //filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          //name: utils.assetsPath('img/[name].[hash:7].[ext]')
          name: function(path,name) {
            var paths = path.split("/")
            var module = paths[paths.length-2]
            return utils.assetsPath('img/[name]_'+module+'.[ext]')
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          //name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      }
    ]
  },
  plugins:[]
}

var pages = utils.getEntries('./src/module/**/'+config.module.name+'.html',1);

for (var pathname in pages) {
  // 生成html相关配置
  var conf = {
    filename: pathname, // html文件输出路径
    template: pages[pathname],   // 模板路径
    inject: true,                // js插入位置
    minify: {
      //压缩设置
      //removeComments: true,
      //collapseWhitespace: true,
      //removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    // chunksSortMode: 'dependency'
  };
  pathname=pathname.split("/")[1];//去掉views
  if (pathname in webpackConfig.entry) {
    conf.inject = 'body';
    //如果每个html没有进入这里的话，那么全部js将会插入html
    conf.chunks = ['env',pathname, 'vendor'],
      conf.hash = true;
    let temp = pathname
    conf.chunksSortMode = function (chunk1, chunk2) {
      var order = ['vendor','env',temp];
      var order1 = order.indexOf(chunk1.names[0]);
      var order2 = order.indexOf(chunk2.names[0]);
      return order1 - order2;
    }
    conf.moduleName = pathname
    // console.log(config.build.env.NODE_ENV)
    // console.log(config.build.env.NODE_ENV === '\"production\"')
    // if(config.build.env.NODE_ENV === '\"production\"'){
    //   conf.script = ' <script type="text/javascript" src="../../libs/aladdin/env-check.js"></script>'
    // } else {
    //   conf.script = ' <script type="text/javascript" src="../../static/libs/aladdin/env-check.js"></script>'
    //
    // }
    //conf.script = config.script.path

  }
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

const vuxLoader = require('vux-loader')
const vuxConfig= {
  plugins: ['duplicate-style', 'vux-ui',{
    name: 'html-build-callback'
  }
  ]
}

module.exports = vuxLoader.merge(webpackConfig, vuxConfig)
