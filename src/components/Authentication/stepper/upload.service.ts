import imageCompression from "browser-image-compression";

/**
 * @description 
 * @param file 
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  if (!file) {
    console.error("কোনো ফাইল পাওয়া যায়নি!");
    return "";
  }

  const compressionOptions = {
    maxSizeMB: 1,          
    maxWidthOrHeight: 1920, 
    useWebWorker: true,     
  };

  try {
    console.log(`আসল সাইজ: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    const compressedFile = await imageCompression(file, compressionOptions);
    
    console.log(`কম্প্রেসড সাইজ: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

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
      console.log("আপলোড সফল! ইউআরএল:", data.secure_url);
      return data.secure_url; 
    } else {
      console.error("Cloudinary Error:", data.error?.message || "Unknown error");
      return "";
    }
  } catch (error) {
    console.error("কম্প্রেশন বা আপলোডে সমস্যা হয়েছে:", error);
    return "";
  }
};