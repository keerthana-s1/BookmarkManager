var mongoose = require('mongoose')

module.exports = mongoose.model('User' , {
    email: {type: String ,
    require: true},
    name:{type: String ,
        require: true},
    password : {type: String ,
        require: true}
})