import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import api from "../lib/axios";
import { Button } from "../components/ui/button";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" name="fake_email" autoComplete="username" className="hidden" />
          <input type="password" name="fake_password" autoComplete="current-password" className="hidden" />
          <div>
            <label className="block pb-2 text-sm">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-md border bg-background p-2 text-foreground outline-none placeholder:text-xs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block pb-2 text-sm">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-md border bg-background p-2 text-foreground outline-none placeholder:text-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block pb-2 text-sm">
              Password <span className="text-red-600">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full rounded-md border bg-background p-2 pr-10 text-foreground outline-none placeholder:text-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;