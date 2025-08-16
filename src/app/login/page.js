"use client";
import React, { useState } from "react";
import { auth } from "../../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),
    phone: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const handleGoogleSignIn = async () => {
    setError("");
    setMessage("");
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user.displayName || user.email}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        setMessage("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        setMessage("Account created successfully!");
      }
      reset();

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    const emailValue = getValues("email");
    if (!emailValue) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, emailValue);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 mt-[101px] md:mt-[128px]">
      <div
        className="w-full max-w-md h-[600px]"
        style={{ perspective: "1500px" }}
      >
        <div
          className={`relative w-full h-full duration-700 transition-transform transform ${
            isLogin ? "rotate-y-0" : "rotate-y-180"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute w-full h-full bg-white rounded-2xl shadow-2xl p-10 flex flex-col justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-1">Login</h2>
            <div className="mb-1 text-sm h-6">
              {error && <p className="text-red-600">{error}</p>}
              {message && <p className="text-green-600">{message}</p>}
            </div>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="bg-gray-200 font-semibold hover:bg-gray-300 py-4 rounded-lg transition disabled:opacity-50 mb-4 flex items-center justify-center gap-2"
            >
              <Image
                src="/google.png"
                alt="Google icon"
                width={20}
                height={20}
              />
              Continue with Google
            </button>
            <div className="flex items-center mt-1 mb-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <div className="relative flex">
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    {...register("email")}
                  />
                  <div className="h-2">
                    {errors.email && (
                      <p className="text-red-400 text-xs text-right">
                        {errors.email.message}
                      </p>
                    )}
                  </div>{" "}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    {...register("password")}
                  />
                  <div className="h-2">
                    {" "}
                    {errors.password && (
                      <p className="text-red-400 text-xs text-right">
                        {errors.password.message}
                      </p>
                    )}
                  </div>{" "}
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <label className="flex gap-2 items-center">
                    <input type="checkbox" />
                    Remember me
                  </label>
                  <button
                    className="text-red-500 hover:underline"
                    type="button"
                    onClick={handleResetPassword}
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-2 transition disabled:opacity-50"
                >
                  Login
                </button>
              </form>
            </div>
            <div className="text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setMessage("");
                  reset();
                }}
                className="text-red-500 underline cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </div>
          <div
            className="absolute w-full h-full bg-white rounded-2xl shadow-2xl p-10 flex flex-col justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-1">
              Create Account
            </h2>
            <div className="mb-1 text-sm h-6">
              {error && <p className="text-red-600">{error}</p>}
              {message && <p className="text-green-600">{message}</p>}
            </div>
            <div className="relative flex">
              <form
                className="flex flex-col gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="auth-input"
                    {...register("fullName")}
                  />
                  <div className="h-2">
                    {errors.fullName && (
                      <p className="text-red-400 text-xs text-right">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>{" "}
                </div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="auth-input"
                  {...register("phone")}
                />
                <input
                  type="text"
                  placeholder="Delivery Address"
                  className="auth-input"
                  {...register("address")}
                />
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    {...register("email")}
                  />
                  <div className="h-2">
                    {errors.email && (
                      <p className="text-red-400 text-xs text-right">
                        {errors.email.message}
                      </p>
                    )}
                  </div>{" "}
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    {...register("password")}
                  />
                  <div className="h-2">
                    {errors.password && (
                      <p className="text-red-400 text-xs text-right">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="auth-input"
                    {...register("confirmPassword")}
                  />
                  <div className="h-2">
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs text-right">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>{" "}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 mt-2 rounded-lg transition disabled:opacity-50"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setMessage("");
                  reset();
                }}
                className="text-red-500 underline cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
