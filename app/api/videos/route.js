import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("kozu");
    const videoID = req.nextUrl.searchParams.get("id");
    let videos;
    if (videoID) {
      videos = await db.collection("videos").find({ id: videoID }).toArray();
    } else {
      videos = await db.collection("videos").find({}).toArray();
    }
    return NextResponse.json({ videos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message || "An unknown error occurred" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { video } = await req.json();
    if (!video) {
      return NextResponse.json({ message: "Video data is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("kozu");
    await db.collection("videos").insertOne(video);
    return NextResponse.json({ message: "Video added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message || "An unknown error occurred" }, { status: 500 });
  }
}
