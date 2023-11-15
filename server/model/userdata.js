const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const userSchema= new mongoose.Schema({
    user :String,
    email: String,
    password: String

})
userSchema.methods.generateAuthToken=async function(){
    try{
        const token=await jwt.sign({email:this.email},'thisisamernstackprojectabcdefghijklmnopqrstuvwxyz')
        console.log(token)
        return token
    }
    catch(err){
        console.log(err)
    }
}
const usermodel=mongoose.model('register',userSchema)
module.exports=usermodel