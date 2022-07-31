import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { TaskContextProvider } from "./context/TaskContext"; 
import Login from "./pages/Login";
import Home from "./pages/Home";
import Notfound404 from "./pages/Notfound404";
import { clientSupabase } from "./supabase/client";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    clientSupabase.auth.onAuthStateChange((e, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <TaskContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Notfound404 />} />
      </Routes>
    </TaskContextProvider>
  );
};

export default App;
