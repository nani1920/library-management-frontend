/** @format */

import { BiSolidBookOpen } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import postRegister from "../services/postRegister";
import Spinner from "../components/common/Spinner";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      name === "" ||
      role === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      email,
      name,
      password,
      role,
    };

    try {
      setLoading(true);
      const data = await postRegister(userData);
      setErrorMsg("");
      alert("Account Created Successfully, plz login");
      navigate("/login", {
        state: {
          message: "Account created successfully. Please log in.",
        },
      });
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
      <div className="min-h-screen flex flex-col items-center justify-center p-2 ">
        <div className="flex flex-col items-center ">
          <BiSolidBookOpen className="text-blue-900 text-4xl " />
          <h1 className="p-2 text-2xl text-blue-900 font-bold">
            Lumina Library
          </h1>
        </div>
        <div className="px-5 py-5 md:py-10 md:px-10 border border-gray-100  shadow-xl rounded-lg w-full max-w-md ">
          <h1 className="text-3xl font-semibold text-center ">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-400 text-center ">
            Join our Library Community
          </p>
          <form onSubmit={onSubmitForm}>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="py-2 text-sm font-semibold text-gray-700 "
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="font-normal  px-2 outline-none border border-slate-200  rounded-sm w-full max-w-md"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="py-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="font-normal  px-2 outline-none border border-slate-200  rounded-sm w-full max-w-md"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className=" flex items-center gap-2 mt-4">
              <div className=" flex-1">
                <label
                  htmlFor="password"
                  className="py-2 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="font-normal  px-2 outline-none border border-slate-200  rounded-sm w-full max-w-md"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className=" flex-1">
                <label
                  htmlFor="confirm"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm"
                  type="password"
                  className="font-normal  px-2 outline-none border border-slate-200  rounded-sm w-full max-w-md"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="mt-4">
              <div className="py-2 text-sm font-semibold text-gray-700">
                <p>Select your role</p>
                <div className="flex gap-2 mt-2">
                  <label className="border border-slate-200 rounded-lg p-4 cursor-pointer flex items-start gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="member"
                      checked={role === "member"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <div>
                      <h3 className="font-semibold">Member</h3>
                      <p className="text-sm text-gray-500">Borrow Books</p>
                    </div>
                  </label>

                  <label className="border border-slate-200 rounded-lg p-4 cursor-pointer flex items-start gap-2">
                    <input
                      type="radio"
                      name="role"
                      value="librarian"
                      checked={role === "librarian"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <div>
                      <h3 className="font-semibold">Librarian</h3>
                      <p className="text-sm text-gray-500">Manage Library</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2 flex">
              <input
                id="termsAndConditions"
                type="checkbox"
                className="cursor-pointer accent-blue-900  w-3 h-3 flex self-center"
                required
              />
              <label htmlFor="termsAndConditions" className="text-sm p-2    ">
                I agree to the{" "}
                <span className="text-sm font-semibold text-blue-900 cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and Privacy Policy
              </label>
            </div>
            <div className="mt-1">
              <button
                type="submit"
                className="text-white font-semibold bg-blue-900 w-full max-w-md h-10  rounded-lg cursor-pointer flex justify-center items-center gap-1 hover:bg-blue-800 transition"
              >
                Register <FaArrowRight className="text-sm mt-[3px]" />
              </button>
            </div>
            {errorMsg && (
              <div className="mt-2">
                <p className="text-center text-red-700 text-sm font-semibold">
                  {errorMsg} *
                </p>
              </div>
            )}
          </form>
          <hr className="mt-4" />
          <p className="p-2 text-center font-semibold text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-900 font-semibold cursor-pointer"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
