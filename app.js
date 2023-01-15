const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const instructorsRouter = require('./routes/instructors')
const classesRouter = require('./routes/classes')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.set('views', path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(session({secret:"keyboard cat", resave:false, saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())
app.get('*', (req, res, next)=>{
    res.locals.user = req.user || null
    next()
})
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/instructor', instructorsRouter)
app.use('/classes', classesRouter)

app.listen(3000,()=>{
    console.log("Started server at port 3000");
})
