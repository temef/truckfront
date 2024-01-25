"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { ImageUpload } from "@/components/ImageUpload";

import Image from "next/image";
import React, { useState } from "react";
import { uploadImageForDetection } from "@/services/apiService";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null); // state to hold the processed image URL

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
  }

  const handleScan = async () => {
    if (file) {
      try {
        const response = await uploadImageForDetection(file);
        console.log(response)
        if (response) {
          // const blob = await response.blob();
          const imageUrl = URL.createObjectURL(response);
          setProcessedImageUrl(imageUrl); // Update the state with the new image URL
        } else {
          // If response is not OK, handle it
          const contentType = response.headers.get("content-type");
          let errorText = '';
          if (contentType && contentType.includes("text")) {
            errorText = await response.text();
          } else {
            errorText = "Server responded with non-text content.";
          }
          throw new Error(`Image detection failed: ${errorText}`);
        }
      } catch (error) {
        console.error("Error during image detection:", error);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="fixed top-4 right-4">
        <ModeToggle></ModeToggle>
      </div>
      <div className="flex">
        <ImageUpload onFileChange={handleFileChange}></ImageUpload>
      </div>
      {processedImageUrl && ( // Conditionally render the processed image
        <div className="w-full flex justify-center">
          <img src={processedImageUrl} alt="Processed" className="max-w-full max-h-96" />
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-2">
        <Button variant="secondary" onClick={handleScan}>Scan</Button> <Button variant="secondary">Clear Scan</Button>
      </div>
    </main>
  );
}
