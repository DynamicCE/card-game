import { Card as CardUI } from "@/components/ui/card";
import { motion, useAnimation, PanInfo, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CardContentProps {
  noCards: boolean;
  currentCard: any;
  currentCardIndex?: number;
  setCurrentCardIndex?: (value: number) => void;
  totalCards?: number;
  isSoundOn?: boolean;
  theme?: {
    gradient: string;
    border: string;
    glow: string;
    icon: string;
  };
}

export const CardContent = ({
  noCards,
  currentCard,
  currentCardIndex = 0,
  setCurrentCardIndex,
  totalCards = 0,
  isSoundOn = true,
  theme
}: CardContentProps) => {
  const [dragDirection, setDragDirection] = useState<string>("");
  const [exitX, setExitX] = useState<number>(0);
  const [exitY, setExitY] = useState<number>(0);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;

    if (Math.abs(xOffset) > swipeThreshold || Math.abs(yOffset) > swipeThreshold) {
      let direction = "";
      if (Math.abs(xOffset) > Math.abs(yOffset)) {
        direction = xOffset > 0 ? "right" : "left";
        setExitX(xOffset > 0 ? 1000 : -1000);
        setExitY(0);
      } else {
        direction = yOffset > 0 ? "down" : "up";
        setExitX(0);
        setExitY(yOffset > 0 ? 1000 : -1000);
      }

      // Görsel geri bildirim efektleri
      const feedback = document.createElement("div");
      feedback.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl z-50 pointer-events-none";
      feedback.style.animation = "feedbackPop 1s ease-out forwards";
      
      switch(direction) {
        case "right":
          feedback.textContent = "🍺";
          break;
        case "left":
          feedback.textContent = "✅";
          break;
        case "up":
          feedback.textContent = "⭐";
          break;
        case "down":
          feedback.textContent = "🔄";
          break;
      }
      
      document.body.appendChild(feedback);
      setTimeout(() => feedback.remove(), 1000);

      if (setCurrentCardIndex) {
        setTimeout(() => {
          setCurrentCardIndex(currentCardIndex + 1);
          setExitX(0);
          setExitY(0);
        }, 500);
      }
      
      if (isSoundOn) {
        const audio = new Audio("/card-shuffle.mp3");
        audio.play().catch(() => {});
      }

    } else {
      setExitX(0);
      setExitY(0);
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;
    
    if (Math.abs(xOffset) > Math.abs(yOffset)) {
      setDragDirection(xOffset > 50 ? "right" : xOffset < -50 ? "left" : "");
    } else {
      setDragDirection(yOffset > 50 ? "down" : yOffset < -50 ? "up" : "");
    }
  };

  if (noCards) {
    return (
      <div className="text-center p-4">
        <p className="text-lg font-medium text-muted-foreground">
          Bu kategoride kart bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[3/4]">
      <style>
        {`
          @keyframes feedbackPop {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
          }
        `}
      </style>
      <AnimatePresence>
        <motion.div
          key={currentCardIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            transition: { duration: 0.3 }
          }}
          exit={{ 
            x: exitX,
            y: exitY,
            opacity: 0,
            transition: { duration: 0.3 }
          }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.9}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
        >
          <CardUI 
            className={`w-full h-full bg-gradient-to-br ${theme?.gradient || 'from-primary via-secondary to-primary'} 
              ${theme?.border} ${theme?.glow} shadow-xl transition-all duration-300
              ${dragDirection === "right" ? "border-red-500 border-4 shadow-lg shadow-red-500/50" : ""}
              ${dragDirection === "left" ? "border-green-500 border-4 shadow-lg shadow-green-500/50" : ""}
              ${dragDirection === "up" ? "border-yellow-500 border-4 shadow-lg shadow-yellow-500/50" : ""}
              ${dragDirection === "down" ? "border-blue-500 border-4 shadow-lg shadow-blue-500/50" : ""}`}
          >
            <div className="w-full h-full flex flex-col items-center justify-between p-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <span className="text-4xl">{theme?.icon}</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-white text-center mb-4">
                  {currentCard.content}
                </p>
                {currentCard.alternativeTask && (
                  <p className="mt-2 text-sm text-white/80">
                    🔄 Alternatif: {currentCard.alternativeTask}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center gap-2">
                {currentCard.timeLimit && (
                  <p className="text-sm text-white/80">
                    ⏱️ {currentCard.timeLimit} saniye
                  </p>
                )}
                {currentCard.requiresProps && (
                  <p className="text-sm text-white/80">
                    📱 Telefon gerekli
                  </p>
                )}
              </div>

              {dragDirection && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: dragDirection === "up" ? 20 : dragDirection === "down" ? -20 : 0, x: dragDirection === "left" ? 20 : dragDirection === "right" ? -20 : 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white"
                >
                  {dragDirection === "right" && (
                    <div className="flex flex-col items-center">
                      <span className="text-6xl mb-2">🍺</span>
                      <span className="text-2xl">İçerim!</span>
                    </div>
                  )}
                  {dragDirection === "left" && (
                    <div className="flex flex-col items-center">
                      <span className="text-6xl mb-2">✅</span>
                      <span className="text-2xl">Yaparım!</span>
                    </div>
                  )}
                  {dragDirection === "up" && (
                    <div className="flex flex-col items-center">
                      <span className="text-6xl mb-2">⭐</span>
                      <span className="text-2xl">Favori!</span>
                    </div>
                  )}
                  {dragDirection === "down" && (
                    <div className="flex flex-col items-center">
                      <span className="text-6xl mb-2">🔄</span>
                      <span className="text-2xl">Alternatif</span>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </CardUI>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
