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
    class_id:String,
    lesson:[{
        lesson_number: Number,
        lesson_title: String,
        lesson_body: String
    }],
    image_url:String
})
const classesModel = mongoose.model('classes', classesSchema)
module.exports = classesModel
module.exports.getClasses = function(callback, limit){
    classesModel.find(callback).limit(limit)
}
module.exports.saveNewClass = function(newClass, callback){
    newClass.save(callback)
}
module.exports.addLesson = (info, callback)=>{
    class_id = info['class_id']
    lesson_number = info['lesson_number']
    lesson_title = info['lesson_title']
    lesson_body = info['lesson_body']

    const query = {class_id: class_id}
    classesModel.findOneAndUpdate(query, {$push:{"lesson":{ lesson_number:lesson_number,
                                                            lesson_title: lesson_title,
                                                            lesson_body: lesson_body }}}
                                        , { save:true, upsert:true }, callback)
}

module.exports.getClassID = (class_id, callback)=>{
    let query = {class_id: class_id}
    classesModel.findOne(query, callback)
}
