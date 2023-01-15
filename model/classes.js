const mongoose = require('mongoose')
mongoose.set("strictQuery", false)
const dbUrl = 'mongodb://0.0.0.0:27017/EnrollmentDB'
mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=> console.log(err))
const classesSchema = mongoose.Schema({
    title:String,
    description:String,
    instructor:String,

    class_id:String
})
const classesModel = mongoose.model('classes', classesSchema)
module.exports = classesModel
module.exports.getClasses = function(callback, limit){
    classesModel.find(callback).limit(limit)
}

module.exports.saveNewClass = function(newClass, callback){
    newClass.save(callback)
}