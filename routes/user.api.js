//task에 관련된 api는 여기에서 관리하겠다.
const express = require('express');
const router = express.Router();  //express에서 제공하는 라우터 사용
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

//1. 회원가입 endpoint
router.post('/', userController.createUser);

//2. 로그인
router.post('/login', userController.loginWithEmail);

//토큰을 통해 유저 ID빼내고 => 그 ID로 유저 객체를 찾아서 보내주기
//미들웨어적용 authController.authenticate 끝나면 다음 userController.getUser
router.get('/me', authController.authenticate, userController.getUser);

module.exports = router;