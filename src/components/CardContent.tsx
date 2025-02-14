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
  alternativeTask?: string;
  timeLimit?: number;
}

interface CardContentProps {
  noCards: boolean;
  currentCard: CardData | null;
  currentCardIndex?: number;
  setCurrentCardIndex?: (value: number) => void;
  totalCards?: number;
  isSoundOn?: boolean;
}

export const CardContent = ({
  noCards,
  currentCard,
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

  return (
    <div className="relative w-full aspect-[3/4]">
      <CardAnimation
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        isSoundOn={isSoundOn}
      >
        {(dragDirection: string) => (
          <>
            <CardBody
              content={currentCard?.content || ""}
              alternativeTask={currentCard?.alternativeTask}
              timeLimit={currentCard?.timeLimit}
              category={currentCard?.category || "friends_fun"}
              dragDirection={dragDirection}
            />
            <CardFeedback dragDirection={dragDirection} />
          </>
        )}
      </CardAnimation>
    </div>
  );
};
