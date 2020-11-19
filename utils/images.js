const urlToImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
    img.src = url;
  });

const fileToImage = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });

const rotateImage = (img, compression) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.height;
  canvas.height = img.width;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const ctx = canvas.getContext("2d");

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(img, -cy, -cx, canvas.height, canvas.width);
  ctx.restore();

  const { type, q } = { type: "image/jpeg", q: 0.75, ...compression };
  return canvas.toDataURL(type, q);
};

const compressImage = (img, compression) => {
  const { maxArea, type, q } = {
    maxArea: 320 * 320,
    q: 0.75,
    type: "image/jpeg",
    ...compression,
  };
  const canvas = document.createElement("canvas");
  const ratio = Math.min(Math.sqrt(maxArea / (img.width * img.height)), 1);
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL(type, q);
};

export { urlToImage, fileToImage, rotateImage, compressImage };
