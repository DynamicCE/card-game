
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
      const audio = new Audio("/card-shuffle.mp3");
      audio.volume = 0.5; // Ses seviyesini azalt
      await audio.play().catch(() => {});
      
      // 200ms sonra swoosh sesi çal
      setTimeout(() => {
        const swoosh = new Audio("/swoosh.mp3");
        swoosh.volume = 0.3;
        swoosh.play().catch(() => {});
      }, 200);
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
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        exit={{ 
          x: exitX,
          y: exitY,
          opacity: 0,
          scale: 0.8,
          transition: { duration: 0.3, ease: "easeIn" }
        }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
        whileDrag={{ scale: 1.02 }}
      >
        {children(dragDirection)}
      </motion.div>
    </AnimatePresence>
  );
}; 
