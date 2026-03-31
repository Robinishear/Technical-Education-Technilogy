/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  getCoursesAction,
  getCategoriesAction,
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
  createCategoryAction,
} from "./actions";
import { Category, Course, CreateCoursePayload } from "./types";
import { uploadToCloudinary } from "@/core/upload-image-function/upload.service";

const defaultForm: CreateCoursePayload = {
  title: "",
  thumbnail: "",
  instructor: "",
  totalReviews: 0,
  rating:0,
  price: 0,
  oldPrice: null,
  categoryId: "",
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<CreateCoursePayload>(defaultForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    const data = await getCoursesAction();
    if (data) setCourses(data);
  };

  const fetchCategories = async () => {
    const data = await getCategoriesAction();
    if (data) setCategories(data);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setCategoryLoading(true);
    try {
      await createCategoryAction({ name: newCategory.trim() });
      setNewCategory("");
      await fetchCategories();
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let thumbnailUrl = form.thumbnail;

      if (imageFile) {
        const url = await uploadToCloudinary(imageFile);
        if (!url) return;
        thumbnailUrl = url;
      }

      const payload: CreateCoursePayload = { ...form, thumbnail: thumbnailUrl };

      if (editingId) {
        await updateCourseAction(editingId, payload);
        setEditingId(null);
      } else {
        await createCourseAction(payload);
      }

      setForm(defaultForm);
      setImageFile(null);
      await fetchCourses();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      thumbnail: course.thumbnail,
      instructor: course.instructor,
      totalReviews: Number(course.totalReviews) ,
            rating: Number(course.rating) ,

      price: Number(course.price),
      oldPrice: course.oldPrice ? Number(course.oldPrice) : null,
      categoryId: course.categoryId,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete করবেন?")) return;
    await deleteCourseAction(id);
    await fetchCourses();
  };

  return (
    <div className="p-6 space-y-8">

      {/* Category Add Section */}
      <div className=" p-5 rounded-xl shadow space-y-3">
        <h2 className="text-lg font-semibold">Category যোগ করুন</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Category নাম লিখুন"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={handleAddCategory}
            disabled={categoryLoading}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {categoryLoading ? "Adding..." : "Add"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat.id}
              className="shadow-sm  text-sm px-3 py-1 rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Course Form */}
      <form onSubmit={handleSubmit} className="space-y-4  p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold">
          {editingId ? "Course Update করুন" : "নতুন Course যোগ করুন"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Instructor"
          value={form.instructor}
          onChange={(e) => setForm({ ...form, instructor: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
         <input
          type="number"
          placeholder="totalReviews"
          value={form.totalReviews}
          onChange={(e) => setForm({ ...form, totalReviews:  Number(e.target.value)  })}
          className="w-full border p-2 rounded"
          required
        />
          {/* <input
          type="number"
          placeholder="rating"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating:  Number(e.target.value)  })}
          className="w-full border p-2 rounded"
          required
        /> */}
        <div className="flex flex-col">
  <label htmlFor="rating" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
    Course Rating highest(5.0
  </label>
  <input
    id="rating"
    name="rating"
    type="number"
    min={0}
    max={5}
    step={0.1}
    placeholder="Rating লিখুন"
    value={form.rating}
    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
    className="w-full border p-2 rounded"
    required
  />
</div>

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Old Price (optional)"
          value={form.oldPrice ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              oldPrice: e.target.value ? Number(e.target.value) : null,
            })
          }
          className="w-full border p-2 rounded"
        />

        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          className="w-full border p-2 bg-white dark:bg-gray-800 shadow-2xs rounded"
          required
        >
          <option value="">Category বেছে নিন</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="w-full border p-2 rounded"
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 dark:bg-gray-800 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : editingId ? "Update করুন" : "Add করুন"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(defaultForm);
              }}
              className="text-gray-500 underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Course Table */}
      <div className=" rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className=" text-left">
            <tr>
              <th className="p-3">Thumbnail</th>
              <th className="p-3">Title</th>
              <th className="p-3">Instructor</th>
              <th className="p-3">totalReviews</th>
              <th className="p-3">rating</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t hover:bg-white/30">
                <td className="p-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                </td>
                <td className="p-3">{course.title}</td>
                <td className="p-3">{course.instructor}</td>
                <td className="p-3">{course.totalReviews}</td>
                <td className="p-3">{course.rating}</td>
                <td className="p-3">৳{Number(course.price)}</td>
                <td className="p-3">{course.category?.name ?? course.categoryId}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  কোনো course নেই
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}