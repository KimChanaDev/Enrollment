const express = require('express')
const router = express.Router()
const studentsModel = require('../model/students')

router.get('/classes', (req, res)=>{
    studentsModel.getStudentsByUsername(req.user.username, (err, student)=>{
        res.render('students/classes.ejs', {student:student})
    })
})

module.exports = router