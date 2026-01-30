import { Button } from "../ui/button";

export default function Landing() {
  return (
    <div className="max-w-5xl mx-auto p-4 h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          stop tab-switching. start mastering.
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          the only platform that merges comprehensive documentation, deep-dive
          tutorials, and competitive coding challenges into one seamless
          workflow.
        </p>
        <div className="mt-8 flex items-center gap-2 justify-center">
          <Button size={"lg"} className="cursor-pointer">
            Start Coding for Free
          </Button>
          <Button size={"lg"} variant={"outline"} className="cursor-pointer">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
}
