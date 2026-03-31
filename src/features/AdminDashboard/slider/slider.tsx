"use client";

import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";
import { useEffect, useState } from "react";
interface Slider {
  id: string;
  image: string;
  caption?: string;
  order: number;
}

export default function AdminSliderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [order, setOrder] = useState(0);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api/v1/slider";

  // 🔄 Fetch Sliders (SAFE)
  const fetchSliders = async () => {
    try {
      const res = await fetch(`${API}/get-slider`);
      const data = await res.json();

      console.log("API Response:", data);

      // 🔥 MAIN FIX
      setSliders(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setSliders([]);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // ➕ Create Slider
  const handleSubmit = async () => {
    if (!file) return alert("Select image");

    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary
      (file);

      if (!imageUrl) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API}/add-slider`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          caption,
          order: Number(order),
        }),
      });

      const data = await res.json();
      console.log("Create Response:", data);

      // reset form
      setFile(null);
      setCaption("");
      setOrder(0);

      fetchSliders();
    } catch (error) {
      console.error("Create Error:", error);
    }

    setLoading(false);
  };

  // ❌ Delete
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      fetchSliders();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Slider</h1>

      {/* ================= FORM ================= */}
      <div className="space-y-3 border p-4 rounded">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Order"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="border p-2 w-full"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Add Slider"}
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div>
        <h2 className="font-semibold mb-2">Slider List</h2>

        <table className="w-full border">
          <thead>
            <tr className="border">
              <th className="p-2">Image</th>
              <th className="p-2">Caption</th>
              <th className="p-2">Order</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {sliders?.length > 0 ? (
              sliders.map((item) => (
                <tr key={item.id} className="border text-center">
                  <td className="p-2">
                    <img
                      src={item.image}
                      className="w-20 h-12 object-cover mx-auto"
                    />
                  </td>

                  <td className="p-2">{item.caption || "—"}</td>

                  <td className="p-2">{item.order}</td>

                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No Slider Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}