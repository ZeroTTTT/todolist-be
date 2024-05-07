const authController = {};
const jwt = require('jsonwebtoken')
require('dotenv').config(); //.env 읽어오기 위한 필수 코드내용
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
authController.authenticate = (req, res, next) =>{
    try{
        const tokenString = req.headers.authorization; // Bearer alskdfjsiodjvcklnf23doinfs
        if (!tokenString) {
            throw new Error('invalid token')            
        }
        const token = tokenString.replace('Bearer ','');
        jwt.verify(token, JWT_SECRET_KEY, (error, payload)=>{
            if(error){
                throw new Error('invalid token');
            }
            // res.status(200).json({ status:'success', userId: payload._id })  // _id를 알았으니까 이걸로 user정보를 가져와야된다. // 그럼 user찾는 작업을 여기에서할까?? 아니! 여기서 하는건 함수의 역할과 다르다// 즉 user.controller에서 하자                
            req.userId = payload._id //req를 더 크게 만들수있다. req에 다음에 넘겨보낼 값 추가한다.
        });
        next();
    } catch(error) {
        res.status(400).json({ status:'fail', message: error.message })
    }

}

module.exports = authController;

