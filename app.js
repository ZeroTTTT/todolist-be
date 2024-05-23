const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');

require('dotenv').config();
MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

const app = express();
app.use(cors());  // 이 위치가 아래에 있었는데 이때는 에러나더니 const app = express(); 바로아래에 적으니까 에러안난다
app.use(bodyParser.json());
app.use('/api', indexRouter)

// const mongoURI = 'mongodb://localhost:27017/todo-demo'
const mongoURI = MONGODB_URI_PROD;

mongoose    
    //강의는 없지만 이부분을 추가해주어야 정상 작동함  useUnifiedTopology: true 
    // .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })    
    //useNewUrlParser 예전문법 ===> useUnifiedTopology 최신문법
    .connect(mongoURI)    
    .then(()=>{
        console.log('mongoose connected');
    }).catch((err)=> {
        console.log('DB connection fail', err);
    });

    app.listen(process.env.PORT || 5000, ()=>{
        console.log('server on 5000');
    });
    // app.listen(8080, ()=>{
    //     console.log('server on 8080');
    // });
    
    //1. 회원가입
    // 유저가 이메일, 패스워드, 유저이름 입력해서 보냄
    //받은 정보를 저장함 (데이터베이스 모델필요)
    //패스워드를 암호화 시켜서 저장

    //개발자입장에서는?
    //1. 라우터
    //2. 모델 
    //3. 컨트롤러  : 데이터를 저장(이미 가입된 유저 유무, 패스워드 암호화)
    //4. 응답을 보낸다.
    /////////////////////////// index.js -> user.api.js -> user.controller.js -> User.js
    /////////////////////////// route       route          controller            model

    //2. 로그인
    // 이메일 패스워드를 입력해서 보냄
    // 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
    // 없으면 로그인 실패
    //  있다면?? 유저정보 + 토큰
    // 프론트엔드에서는 이 정보를 저장

    //개발자입장에서는?
    //1. 라우터설정
    //2. 이메일 패스워드 정보 읽어오기
    //3. 이메일을 가지고 유저정보 가져오기
    //4. 이 유저에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
    //5. 맞다! 그러면 토큰 발행
    //6. 틀리면 에러메세지 보냄
    //7. 응답으로 유저정보 + 토큰 보냄