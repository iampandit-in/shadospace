import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function Upload() {
  async function uploadImage(formData: FormData) {
    "use server";
    const imageFile = formData.get("image") as File;
    await put(imageFile.name, imageFile, {
      access: "public",
      token: process.env.SHADOSPACE_READ_WRITE_TOKEN,
      contentType: imageFile.type,
      addRandomSuffix: true,
    });
    revalidatePath("/");
  }

  return (
    <form action={uploadImage}>
      <label htmlFor="image">Image</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/jpeg, image/png, image/webp"
        required
      />
      <button>Upload</button>
    </form>
  );
}
