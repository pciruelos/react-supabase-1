import React from 'react'
import {useTask} from '../context/TaskContext'


const TaskCard = ({taski}) => {
const {deleteTask, updatedTask} = useTask()

const handleDelete = () => { deleteTask(taski.id) };

const handleToggleDone = () => { 
  updatedTask(taski.id, {done: !taski.done})
};

  return (
        
        <li>
            <div className='bg-white p-2 m-2 rounded shadow-xl'>
           <div><p className='font-bold inline'>{taski.name}</p><p className='inline'> - {JSON.stringify(taski.done)}</p></div>
           <div className='flex justify-between'>
            <button onClick={handleDelete} className='bg-red-600 py-1 px-2 mx-auto rounded-sm text-white'>Delete</button>
            <button onClick={handleToggleDone} className='bg-blue-600 py-1 px-2 mx-auto rounded-sm text-white'>Done</button>
           </div>
        </div>
        </li>
        
  )
}

export default TaskCard