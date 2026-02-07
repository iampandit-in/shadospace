import { Loader } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
