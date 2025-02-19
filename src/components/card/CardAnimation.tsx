import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface CardAnimationProps {
  currentCardIndex: number;
  setCurrentCardIndex?: (value: number) => void;
  isSoundOn?: boolean;
  children: (dragDirection: string) => ReactNode;
}

export const CardAnimation = ({
  currentCardIndex,
  setCurrentCardIndex,
  isSoundOn = true,
  children
}: CardAnimationProps) => {
  const [dragDirection, setDragDirection] = useState<string>("");
  const [exitX, setExitX] = useState<number>(0);
  const [exitY, setExitY] = useState<number>(0);

  const playCardSound = async () => {
    if (isSoundOn) {
      const audio = new Audio("/sounds/cardsound.wav");
      audio.volume = 0.5; // Ses seviyesini azalt
      await audio.play().catch((error) => {
        console.error("Ses çalma hatası:", error);
      });
    }
  };

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

      await playCardSound();

      if (setCurrentCardIndex) {
        setTimeout(() => {
          setCurrentCardIndex(currentCardIndex + 1);
          setExitX(0);
          setExitY(0);
          setDragDirection("");
        }, 200);
      }
    } else {
      setExitX(0);
      setExitY(0);
      setDragDirection("");
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentCardIndex}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: { 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
            scale: { duration: 0.25 },
            opacity: { duration: 0.2 }
          }
        }}
        exit={{ 
          x: exitX,
          y: exitY,
          opacity: 0,
          scale: 0.95,
          rotate: exitX ? (exitX > 0 ? 15 : -15) : (exitY > 0 ? -10 : 10),
          transition: { 
            duration: 0.2,
            ease: [0.4, 0, 1, 1]
          }
        }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing will-change-transform"
        whileDrag={{ 
          scale: 1.02,
          rotate: dragDirection === "right" ? 5 : dragDirection === "left" ? -5 : 0,
          transition: { duration: 0.1 }
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {children(dragDirection)}
      </motion.div>
    </AnimatePresence>
  );
}; 
