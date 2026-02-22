"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByUsername(username: string) {
  if (!username) {
    return { success: false, message: "Username is required" };
  }

  try {
    const [fetchedUser] = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .limit(1);

    if (!fetchedUser) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      message: "User fetched successfully",
      user: fetchedUser,
    };
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return {
      success: false,
      message:
        "Error fetching user: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}

export async function getUserById(id: string) {
  if (!id) {
    return { success: false, message: "User ID is required" };
  }

  try {
    const [fetchedUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (!fetchedUser) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      message: "User fetched successfully",
      user: fetchedUser,
    };
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return {
      success: false,
      message:
        "Error fetching user: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
}
