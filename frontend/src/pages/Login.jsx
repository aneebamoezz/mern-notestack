import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Button } from "../components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/");
    return;
  }

  setEmail("");
  setPassword("");
  setErrors({});

  setTimeout(() => {
    setEmail("");
    setPassword("");
  }, 100);
}, [navigate]);
  

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f4f5f6] via-[#c8cfd5] to-[#1f2529] bg-[length:200%_200%] animate-gradient dark:from-[#1f2529] dark:via-[#4b545c] dark:to-[#d9dee2]">
      <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Login</h1>

        <p className="mb-6 text-muted-foreground">Let’s get you signed in</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" name="fake_email" autoComplete="username" className="hidden" />
          <input type="password" name="fake_password" autoComplete="current-password" className="hidden" />
          <div>
            <label className="block pb-2 text-sm">
              Email Address <span className="text-red-600">*</span>
            </label>

            <input
              type="email"
              name="login_email_field"
              placeholder="example@gmail.com"
              autoComplete="off"
              className="w-full rounded-md border bg-background p-2 text-foreground outline-none placeholder:text-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.email && (
              <div className="text-[12px] mt-2 text-red-600">
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="block pb-2 text-sm">
              Password <span className="text-red-600">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-md border bg-background p-2 pr-10 outline-none placeholder:text-xs"
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

            {errors.password && (
              <div className="text-[12px] mt-2 text-red-600">
                {errors.password}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;