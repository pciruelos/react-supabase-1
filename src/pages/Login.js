import React, { useState, useEffect } from "react";
import { clientSupabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientSupabase.auth.signIn({
        email: email, //or just email in EMC6
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (clientSupabase.auth.user()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="w-scree h-screen bg-slate-400 flex justify-center mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl mx-auto px-4 text-center font-bold italic">
          Welcome to: <br /> React + Supabase
          <br /> App Testing
        </h1>
        <h5 className="pt-8 pb-2 text-center">Login with Email:</h5>
        <p>you can use <a href="https://10minutemail.com/">10minutemail.com</a>  for testing</p>
        <input
          type="email"
          name="email"
          id="email"
          className="py-2 px-4 rounded mx-auto block"
          placeholder="Inserte your email here"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-green-300 py-2 px-4 block mt-2 mx-auto rounded-sm">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
