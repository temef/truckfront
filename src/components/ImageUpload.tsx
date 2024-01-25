"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialogComp } from "@/components/AlertDialogComp";
import Image from 'next/image'
import React, { useState, useRef } from "react";

interface ImageUploadProps {
  onFileChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [inputKey, setInputKey] = useState(Date.now());

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        onFileChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      onFileChange(null)
    }
  };

  const handleClear = () => {
    setImagePreview(null);
    setInputKey(Date.now());
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex flex-row items-center justify-center gap-2">
        <Input
          key={inputKey}
          type="file"
          accept="image/*"
          capture="environment" //'user' for front-facing camera
          onChange={handleImageChange}
        />
        <AlertDialogComp handleEmpty={handleClear} ifEmpty={imagePreview} />
        {/* <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button> */}
      </div>
      <div className="w-full mt-4">
        {imagePreview && (
          <div className="w-full flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-full max-h-96"
              //style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { ImageUpload };
