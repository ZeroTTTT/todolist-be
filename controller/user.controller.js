// const User = require('../model/User')
// const User = require('../model/User')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
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

userController.loginWithEmail=async(req,res)=>{
    try{
       
        //개발자입장에서는?
        //1. 라우터설정
    //2. 이메일 패스워드 정보 읽어오기
    //3. 이메일을 가지고 유저정보 가져오기
    //4. 이 유저에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
    //5. 맞다! 그러면 토큰 발행
    //6. 틀리면 에러메세지 보냄
    //7. 응답으로 유저정보 + 토큰 보냄
        const{ email, password } = req.body
        const user = await User.findOne({email},"-createdAt -updatedAt -__v"); 
        //password도 여기서 뺄수있찌만 이순간에서만 빠지는것보다는 애초에 어떤요청이든지 빼는게 맞으니까 이거는 userSchema에 method로 빼는게 좋다
        if(user){
            const isMath = bcrypt.compareSync(password, user.password); // true
            if(isMath){
                const token = user.generateToken();
                return res.status(200).json({status:'success', user, token})
            }
        }
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
    }catch(error){
        // res.status(400).json({status:'fail', error}) //error오브젝트 그자체가 반환된다....
        res.status(400).json({status:'fail', message: error.message})
    }
};

userController.getUser = async(req, res) => {
    try{
        const {userId} = req //or req.userId 이렇게 req에 저장된 id값 받기        
        const user = await User.findById(userId); //await 안붙이니까 결과값올때까지 못기다려서... 값이 안들어온다.
        console.log('user', user);
        if(!user) {
            throw new Error('can not find user')
        }
        res.status(200).json({status:'success', user})
    } catch(error) {
        res.status(400).json({status:'fail', message: error.message})
    }
}


module.exports = userController;