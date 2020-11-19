const uploadFileAsDataUrl = async (ref, dataUrl) => {
  await ref.putString(dataUrl, "data_url");
  return await ref.getDownloadURL();
};

export { uploadFileAsDataUrl };
