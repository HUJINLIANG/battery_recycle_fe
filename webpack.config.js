/**
 * Created by kennyhu on 2018/4.
 */
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./webpack.config.prod')
}else{
    module.exports = require('./webpack.config.dev')
}