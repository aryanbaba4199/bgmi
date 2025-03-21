import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaMobile, FaIdBadge } from "react-icons/fa";
import { posterFunction, userApi } from "../../Api";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


const defaultFormData = {
  name: "",
  email: "",
  password: "",
  bgmiId: "",
  mobile: "",
  device: "",
};

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
const navigate = useNavigate()

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = isSignUp ? formData : {email : formData.email, password : formData.password}
    try{
        const res = await posterFunction(isSignUp ? userApi.signUp :  userApi.logIn, data)
        localStorage.setItem('token', res)
    
        Swal.fire({
            title : 'Success', 
            text : 'Authenticaiton Successful',
            icon : 'success',
            timer : 6000,
        })
        navigate('/home')
    }catch(e){
        Swal.fire({
            title : 'Failed', 
            text : e,
            icon : 'error',
            timer : 6000,
        })
        console.error('Error in submission : ',  e)
    }

    // TODO: Send `formData` to backend API
  };

  useEffect(()=>{
    const isLoggedIn = localStorage.getItem('token');
    if(isLoggedIn){
        navigate('/home')
    }
  })

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96">
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-10 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          {isSignUp && (
            <div className="relative">
              <FaIdBadge className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="bgmiId"
                placeholder="BGMI ID"
                value={formData.bgmiId}
                onChange={handleChange}
                className="w-full px-10 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-10 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {isSignUp && (
            <div className="relative">
              <FaMobile className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-10 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-10 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-blue-400 cursor-pointer ml-2 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
