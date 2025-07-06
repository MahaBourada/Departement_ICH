export function getRelativePath(image) {
  if (!image) return "";

  // If it's not a string (e.g., a File object), return as-is
  if (typeof image !== "string") return image;

  // If it's a full URL from the server, strip the base URL
  if (image.startsWith(import.meta.env.VITE_BASE_URL)) {
    return image.replace(`${import.meta.env.VITE_BASE_URL}/`, "");
  }

  // If it's already relative or a base64 string
  return image;
}
