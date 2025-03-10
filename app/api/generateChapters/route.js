import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { description } = await req.json();

        if (!description) {
            return NextResponse.json({ message: "Description is required" }, { status: 400 });
        }

        // Simulate chapter generation from description
        const chapters = description.split('.').map((sentence, index) => ({
            title: `Chapter ${index + 1}`,
            content: sentence.trim(),
        }));

        return NextResponse.json({ chapters }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ 
            message: error.message || 'An unknown error occurred' 
        }, 
        { status: error.status || 500 });
    }
}
