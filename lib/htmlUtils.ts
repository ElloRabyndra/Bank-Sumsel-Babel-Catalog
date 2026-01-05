/**
 * Parse images from HTML string
 * @param html - HTML string to parse
 * @returns Array of image objects with src and caption
 */
export const parseImagesFromHtml = (html: string) => {
  if (typeof window === "undefined") return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const imgEls = Array.from(doc.querySelectorAll("img"));

  return imgEls
    .map((img) => ({
      src: img.getAttribute("src") || "",
      caption: img.getAttribute("alt") || img.getAttribute("title") || "",
    }))
    .filter((i) => i.src);
};

/**
 * Remove images from HTML string
 * @param html - HTML string to process
 * @returns HTML string without images
 */
export const removeImagesFromHtml = (html: string) => {
  if (typeof window === "undefined") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("img").forEach((img) => img.remove());

  return doc.body.innerHTML.trim();
};
