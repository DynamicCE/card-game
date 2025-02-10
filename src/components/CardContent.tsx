import { Button } from "@/components/ui/button";
import { Card as CardUI } from "@/components/ui/card";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SpicyLevel } from "./Card";

interface CardData {
  id: string;
  content: string;
  category: string;
  spicyLevel: SpicyLevel;
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

const getSpicyLevelColors = (level: SpicyLevel): { background: string; text: string } => {
  switch (level) {
    case "mild":
      return {
        background: "from-[#F2FCE2] via-[#E5DEFF] to-[#F2FCE2]",
        text: "text-gray-800"
      };
    case "medium":
      return {
        background: "from-[#FEF7CD] via-[#FEC6A1] to-[#FEF7CD]",
        text: "text-gray-800"
      };
    case "spicy":
      return {
        background: "from-[#F97316] via-[#D946EF] to-[#F97316]",
        text: "text-white"
      };
    case "extra_spicy":
      return {
        background: "from-[#8B5CF6] via-[#ea384c] to-[#8B5CF6]",
        text: "text-white"
      };
    default:
      return {
        background: "from-primary via-secondary to-primary",
        text: "text-white"
      };
  }
};

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

  const handleNextCard = () => {
    if (setCurrentCardIndex) {
      setCurrentCardIndex(currentCardIndex);
      if (isSoundOn) {
        const audio = new Audio("/card-shuffle.mp3");
        audio.play().catch(() => {});
      }
    }
  };

  const colors = currentCard ? getSpicyLevelColors(currentCard.spicyLevel) : getSpicyLevelColors("mild");

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
            <CardUI className={`w-full h-full bg-gradient-to-br ${colors.background} shadow-xl`}>
              <div className="w-full h-full flex items-center justify-center">
                <p className={`text-4xl font-bold ${colors.text}`}>
                  Do or Drink
                </p>
              </div>
            </CardUI>
          </div>

          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <CardUI className={`w-full h-full bg-gradient-to-br ${colors.background} shadow-xl`}>
              <div className="w-full h-full flex items-center justify-center p-8">
                <p className={`text-2xl font-bold ${colors.text} text-center`}>
                  {currentCard?.content}
                </p>
              </div>
            </CardUI>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full mt-8">
        <Button
          size="lg"
          onClick={handleNextCard}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity px-8"
        >
          Sıradaki Oyuncu
        </Button>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Kartı çevirmek için tıklayın
      </p>
    </>
  );
};
