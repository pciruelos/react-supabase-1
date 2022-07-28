import React,{useState} from 'react'
import {clientSupabase} from '../supabase/client'

const TaskForm = () => {
    const [taskName, setTaskName] = useState('')

    const handleInputchange = (e) => { 
        setTaskName(e.target.value)
     };
    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const user = clientSupabase.auth.user()
            const res = await clientSupabase.from('tasks').insert({
                name: taskName,
                userid:user.id
            });
            console.log(res)
        } catch (error) {
            console.log(error)
        }
      };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='taskname' placeholder='Write a Task' onChange={handleInputchange} className="py-2 px-4 rounded mx-auto block"/>
        <button className="bg-green-300 py-2 px-4 block mt-2 mx-auto rounded-sm">
          Add
        </button>
    </form>
  )
}

export default TaskForm