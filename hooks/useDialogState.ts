import { useState, useCallback } from "react";

interface UseDialogStateReturn<T = unknown> {
  isOpen: boolean;
  data: T | null;
  open: (data?: T) => void;
  close: () => void;
  toggle: () => void;
}

export function useDialogState<T = unknown>(
  defaultOpen = false
): UseDialogStateReturn<T> {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [data, setData] = useState<T | null>(null);

  const open = useCallback((dialogData?: T) => {
    setIsOpen(true);
    if (dialogData !== undefined) {
      setData(dialogData);
    }
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Reset data setelah animasi close selesai
    setTimeout(() => setData(null), 200);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  };
}
