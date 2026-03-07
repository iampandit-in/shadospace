"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = (await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })) as { error?: { message?: string } };
    if (res?.error) {
      return {
        success: false,
        message: res.error.message || "Something went wrong",
      };
    }
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    const e = error as { body?: { message?: string }; message?: string };
    return {
      success: false,
      message: e?.body?.message || e.message || "Something went wrong",
    };
  }
}

export async function signUpUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const res = (await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    })) as { error?: { message?: string } };
    if (res?.error) {
      return {
        success: false,
        message: res.error.message || "Something went wrong",
      };
    }
    return { success: true, message: "Sign up successfully" };
  } catch (error) {
    const e = error as { body?: { message?: string }; message?: string };
    return {
      success: false,
      message: e?.body?.message || e.message || "Something went wrong",
    };
  }
}

export async function signOut() {
  try {
    const { success } = await auth.api.signOut({
      headers: await headers(),
    });
    if (!success) {
      return {
        success: false,
        message: "Failed to sign out",
      };
    }
    revalidatePath("/dashboard");
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    const e = error as { body?: { message?: string }; message?: string };
    return {
      success: false,
      message: e?.body?.message || e.message || "Something went wrong",
    };
  }
}

export const forgotPassword = async (email: string) => {
  try {
    const res = (await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
      },
    })) as { error?: { message?: string } };
    if (res?.error) {
      return {
        success: false,
        message: res.error.message || "Something went wrong",
      };
    }
    return {
      success: true,
      message: "Email sent successfully, please check your email",
    };
  } catch (error) {
    const e = error as { body?: { message?: string }; message?: string };
    return {
      success: false,
      message: e?.body?.message || e.message || "Something went wrong",
    };
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const res = (await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    })) as { error?: { message?: string } };
    if (res?.error) {
      return {
        success: false,
        message: res.error.message || "Something went wrong",
      };
    }
    return { success: true, message: "Reset password successfully" };
  } catch (error) {
    const e = error as { body?: { message?: string }; message?: string };
    return {
      success: false,
      message: e?.body?.message || e.message || "Something went wrong",
    };
  }
};
