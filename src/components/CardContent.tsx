import { Card as CardUI } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useState } from "react";

interface CardContentProps {
  noCards: boolean;
  currentCard: any;
  isFlipped: boolean;
  setIsFlipped: (value: boolean) => void;
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
  isFlipped,
  setIsFlipped,
  currentCardIndex = 0,
  setCurrentCardIndex,
  totalCards = 0,
  isSoundOn = true,
  theme
}: CardContentProps) => {
  const controls = useAnimation();
  const [dragDirection, setDragDirection] = useState<string>("");

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;

    if (Math.abs(xOffset) > swipeThreshold || Math.abs(yOffset) > swipeThreshold) {
      let direction = "";
      if (Math.abs(xOffset) > Math.abs(yOffset)) {
        direction = xOffset > 0 ? "right" : "left";
        await controls.start({ 
          x: xOffset > 0 ? 1000 : -1000,
          opacity: 0,
          transition: { duration: 0.5 }
        });
      } else {
        direction = yOffset > 0 ? "down" : "up";
        await controls.start({ 
          y: yOffset > 0 ? 1000 : -1000,
          opacity: 0,
          transition: { duration: 0.5 }
        });
      }

      if (setCurrentCardIndex) {
        setCurrentCardIndex(currentCardIndex + 1);
      }
      
      if (isSoundOn) {
        const audio = new Audio("/card-shuffle.mp3");
        audio.play().catch(() => {});
      }

      controls.set({ x: 0, y: 0, opacity: 1 });
      setDragDirection("");
    } else {
      controls.start({ x: 0, y: 0, opacity: 1 });
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
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={controls}
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
        style={{
          perspective: 1000
        }}
      >
        <div 
          className={`w-full h-full transition-transform duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d'
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Ön yüz */}
          <div 
            className="absolute w-full h-full"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <CardUI 
              className={`w-full h-full bg-gradient-to-br ${theme?.gradient || 'from-primary via-secondary to-primary'} 
                ${theme?.border} ${theme?.glow} shadow-xl transition-all duration-300
                ${dragDirection === "right" ? "border-red-500 border-4" : ""}
                ${dragDirection === "left" ? "border-green-500 border-4" : ""}
                ${dragDirection === "up" ? "border-yellow-500 border-4" : ""}`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <span className="text-6xl mb-4">{theme?.icon}</span>
                <p className="text-4xl font-bold text-white text-center">
                  Do or Drink
                </p>
                {currentCard.timeLimit && (
                  <p className="mt-4 text-sm text-white/80">
                    ⏱️ {currentCard.timeLimit} saniye
                  </p>
                )}
                {dragDirection && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold"
                  >
                    {dragDirection === "right" && "🍺 İçerim!"}
                    {dragDirection === "left" && "✅ Yaparım!"}
                    {dragDirection === "up" && "⭐ Favori!"}
                    {dragDirection === "down" && "🔄 Alternatif"}
                  </motion.div>
                )}
              </div>
            </CardUI>
          </div>

          {/* Arka yüz */}
          <div 
            className="absolute w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <CardUI className={`w-full h-full bg-gradient-to-br ${theme?.gradient || 'from-accent via-accent/90 to-accent'} ${theme?.border} ${theme?.glow} shadow-xl`}>
              <div className="w-full h-full flex flex-col items-center justify-center p-8">
                <p className="text-2xl font-bold text-white text-center">
                  {currentCard.content}
                </p>
                {currentCard.alternativeTask && (
                  <p className="mt-4 text-sm text-white/80">
                    Alternatif: {currentCard.alternativeTask}
                  </p>
                )}
                {currentCard.requiresProps && (
                  <p className="mt-2 text-sm text-white/80">
                    📱 Telefon gerekli
                  </p>
                )}
              </div>
            </CardUI>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
