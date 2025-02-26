import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, channel } = await req.json();
        
        // Validate required data
        if (!email) {
            return NextResponse.json({ 'message': 'Email is required' }, { status: 400 });
        }

        // Get the appropriate webhook URL based on channel
        const webhookUrl = channel 
            ? process.env[`NEXT_PUBLIC_DISCORD_WEBHOOK_${channel.toUpperCase()}`] 
            : process.env.NEXT_PUBLIC_DISCORD_WEBHOOK;
            
        if (!webhookUrl) {
            return NextResponse.json({ 'message': 'Invalid channel or missing webhook URL' }, { status: 400 });
        }

        // Send the message to Discord using fetch
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: email
            })
        });

        if (!response.ok) {
            throw new Error(`Discord API responded with status: ${response.status}`);
        }

        return NextResponse.json({ 'message': 'success' }, { status: 200 });
    } catch (error) {
        console.error("Error sending webhook:", error.message);
        return NextResponse.json({ 'message': error.message }, { status: 500 });
    }
}