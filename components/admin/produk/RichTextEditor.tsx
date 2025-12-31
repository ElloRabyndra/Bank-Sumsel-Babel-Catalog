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

interface PendingImage {
  url: string;
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
}>(({ onClick, isActive, children, title }) => (
  <Button
    type="button"
    variant={isActive ? "default" : "ghost"}
    size="sm"
    onClick={onClick}
    title={title}
    className="h-8 w-8 p-0"
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
  placeholder = "Tulis konten di sini...",
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);

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
          url: URL.createObjectURL(file),
          caption: "",
        });
      }
    });

    if (newImages.length > 0) {
      // Append to existing pending images (for "add more" functionality)
      setPendingImages((prev) => [...prev, ...newImages]);
      setImageDialogOpen(true);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddMoreImages = () => {
    fileInputRef.current?.click();
  };

  const handleCancelImages = () => {
    pendingImages.forEach((img) => URL.revokeObjectURL(img.url));
    setPendingImages([]);
    setImageDialogOpen(false);
  };

  const updateCaption = (index: number, caption: string) => {
    setPendingImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, caption } : img))
    );
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(pendingImages[index].url);
    setPendingImages((prev) => prev.filter((_, i) => i !== index));
    if (pendingImages.length <= 1) {
      setImageDialogOpen(false);
    }
  };

  const handleInsertImages = async () => {
    if (!editor || pendingImages.length === 0) return;

    // Convert all images to base64 for persistent storage
    const converted = await Promise.all(
      pendingImages.map(async (img, idx) => {
        const caption = img.caption.trim() || `Langkah ${idx + 1}`;

        const response = await fetch(img.url);
        const blob = await response.blob();

        const src = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });

        return { src, caption };
      })
    );

    // Insert as a single content batch so images don't overwrite each other
    const content = converted.flatMap((img) => [
      {
        type: "image",
        attrs: { src: img.src, alt: img.caption, title: img.caption },
      },
      { type: "paragraph" },
    ]);

    editor.chain().focus().insertContent(content).run();

    // Cleanup blob URLs
    pendingImages.forEach((img) => URL.revokeObjectURL(img.url));
    setPendingImages([]);
    setImageDialogOpen(false);
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
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
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
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <ToolbarButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </ToolbarButton>
          {editor.isActive("table") && (
            <ToolbarButton
              onClick={() => editor.chain().focus().deleteTable().run()}
              title="Delete Table"
            >
              <Trash2 className="w-4 h-4" />
            </ToolbarButton>
          )}

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Image Upload Button */}
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            title="Upload Gambar (bisa pilih banyak)"
          >
            <ImagePlus className="w-4 h-4" />
          </ToolbarButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Editor */}
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>

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
                key={img.url}
                className="flex gap-3 items-start p-3 border border-border rounded-lg bg-muted/20"
              >
                {/* Thumbnail kecil */}
                <div className="relative shrink-0 w-20 h-20 rounded-md overflow-hidden border border-border">
                  {/* <img
                    src={img.url}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  /> */}
                  <Image
                    src={img.url}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {/* Caption input */}
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Keterangan Langkah {idx + 1}
                  </label>
                  <Input
                    value={img.caption}
                    onChange={(e) => updateCaption(idx, e.target.value)}
                    placeholder={`Contoh: Langkah ${
                      idx + 1
                    } — Isi formulir pendaftaran`}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Keterangan akan tampil saat gambar di-zoom pada halaman detail
            produk.
          </p>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddMoreImages}
              className="sm:mr-auto"
            >
              <ImagePlus className="w-4 h-4 mr-2" />
              Tambah Gambar Lagi
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelImages}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleInsertImages}
              disabled={pendingImages.length === 0}
            >
              Sisipkan{" "}
              {pendingImages.length > 1
                ? `${pendingImages.length} Gambar`
                : "Gambar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
