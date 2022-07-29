import React,{useEffect} from "react";
import {clientSupabase} from '../supabase/client'
import {useNavigate} from 'react-router-dom'
import TaskForm from '../components/TaskForm';
import {useTask} from '../context/TaskContext'
import TaskList from '../components/TaskList'

const Home = () => {

  const navigate = useNavigate();

  const {tasks} = useTask();
  console.log(tasks)

  useEffect(() => {
    if (!clientSupabase.auth.user()) {
      navigate('/login')
    }
  }, [navigate]);
  

  return (
    <div className="w-scree h-screen bg-slate-400 flex justify-center mx-auto items-center">
      <div className="mx-auto">
        <h1 className="text-4xl mx-auto px-4 text-center font-bold italic">
          Now, you are<br /> Logged In
        </h1>
        {/* <button className="bg-green-300 py-2 px-4 mt-4 mx-auto rounded-sm flex justify-center">
          <a href="/login">Go To Login</a>
        </button> */}
        <button onClick={() => clientSupabase.auth.signOut()} className="bg-red-600 py-2 px-4 mt-4 mx-auto rounded-sm flex justify-center text-white">
          Logout
        </button>
        <h5 className="text-xl mx-auto px-4 text-center font-bold italic mt-4">
          Add your Tasks here:
        </h5>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
