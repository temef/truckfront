import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Input } from "@/components/ui/input"

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed top-4 right-4">
        <ModeToggle></ModeToggle>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Input type="file"/>
        <Button variant="default">Scan</Button>
      </div>
    </main>
  );
}
