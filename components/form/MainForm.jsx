"use client";
import { useState } from "react";
import FormField from "./FormField";
import SelectField from "./SelectField";
import { Button } from "../ui/button";
import {
  User,
  ContactRound,
  Venus,
  Ruler,
  Weight,
  MapPin,
  CookingPot,
  PersonStanding,
  BicepsFlexed,
  ClipboardPlus,
} from "lucide-react";
import { Fascinate } from "next/font/google";
import { RingLoader } from "react-spinners";

export default function MainForm({ onGenerate, status }) {
  const [plan, setPlan] = useState(""); // store AI-generated plan

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    level: "",
    location: "",
    diet: "",
    medical: "",
    stress: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (
        ["medical", "stress"].includes(key) === false &&
        !formData[key].trim()
      ) {
        newErrors[key] = `This field is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 🔥 Send data up to Home
      onGenerate && onGenerate(formData);
    }
  };

  return (
    <div className="space-y-5 h-full flex flex-col justify-between min-h-[85vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-lightSub dark:bg-darkSub p-6 rounded-md w-full max-w-lg mx-auto space-y-3"
      >
        <FormField
          icon={User}
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <div className="flex gap-5 justify-between w-full">
          <div className="flex-1">
            <FormField
              icon={ContactRound}
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              error={errors.age}
            />
          </div>

          <div className="flex-1">
            <SelectField
              icon={Venus}
              label="Gender"
              name="gender"
              options={["Male", "Female", "Other"]}
              value={formData.gender}
              onChange={handleChange}
              error={errors.gender}
            />
          </div>
        </div>

        <div className="flex gap-5 justify-between w-full">
          <div className="flex-1">
            <FormField
              icon={Ruler}
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              error={errors.height}
            />
          </div>

          <div className="flex-1">
            <FormField
              icon={Weight}
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              error={errors.weight}
            />
          </div>
        </div>

        <div className="flex gap-5 justify-between w-full">
          <div className="flex-1">
            <SelectField
              icon={MapPin}
              label="Workout Location"
              name="location"
              options={["Home", "Gym", "Outdoor"]}
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
            />
          </div>

          <div className="flex-1">
            <SelectField
              icon={CookingPot}
              label="Dietary Preference"
              name="diet"
              options={["Veg", "Non-Veg", "Vegan", "Keto"]}
              value={formData.diet}
              onChange={handleChange}
              error={errors.diet}
            />
          </div>
        </div>

        <div className="flex gap-5 justify-between w-full">
          <div className="flex-1">
            <SelectField
              icon={PersonStanding}
              label="Fitness Goal"
              name="goal"
              options={[
                "Weight Loss",
                "Muscle Gain",
                "Endurance",
                "General Fitness",
              ]}
              value={formData.goal}
              onChange={handleChange}
              error={errors.goal}
            />
          </div>

          <div className="flex-1">
            <SelectField
              icon={BicepsFlexed}
              label="Current Fitness Level"
              name="level"
              options={["Beginner", "Intermediate", "Advanced"]}
              value={formData.level}
              onChange={handleChange}
              error={errors.level}
            />
          </div>
        </div>

        <FormField
          icon={ClipboardPlus}
          label="Medical History (Optional)"
          name="medical"
          type="text"
          value={formData.medical}
          onChange={handleChange}
          required={false}
        />

        <FormField
          icon={ClipboardPlus}
          label="Stress Level (Optional)"
          name="stress"
          type="text"
          value={formData.stress}
          onChange={handleChange}
          required={false}
        />

        <Button
          type="submit"
          disabled={status === "loading"}
          variant="secondary"
          className="w-full bg-main text-[#e6e6e6] mt-2 font-semibold p-2 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
        >
          {status === "loading" ? (
            <div className="flex items-center gap-3">
              <RingLoader size={20} color="white"/>
              Generating Plan...
            </div>
          ) : "Submit"}
        </Button>
      </form>

      {/* Display AI Result */}
      {plan && (
        <pre className="bg-darkSub text-white p-4 rounded whitespace-pre-wrap max-w-lg mx-auto">
          {plan}
        </pre>
      )}
    </div>
  );
}
