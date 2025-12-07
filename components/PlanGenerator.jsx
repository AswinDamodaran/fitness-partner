import { Brain, Target, Dumbbell, UtensilsCrossed, Lightbulb, TrendingUp, Droplets, Pill, AlertCircle, Calendar } from "lucide-react";
import { CircleLoader } from "react-spinners";

export default function PlanGenerator({ plan, status }) {
  
  const planData = plan?.data || (plan?.status === "success" ? plan?.data : null);
  
  return (
    <div className="w-full md:w-[60vw] mx-auto md:mx-0 md:ml-8 mt-6 md:mt-0 bg-lightSub dark:bg-darkSub flex flex-col h-[85vh] rounded-md">
      <h2 className="text-xl font-semibold p-6 pb-3 text-heading flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
        <Brain className="text-purple-600" />
        Your AI Plan
      </h2>

      {status === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <CircleLoader size={50} color="#730ED2" />
          <p className="text-sm text-gray-400 mt-4">
            Generating your personalized plan...
          </p>
        </div>
      )}

      {status === "idle" && !plan && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-500 text-center px-6">
            Fill the form and submit to see your workout & diet plan here.
          </p>
        </div>
      )}

      {planData && (
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
         
          <div className="space-y-4">
          
            {planData.info && (
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3 mb-3">
                  <Target className="w-5 h-5 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      Your Profile Overview
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">BMI:</span>
                        <span className="font-semibold ml-2 text-gray-900 dark:text-white">
                          {planData.info.bmi} ({planData.info.bmiCategory})
                        </span>
                      </div>
                      <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                        <span className="text-gray-600 dark:text-gray-400">Timeline:</span>
                        <span className="font-semibold ml-2 text-gray-900 dark:text-white">
                          {planData.info.estimatedTimeframe}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                      <TrendingUp className="w-4 h-4 inline mr-1 text-green-600" />
                      {planData.info.goalSummary}
                    </p>
                  </div>
                </div>
              </div>
            )}


            {planData.image?.motivationalQuote && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-5 rounded-xl text-white shadow-lg">
                <p className="text-center font-semibold italic text-lg">
                  {planData.image.motivationalQuote}
                </p>
              </div>
            )}
          </div>

         
          {planData.workout && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  7-Day Workout Plan
                </h3>
                <p className="text-sm text-white/90 mt-1">
                  {planData.workout.overview}
                </p>
              </div>
              
              <div className="p-4 space-y-3">
                {planData.workout.weeklyPlan?.map((day, idx) => (
                  <details key={idx} className="group bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    <summary className="cursor-pointer font-semibold text-sm p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors list-none flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white">{day.day}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2">• {day.focus}</span>
                        </div>
                      </div>
                      <Calendar className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    
                    <div className="p-4 pt-2 space-y-2 bg-white dark:bg-gray-800">
                      {day.exercises?.map((ex, i) => (
                        <div key={i} className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50/50 dark:bg-orange-900/10 rounded-r">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">{ex.name}</p>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-600 dark:text-gray-400">
                            <span className="bg-white dark:bg-gray-700 px-2 py-1 rounded">
                              📊 {ex.sets} sets × {ex.reps} reps
                            </span>
                            <span className="bg-white dark:bg-gray-700 px-2 py-1 rounded">
                              ⏱️ Rest: {ex.rest}
                            </span>
                            <span className="bg-white dark:bg-gray-700 px-2 py-1 rounded">
                              🎯 {ex.targetMuscles}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>

              {planData.workout.tips && (
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 border-t border-orange-200 dark:border-orange-800">
                  <p className="text-xs font-semibold text-orange-900 dark:text-orange-300 mb-2">💪 Workout Tips:</p>
                  <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                    {planData.workout.tips.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          
          {planData.diet && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5" />
                  Nutrition Plan
                </h3>
                <p className="text-sm text-white/90 mt-1">
                  Daily Target: {planData.diet.dailyCalories}
                </p>
              </div>

              <div className="p-4 space-y-4">
                {planData.diet.macros && (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-center border border-blue-200 dark:border-blue-800">
                      <p className="text-xs text-blue-700 dark:text-blue-300 font-semibold">Protein</p>
                      <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
                        {planData.diet.macros.protein}
                      </p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-center border border-green-200 dark:border-green-800">
                      <p className="text-xs text-green-700 dark:text-green-300 font-semibold">Carbs</p>
                      <p className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
                        {planData.diet.macros.carbs}
                      </p>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg text-center border border-yellow-200 dark:border-yellow-800">
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 font-semibold">Fats</p>
                      <p className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">
                        {planData.diet.macros.fats}
                      </p>
                    </div>
                  </div>
                )}


                {planData.diet.meals && (
                  <div className="space-y-3">
                    {Object.entries(planData.diet.meals).map(([mealType, meal]) => (
                      <div key={mealType} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-bold text-sm capitalize text-gray-900 dark:text-white">
                            {mealType === "breakfast" && "🌅"} 
                            {mealType === "lunch" && "☀️"} 
                            {mealType === "dinner" && "🌙"} 
                            {mealType === "snacks" && "🍎"} 
                            {" "}{mealType}
                          </p>
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                            {meal.calories}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {meal.foods?.join(" • ")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}


                {planData.diet.hydration && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">Hydration Goal</p>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        {planData.diet.hydration}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}


          {planData.extra && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4">
                <h3 className="font-bold text-lg text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Additional Guidance
                </h3>
              </div>

              <div className="p-4 space-y-4">

                {planData.extra.lifestyleTips && (
                  <div>
                    <p className="font-semibold text-sm mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Lifestyle Tips
                    </p>
                    <ul className="space-y-2">
                      {planData.extra.lifestyleTips.map((tip, i) => (
                        <li key={i} className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-2 rounded flex items-start gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}


                {planData.extra.supplementsSuggestion && (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <p className="font-semibold text-sm mb-2 text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                      <Pill className="w-4 h-4" />
                      Recommended Supplements
                    </p>
                    <ul className="space-y-1 text-xs text-indigo-700 dark:text-indigo-400">
                      {planData.extra.supplementsSuggestion.map((supp, i) => (
                        <li key={i}>• {supp}</li>
                      ))}
                    </ul>
                  </div>
                )}


                {planData.extra.progressTracking && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="font-semibold text-sm mb-1 text-green-900 dark:text-green-300">
                      📊 Progress Tracking
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-400">
                      {planData.extra.progressTracking}
                    </p>
                  </div>
                )}


                {planData.extra.warnings && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="font-semibold text-sm mb-2 text-amber-900 dark:text-amber-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Important Warnings
                    </p>
                    <ul className="space-y-1">
                      {planData.extra.warnings.map((warning, i) => (
                        <li key={i} className="text-xs text-amber-700 dark:text-amber-400">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}