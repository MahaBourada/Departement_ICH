export function exportTXT(data, fileName) {
  // Format each item into a labeled text block
  const txtString = data
    .map((item) => {
      return [
        `Administrateur : ${item.admin_name}`,
        `Opération : ${item.operation}`,
        `Résumé : ${item.resume}`,
        `Date : ${item.dateUpdated}`,
        "\n---\n", // separator between entries
      ].join("\n");
    })
    .join("\n"); // Join all blocks

  // Create a Blob from the TXT string
  const blob = new Blob(["\uFEFF" + txtString], {
    type: "text/plain;charset=utf-8",
  });

  // Generate and trigger download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName || "historique.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
