import { CreatePost } from "@/app/new/create";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreatePostForm() {
    return (
        <form action={CreatePost} className="max-w-2xl mt-22 mx-auto p-5">
            <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
            <Input name="title" type="text" placeholder="Title" className="mb-4 w-full" required />
            <Textarea name="content" rows={8} placeholder="Content" className="mb-4 w-full" required />
            <Input name="image" type="text" placeholder="Image URL (optional)" className="mb-4 w-full" />
            <Button type="submit" className="bg-red-500 text-white hover:bg-red-450 w-full cursor-pointer">
                Submit Post
            </Button>
        </form>
    )
}