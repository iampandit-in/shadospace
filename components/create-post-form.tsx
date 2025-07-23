import { CreatePost } from "@/app/new/create";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function CreatePostForm() {
    return (
        <form action={CreatePost} className="max-w-2xl mt-22 mx-auto p-5">
            <h1 className="text-2xl font-semibold mb-4">Create a New Post</h1>
            <Tabs defaultValue="upload">
                <TabsList>
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="embedUrl">Embedd URL</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                    <Input type="file" name="image" accept="image/*" className="mb-4 w-full" />
                </TabsContent>
                <TabsContent value="embedUrl">
                    <Input name="image" type="text" placeholder="Embed URL (YouTube, etc.)" className="mb-4 w-full" />
                </TabsContent>
            </Tabs>
            <Input name="title" type="text" placeholder="Title" className="mb-4 w-full" required />
            <Textarea name="content" rows={8} placeholder="Content" className="mb-4 w-full" required />
            <Button type="submit" className="bg-red-500 text-white hover:bg-red-450 w-full cursor-pointer">
                Submit Post
            </Button>
        </form>
    )
}