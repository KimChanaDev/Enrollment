const express = require('express')
const router = express.Router()
const instructorModel = require('../model/instructors')
const classesModel = require('../model/classes')

router.get('/classes', (req,res)=>{
    instructorModel.getInstructorByUsername(req.user.username ,(err, instructor)=>{
        res.render('instructors/add_classes.ejs', {instructor: instructor})
    })
})

router.get('/classes/:id/lesson/add', (req, res)=>{
    res.render('instructors/newlesson.ejs', { class_id: req.params.id })
})
router.post('/classes/:id/lesson/add', (req, res)=>{
    let info = []
    info['class_id'] = req.params.id
    info['lesson_number'] = req.body.lesson_number
    info['lesson_title'] = req.body.lesson_title
    info['lesson_body'] = req.body.lesson_body

    classesModel.addLesson(info, (err, losson)=>{
        if(err){
            console.log(err)
            throw err
        }
    })
    res.redirect('/instructor/classes')
})


module.exports = router