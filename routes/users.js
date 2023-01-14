const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const usersModel = require('../model/users')
const studentsModel = require('../model/students')
const instructorsModel = require('../model/instructors')

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

module.exports = router;
