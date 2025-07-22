import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreatePostForm () {
    return (
        <form className="max-w-2xl mt-22 mx-auto p-5">
            <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
            <Input type="text" placeholder="Title" className="mb-4 w-full" />
            <Textarea rows={65} placeholder="Content" className="mb-4 w-full" />
            <Button type="submit" className="bg-red-500 text-white hover:bg-red-450 w-full cursor-pointer">
                Submit Post
            </Button>
        </form>
            )
}