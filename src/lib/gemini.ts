import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

// Use a model that supports image generation if available, or text-to-image via Imagen
// Note: As of late 2024, Gemini models are primarily multimodal (text/image input -> text output).
// For image GENERATION, Google usually provides the 'imagen-3.0-generate-001' model or similar via Vertex AI.
// However, the standard Generative AI SDK might have limited direct image generation support depending on the version.
// If direct generation isn't available in this SDK version, we might need to use a different endpoint or wrap it.
// Let's assume for this implementation we are using a text-based prompt enhancement first, 
// and if the SDK supports 'imagen' model, we use it. 

// UPDATE: The standard @google/generative-ai package is mostly for Gemini (text/vision -> text).
// For Image Generation (Imagen), it's often a separate API or requires Vertex AI SDK.
// BUT, let's try to see if we can use a prompt-to-image approach if available, 
// or use Gemini to CREATE A DETAILED PROMPT that we can then feed to a placeholder image service 
// (like Pollinations.ai or similar free APIs) if direct Imagen access is complex without Vertex AI setup.

// STRATEGY CHANGE: 
// Since setting up Google Cloud Vertex AI for Imagen requires complex authentication (Service Accounts),
// and the user provided a simple API Key which works with Gemini Studio,
// we will use Gemini to GENERATE A HIGH-QUALITY IMAGE PROMPT based on the story text.
// Then we will use a free, keyless image generation API (like Pollinations.ai) to actually generate the image on the fly.
// This is much faster, free, and doesn't require complex cloud setup.

export async function generateImagePrompt(storyText: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Analyze the following story segment and create a vivid, descriptive English image prompt 
      that captures the mood, setting, and action. 
      The prompt should be suitable for an AI image generator.
      Keep it under 40 words. Focus on visual details.
      
      Story Segment: "${storyText}"
      
      Image Prompt:
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text.trim();
    } catch (error) {
        console.error("Error generating prompt with Gemini:", error);
        return "fantasy story scene, magical atmosphere, detailed digital art"; // Fallback
    }
}

export function getImageUrlFromPrompt(prompt: string): string {
    // Using Pollinations.ai for instant, free generation without API key
    // It's great for prototypes and MVP.
    const encodedPrompt = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=600&model=flux&seed=${Math.floor(Math.random() * 1000)}`;
}
