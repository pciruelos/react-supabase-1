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

    const getTasks = async (done = false) => {

        const user = clientSupabase.auth.user();

        const {error,data} = await clientSupabase.from("tasks").select().eq("userid",user.id).eq("done",done).order("id",{ascending:true});

        if (error) throw error;
        setTasks(data)
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

  return (<TaskContext.Provider value={{tasks,getTasks,createTask, adding}}>
    {children}
  </TaskContext.Provider>);
};
