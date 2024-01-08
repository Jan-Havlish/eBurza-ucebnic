import React from "react";

const DownloadButton = (inputObj) => {
  const handleDownload = () => {
    const jsonData = JSON.stringify(inputObj, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "moje_aktivita.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return <button className="red-button" onClick={handleDownload}>Stáhnout JSON</button>;
};

export default DownloadButton;
