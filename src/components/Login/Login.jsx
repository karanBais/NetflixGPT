import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Firebase/Firebase"
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { NETFLIX_BACKGROUND } from "../../Constants";

const Login = () => {
  const [signUp, setSignUp] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();


  const handelSubmit = async (e) => {
    e.preventDefault();
    
    try{
      if(signUp) {
      await  createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
        // alert("Registration Successful!");
        // navigate("/")
      } else{
        await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
        // alert("Login Successful!");
        // navigate("/browse");
      }
    }
    catch(error){
      alert("Login Failed! " + error.message);
      console.error("Login Error:", error);
    }
    
  };
  return (
    <div className="relative w-screen h-screen">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={NETFLIX_BACKGROUND}
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Login Form */}
      <div className="relative z-10 flex justify-center items-center h-full ">
        <form
          onSubmit={handelSubmit}
          className="bg-black bg-opacity-80 text-white px-10 py-12 rounded-md w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-6">
            {signUp ? "Sign Up" : "Sign In"}
          </h1>

          {signUp && (
            <input
            ref={name}
              type="text"
              placeholder="Name"
              className="w-full p-3 mb-4 rounded bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          )}

          <input
          ref={email}
            type="text"
            placeholder="Email or mobile number"
            className="w-full p-3 mb-4 rounded bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          <input
          ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            required
          />

          <button className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-semibold mt-2 mb-4">
            {!signUp ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" />
              Remember me
            </label>
            <p className="hover:underline cursor-pointer">Forgot password?</p>
          </div>

          <p className="text-sm text-gray-400">
            {signUp ? "Already have an account?" : "New to Netflix?"}{" "}
            <span
              onClick={() => setSignUp((prev) => !prev)}
              className="text-white hover:underline cursor-pointer"
            >
              {signUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
