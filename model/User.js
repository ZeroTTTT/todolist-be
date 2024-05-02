const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, 
    {timestamps: true} //timestamps 옵션은 언제 생성되었는지 자동생성
) 

//mongoose는 모델을 만들어주는 역할을 한다.
const User = mongoose.model("User", userSchema) 

module.exports = User;