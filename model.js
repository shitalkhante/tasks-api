const mongo = require("mongoose");

const taskSchema = new mongo.Schema({
    title:String,
    is_completed:Boolean
})

module.exports = mongo.model("task",taskSchema);