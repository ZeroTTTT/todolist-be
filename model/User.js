const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

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

//이함수는 프론트엔드에서 백엔드로 보낼때 항상 호출이될것이다
//그래서 항상 패스워드를 빼고 보낼것이다
userSchema.methods.toJSON = function () {
    const obj = this._doc
    delete obj.password; 
    return obj
};

//토큰을 만든다는건 유저와 굉장히 관련이 있으니까
//관련이 있는함수를 관련있는 모델과 함께 적용시켜서 정의할수있다.
//userSchema에 필드뿐만아니라 메서드를 더할거다
userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this.id}, JWT_SECRET_KEY, {expiresIn:'1d'}); //this 이 유저의라는뜻
    return token;
};

//mongoose는 모델을 만들어주는 역할을 한다.
//이거는 맨마지막에 실행되어야 하는것같다 userSchema.methods.generateToken 위에 코딩해놓으니까
//generateToken이 제대로 작동하지 않았다
const User = mongoose.model("User", userSchema) 

module.exports = User;