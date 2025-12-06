"use client";
import { useState } from "react";
import FormField from "./FormField";
import SelectField from "./SelectField";
import { Button } from "../ui/button";
import { User, ContactRound, Venus, Ruler, Weight, MapPin, CookingPot } from "lucide-react";

export default function MainForm() {
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
        ["medical", "stress"].includes(key) === false && // optional fields
        !formData[key].trim()
      ) {
        newErrors[key] = `This field is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form Submitted Successfully!");
      // Send data to backend here
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-lightSub dark:bg-darkSub p-6 rounded-md w-full max-w-xl mx-auto space-y-3"
    >

      <FormField icon={User} label="Name" name="name" type="text" value={formData.name} onChange={handleChange} error={errors.name} />


      <div className="flex gap-5 justify-between w-full">
        <div className="flex-1">
          <FormField icon={ContactRound} label="Age" name="age" type="number" value={formData.age} onChange={handleChange} error={errors.age} />
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
          <FormField icon={Ruler} label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} error={errors.height} />
        </div>


        <div className="flex-1">
          <FormField icon={Weight} label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} error={errors.weight} />
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
            label="Fitness Goal"
            name="goal"
            options={["Weight Loss", "Muscle Gain", "Endurance", "General Fitness"]}
            value={formData.goal}
            onChange={handleChange}
            error={errors.goal}
          />
        </div>


        <div className="flex-1">
          <SelectField
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
        label="Medical History (Optional)"
        name="medical"
        type="text"
        value={formData.medical}
        onChange={handleChange}
        error={errors.medical}
        required={false}
      />

      <FormField
        label="Stress Level (Optional)"
        name="stress"
        type="text"
        value={formData.stress}
        onChange={handleChange}
        error={errors.stress}
        required={false}
      />

      <Button
        type="submit"
        variant="secondary"
        className="w-full bg-main text-[#e6e6e6] mt-2 font-semibold p-2 rounded-md hover:opacity-90 transition-all"
      >
        Submit
      </Button>
    </form>
  );
}



