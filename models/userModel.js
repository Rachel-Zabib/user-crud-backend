const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{ type: String, default: "" },
    email:{ type: String, default: "" },
    dragons:{  
        type:Number,
        validate : {
            validator : Number.isInteger,
            message   : 'dragons is not an integer value'
        },
        default: 0 
    },
    disabled:{
        type:Boolean,
        default:false  
    }
},{ versionKey: false});


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;