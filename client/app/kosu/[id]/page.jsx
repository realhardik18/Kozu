"use client";

import { useParams } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import { useEffect } from "react";
export default function BlogPost() {
  const { id } = useParams();    
  return (
    <div>{id}</div>
  );
}