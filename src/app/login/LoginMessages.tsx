"use client";

export default function LoginMessages({ error }: { error?: string }) {
  if (!error) return null;

  if (error === "admin_not_configured") {
    return (
      <div className="mb-6 p-4 bg-amber-900/50 border border-amber-600 rounded-lg text-amber-200 text-sm">
        Admin is not configured. Add ADMIN_USER_IDS to your environment variables with your Clerk user ID.
      </div>
    );
  }

  if (error === "unauthorized") {
    return (
      <div className="mb-6 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-200 text-sm">
        You are not authorized to access the admin panel. Contact the site owner for access.
      </div>
    );
  }

  return null;
}
