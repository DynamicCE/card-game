import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardUI } from "@/components/ui/card";
import { Shuffle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CardData {
  id: string;
  content: string;
  category: string;
}

const cards: Record<string, CardData[]> = {
  basic: [
    { id: "1", content: "Su iç", category: "basic" },
    { id: "2", content: "Dans et", category: "basic" },
    { id: "3", content: "Şarkı söyle", category: "basic" },
  ],
  party: [
    { id: "4", content: "Taklit yap", category: "party" },
    { id: "5", content: "Hikaye anlat", category: "party" },
  ],
  extreme: [
    { id: "6", content: "Zıpla", category: "extreme" },
    { id: "7", content: "Koş", category: "extreme" },
  ],
  couples: [
    { id: "8", content: "El ele tutuş", category: "couples" },
    { id: "9", content: "Sarıl", category: "couples" },
  ],
};

export const Card = ({ category }: { category: string }) => {
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  const drawCard = () => {
    const categoryCards = cards[category];
    if (!categoryCards || categoryCards.length === 0) {
      toast({
        title: "Hata",
        description: "Bu kategoride kart bulunamadı.",
        variant: "destructive",
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * categoryCards.length);
    setCurrentCard(categoryCards[randomIndex]);
    setIsFlipped(false);
  };

  useEffect(() => {
    drawCard();
  }, [category]);

  return (
    <div className="w-full max-w-md mx-auto">
      <CardUI
        className={`aspect-[3/4] cursor-pointer transition-all duration-500 transform perspective-1000 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="w-full h-full flex items-center justify-center p-8 text-center">
          {isFlipped ? (
            <p className="text-xl font-bold">{currentCard?.content}</p>
          ) : (
            <div className="text-6xl">🎮</div>
          )}
        </div>
      </CardUI>

      <Button
        className="mt-8 w-full"
        onClick={drawCard}
        variant="outline"
      >
        <Shuffle className="mr-2 h-4 w-4" />
        Yeni Kart Çek
      </Button>
    </div>
  );
};