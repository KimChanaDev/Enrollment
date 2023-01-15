const express = require('express')
const router = express.Router()
const classesModel = require('../model/classes')

router.post('/register', (req,res)=>{
    const class_name = req.body.class_name
    const class_id = req.body.class_id
    const description = req.body.description
    const instructor = req.body.instructor

    const newClasses = new classesModel({
        class_id: class_id,
        title: class_name,
        description: description,
        instructor: instructor
    })
    
    classesModel.saveNewClass(newClasses, (err, result)=>{
        if(err) throw err
    })
    res.redirect('/instructor/classes')
})

module.exports = router