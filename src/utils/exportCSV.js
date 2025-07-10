export function exportCSV(data, fileName) {
  // Convert the data array into a CSV string
  const csvString = [
    ["Administrateur", "Résumé", "Date", "Opération"], // Specify your headers here
    ...data.map((item) => [
      item.admin_name,
      item.resume,
      item.dateUpdated,
      item.operation,
    ]), // Map your data fields accordingly
  ]
    .map((row) => row.join(";"))
    .join("\n");

  // Create a Blob from the CSV string
  const blob = new Blob(["\uFEFF" + csvString], {
    type: "text/csv;charset=utf-8;",
  });

  // Generate a download link and initiate the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName || "download.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
