// components/admin/dashboard/ResetDataButton.tsx
"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export function ResetDataButton() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleReset = () => {
    try {
      // Hapus data dari localStorage
      localStorage.removeItem('bsb_catalog_data');
      
      toast({
        title: "Berhasil",
        description: "Data berhasil direset. Halaman akan dimuat ulang...",
      });

      // Reload halaman setelah 1 detik
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mereset data",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset Data
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset Data ke Default?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini akan menghapus semua perubahan yang Anda buat dan mengembalikan data ke kondisi awal (mock data). 
            <strong className="block mt-2 text-destructive">Tindakan ini tidak dapat dibatalkan!</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReset}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Ya, Reset Data
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}