const express = require('express')
const nunjucks = require('nunjucks')
const app = express()
const router = require('./routes/index')
const webSocket = require('./socket')

app.set('view engine','html')

nunjucks.configure('views',{
    express:app,
    watch:true,
})

app.use(router)


webSocket(app.listen(3000,()=>{
    console.log('server start')
}))