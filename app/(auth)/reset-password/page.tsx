import { ResetPasswordForm } from "@/components/auth/reset-password";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-sm">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
