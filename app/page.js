"use client"
import MainForm from "@/components/form/MainForm";
import PlanGenerator from "@/components/PlanGenerator";
import { useState } from "react";

export default function Home() {

  const [plan, setPlan] = useState("");    
  const [status, setStatus] = useState("idle");

  const handleGeneratePlan = async (formData) => {
    try {
      setStatus("loading");
      setPlan("");

      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setPlan(data.result || "No plan generated.");
      setStatus("done");
    } catch (err) {
      console.error(err);
      setPlan("Something went wrong while generating the plan.");
    } finally {
      setStatus("idle");
    }
  };


  return (
   <div className="bg-lightBg dark:bg-darkBg p-5 mx-auto flex flex-col md:flex-row items-stretch justify-center min-h-[90vh] gap-6">

    <MainForm onGenerate={handleGeneratePlan} status={status}/>
    <PlanGenerator plan={plan} status={status}/>
   </div>
  );
}
