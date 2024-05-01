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
    