const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const { name } = require('./package');
const openInEditor = require('launch-editor-middleware')
module.exports = {
    productionSourceMap: false, //生产环境关闭sourceMap
    lintOnSave: false, //关闭eslint检查
    outputDir: 'dist', //build的输出目录
    publicPath:'/',
    devServer: {
        hot: true,
        // 监听端口
        // host: process.env.VUE_APP_HOST,
        port: process.env.VUE_APP_PORT, // 在.env中VUE_APP_PORT=7788，与父应用的配置一致
        // 关闭主机检查，使微应用可以被 fetch
        disableHostCheck: true,
        // 配置跨域请求头，解决开发环境的跨域问题
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        before (app) {
            // 指定在那种编辑器中打开组件
            app.use('/__open-in-editor', openInEditor('code'))
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                Common_WEB: path.resolve(__dirname, 'src/Common_WEB'),
                libs: path.resolve(__dirname, 'src/libs'),
                '~': path.resolve(__dirname, 'public'),
                pages: path.resolve(__dirname, 'src/views/pages'),
                baseService:path.resolve(__dirname, 'src/views/baseService'),
            }
        },
        output: {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: `${name}-[name]`,
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            libraryTarget: 'umd',
            // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
            jsonpFunction: `webpackJsonp_${name}`
        },
        module: {
            rules: [
              // ... 其他规则
              {
                test: /\.ts$/,
                use: { loader: 'worker-loader' },
                include: [path.resolve(__dirname, 'src/canvasEditor/worker/works')],
                exclude: /(node_modules)/
              }
            ]
          },
    },
    chainWebpack: config => {
        config.plugins.delete('optimize-css');
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            options.compilerOptions.whitespace = 'preserve'; //保留内联元素之间的空格
            return options;
        })
    },
    css: {
        loaderOptions: {
            scss: {
                // 全局sass变量
                //sass-loader 8.0.0以前版本 , v8 - prependData, v10+ - additionalData
                // prependData: `@import "libs/subCommon/scss/variable.scss";`
            }
        }
    }
};
