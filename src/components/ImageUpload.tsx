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
    <div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Input
          type="file"
          accept="image/*"
          capture="environment" //'user' for front-facing camera
          onChange={handleImageChange}
        />
      </div>
      <div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        )}
      </div>
    </div>
  );
};

export { ImageUpload };
