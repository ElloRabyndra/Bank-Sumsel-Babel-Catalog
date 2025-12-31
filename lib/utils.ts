import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as Icons from "lucide-react";
import React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = (): string => {
  return crypto.randomUUID();
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export const formatDate = (date: string): string => {
  const d = new Date(date);
  
  // Format manual untuk konsistensi server/client
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  
  return `${day} ${month} ${year}`;
};

export const truncate = (text: string, length: number): string => {
  if (!text) return '';
  return text.length > length ? text.slice(0, length) + '...' : text;
};

export const extractYouTubeID = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export const stripHtml = (html: string): string => {
  if (typeof window === 'undefined') {
    // Server-side: gunakan regex
    return html.replace(/<[^>]*>/g, '').trim();
  }
  
  // Client-side: gunakan DOM
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

// render Lucide icon
export const getIcon = (iconName: string, className?: string): React.ReactElement | null => {
  const IconComponent = Icons[
    iconName as keyof typeof Icons
  ] as React.ComponentType<{ className?: string }>;
  return IconComponent ? React.createElement(IconComponent, { className }) : null;
};