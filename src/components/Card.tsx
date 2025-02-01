import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tasksByCategory = {
  basic: [
    { type: "do", text: "En sevdiğin dansı yap" },
    { type: "drink", text: "2 yudum iç" },
    { type: "do", text: "Tavuk gibi ses çıkar" },
    { type: "drink", text: "3 yudum iç" },
    { type: "do", text: "Maymun taklidi yap" },
    { type: "drink", text: "Shot iç" },
    { type: "do", text: "1 dakika boyunca şarkı söyle" },
    { type: "drink", text: "Yanındakiyle beraber için" },
    { type: "do", text: "En komik anını anlat" },
    { type: "drink", text: "Herkes senin için içsin" },
    { type: "do", text: "Bir hayvan taklidi yap" },
    { type: "drink", text: "4 yudum iç" },
    { type: "do", text: "Gözlerin kapalı 10 saniye dans et" },
    { type: "drink", text: "Sağındaki kişiyle beraber için" }
  ],
  party: [
    { type: "do", text: "10 şınav çek" },
    { type: "drink", text: "4 yudum iç" },
    { type: "do", text: "Komik bir fıkra anlat" },
    { type: "drink", text: "Bardağını bitir" },
    { type: "do", text: "Bir dakika boyunca dans et" },
    { type: "drink", text: "İki kişiyle beraber iç" },
    { type: "do", text: "Bir şarkı söyle ve dans et" },
    { type: "drink", text: "Herkes içsin" },
    { type: "do", text: "En iyi dans hareketini göster" },
    { type: "drink", text: "5 yudum iç" }
  ],
  extreme: [
    { type: "do", text: "En kötü anını anlat" },
    { type: "drink", text: "5 yudum iç" },
    { type: "do", text: "1 tur boyunca aksanlı konuş" },
    { type: "drink", text: "Herkes senin için içsin" },
    { type: "do", text: "Telefondaki en utanç verici fotoğrafını göster" },
    { type: "drink", text: "Bardağını bitir ve yenisini doldur" },
    { type: "do", text: "Bir dakika boyunca tek ayak üstünde dur" },
    { type: "drink", text: "6 yudum iç" },
    { type: "do", text: "En çok utandığın anını anlat" },
    { type: "drink", text: "Shot iç ve dans et" }
  ],
  couples: [
    { type: "do", text: "Partnerine sarıl" },
    { type: "drink", text: "Partnerinle beraber için" },
    { type: "do", text: "Partnerine iltifat et" },
    { type: "drink", text: "Her ikiniz de birer yudum için" },
    { type: "do", text: "Partnerinle göz göze 30 saniye bakış" },
    { type: "drink", text: "Partnerinle aynı anda için" },
    { type: "do", text: "Partnerine bir şiir oku" },
    { type: "drink", text: "Partnerinle beraber shot için" }
  ]
};

export const Card = ({ category = "basic" }: { category?: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentTask, setCurrentTask] = useState(() => {
    const tasks = tasksByCategory[category as keyof typeof tasksByCategory] || tasksByCategory.basic;
    return tasks[Math.floor(Math.random() * tasks.length)];
  });

  const handleFlip = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        const tasks = tasksByCategory[category as keyof typeof tasksByCategory] || tasksByCategory.basic;
        setCurrentTask(tasks[Math.floor(Math.random() * tasks.length)]);
      }, 300);
    } else {
      setIsFlipped(true);
    }
  };

  return (
    <motion.div
      className={cn(
        "w-72 h-96 cursor-pointer perspective-1000",
        "transition-transform duration-300 ease-in-out",
        isFlipped ? "rotate-y-180" : ""
      )}
      onClick={handleFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full h-full">
        <motion.div
          className={cn(
            "absolute w-full h-full backface-hidden",
            "bg-primary rounded-xl shadow-xl flex items-center justify-center",
            "text-2xl font-bold text-white p-6 text-center",
            isFlipped ? "hidden" : ""
          )}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl">🎲</span>
            Kartı Çevir
          </div>
        </motion.div>

        <motion.div
          className={cn(
            "absolute w-full h-full backface-hidden rotate-y-180",
            "rounded-xl shadow-xl flex flex-col items-center justify-center p-6",
            "text-center",
            currentTask.type === "do" ? "bg-secondary" : "bg-accent",
            isFlipped ? "" : "hidden"
          )}
          initial={false}
          animate={{ rotateY: isFlipped ? 0 : -180 }}
        >
          <div className="text-2xl font-bold mb-6">
            {currentTask.type === "do" ? "YAP! 🎯" : "İÇ! 🍺"}
          </div>
          <div className="text-xl font-medium">
            {currentTask.text}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};