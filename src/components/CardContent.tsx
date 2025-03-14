import { CardAnimation } from "./card/CardAnimation";
import { CardBody } from "./card/CardBody";
import { CardFeedback } from "./card/CardFeedback";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Category } from "./card/CardBody";

interface CardData {
  id: string;
  content: string;
  category: Category;
}

interface CardContentProps {
  noCards: boolean;
  currentCard: CardData | null;
  currentCardIndex?: number;
  setCurrentCardIndex?: (value: number) => void;
  totalCards?: number;
  isSoundOn?: boolean;
  onBack: () => void;
}

export const CardContent = ({
  noCards,
  currentCard,
  currentCardIndex = 0,
  setCurrentCardIndex,
  totalCards = 0,
  isSoundOn = true,
  onBack
}: CardContentProps) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  if (noCards) {
    return (
      <div className="text-center p-4">
        <p className="text-lg font-medium text-muted-foreground">
          Bu kategoride kart bulunmamaktadır.
        </p>
        <Button 
          className="mt-4"
          onClick={onBack}
        >
          Ana Sayfaya Dön
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[3/4]">
      <CardAnimation
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        isSoundOn={isSoundOn}
        category={currentCard?.category || "friends_fun"}
      >
        {(dragDirection: string) => (
          <>
            <CardBody
              content={currentCard?.content || ""}
              category={currentCard?.category || "friends_fun"}
              dragDirection={dragDirection}
              isFirstCard={currentCardIndex === 0}
            />
            <CardFeedback dragDirection={dragDirection} />
          </>
        )}
      </CardAnimation>
    </div>
  );
};
