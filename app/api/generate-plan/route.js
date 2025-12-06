import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
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

    const prompt = `
You are a certified fitness coach and nutritionist.
Generate a complete personalized diet + workout plan.

USER PROFILE:
Name: ${name}
Age: ${age}
Gender: ${gender}
Height: ${height} cm
Weight: ${weight} kg
Workout Location: ${location}
Diet Preference: ${diet}
Fitness Goal: ${goal}
Current Fitness Level: ${level}
Medical History: ${medical || "None"}
Stress Level: ${stress || "Normal"}

RESPONSE FORMAT (IMPORTANT):

🏋️ WORKOUT PLAN
- 7-day routine based on fitness goal
- Include sets, reps, rest time, and target muscles

🥗 DIET PLAN
- Breakfast / Lunch / Dinner / Snacks
- Include foods based on diet preference
- Add calorie estimates

💡 TIPS
- 3 personalized lifestyle improvements

🔥 MOTIVATION
- One powerful motivational line
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return NextResponse.json({
      result: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
