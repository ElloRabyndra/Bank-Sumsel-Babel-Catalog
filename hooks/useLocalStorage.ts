import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State untuk menyimpan nilai
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref untuk menghindari re-render loop
  const isInitialized = useRef(false);

  // Load dari localStorage saat mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
    } finally {
      setIsLoading(false);
      isInitialized.current = true;
    }
  }, [key]);

  // Fungsi untuk set value ke state dan localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Gunakan functional update untuk mendapatkan nilai terbaru
        setStoredValue((prevValue) => {
          const valueToStore = value instanceof Function ? value(prevValue) : value;
          // Save ke localStorage
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
        });
      } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
      }
    },
    [key] // Hapus storedValue dari dependency
  );

  // Fungsi untuk clear localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }, [key, initialValue]);

  return { value: storedValue, setValue, removeValue, isLoading };
}