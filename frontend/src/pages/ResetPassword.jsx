import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { Button } from "../components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/auth/reset-password/${token}`, {
        password,
    });

      setSuccess(true);
      setPassword("");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#f4f5f6] via-[#c8cfd5] to-[#1f2529] dark:from-[#1f2529] dark:via-[#4b545c] dark:to-[#d9dee2]">
      <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold">Reset Password</h1>

        <p className="mb-6 text-muted-foreground">
          Enter your new password
        </p>

        {success ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Password Reset Successful ✅
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Redirecting to login...
            </p>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block pb-2 text-sm">
                New Password <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full rounded-md border bg-background p-2 pr-10 outline-none"
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
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;