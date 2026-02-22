import { ForgotPasswordForm } from "@/components/auth/forgot-password";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center py-6 px-4">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
