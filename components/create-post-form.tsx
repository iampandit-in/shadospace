"use client";

import { useState, useRef } from "react";
import { CreatePost } from "@/app/new/create";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import LoadingButton from "./loading-button";
import { upload } from "@vercel/blob/client";
import Tiptap from "./text-editor";

export default function CreatePostForm() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); // This will be sent to the server
  const [content, setContent] = useState<string>("<p></p>");

  // Handle file selection and preview
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageSize(file.size);

      // Upload to Vercel Blob client-side
      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/image/upload", // Adjust this to your actual upload route
      });
      setImageUrl(uploaded.url);
    } else {
      setImagePreview(null);
      setImageSize(null);
      setImageUrl("");
    }
  };

  // Handle embed URL tab
  const handleEmbedUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(e.target.value || null);
    setImageUrl(e.target.value || "");
  };

  // Intercept form submit to inject the imageUrl
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Add the imageUrl to the form before submitting
    if (!imageUrl) return; // Prevent submit if image is uploading
  };

  return (
    <form
      action={CreatePost}
      className="max-w-2xl mt-22 mx-auto p-5"
      onSubmit={handleFormSubmit}
    >
      <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="embedUrl">Embedd URL</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="mb-4 w-full"
            onChange={handleFileChange}
          />
          {/* Hidden input to send the uploaded image URL to the server */}
          <input type="hidden" name="image" value={imageUrl} />
          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded mb-2"
              />
              <div className="text-xs text-muted-foreground">
                Size: {imageSize ? (imageSize / 1024).toFixed(2) : 0} KB
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="embedUrl">
          <Input
            name="embedUrl"
            type="text"
            placeholder="Embed URL (YouTube, etc.)"
            className="mb-4 w-full"
            onChange={handleEmbedUrlChange}
          />
          {/* Hidden input to send the embed URL as image to the server */}
          <input type="hidden" name="image" value={imageUrl} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mb-4 w-full max-h-64 object-cover rounded"
            />
          )}
        </TabsContent>
      </Tabs>
      <Input
        name="title"
        type="text"
        placeholder="Title"
        className="mb-4 w-full"
        required
      />
      {/* Tiptap content editor */}
      <div className="mb-4">
        <Tiptap value={content} onChange={setContent} />
        <input type="hidden" name="content" value={content} />
      </div>
      <LoadingButton text="Create" />
    </form>
  );
}