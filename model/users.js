const mongoose = require('mongoose')
mongoose.set("strictQuery", false)
const dbUrl = 'mongodb://0.0.0.0:27017/EnrollmentDB'
const bcrypt = require('bcryptjs')
mongoose.connect(dbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=> console.log(err))
const usersSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    type:String
})
const usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel
module.exports.saveStudent = function(newUser, newStudent, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash
            newUser.save(callback)
            newStudent.save(callback)
        });
    });
}
module.exports.saveInstructor = function(newUser, newInstructor, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash
            newUser.save(callback)
            newInstructor.save(callback)
        });
    });
}
// Query by ID
module.exports.getUserById = function(id, callback){
    usersModel.findById(id, callback);
}
// Query by username
module.exports.getUserByUsername = function(username, callback){
    const query = { username: username}
    usersModel.findOne(query, callback)
}
// compare password
module.exports.comparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, (err, isMatch)=>{
        callback(null, isMatch)
    })
}