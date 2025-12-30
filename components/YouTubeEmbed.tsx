import React from 'react';
import { extractYouTubeID } from '@/lib/utils';

interface YouTubeEmbedProps {
  url: string;
  className?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url, className }) => {
  const videoId = extractYouTubeID(url);

  if (!videoId) return null;

  return (
    <div className={className}>
      <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
