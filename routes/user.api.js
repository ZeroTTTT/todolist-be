//task에 관련된 api는 여기에서 관리하겠다.
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')

//1. 회원가입 endpoint
router.post('/', userController.createUser);

module.exports = router;