import React,{useEffect} from 'react'
import {useTask} from '../context/TaskContext'

const TaskList = () => {

    const {tasks, getTasks} = useTask();


    useEffect(() => {
        getTasks()
    }, [])
    
  return (
    <ul>
        {tasks.map( t => (
        
            <li key={t.id}>
                {t.name}
            </li>
            )
        )}
    </ul>
  )
}

export default TaskList

