
import { Button } from "@/components/ui/button";
import { Card as CardUI } from "@/components/ui/card";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardData {
  id: string;
  content: string;
  category: string;
}

interface CardContentProps {
  noCards: boolean;
  currentCard: CardData | null;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
  currentCardIndex?: number;
  setCurrentCardIndex?: (index: number) => void;
  totalCards?: number;
  isSoundOn?: boolean;
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
}: CardContentProps) => {
  const navigate = useNavigate();

  if (noCards) {
    return (
      <div className="text-center p-4">
        <p className="text-lg font-medium text-muted-foreground">
          Bu kategoride kart bulunmamaktadır.
        </p>
        <Button 
          className="mt-4"
          onClick={() => navigate('/')}
        >
          Ana Sayfaya Dön
        </Button>
      </div>
    );
  }

  const handlePrevCard = () => {
    if (setCurrentCardIndex) {
      setIsFlipped(false);
      setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards);
      if (isSoundOn) {
        const audio = new Audio("/card-shuffle.mp3");
        audio.play().catch(() => {});
      }
    }
  };

  const handleNextCard = () => {
    if (setCurrentCardIndex) {
      setIsFlipped(false);
      setCurrentCardIndex((prev) => (prev + 1) % totalCards);
      if (isSoundOn) {
        const audio = new Audio("/card-shuffle.mp3");
        audio.play().catch(() => {});
      }
    }
  };

  return (
    <>
      <div className="relative w-full h-[70vh] perspective-1000">
        <div
          className={`w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="absolute w-full h-full backface-hidden">
            <CardUI className="w-full h-full bg-gradient-to-br from-primary via-secondary to-primary shadow-xl">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-4xl font-bold text-white">
                  Do or Drink
                </p>
              </div>
            </CardUI>
          </div>

          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <CardUI className="w-full h-full bg-gradient-to-br from-accent via-accent/90 to-accent shadow-xl">
              <div className="w-full h-full flex items-center justify-center p-8">
                <p className="text-2xl font-bold text-accent-foreground text-center">
                  {currentCard?.content}
                </p>
              </div>
            </CardUI>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mt-8 px-4">
        <Button
          variant="ghost"
          size="lg"
          onClick={handlePrevCard}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeftCircle size={32} />
        </Button>
        
        <span className="text-sm text-muted-foreground">
          {currentCardIndex + 1} / {totalCards}
        </span>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={handleNextCard}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowRightCircle size={32} />
        </Button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Kartı çevirmek için tıklayın
      </p>
    </>
  );
};
