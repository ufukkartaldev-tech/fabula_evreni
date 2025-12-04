import { NextResponse } from 'next/server';
import { generateImagePrompt, getImageUrlFromPrompt } from '@/lib/gemini';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        // 1. Generate a descriptive prompt using Gemini
        const imagePrompt = await generateImagePrompt(text);

        // 2. Convert that prompt into an image URL (using Pollinations.ai for now)
        const imageUrl = getImageUrlFromPrompt(imagePrompt);

        return NextResponse.json({
            success: true,
            imageUrl,
            prompt: imagePrompt
        });

    } catch (error) {
        console.error('Error generating story image:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
