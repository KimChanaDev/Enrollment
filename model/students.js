const mongoose = require('mongoose')
mongoose.set("strictQuery", false)
const dbUrl = 'mongodb://0.0.0.0:27017/EnrollmentDB'
mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=> console.log(err))
const studentsSchema = mongoose.Schema({
    username:String,
    fname:String,
    lname:String,
    email:String
})
const studentsModel = mongoose.model('students', studentsSchema)
module.exports = studentsModel

module.exports.getStudentsByUsername = (userNAME, callback)=>{
    let query={ username: userNAME}
    studentsModel.findOne(query, callback)
}