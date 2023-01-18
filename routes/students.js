const express = require('express')
const router = express.Router()
const studentsModel = require('../model/students')

router.get('/classes', (req, res)=>{
    studentsModel.getStudentsByUsername(req.user.username, (err, student)=>{
        res.render('students/classes.ejs', {student:student})
    })
})
router.post('/classes/register', (req, res)=>{
    let info = []
    info['student_username'] = req.body.student_username
    info['class_id'] = req.body.class_id
    info['class_title'] = req.body.class_title
    studentsModel.registerClass(info, (err, student)=>{
        if(err){
            console.log(err);
            throw err
        }
        res.redirect('/student/classes')
    })
})

module.exports = router