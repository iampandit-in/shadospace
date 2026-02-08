"use client";

import { uploadImageClient } from "@/lib/upload";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(null);
  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files?.[0]) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const newUrl = await uploadImageClient(file, "test");

          setUrl(newUrl);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {url && (
        <div>
          Blob url: <a href={url}>{url}</a>
        </div>
      )}
    </>
  );
}
