import { NextResponse } from "next/server";

export async function GET(req) {
    try {        
        const videoID = req.nextUrl.searchParams.get("videoID");

        if (!videoID) {
            return NextResponse.json({ message: "Video ID is required" }, { status: 400 });
        }

        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoID}&key=${process.env.API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch video details. Status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json({ message: data }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ 
            message: error.message || 'An unknown error occurred' 
        }, 
        { status: error.status || 500 });
    }
}
