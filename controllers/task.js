const Task = require('../models/task');


class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}






const newTask = async (req,res,next)=>{

    try {
        const { title, description } = req.body;
    
        await Task.create({
          title,
          description,
          user: req.user,
        });
    
        res.status(201).json({
          success: true,
          message: "Task added Successfully",
        });
      } catch (error) {
        next(error);
      }

}

const myTask = async (req,res,next)=>{
    try {
        const userid = req.user._id;
        const tasks = await Task.find({user:userid});
        res.status(200).json({
            success:true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);


        if (!task) return next(new ErrorHandler("Task not found", 404));


        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
        });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await Task.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return next(new ErrorHandler("Task not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Task Deleted",
        });
    } catch (err) {
        // Handle any error that might occur during the deletion process
        return next(new ErrorHandler("Error Deleting Task", 500));
    }
};

module.exports = {newTask,myTask,updateTask,deleteTask};