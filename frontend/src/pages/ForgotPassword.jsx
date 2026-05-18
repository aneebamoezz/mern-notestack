import React, { useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Button } from "../components/ui/button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message || "Reset link sent to your email");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f4f5f6] via-[#c8cfd5] to-[#1f2529] dark:from-[#1f2529] dark:via-[#4b545c] dark:to-[#d9dee2]">
      <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold">Forgot Password</h1>

        <p className="mb-6 text-muted-foreground">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block pb-2 text-sm">
              Email Address <span className="text-red-600">*</span>
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-md border bg-background p-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Remember password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;