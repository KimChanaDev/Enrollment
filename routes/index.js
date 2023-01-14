const exp = require('constants')
const express = require('express')
const router = express.Router()
const classesModel = require('../model/classes')

router.get('/', (req,res)=>{
    classesModel.getClasses((err,classes)=>{
        res.render('index.ejs', { classes:classes })
    })
})

module.exports = router
