const express = require('express');
const {newTask,myTask,updateTask,deleteTask} = require('../controllers/task');
const isAuthenticated = require('../middlewares/auth');

const router = express.Router();

router.post("/newTask",isAuthenticated,newTask);
router.get("/myTask",isAuthenticated,myTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

module.exports = router;