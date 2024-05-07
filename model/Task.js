const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
}, 
    {timestamps: true} //timestamps 옵션은 언제 생성되었는지 자동생성
) 

//mongoose는 모델을 만들어주는 역할을 한다.
const Task = mongoose.model("Task", taskSchema) 

module.exports = Task;