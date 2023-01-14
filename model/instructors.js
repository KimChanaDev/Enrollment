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
    email:String
})
const instructorsModel = mongoose.model('instructors', instructorsSchema)
module.exports = instructorsModel
