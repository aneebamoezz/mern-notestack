import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Button } from "../components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token")
    if(token) {
        navigate("/")
    }
  }, [])

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f4f5f6] via-[#c8cfd5] to-[#1f2529] bg-[length:200%_200%] animate-gradientdark:from-[#1f2529] dark:via-[#4b545c] dark:to-[#d9dee2] animate-gradient">
      <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Login</h1>
        <p className="mb-6 text-muted-foreground">
          Let’s get you signed in
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div >
            <label className="block pb-2 text-sm">Email Address <span className="text-red-600">*</span></label>
          <input
            type="email"
            placeholder="example@gmail.com"
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
            <label className="block pb-2 text-sm">Password <span className="text-red-600">*</span></label>
          <input
            type="password"
            placeholder="!@#$765WER"
            className="w-full rounded-md border bg-background p-2 text-foreground outline-none placeholder:text-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
      </div>
    </div>
  );
};

export default LoginPage;