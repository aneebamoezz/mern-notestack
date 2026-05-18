import React from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen p-6">
      <div className="rounded-xl border bg-card p-6 shadow-md">
        <div className="flex items-center justify-between border-b pb-5">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>

        <Button asChild>
            <Link to="/forgot-password">Reset Password</Link>
        </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Name
            </label>
            <input
              type="text"
              value={user?.name || "User"}
              readOnly
              className="w-full rounded-md border bg-muted p-3 text-foreground outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-foreground">
              Email
            </label>
            <input
              type="text"
              value={user?.email || ""}
              readOnly
              className="w-full rounded-md border bg-muted p-3 text-foreground outline-none"
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-4 block text-sm font-semibold text-foreground">
            Profile Image
          </label>

          <div className="flex h-32 w-32 items-center justify-center rounded-full border bg-black text-5xl font-bold text-white dark:bg-white dark:text-black">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;