import React, { useState } from 'react'
import axios from 'axios'
const Inputfld = () => {
  const [task,setTask]=useState()
  const addHandle=()=>{
    axios.post('https://todo-list2-owuun3sl7-nehakumari02s-projects.vercel.app/add',{task:task},{ withCredentials: true })
    .then(result=>{
      location.reload()
    })
    .catch(err=>{console.log(err)})
  }
  return (
    <div className='form1'>
        <input type='txt' placeholder="Enter Task" onChange={(e)=>setTask(e.target.value)}/>
        <button type='butoon' onClick={addHandle}>Add</button>
    </div>
  )
}

export default Inputfld
