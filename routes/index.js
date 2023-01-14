const exp = require('constants')
const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('page')
})

module.exports = router
