// const User = require('../model/User')
// const User = require('../model/User')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const userController = {}; // {} 객체 


userController.createUser = async(req, res) => {
    try{
        const { email, name, password } = req.body;
        // const user = await User.findOne({email:email})
        const user = await User.findOne({email}) //자바스크립트 심플문법 적용
        if (user) {
            throw new Error('이미 가입이 된 유저입니다.')
        }
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        // console.log('hash',hash)
        const newUser = new User({email, name, password:hash})
        await newUser.save()
        res.status(200).json({status:'success'})
    }catch (err) {
        res.status(400).json({status:'fail', error:err})        
    }    
}


module.exports = userController;