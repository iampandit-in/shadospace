import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { schema } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function SignInEmail(email: string, password: string) {
  try {
    const user = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "User signed in successfully", user };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "failed to sign in" };
  }
}

export async function SignUpEmail(name: string, email: string, password: string) {
  try {
    const user = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { success: true, message: "User signed up successfully", user };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "failed to sign up" };
  }
}

export async function SignOut() {
  try {
    const user = auth.api.signOut;
    return { success: true, message: "User signed out successfully", user };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "failed to sign out" };
  }
}