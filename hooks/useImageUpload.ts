// hooks/useImageUpload.ts
import { useState, useCallback, useRef } from "react";

interface UseImageUploadOptions {
  maxSizeMB?: number;
  onUpload?: (url: string) => void;
  multiple?: boolean;
}

interface UseImageUploadReturn {
  imageUrl: string | string[];
  isUploading: boolean;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  clearImage: (index?: number) => void;
  isDragging: boolean;
  triggerFileSelect: () => void;
}

export function useImageUpload({
  maxSizeMB = 5,
  onUpload,
  multiple = false,
}: UseImageUploadOptions = {}): UseImageUploadReturn {
  const [imageUrl, setImageUrl] = useState<string | string[]>(
    multiple ? [] : ""
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = useCallback(
    (file: File): boolean => {
      setError(null);

      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar");
        return false;
      }

      const maxSize = maxSizeMB * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`Ukuran file maksimal ${maxSizeMB}MB`);
        return false;
      }

      return true;
    },
    [maxSizeMB]
  );

  const processFile = useCallback(
    (file: File) => {
      if (!validateFile(file)) return;

      setIsUploading(true);
      const objectUrl = URL.createObjectURL(file);

      if (multiple) {
        setImageUrl((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          objectUrl,
        ]);
      } else {
        // Revoke old URL if exists
        if (typeof imageUrl === "string" && imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(imageUrl);
        }
        setImageUrl(objectUrl);
      }

      if (onUpload) {
        onUpload(objectUrl);
      }

      setIsUploading(false);
    },
    [validateFile, multiple, imageUrl, onUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;

      if (multiple) {
        Array.from(files).forEach(processFile);
      } else {
        processFile(files[0]);
      }

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [processFile, multiple]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (!files) return;

      if (multiple) {
        Array.from(files).forEach(processFile);
      } else {
        processFile(files[0]);
      }
    },
    [processFile, multiple]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearImage = useCallback(
    (index?: number) => {
      if (multiple && Array.isArray(imageUrl)) {
        if (index !== undefined) {
          const url = imageUrl[index];
          if (url.startsWith("blob:")) {
            URL.revokeObjectURL(url);
          }
          setImageUrl(imageUrl.filter((_, i) => i !== index));
        } else {
          imageUrl.forEach((url) => {
            if (url.startsWith("blob:")) {
              URL.revokeObjectURL(url);
            }
          });
          setImageUrl([]);
        }
      } else if (typeof imageUrl === "string") {
        if (imageUrl.startsWith("blob:")) {
          URL.revokeObjectURL(imageUrl);
        }
        setImageUrl("");
      }
      setError(null);
    },
    [imageUrl, multiple]
  );

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    imageUrl,
    isUploading,
    error,
    fileInputRef,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    clearImage,
    isDragging,
    triggerFileSelect,
  };
}
