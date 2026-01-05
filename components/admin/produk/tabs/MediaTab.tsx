import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/admin/kategori/ImageUpload";
import { YouTubeEmbed } from "@/components/produk/YouTubeEmbed";
import { extractYouTubeID } from "@/lib/utils";
import type { UpdateFieldFunction } from "@/types/productForm";

interface MediaTabProps {
  formData: {
    thumbnailUrl: string;
    youtubeVideoUrl: string;
  };
  onFieldUpdate: UpdateFieldFunction;
}

export const MediaTab: React.FC<MediaTabProps> = ({
  formData,
  onFieldUpdate,
}) => {
  return (
    <TabsContent value="media" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gambar & Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUpload
            value={formData.thumbnailUrl}
            onChange={(url) => onFieldUpdate("thumbnailUrl", url)}
            label="Thumbnail"
            required
          />

          <div className="space-y-2">
            <Label>URL Video YouTube (Opsional)</Label>
            <Input
              value={formData.youtubeVideoUrl}
              onChange={(e) => onFieldUpdate("youtubeVideoUrl", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {formData.youtubeVideoUrl &&
              extractYouTubeID(formData.youtubeVideoUrl) && (
                <div className="mt-4">
                  <YouTubeEmbed url={formData.youtubeVideoUrl} />
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
