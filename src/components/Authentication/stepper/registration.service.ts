/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleFullRegistration = async (data: any) => {
  try {
    const getFile = (field: any) => {
      if (!field) return null;
      if (field instanceof FileList) return field[0];
      if (field[0] instanceof File) return field[0];
      return null;
    };

    const directorFile = getFile(data.directorPhoto);
    const directorPhoto = directorFile ? await uploadToCloudinary(directorFile) : "";

    const instituteFile = getFile(data.institutePhoto);
    const institutePhoto = instituteFile ? await uploadToCloudinary(instituteFile) : "";

    const nationalIDFile = getFile(data.nationalIDPhoto);
    const nationalIDPhoto = nationalIDFile ? await uploadToCloudinary(nationalIDFile) : "";

    const signatureFile = getFile(data.signaturePhoto);
    const signaturePhoto = signatureFile ? await uploadToCloudinary(signatureFile) : "";

    const finalPayload = {
      ...data,
      directorPhoto,
      institutePhoto,
      nationalIdPhoto: nationalIDPhoto, 
      signaturePhoto,
    };

    console.log("Payload sending to backend:", finalPayload);

    const response = await axios.post(`${API_URL}/auth/register`, finalPayload);

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Registration failed!";
    console.error("Full Registration Error:", error.response?.data || error);
    throw new Error(errorMessage);
  }
};