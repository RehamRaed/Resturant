"use client";
import React, { useState } from "react";
import { auth } from "../../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import Image from "next/image";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const { email, password, confirmPassword } = formData;

    if (!email || !password) {
      setError("Please fill email and password");
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage("Account created successfully!");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");
    if (!formData.email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, formData.email);
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
        className="w-full max-w-md h-[600px] perspective"
        style={{ perspective: "1500px" }}
      >
        <div
          className={`relative w-full h-full duration-700 transition-transform transform ${
            isLogin ? "rotate-y-0" : "rotate-y-180"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-2xl p-10 flex flex-col justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-6 ">Login</h2>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="bg-gray-200 font-semibold hover:bg-gray-300 py-4 rounded-lg transition disabled:opacity-50 mb-4 flex items-center justify-center gap-2"
            >
              <Image src="/google.png" alt="Google icon" width={20} height={20} />
              Continue with Google
            </button>

            <div className="flex items-center mt-4 mb-2">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="min-h-[1.5rem]">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              {message && <p className="text-green-600 text-sm">{message}</p>}
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="auth-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
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

            <div className="text-sm text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setMessage("");
                }}
                className="text-red-500 underline cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </div>

          <div
            className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-2xl p-10 flex flex-col justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-6">
              Create Account
            </h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {message && <p className="text-green-600 mb-2">{message}</p>}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="auth-input"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="auth-input"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Delivery Address"
                className="auth-input"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="auth-input"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="auth-input"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="auth-input"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-4 transition disabled:opacity-50"
              >
                Sign Up
              </button>
            </form>
            <div className="text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                  setMessage("");
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
