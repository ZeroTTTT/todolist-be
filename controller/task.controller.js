const Task = require("../model/Task");

const taskController = {}; // {} 객체 


//할일을 추가 할 수 있다.
taskController.createTask = async(req, res) => {
    try{
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete})
        await newTask.save();
        res.status(200).json({status:'ok', data:newTask})
    }catch (err) {
        res.status(400).json({status:'fail', error:err})        
    }    
}

//할일 리스트를 볼 수 있다.
taskController.getTask = async(req, res) => {
    try{
        const taskList = await Task.find({}).select('-__v');  //.select('-__v') 이거 빼주세요
        res.status(200).json({status:'ok', data:taskList})
    }catch (err) {
        res.status(400).json({status:'fail', error:err})        
    }    
}

//할일에대해 끝남 안끝남 표시할수있다.
taskController.updateTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        throw new Error("App can not find the task");
      }
      const fields = Object.keys(req.body);
      fields.map((item) => (task[item] = req.body[item]));
      await task.save();
      res.status(200).json({ status: "success", data: task });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

  //4할일을 삭제할수있다
 taskController.deleteTask = async (req, res) => {
    try {
      const deleteItem = await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({ status: "success", data: deleteItem });
    } catch (error) {
      res.status(400).json({ status: "fail", error });
    }
  };

module.exports = taskController;