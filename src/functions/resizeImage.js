function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = () => {
      const widthRatio = maxWidth / image.width;
      const heightRatio = maxHeight / image.height;
      const ratio = Math.min(widthRatio, heightRatio);
      const newWidth = image.width * ratio;
      const newHeight = image.height * ratio;

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, { type: file.type });
        resolve(resizedFile);
      }, file.type);
    };

    image.onerror = () => {
      reject(new Error("Error loading the image."));
    };
  });
}

export default resizeImage;
