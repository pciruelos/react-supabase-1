import { createContext, useContext,useState } from "react";
import {clientSupabase} from '../supabase/client'

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) { throw new Error('useTask must be used with a taskContextProvider')
  }  
  return context
}

export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTasks = async (done = false) => {
        setLoading(true)

        const user = clientSupabase.auth.user();

        const {error,data} = await clientSupabase.from("tasks").select().eq("userid",user.id).eq("done",done).order("id",{ascending:true});

        if (error) throw error;
        setTasks(data)
        setLoading(false)
    };

    const createTask = async (taskName) => {
        setAdding(true)
        try {
            const user = clientSupabase.auth.user()
            const {error, data} = await clientSupabase.from('tasks').insert({
                name: taskName,
                userid:user.id
            });
            if (error) throw error;

            setTasks([...tasks , ...data])
            
        } catch (error) {
            console.log(error)
        } finally {
            setAdding(false)
        }
    }

    const deleteTask = async (id) => { 
        const user = clientSupabase.auth.user()
        const {error, data} = await clientSupabase.from('tasks').delete().eq('userid',user.id).eq('id',id)

        if (error) throw error;

        setTasks(tasks.filter(task => task.id !== id))
     };

     const updatedTask = async (id, updatedFields) => { 
        const user = clientSupabase.auth.user()
        const {error, data} = await clientSupabase.from('tasks').update(updatedFields).eq('userid',user.id).eq('id',id)

        if (error) throw error;
        console.log(data)

        setTasks(tasks.filter(task => task.id !== id))
      };

  return (<TaskContext.Provider value={{tasks,getTasks,createTask, adding, loading,deleteTask,updatedTask}}>
    {children}
  </TaskContext.Provider>);
};
