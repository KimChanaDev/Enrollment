const express = require('express')
const router = express.Router()
const classesModel = require('../model/classes')
const instructorsModel = require('../model/instructors')

router.get('/:id/lesson/view', (req,res)=>{
    classesModel.getClassID(req.params.id, (err, classes)=>{
        res.render('classes/viewlesson.ejs', {classes: classes})
    })
})
router.get('/:class_id/lesson/:lesson_number', (req, res)=>{
    classesModel.getClassID(req.params.class_id, (err, classes)=>{
        let lesson
        for( let i=0; i<classes.lesson.length; i++){
            if(classes.lesson[i].lesson_number == req.params.lesson_number){
                lesson = classes.lesson[i]
            }
        }
        res.render('classes/lesson.ejs', {classes:classes, lesson:lesson})
    })
})

router.post('/register', (req,res)=>{
    const class_name = req.body.class_name
    const class_id = req.body.class_id
    const description = req.body.description
    const instructor = req.body.instructor
    const image_url = req.body.image_url

    const newClasses = new classesModel({
        class_id: class_id,
        title: class_name,
        description: description,
        instructor: instructor,
        image_url:image_url
    }) 
    classesModel.saveNewClass(newClasses, (err, result)=>{
        if(err) throw err
    })
    let info = [];
    info['instructor_user'] = req.user.username
    info['class_id'] = class_id
    info['class_title'] = class_name
    
    instructorsModel.register(info, (err, instructor)=>{
        if(err) throw err
    })
    res.redirect('/instructor/classes')
})

module.exports = router