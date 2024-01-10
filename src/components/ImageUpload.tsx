"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const ImageUpload = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <Input
          type="file"
          accept="image/*"
          capture="environment" //'user' for front-facing camera
          onChange={handleImageChange}
        />
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
