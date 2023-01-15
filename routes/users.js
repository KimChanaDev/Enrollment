const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const usersModel = require('../model/users')
const studentsModel = require('../model/students')
const instructorsModel = require('../model/instructors')
const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy

router.get('/register', function(req, res, next) {
    res.render('users/register.ejs')
});
router.post('/register', [
    check('email', 'กรุณาป้อนอีเมล').isEmail(),
    check('username', 'กรุณาป้อน username').not().isEmpty(),
    check('password', 'กรุณาป้อน password').not().isEmpty(),
    check('fname', 'กรุณาป้อนชื่อ').not().isEmpty(),
    check('lname', 'กรุณาป้อนนามสกุล').not().isEmpty(),
  ], (req, res)=>{
    const result = validationResult(req)
    let errors = result.errors
    if(!result.isEmpty()){
      res.render('users/register.ejs', {errors:errors})
    }else{
      const username = req.body.username
      const type = req.body.type
      const fname = req.body.fname
      const lname = req.body.lname
      const email = req.body.email
      const password = req.body.password
      
      const newUser = new usersModel({
        username:username,
        email:email,
        password:password,
        type:type
      })
      if(type === 'student'){
        const newStudent = new studentsModel({
          username:username,
          fname:fname,
          lname:lname,
          email:email
        })
        usersModel.saveStudent(newUser, newStudent, (err,user)=> {
          if(err) throw err
        })
      }else{
        const newInstructor = new instructorsModel({
          username:username,
          fname:fname,
          lname:lname,
          email:email
        })
        usersModel.saveInstructor(newUser, newInstructor, (err,user)=> {
          if(err) throw err
        })
      }
      res.redirect('/')
    }
})

// LOGIN--------------------------------------------------
router.get('/login', function(req, res, next) {
  res.render('users/login.ejs')
});
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/user/login',
  failureFlash: true
}), (req, res)=> {
  req.flash("success", "ลงชื่อเข้าใช้เรียบร้อย")
  let usertype = req.user.type
  res.redirect('/'+usertype+'/classes')
})
passport.serializeUser(function(user,done){
  done(null, user.id)
})
passport.deserializeUser(function(id,done){
  usersModel.getUserById(id, (err,user)=>{
      done(err, user);
  })
})
passport.use(new LocalStrategy(function(username,password,done){ 
  usersModel.getUserByUsername(username, (err,user)=>{
      if(err) throw err
      if(!user){ return done(null, false) }

      usersModel.comparePassword(password, user.password, (err,isMatch)=>{
          if(err) throw err
          if(isMatch){
              return done(null, user)
          } else {
              return done(null, false)
          }
      });
  })
}))
// --------------------------------------------------

// LOGOUT
router.get('/logout', (req, res)=>{
  req.session.destroy((err)=>{
    res.redirect('/user/login')
  });
})

module.exports = router;
