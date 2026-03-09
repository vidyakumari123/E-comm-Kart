import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, createUserAsync } from "../authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  return (
    <>
      {user && <Navigate to="/" replace />}
      <div className="min-h-screen flex">
        {/* Left visually engaging side */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 overflow-hidden text-white flex-col justify-center px-16 xl:px-24">
          <div className="absolute inset-0 z-0 animate-[pulse_10s_ease-in-out_infinite]">
            <img 
              src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80" 
              alt="Background" 
              className="object-cover w-full h-full opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-600/40 to-pink-600/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-indigo-900/30"></div>
          </div>
          <div className="relative z-10 max-w-lg transition-all duration-1000 ease-out transform translate-y-0 opacity-100 animate-[pulse_2s_ease-in-out_1]">
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-6">
              Join the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                ShopKart
              </span> Community
            </h1>
            <p className="text-lg xl:text-xl text-purple-100 font-medium mb-10 leading-relaxed max-w-md">
              Create an account to track your orders, save your favorite items, and access exclusive member-only deals.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8 text-sm font-semibold text-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-800/50 flex items-center justify-center shrink-0">✨</div>
                Exclusive Deals
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-800/50 flex items-center justify-center shrink-0">🚚</div>
                Faster Checkout
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-800/50 flex items-center justify-center shrink-0">📦</div>
                Order Tracking
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-800/50 flex items-center justify-center shrink-0">❤️</div>
                Wishlist
              </div>
            </div>
          </div>
        </div>

        {/* Right form side */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-white">
          <div className="mx-auto w-full max-w-sm lg:max-w-md transition-all duration-700 ease-out transform translate-y-0 opacity-100">
            <div className="mb-10 text-center lg:text-left transition-all duration-700 ease-out transform translate-y-0 opacity-100">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="mx-auto lg:mx-0 h-12 w-auto mb-6 hover:scale-110 transition-transform duration-300"
              />
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
                Create a new account
              </h2>
              <p className="text-sm text-gray-500">
                Enter your details to register and get started.
              </p>
            </div>

            <form
              noValidate
              className="space-y-5"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: 'user'
                  })
                );
              })}
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
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Password
                </label>
                <div>
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number`,
                      },
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <span className="mr-1">⚠️</span> {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Confirm Password
                </label>
                <div>
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value, formValues) =>
                        value === formValues.password || "Passwords do not match",
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="block w-full rounded-xl border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 sm:text-sm bg-gray-50/50 hover:bg-white"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <span className="mr-1">⚠️</span> {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/30 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-10 relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-500">Already joined?</span>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              <Link
                to="/login"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                Log in to your account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
