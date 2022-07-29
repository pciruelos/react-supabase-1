import React,{useState} from 'react'
import {useTask} from '../context/TaskContext'

const TaskForm = () => {
    const [taskName, setTaskName] = useState('')
    const {createTask, adding} = useTask();

    const handleInputchange = (e) => { 
        setTaskName(e.target.value)
     };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        createTask(taskName);
        setTaskName('');
      };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='taskname' placeholder='Write a Task' onChange={handleInputchange} className="py-2 px-4 rounded mx-auto block" value={taskName}/>
        <button className="bg-green-300 py-2 px-4 block mt-2 mx-auto rounded-sm" disabled={adding}>
          {adding ? 'Adding...' : 'Add'}
        </button>
    </form>
  )
}

export default TaskForm