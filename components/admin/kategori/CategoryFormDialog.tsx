// components/admin/kategori/CategoryFormDialog.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/admin/kategori/ImageUpload";
import { CategoryIcon } from "./CategoryIcon";
import { ICON_OPTIONS } from "../../../lib/constants";
import { LucideIconName } from "@/types";

interface CategoryFormData {
  name: string;
  description: string;
  icon: LucideIconName;
  thumbnailUrl: string;
}

interface CategoryFormDialogProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: CategoryFormData;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (data: Partial<CategoryFormData>) => void;
}

export const CategoryFormDialog: React.FC<CategoryFormDialogProps> = ({
  isOpen,
  isEditing,
  formData,
  onOpenChange,
  onSubmit,
  onFormChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Kategori" : "Tambah Kategori"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kategori *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
              placeholder="Contoh: Tabungan"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
              placeholder="Deskripsi singkat kategori"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Icon</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) =>
                onFormChange({ icon: value as LucideIconName })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ICON_OPTIONS.map((icon) => (
                  <SelectItem key={icon} value={icon}>
                    <div className="flex items-center gap-2">
                      <CategoryIcon iconName={icon} />
                      <span>{icon}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ImageUpload
            value={formData.thumbnailUrl}
            onChange={(url) => onFormChange({ thumbnailUrl: url })}
            label="Thumbnail"
            required
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit">
              {isEditing ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};