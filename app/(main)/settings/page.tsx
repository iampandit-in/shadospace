import { ModeToggle } from "@/components/utils/mode-toggle";

export default function Settings() {
  return (
    <div className="">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="flex flex-col gap-2">
        <p>Change Theme</p>
        <ModeToggle />
      </div>
    </div>
  );
}
