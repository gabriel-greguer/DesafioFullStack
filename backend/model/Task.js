const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
        title: String,
        description: String,
        duration: String,
        date:{type:Date}
    },{timestamps:true}
)


const Task = mongoose.model('Task',taskSchema)

module.exports = Task