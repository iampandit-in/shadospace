"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useRef } from "react";
import { uploadImageClient } from "@/lib/upload";
import { deleteImage } from "@/server/uploads";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";

export default function Settings() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    data: session,
    isPending, //loading state
    refetch, //refetch the session
  } = authClient.useSession();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsPreview(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    try {
      setLoading(true);
      const url = await uploadImageClient(selectedFile, "avatars");
      if (url) {
        await authClient.updateUser({
          image: url,
        });
        toast.success("Profile photo updated");
        await refetch();
        setIsPreview(false);
        setSelectedFile(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to upload image");
      console.log(error);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setLoading(true);
      if (session?.user?.image) {
        await deleteImage(session.user.image);
      }
      await authClient.updateUser({
        image: "",
      });
      toast.success("Profile photo removed");
      await refetch();
      setImage("");
      setIsPreview(false);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to remove photo");
      console.log(error);
    }
  };
  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-6">Settings</h1>
      <div className="flex flex-col max-w-md mx-auto">
        {isPending ? (
          <>
            <Skeleton className="rounded-full w-14 h-14 my-4" />
            <Skeleton className="h-7 w-full mb-1" />
            <Skeleton className="h-7 w-5/6" />
            <Skeleton className="h-7 w-5/6" />
            <Skeleton className="h-7 w-5/6" />
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="relative group w-16 h-16 mb-2 mt-8">
              <Avatar className="rounded-full w-full h-full">
                <AvatarImage
                  src={
                    image ||
                    session?.user?.image ||
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>{session?.user?.name![0]}</AvatarFallback>
              </Avatar>
              {(image || session?.user?.image) && (
                <button
                  onClick={handleRemovePhoto}
                  disabled={loading}
                  className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title="Remove photo"
                >
                  <X size={12} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                ref={fileInputRef}
                className="flex-1"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleImageChange}
              />
              {isPreview && (
                <Button
                  className="cursor-pointer"
                  onClick={handleImageUpload}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Save Photo"
                  )}
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              update your credentials
            </p>
            <div className="flex gap-2">
              <Input
                defaultValue={session?.user?.username || "username"}
                className="w-1/2"
              />
              <Input defaultValue={session?.user?.name} className="w-1/2" />
            </div>
            <Input defaultValue={session?.user?.email} />
            <div className="flex gap-2 justify-center items-center">
              <Button className="cursor-pointer w-1/2">Change Your info</Button>
              <Button
                onClick={async () => await refetch()}
                className="cursor-pointer w-1/2"
              >
                Refetch
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
