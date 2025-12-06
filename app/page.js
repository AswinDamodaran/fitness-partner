"use client"
import MainForm from "@/components/form/MainForm";
import PlanGenerator from "@/components/PlanGenerator";
import { useState } from "react";

export default function Home() {

  const [plan, setPlan] = useState("");    
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = async (formData) => {
    try {
      setIsLoading(true);
      setPlan("");

      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setPlan(data.result || "No plan generated.");
    } catch (err) {
      console.error(err);
      setPlan("Something went wrong while generating the plan.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
   <div className="bg-lightBg dark:bg-darkBg p-5 mx-auto flex flex-col md:flex-row items-stretch justify-center min-h-[90vh] gap-6">

    <MainForm onGenerate={handleGeneratePlan} isLoading={isLoading}/>
    <PlanGenerator plan={plan} isLoading={isLoading}/>
   </div>
  );
}
