// components/PlanGenerator.jsx
"use client";
import { Brain } from "lucide-react";
import { RingLoader } from "react-spinners";

export default function PlanGenerator({ plan, status }) {
  return (
     <div className="w-full md:w-[60vw] mx-auto md:mx-0 md:ml-8 mt-6 md:mt-0 bg-lightSub dark:bg-darkSub flex flex-col items-center justify-center h-[85vh] rounded-md "> 
      <h2 className="text-xl font-semibold mb-3 text-heading flex items-center gap-2"><Brain/>Your AI Plan</h2>

      {status==="loading" && (
        <p className="text-sm text-gray-400 flex gap-3 items-center"><RingLoader size={24} color="#730ED2"/>Generating your personalized plan...</p>
      )}

      {status==="idle" && !plan && (
        <p className="text-sm text-gray-500">
          Fill the form and submit to see your workout & diet plan here.
        </p>
      )}

      {plan && (
        <pre className="bg-lightSub dark:bg-darkSub text-sm p-4 rounded-md whitespace-pre-wrap overflow-scroll">
          {plan}
        </pre>
      )}
    </div>
  );
}
