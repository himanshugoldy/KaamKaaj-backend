const mongoose = require('mongoose');

const {Schema} = mongoose;

const TaskSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('Task',TaskSchema);