"use server";

import { del } from "@vercel/blob";

export async function deleteImage(url: string) {
  await del(url, {
    token: process.env.SHADOSPACE_READ_WRITE_TOKEN,
  });
}
