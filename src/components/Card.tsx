import { useState } from "react";
import { cn } from "@/lib/utils";

const tasks = [
  { type: "do", text: "En sevdiğin dansı yap" },
  { type: "drink", text: "2 yudum iç" },
  { type: "do", text: "Tavuk gibi ses çıkar" },
  { type: "drink", text: "3 yudum iç" },
  // Daha fazla görev eklenebilir
];

export const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentTask, setCurrentTask] = useState(() => 
    tasks[Math.floor(Math.random() * tasks.length)]
  );

  const handleFlip = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentTask(tasks[Math.floor(Math.random() * tasks.length)]);
      }, 300);
    } else {
      setIsFlipped(true);
    }
  };

  return (
    <div
      className={cn(
        "w-72 h-96 cursor-pointer perspective-1000",
        "transition-transform duration-300 ease-in-out",
        isFlipped ? "rotate-y-180" : ""
      )}
      onClick={handleFlip}
    >
      <div className="relative w-full h-full">
        {/* Ön yüz */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden",
            "bg-primary rounded-xl shadow-xl flex items-center justify-center",
            "text-2xl font-bold text-white p-6 text-center",
            isFlipped ? "hidden" : ""
          )}
        >
          Kartı Çevir
        </div>

        {/* Arka yüz */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rotate-y-180",
            "rounded-xl shadow-xl flex flex-col items-center justify-center p-6",
            "text-center",
            currentTask.type === "do" ? "bg-secondary" : "bg-accent",
            isFlipped ? "" : "hidden"
          )}
        >
          <div className="text-xl font-bold mb-4">
            {currentTask.type === "do" ? "YAP!" : "İÇ!"}
          </div>
          <div className="text-lg">
            {currentTask.text}
          </div>
        </div>
      </div>
    </div>
  );
};