const mongoose = require('mongoose')
mongoose.set("strictQuery", false)
const dbUrl = 'mongodb://0.0.0.0:27017/EnrollmentDB'
mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=> console.log(err))
const instructorsSchema = mongoose.Schema({
    username:String,
    fname:String,
    lname:String,
    email:String,

    classes:[{     
        class_id:String,
        class_title:String,
    }]
})
const instructorsModel = mongoose.model('instructors', instructorsSchema)
module.exports = instructorsModel

module.exports.getInstructorByUsername = function(userNAME, callback){
    let query={ username: userNAME}
    instructorsModel.findOne(query, callback)
}

module.exports.register = function(info, callback){
    const instructor_user = info['instructor_user']
    const class_id = info['class_id']
    const class_title = info['class_title']
    
    const query = { username: instructor_user }
    instructorsModel.findOneAndUpdate( query, {$push:{"classes":{class_id:class_id, class_title:class_title}}}, {safe:true, upsert:true},  callback) 
}
