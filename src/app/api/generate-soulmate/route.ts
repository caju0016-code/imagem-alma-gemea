import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, userData } = await request.json();

    // Gerar imagem usando DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural",
    });

    const imageUrl = response.data[0].url;

    return NextResponse.json({ 
      imageUrl,
      userData 
    });
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    return NextResponse.json(
      { error: "Erro ao gerar imagem da alma gêmea" },
      { status: 500 }
    );
  }
}
