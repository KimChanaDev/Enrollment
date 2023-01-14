const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const path = require('path')

app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/user', usersRouter)

app.listen(3000,()=>{
    console.log("Started server at port 3000");
})
