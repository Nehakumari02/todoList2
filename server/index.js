const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const usermodel=require('./model/userdata')
const todoModel=require('./model/todolist')
const app=express()
app.use(cors({
    
    origin: 'https://todo-list2-oaf5.vercel.app',
    methods: ["GET", "POST","PUT" ,"DELETE"],
    credentials: true,

   

}))

app.use(express.json())
app.use(cookieParser())



mongoose.connect('mongodb+srv://nehapanwal02:5oTCwJdv0fRciEfy@cluster0.veoz76r.mongodb.net/userdata')
const authenticate=async(req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({error:"Token missing"})

    }
    try{
        const userdata=await jwt.verify(token,"thisisamernstackprojectabcdefghijklmnopqrstuvwxyz")
        //console.log(userdata)
        req.userdata=userdata;
        next();

    }
    catch(err){
        return res.status(401).json({error:"Invalid Token"})
    }
}

app.post('/register',async(req,res)=>{
    const {user,email,password}=req.body
    const user1=await usermodel.findOne({email:email})
    if(!user1){
        const newUser=new todoModel({
            useremail:email,
            todos: [],
        })
        await newUser.save()  
        usermodel.create(req.body)
        .then(data=>(res.json(data)))
        .catch(err1=>(res.json(err1)))

    }
    else{
        res.json("email already registered")
    }
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    //req.session.userId = email
    try{
        const user=await usermodel.findOne({email: email})
        if(user){
            if(user.password===password){
                const token=await user.generateAuthToken()
                console.log("user logged in succesfully")
                res.cookie("jwt",token,{
                    expires: new Date(Date.now() + 5000000),
                    httpOnly: true,
                    path: "/",
                    sameSite: "none",
                    secure: true,
                    domain: ".vercel.app"
                })
                //console.log(req.cookies.jwt)
                res.json("Sucess")  
                 
            }
            else{
                res.json("incorrect password")
            }
        }
        else{
            res.json("No recod exists")
        }
    }
    catch(error){
        console.log(error)
    }
})
app.post('/add', async (req, res) => {
    const task = req.body.task;
    const token =await req.cookies.jwt
    //console.log(`the secret key is ${req.cookies.jwt}`);
    if (!token) {
        return res.status(501).json({ error: 'Token missing' });
    } 
    const tempuser=await jwt.verify(token,'thisisamernstackprojectabcdefghijklmnopqrstuvwxyz')

    try {
        console.log(tempuser)
        const user = await todoModel.findOne({ useremail: tempuser.email })
        if (!user) {
            console.log("user not found")
            return res.status(404).json({ error: "User not found" });
            
        }
        else{
            //console.log(user)
            user.todos.push({ task, done: false }); 
            const result = await user.save();
            res.json(result);
            
        }
       
    } catch (err) {
        console.log(err);
    }
});
app.get('/Get',async(req,res)=>{
    const token = req.cookies.jwt
    const tempuser=await jwt.verify(token,'thisisamernstackprojectabcdefghijklmnopqrstuvwxyz')
    
    user=await todoModel.findOne({useremail: tempuser.email})
    
    if(!user){
        res.json(err)
    }
    else{
        const task1=user.todos.map(todo=>({_id: todo._id , task : todo.task, done: todo.done}))
        res.json(task1)
    }
})
app.post('/logout', (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, expires: new Date(0) });
    res.json("success");
  });
app.put('/update/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await todoModel.updateOne(
            {"todos._id": id},
            {$set: {"todos.$.done" :true}})

    }
    catch(err){
        res.json(err)
    }
})
app.delete('/delete/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const result = await todoModel.updateOne({ "todos._id": id },
        { $pull: { todos: { _id: id } } });
        res.json(result);
    } catch (err) {
        res.json(err);
    }
    
})
app.listen(3001,()=>{console.log("server is listening")})
