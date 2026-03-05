"use server";

import { auth } from "@/lib/auth";

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "sign in successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "something went wrong" };
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
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { success: true, message: "sign up successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "something went wrong" };
  }
}

export const forgotPassword = async (email: string) => {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
      },
    });
    return {
      success: true,
      message: "email sent successfully, please check your email",
    };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "something went wrong" };
  }
};

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });
    return { success: true, message: "reset password successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "something went wrong" };
  }
};
