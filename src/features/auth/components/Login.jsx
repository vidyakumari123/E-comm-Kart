import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAsync, selectError, selectLoggedInUser } from "../authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="min-h-screen flex">
        {/* Left visually engaging side */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 overflow-hidden text-white flex-col justify-center px-16 xl:px-24">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&q=80"
              alt="Background"
              className="object-cover w-full h-full opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-600/40 to-pink-600/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-indigo-900/30"></div>
          </div>
          <div className="relative z-10 max-w-lg">
            <h1 className="text-4xl xl:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Welcome back to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                ShopKart
              </span>
            </h1>
            <p className="text-lg xl:text-xl text-purple-100 font-medium mb-10 leading-relaxed max-w-md">
              Discover the latest trends, exclusive offers, and a seamless shopping experience tailored just for you.
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold text-purple-200">
              <div className="h-px bg-purple-300/30 flex-1"></div>
              <span>Trusted by 10,000+ customers</span>
              <div className="h-px bg-purple-300/30 flex-1"></div>
            </div>
          </div>
        </div>

        {/* Right form side */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-white">
          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            <div className="mb-10 text-center lg:text-left">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto lg:mx-0 h-12 w-auto mb-6"
              />
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                Log in to your account
              </h2>
              <p className="text-sm text-gray-500">
                Please enter your details to access your dashboard.
              </p>
            </div>

            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  checkUserAsync({
                    email: data.email,
                    password: data.password,
                  })
                );
              })}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Email address
                </label>
                <div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <span className="mr-1">⚠️</span> {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-900"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <span className="mr-1">⚠️</span> {error.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Sign In to Account
                </button>
              </div>
            </form>

            <div className="mt-10 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-500">New to our platform?</span>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              <Link
                to="/signup"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
