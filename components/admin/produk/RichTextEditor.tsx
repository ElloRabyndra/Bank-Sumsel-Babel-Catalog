"use client";
import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TiptapImage from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Table as TableIcon,
  Trash2,
  ImagePlus,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { uploadImage } from "@/lib/api/storage";

interface PendingImage {
  file: File;
  previewUrl: string;
  caption: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const ToolbarButton = React.memo<{
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
  disabled?: boolean;
}>(({ onClick, isActive, children, title, disabled }) => (
  <Button
    type="button"
    variant={isActive ? "default" : "ghost"}
    size="sm"
    onClick={onClick}
    title={title}
    className="h-8 w-8 p-0"
    disabled={disabled}
  >
    {children}
  </Button>
));
ToolbarButton.displayName = "ToolbarButton";

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  required = false,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      TiptapImage.configure({
        HTMLAttributes: {
          class: "content-image",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-[180px]",
      },
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: PendingImage[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newImages.push({
          file,
          previewUrl: URL.createObjectURL(file),
          caption: "",
        });
      }
    });

    if (newImages.length > 0) {
      setPendingImages((prev) => [...prev, ...newImages]);
      setImageDialogOpen(true);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddMoreImages = () => {
    fileInputRef.current?.click();
  };

  const handleCancelImages = () => {
    pendingImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setPendingImages([]);
    setImageDialogOpen(false);
  };

  const updateCaption = (index: number, caption: string) => {
    setPendingImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(pendingImages[index].previewUrl);
    setPendingImages((prev) => prev.filter((_, i) => i !== index));
    if (pendingImages.length <= 1) {
      setImageDialogOpen(false);
    }
  };

  const handleInsertImages = async () => {
    if (!editor || pendingImages.length === 0) return;

    setIsUploading(true);

    try {
      // Upload all images to Supabase Storage
      const uploadPromises = pendingImages.map(async (img, idx) => {
        const caption = img.caption.trim() || `Langkah ${idx + 1}`;
        
        // Upload to Supabase
        const publicUrl = await uploadImage(img.file, 'catalog-images', 'content');
        
        return { src: publicUrl, caption };
      });

      const uploadedImages = await Promise.all(uploadPromises);

      // Insert uploaded images into editor
      const content = uploadedImages.flatMap((img) => [
        {
          type: "image",
          attrs: { src: img.src, alt: img.caption, title: img.caption },
        },
        { type: "paragraph" },
      ]);

      editor.chain().focus().insertContent(content).run();

      // Cleanup
      pendingImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));
      setPendingImages([]);
      setImageDialogOpen(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Gagal mengupload gambar. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!editor) {
    return (
      <div className="border rounded-lg p-4 min-h-50 animate-pulse bg-muted" />
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground mb-2 block">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <div className="border border-input rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
            disabled={isUploading}
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
            disabled={isUploading}
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
            disabled={isUploading}
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
            disabled={isUploading}
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
            disabled={isUploading}
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
            disabled={isUploading}
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
            disabled={isUploading}
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
                .run()
            }
            title="Insert Table"
            disabled={isUploading}
          >
            <TableIcon className="w-4 h-4" />
          </ToolbarButton>
          {editor.isActive("table") && (
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Delete Table"
              disabled={isUploading}
            >
              <Trash2 className="w-4 h-4" />
            </ToolbarButton>
          )}

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Image Upload Button */}
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            title="Upload Gambar (bisa pilih banyak)"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ImagePlus className="w-4 h-4" />
            )}
          </ToolbarButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </div>

        {/* Editor */}
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>

      {isUploading && (
        <p className="text-xs text-primary flex items-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Mengupload gambar ke Supabase Storage...
        </p>
      )}

      <Dialog
        open={imageDialogOpen}
        onOpenChange={(open) => !open && handleCancelImages()}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {pendingImages.length > 1
                ? `Upload ${pendingImages.length} Gambar`
                : "Upload Gambar"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {pendingImages.map((img, idx) => (
              <div
                key={idx}
                className="flex gap-3 items-start p-3 border border-border rounded-lg bg-muted/20"
              >
                <div className="relative shrink-0 w-20 h-20 rounded-md overflow-hidden border border-border">
                  <Image
                    src={img.previewUrl}
                    alt={`Preview ${idx + 1}`}
                    fill
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                    disabled={isUploading}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex-1 space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Keterangan Langkah {idx + 1}
                  </label>
                  <Input
                    value={img.caption}
                    onChange={(e) => updateCaption(idx, e.target.value)}
                    placeholder={`Contoh: Langkah ${idx + 1} — Isi formulir pendaftaran`}
                    className="text-sm"
                    disabled={isUploading}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Keterangan akan tampil saat gambar di-zoom pada halaman detail konten.
          </p>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddMoreImages}
              className="sm:mr-auto"
              disabled={isUploading}
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Tambah Gambar Lagi
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelImages}
              disabled={isUploading}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleInsertImages}
              disabled={pendingImages.length === 0 || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengupload...
                </>
              ) : (
                <>
                  Sisipkan{" "}
                  {pendingImages.length > 1
                    ? `${pendingImages.length} Gambar`
                    : "Gambar"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};