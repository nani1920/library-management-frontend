/** @format */

import { BiSolidBookOpen } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import postLogin from "../services/postLogin";
import Spinner from "../components/common/Spinner";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }
    const userData = {
      email,
      password,
    };
    try {
      setErrorMsg("");
      setLoading(true);
      const data = await postLogin(userData);
      const { token } = data;
      alert("User LoggedIn Successfully");
      localStorage.setItem("LibraryAuthToken", token);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Spinner />;
  return (
    <>
      <div className="min-h-screen p-2 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <BiSolidBookOpen className="text-blue-900 text-4xl " />
          <h1 className="p-2 text-2xl text-blue-900 font-bold">
            Lumina Library
          </h1>
        </div>
        <div className="p-10 w-full max-w-md border-2 border-slate-100 shadow-lg rounded-lg ">
          <div className="text-center">
            <h1
              className="font-semibold text-3xl text-center 
              text-gray-700"
            >
              Welcome Back!
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Login to continue to Lumina Library
            </p>
          </div>

          <form onSubmit={onSubmitForm}>
            <div className="mt-4">
              <label htmlFor="email" className="block font-semibold text-sm">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="font-medium  px-2 outline-none border border-slate-200  rounded-sm w-full max-w-md"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block font-semibold text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="font-medium px-2 outline-none border border-slate-200  rounded-sm w-full max-w-md"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="font-semibold bg-blue-900 text-white w-full h-8 rounded-md cursor-pointer hover:bg-blue-800 transition 
                flex justify-center items-center gap-1"
              >
                Login <FaArrowRight className="text-sm mt-[2px]" />
              </button>
            </div>
            {errorMsg && (
              <div className="mt-2">
                <p className="text-sm text-center text-red-800 font-semibold">
                  {errorMsg} *
                </p>
              </div>
            )}
          </form>
          <hr className="mt-4" />
          <p className="p-2 text-center font-semibold text-sm text-gray-400">
            new user?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-900 cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
