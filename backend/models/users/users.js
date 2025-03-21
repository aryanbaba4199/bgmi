const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        require : true, 
    }, 
    email : {
        type : String, 
        require : true,
        unique : true,
    }, 
    password : {
        type : String, 
        require : true, 
    },
    mobile : {
        type : String, 
        require : true, 
    }, 
    userType : {
        type : String, 
        default : 'user', 
    },
    bgmiId : String, 
    bgmiName : String,
    device : String, // collecting this for user backgroud
    wins : {
        type : Number,
        default : 0, 
    },
    participated : {
        type : Number, 
        default : 0
    }, 
    mom : {
        type : Number, 
        default : 0
    }, 
    teamMembers : []

})

module.exports = mongoose.model('User', userSchema); 