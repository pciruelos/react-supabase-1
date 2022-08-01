import React,{useEffect} from 'react'
import {useTask} from '../context/TaskContext'
import TaskCard from './TaskCard';

const TaskList = ({done = false}) => {

    const {tasks, getTasks, loading} = useTask();


    useEffect(() => {
        getTasks(done)
    }, [done])
    
  function renderTasks() {
    if (loading) {
        return <p>loading...</p>
    } else if (tasks.length === 0) { 
        return <p>no task found</p>  
    } else {
        return (
            <ul>
                {tasks.map( t => <TaskCard taski={t} key={t.id}/>
                )}
            </ul>
          )
    }
  }
  return <div>
    {renderTasks()}
  </div>

  
}

export default TaskList

