var mongoose = require('mongoose')

module.exports = mongoose.model('Bookmark' , {
    name: String,
    Url: String,
    Category: String,
    OwnerID: String,
    favourite : {
       type: Boolean,
       default:false
    },
    tags:[{
        tag:{
            type:String
        }
    }]
})