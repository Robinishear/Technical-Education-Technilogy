import imageCompression from "browser-image-compression";

/**
 * @description
 * @param file
 * @returns 
 */
export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  if (!file) {
    console.error("No file found.!");
    return null;
  }

  const compressionOptions = {
    maxSizeMB: 1,           
    maxWidthOrHeight: 1920,   
    useWebWorker: false,     
  };

  try {
    console.log(`Original Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    const compressedFile = await imageCompression(file, compressionOptions);
    console.log(`Compressed Size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", "zahid_preset");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dr9gketux/image/upload`, 
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok && data.secure_url) {
      console.log("Upload Success! URL:", data.secure_url);
      return data.secure_url; 
    } else {
      console.error("Cloudinary Error:", data.error?.message || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("Compression or Upload Error:", error);
    return null;
  }
};