//task에 관련된 api는 여기에서 관리하겠다.
const express = require('express');

const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller')
const router = express.Router();


/////////////////////////////////////////////////
//강의는 없지만 이부분을 추가해주어야 미들웨어로 인식되어 index.js의 router.use('/tasks', taskApi); 가 정상적을 인식됨.
// router.use((req, res, next) => {
//     console.log('middleware for posts!');
//     next();
//   });
/////////////////////////////////////////////////

// router.post('/',(req,res)=>{
//     res.send('create task');
// });
router.post('/', authController.authenticate,  taskController.createTask);

// router.get('/',(req,res)=>{
//     res.send('get task');
// });
router.get('/', taskController.getTask);

// router.put('/:id',(req,res)=>{
//     res.send('update task');
// });
router.put('/:id', taskController.updateTask);

// router.delete('/:id',(req,res)=>{
//     res.send('delete task');
// });
router.delete('/:id', taskController.deleteTask);

module.exports = router;