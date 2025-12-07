"use client"
import MainForm from "@/components/form/MainForm";
import PlanGenerator from "@/components/PlanGenerator";
import { useState } from "react";

export default function Home() {

  const [plan, setPlan] = useState(null); 
  const [status, setStatus] = useState("idle");

  const handleGeneratePlan = async (formData) => {
    try {
      setStatus("loading");
      setPlan(null); 

      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("📦 API Response:", data); 
      
      setPlan(data);
      setStatus("success");
      
    } catch (err) {
      console.error(err);
      setStatus("error");
      setPlan(null);
    }

  };

  return (
   <div className="bg-lightBg dark:bg-darkBg p-5 mx-auto flex flex-col md:flex-row items-stretch justify-center min-h-[90vh] gap-6">
    <MainForm onGenerate={handleGeneratePlan} status={status}/>
    <PlanGenerator plan={plan} status={status}/>
   </div>
  );
}