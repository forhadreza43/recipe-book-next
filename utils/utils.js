export const cuisineTypes = [
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "Others",
];

export const generateBlurDataURL = () => {
  const base64 =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+";
  return base64;
};

//ImgBB
export const getImageUrlImgBB = async (imageData) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageData);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: imageFormData,
    }
  );
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  const data = await response.json();
  return data.data.url;
};

//Cloudinary
export const getImageUrlCloudinary = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "unsigned_upload");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!response.ok) {
    throw new Error("Image upload failed");
  }
  const data = await response.json();
  return data.secure_url;
};
