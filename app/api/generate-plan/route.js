import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { status: "error", error: "API key not configured" },
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

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    const prompt = `
You are a certified fitness coach and nutritionist. Generate a complete personalized diet + workout plan.

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

CRITICAL: Return ONLY a valid JSON object. NO markdown, NO backticks, NO extra text. Start with { and end with }.

{
  "status": "success",
  "data": {
    "info": {
      "bmi": "${bmi}",
      "bmiCategory": "Normal/Underweight/Overweight/Obese",
      "goalSummary": "Brief description of what ${name} needs to achieve ${goal}",
      "estimatedTimeframe": "Expected duration to see results"
    },
    "image": {
      "suggestion": "Description for ideal fitness image",
      "motivationalQuote": "One powerful motivational line for ${name}"
    },
    "workout": {
      "overview": "Brief workout strategy summary",
      "weeklyPlan": [
        {
          "day": "Monday",
          "focus": "Chest & Triceps",
          "exercises": [
            {"name": "Push-ups", "sets": "3", "reps": "12-15", "rest": "60 sec", "targetMuscles": "Chest, Triceps"}
          ]
        },
        {
          "day": "Tuesday",
          "focus": "Back & Biceps",
          "exercises": [
            {"name": "Pull-ups", "sets": "3", "reps": "8-10", "rest": "90 sec", "targetMuscles": "Back, Biceps"}
          ]
        },
        {
          "day": "Wednesday",
          "focus": "Legs",
          "exercises": [
            {"name": "Squats", "sets": "4", "reps": "10-12", "rest": "90 sec", "targetMuscles": "Quads, Glutes"}
          ]
        },
        {
          "day": "Thursday",
          "focus": "Shoulders & Core",
          "exercises": [
            {"name": "Shoulder Press", "sets": "3", "reps": "10-12", "rest": "60 sec", "targetMuscles": "Shoulders"}
          ]
        },
        {
          "day": "Friday",
          "focus": "Full Body",
          "exercises": [
            {"name": "Burpees", "sets": "3", "reps": "15", "rest": "60 sec", "targetMuscles": "Full Body"}
          ]
        },
        {
          "day": "Saturday",
          "focus": "Cardio & Abs",
          "exercises": [
            {"name": "Running", "sets": "1", "reps": "30 min", "rest": "N/A", "targetMuscles": "Cardiovascular"}
          ]
        },
        {
          "day": "Sunday",
          "focus": "Rest/Active Recovery",
          "exercises": [
            {"name": "Light yoga or stretching", "sets": "1", "reps": "20-30 min", "rest": "N/A", "targetMuscles": "Full Body Recovery"}
          ]
        }
      ],
      "tips": ["Warm up for 5-10 minutes before workout", "Cool down and stretch after", "Progressive overload weekly"]
    },
    "diet": {
      "dailyCalories": "2000-2200 kcal",
      "macros": {
        "protein": "150g",
        "carbs": "200g",
        "fats": "60g"
      },
      "meals": {
        "breakfast": {
          "foods": ["Oatmeal with berries", "Scrambled eggs with spinach", "Green tea"],
          "calories": "400-500 kcal"
        },
        "lunch": {
          "foods": ["Grilled chicken breast", "Brown rice", "Mixed vegetables", "Avocado"],
          "calories": "600-700 kcal"
        },
        "dinner": {
          "foods": ["Salmon fillet", "Quinoa", "Steamed broccoli", "Side salad"],
          "calories": "500-600 kcal"
        },
        "snacks": {
          "foods": ["Greek yogurt", "Handful of almonds", "Protein shake", "Apple"],
          "calories": "300-400 kcal"
        }
      },
      "hydration": "3-4 liters of water daily, increase on workout days"
    },
    "extra": {
      "lifestyleTips": [
        "Get 7-8 hours of quality sleep every night",
        "Manage stress through meditation or deep breathing",
        "Track your progress with photos and measurements weekly",
        "Stay consistent with your routine",
        "Listen to your body and rest when needed"
      ],
      "supplementsSuggestion": ["Whey protein powder", "Multivitamin", "Omega-3 fish oil"],
      "progressTracking": "Measure weight and body measurements every 2 weeks",
      "warnings": ["Consult a doctor before starting if you have medical conditions", "Start slow and gradually increase intensity"]
    }
  }
}

Generate a complete personalized plan based on the user profile. Adapt exercises for ${location}. Follow ${diet} preferences strictly.

it should strictly be in the jason format as given above inside {}
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let output = response.text;
    

    output = output.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const json = JSON.parse(output);

    return NextResponse.json(json);

  } catch (err) {
    console.error("API ERROR:", err.message);
    return NextResponse.json(
      { 
        status: "error",
        error: "Failed to generate plan",
        details: err.message 
      },
      { status: 500 }
    );
  }
}