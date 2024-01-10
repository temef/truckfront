"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { ImageUpload } from "@/components/ImageUpload";

import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed top-4 right-4">
        <ModeToggle></ModeToggle>
      </div>
      <div className="flex">
        <ImageUpload></ImageUpload>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Button variant="default">Scan</Button>
      </div>
    </main>
  );
}
