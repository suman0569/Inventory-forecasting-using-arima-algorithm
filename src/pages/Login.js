import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import axios from 'axios';

import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null); // for showing messages (success/error)
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const authCheck = () => {
    setTimeout(() => {
      fetch("http://localhost:4001/api/login")
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Login");
          localStorage.setItem("user", JSON.stringify(data));
          authContext.signin(data._id, () => {
            navigate("/");
          });
        })
        .catch((err) => {
          alert("Wrong credentials, Try again");
          console.log(err);
        });
    }, 3000);
  };

  const loginUser = (e) => {
    e.preventDefault();

    // Cannot send empty data
    if (form.email === "" || form.password === "") {
      alert("Please enter your email and password.");
    } else {
      axios
        .post("http://localhost:4001/api/login", form)
        .then((result) => {
          console.log("User login", result);
          authCheck();
        })
        .catch((error) => {
          console.log("Something went wrong ", error);
          setMessage("Wrong credentials, please try again.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login to Your Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <div className="space-y-4">
            {/* Email Input with Icon */}
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border py-2 px-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-600 sm:text-sm "
                placeholder="Email address"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Password Input with Icon */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-md border py-2 px-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-600 sm:text-sm"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <span
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline cursor-pointer"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot your password?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            {message && <p className="text-red-500 mt-2 text-center">{message}</p>}
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't Have an Account?{" "}
                <Link to="/register" className="hover:underline">
                  Register now
                </Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
