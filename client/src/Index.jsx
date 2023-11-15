import React, { useEffect, useState } from 'react'
import Inputfld from './Inputfld'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillCircleFill, BsFillTrashFill } from 'react-icons/bs';
const Index = () => {
    const[todos,settodos]=useState([])
    axios.defaults.withCredentials = true;
    useEffect(()=>{

        axios.get('https://todo-list2-server.vercel.app/Get',{ withCredentials: true })
        .then(result=>settodos(result.data))
        .catch(err=>console.log(err))
    },[])
    const handleEdit=(id)=>{
        axios.put('https://todo-list2-server.vercel.app/update/'+id,{ withCredentials: true })
        .then(result=>{window.location.reload()})  
        .catch(err=>console.log(err))
        


    }
    const handleDelete=(id)=>{
        axios.delete('https://todo-list2-server.vercel.app/delete/'+id,{ withCredentials: true })
        .then(result=>{location.reload()})  
        .catch(err=>console.log(err))
        

    }
    const handleLogout=()=>{
        axios.post('https://todo-list2-server.vercel.app/logout',{ withCredentials: true })
        .then(res=>{ window.location.href = '/login';})
        .catch(err=>console.log("Logout Failed"))
    }
    
   
  return (
    <div className='index'>
        <button onClick={handleLogout}>Logout</button>
        <h2>ToDo List</h2>
        <Inputfld/>
        {   todos.length===0?
            
                <h2>No Records</h2>
            
            :
            todos.map(todo =>(

                <div className='task'>
                    <div className='check' onClick={()=>handleEdit(todo._id)}>
                        {todo.done ?
                        <BsFillCheckCircleFill className='icon' ></BsFillCheckCircleFill>
                        :
                        <BsCircleFill className='icon'/>
                        
                         }
                       
                        
                        <p className={todo.done ?"line":""}>{todo.task}</p>
                    </div>
                    <div>
                        <span><BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/></span>
                       
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Index
