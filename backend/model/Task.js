const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
        title: String,
        description: String,
        duration: String,
        date:Date,
        done:{ type: Boolean, default: false }
    },{timestamps:true}
)


const Task = mongoose.model('Task',taskSchema)

module.exports = Task