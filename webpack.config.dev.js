/**
 * Created by jialao on 2016/9/15.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
    debug:true,
    entry: {
        bundle1:'./src/index',
        bundle2:'./src/assets/js/qrcode.lib.min.js',
        bundle3:'./src/assets/js/qrcode.js'
    },
    output:{
        path:path.join(__dirname,'public'),
        publicPath:'/',
        filename:'[name].js'
    },
    plugins:[
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon:path.join(__dirname,'public/icon-192.png'),
            manifest:path.join(__dirname,'public/manifest.json'),
            title:"RE",
            template:path.join(__dirname,'src/index.html'),
            inject:true
        }),
        // service worker caching
        new SWPrecacheWebpackPlugin({
            cacheId: 'my-vue-app',
            filename: 'service-worker.js',
            staticFileGlobs: ['public/**/*.{js,html,css}'],
            minify: true,
            stripPrefix: 'public/'
        })
    ],
    module:{
        // preLoaders:[{test:/\.js$/,loader:'eslint-loader',exclude:/node_modules/}],
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue'
            },
            {
                test:/\.js$/,
                loader:'babel',
                exclude:/node_modules/
            },
            {
                test:/\.less$/,
                loader:'style!css!less'
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test:/\.(jpe?g|png|gif)$/,
                loader:'url?limit=10000'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
            }
        ]
    },
    vue:{
        loaders:{
            js:'babel'
        }
    },
    eslint: {
        configFile: './.eslintrc.json'
    },
    resolve:{
        extensions:['','.js','.vue','.less']
    }
}