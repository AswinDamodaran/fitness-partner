import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      name,
      age,
      gender,
      height,
      weight,
      goal,
      level,
      location,
      diet,
      medical,
      stress,
    } = body;

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    const prompt = `
You are a certified fitness coach and nutritionist.
Generate a complete personalized diet + workout plan.

USER PROFILE:
Name: ${name}
Age: ${age}
Gender: ${gender}
Height: ${height} cm
Weight: ${weight} kg
BMI: ${bmi}
Workout Location: ${location}
Diet Preference: ${diet}
Fitness Goal: ${goal}
Current Fitness Level: ${level}
Medical History: ${medical || "None"}
Stress Level: ${stress || "Normal"}

RESPONSE FORMAT:

🏋️ WORKOUT PLAN
- 7-day routine based on fitness goal
- Include sets, reps, rest time, and target muscles

🥗 DIET PLAN
- Breakfast / Lunch / Dinner / Snacks
- Include foods based on diet preference
- Add calorie estimates

💧 HYDRATION
- Water intake recommendation

💡 TIPS
- 3-5 personalized lifestyle improvements

🔥 MOTIVATION
- One powerful motivational line for ${name}
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ result: response.text });

  } catch (err) {
    console.error("API ERROR:", err.message);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}