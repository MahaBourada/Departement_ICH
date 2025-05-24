export const getImageByPosition = (images, position) => {
  const img = images.find((i) => i.ordre_positionnement === position);
  if (!img) return null;

  const src = import.meta.env.VITE_BASE_URL
    ? `${import.meta.env.VITE_BASE_URL}/${img.path}`
    : img.path;

  return {
    src,
    alt: img.alt || "",
  };
};
