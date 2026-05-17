export const uploadPDFToCloudinary = async (file: File): Promise<string | null> => {
  if (!file) return null;

  if (file.type !== "application/pdf") {
    console.error("File is not a PDF!");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zahid_preset");
    formData.append("resource_type", "raw"); 
    formData.append("folder", "pdfs");
    // formData.append("type", "upload");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dr9gketux/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok && data.secure_url) {
      console.log("PDF Upload Success! URL:", data.secure_url);
      return data.secure_url;
    } else {
      console.error("Cloudinary Error:", data.error?.message || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("PDF Upload Error:", error);
    return null;
  }
};