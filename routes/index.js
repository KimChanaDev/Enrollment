const exp = require('constants')
const express = require('express')
const router = express.Router()
const classesModel = require('../model/classes')

// enSureAuthenticated
// -------------------------------
router.get('/', enSureAuthenticated, (req,res)=>{
    classesModel.getClasses((err,classes)=>{
        res.render('index.ejs', { classes:classes })
    })
})

function enSureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    else{
        res.redirect('/user/login')
    }
  }
// -------------------------------

module.exports = router
