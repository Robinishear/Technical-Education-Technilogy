/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCourseData = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`);
      return data.data;
    }
  });

  const courses = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses`);
      return data.data;
    }
  });

  
  const filteredCourses = selectedCategory === "All" 
    ? courses.data 
    : courses.data?.filter((course: any) => course.categoryId === selectedCategory);

  return { 
    categories, 
    courses: { ...courses, data: filteredCourses }, 
    selectedCategory, 
    setSelectedCategory 
  };
};