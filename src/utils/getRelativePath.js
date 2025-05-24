export function getRelativePath(path) {
  // Remove base URL if present, otherwise return as is
  if (!path) return "";
  // If base URL present, remove it
  if (path.startsWith(import.meta.env.VITE_BASE_URL)) {
    // Also remove trailing slash if double slash
    let rel = path.replace(import.meta.env.VITE_BASE_URL, "");
    // Remove leading slash if present
    if (rel.startsWith("/")) rel = rel.slice(1);
    return rel;
  }
  return path;
}
