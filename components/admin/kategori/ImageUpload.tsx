"use client";
import React, { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { uploadImage, deleteImage } from "@/lib/api/storage";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  maxSizeMB?: number;
  className?: string;
  folder?: string; 
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label,
  required = false,
  maxSizeMB = 5,
  className,
  folder = "uploads",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Validation
      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar");
        return;
      }

      const maxSize = maxSizeMB * 1024 * 1024;
      if (file.size > maxSize) {
        setError(`Ukuran file maksimal ${maxSizeMB}MB`);
        return;
      }

      try {
        setIsUploading(true);

        // Delete old image from Supabase if exists
        if (value && value.includes('supabase')) {
          await deleteImage(value).catch(err => {
            console.warn('Failed to delete old image:', err);
          });
        }

        // Upload to Supabase Storage
        const publicUrl = await uploadImage(file, 'catalog-images', folder);
        
        onChange(publicUrl);
      } catch (err) {
        console.error('Upload error:', err);
        setError(err instanceof Error ? err.message : "Gagal mengupload gambar");
      } finally {
        setIsUploading(false);
      }
    },
    [maxSizeMB, onChange, value, folder]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleClear = useCallback(async () => {
    try {
      // Delete from Supabase if it's a Supabase URL
      if (value && value.includes('supabase')) {
        await deleteImage(value).catch(err => {
          console.warn('Failed to delete image:', err);
        });
      }
      
      onChange("");
      setError(null);
    } catch (err) {
      console.error('Clear error:', err);
    }
  }, [onChange, value]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {value ? (
        <div className="relative group">
          <Image
            src={value}
            alt="Preview"
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <label className="cursor-pointer">
              <Button 
                variant="secondary" 
                size="sm" 
                asChild
                disabled={isUploading}
              >
                <span>
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Ganti
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleClear}
              disabled={isUploading}
            >
              <X className="w-4 h-4 mr-2" />
              Hapus
            </Button>
          </div>
        </div>
      ) : (
        <label
          className={cn(
            "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50",
            isUploading && "pointer-events-none opacity-50"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 mb-3 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">
                  Mengupload gambar...
                </p>
              </>
            ) : (
              <>
                <ImageIcon className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">
                    Klik untuk upload
                  </span>{" "}
                  atau drag & drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WEBP (Maks. {maxSizeMB}MB)
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {value && !value.includes('supabase') && (
        <p className="text-xs text-amber-600 flex items-center gap-1">
          ⚠️ Gambar belum tersimpan ke server
        </p>
      )}
      
      {isUploading && (
        <p className="text-xs text-primary flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Sedang mengupload ke Supabase Storage...
        </p>
      )}
    </div>
  );
};