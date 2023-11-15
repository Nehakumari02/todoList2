const mongoose=require('mongoose')
const TodoSchema=new mongoose.Schema({
    task: String,
    done:{
        type:Boolean,
        default:false
    }
})
const userSchema=new mongoose.Schema({
    useremail:String,
    todos:[TodoSchema]
})
const todoModel=mongoose.model("todosff", userSchema)
module.exports=todoModel