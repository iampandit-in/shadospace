"use client";

import { uploadImageClient } from "@/lib/upload";
import { useState } from "react";

export function Upload() {
  const [url, setUrl] = useState<string | null>(null);

  async function handleUpload(formData: FormData) {
    const file = formData.get("image") as File;
    if (file) {
      const newUrl = await uploadImageClient(file, "uploads");
      setUrl(newUrl);
    }
  }

  return (
    <div>
      <form action={handleUpload}>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpeg, image/png, image/webp"
          required
        />
        <button type="submit">Upload</button>
      </form>
      {url && (
        <div className="mt-4">
          <p>
            Uploaded to:{" "}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              {url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
