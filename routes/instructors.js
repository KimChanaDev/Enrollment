const express = require('express')
const router = express.Router()
const instructorModel = require('../model/instructors')

router.get('/classes', (req,res)=>{
    instructorModel.getInstructorByUsername(req.user.username ,(err, instructor)=>{
        res.render('instructors/classes.ejs', {instructor: instructor})
    })
})

module.exports = router