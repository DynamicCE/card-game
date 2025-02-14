import { CardAnimation } from "./card/CardAnimation";
import { CardBody } from "./card/CardBody";
import { CardFeedback } from "./card/CardFeedback";

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
      <CardAnimation
        currentCardIndex={currentCardIndex}
        setCurrentCardIndex={setCurrentCardIndex}
        isSoundOn={isSoundOn}
      >
        {(dragDirection: string) => (
          <>
            <CardBody
              content={currentCard.content}
              alternativeTask={currentCard.alternativeTask}
              timeLimit={currentCard.timeLimit}
              requiresProps={currentCard.requiresProps}
              theme={theme}
              dragDirection={dragDirection}
            />
            <CardFeedback dragDirection={dragDirection} />
          </>
        )}
      </CardAnimation>
    </div>
  );
};
