"use client";
import { useParams } from "next/navigation";

export default function BlogPost() {
  const { id } = useParams(); // Get dynamic route parameter

  return <h1>Blog Post: {id}</h1>;
}
