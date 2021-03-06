/**
 * Created by kennyhu on 2018/4.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
    entry:{
        vendor:['vue','vuex','vue-router'],
        bundle1:'./src/index',
        bundle2:'./src/assets/js/qrcode.lib.min.js',
        bundle3:'./src/assets/js/qrcode.js'
    },
    output:{
        path:path.join(__dirname,'public'),
        filename:'[hash:8].[name].js',
        publicPath:'/'
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{warnings:false}
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vender',
            minChunks:Infinity
        }),
        new HtmlWebpackPlugin({
            favicon:path.join(__dirname,'public/favicon.jpg'),
            title:"RE",
            template:path.join(__dirname,'src/index.html'),
            inject:'body',
            hash:false,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
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
            js:'babel!eslint'
        }
    },
    resolve:{
        root:path.resolve(__dirname,'node_modules'),
        extensions:['','.js','.vue','.less']
    }
}