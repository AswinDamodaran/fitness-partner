// components/PlanGenerator.jsx
"use client";
import { Brain } from "lucide-react";

export default function PlanGenerator({ plan, isLoading }) {
  return (
     <div className="w-full md:w-[60vw] mx-auto md:mx-0 md:ml-8 mt-6 md:mt-0 bg-lightSub dark:bg-darkSub h-full flex flex-col items-center justify-center min-h-[85vh] rounded-md"> 
      <h2 className="text-xl font-semibold mb-3 text-heading flex items-center gap-2"><Brain/>Your AI Plan</h2>

      {isLoading && (
        <p className="text-sm text-gray-400">Generating your personalized plan...</p>
      )}

      {!isLoading && !plan && (
        <p className="text-sm text-gray-500">
          Fill the form and submit to see your workout & diet plan here.
        </p>
      )}

      {plan && (
        <pre className="bg-lightSub dark:bg-darkSub text-sm p-4 rounded-md whitespace-pre-wrap">
          {plan}
        </pre>
      )}
    </div>
  );
}
