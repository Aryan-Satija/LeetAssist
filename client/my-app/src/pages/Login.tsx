import React, { useState } from "react";
import axios, {AxiosError} from "axios";
import ConfettiExplosion from "../components/background";
import { toast } from 'react-toastify';
import "../index.css"
interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const base = "http://127.0.0.1:5173"
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState<Boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading("Please Wait");
    try {
      const response = await axios.post(`${base}/auth/login`, formData)
      toast.update(id, {render: "Task successful", type: "success", isLoading: false, autoClose: 3000})
      setSubmitted(true)
    } catch (error: unknown) {
      if(axios.isAxiosError(error)){
        toast.update(id, {render: error?.response?.data?.message || 'Something went wrong', type: "error", isLoading: false, autoClose: 3000})
      }
      else{
        toast.update(id, {render: 'Something went wrong', type: "error", isLoading: false, autoClose: 3000})
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {
          submitted && 
          <ConfettiExplosion/>
        }
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              autoComplete="none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              autoComplete="none"
            />
          </div>
          <div>
            <button
                type="submit"
                className="buttonlight"
            >
              <span>
                Login
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage