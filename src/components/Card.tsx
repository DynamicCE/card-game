import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardUI } from "@/components/ui/card";
import { Shuffle, Volume2, VolumeX, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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
  const [isSoundOn, setIsSoundOn] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    
    if (isSoundOn) {
      // Kart çekme sesi efekti burada eklenebilir
      new Audio("/card-shuffle.mp3").play().catch(() => {});
    }
  };

  const handleLogout = () => {
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    navigate("/");
  };

  useEffect(() => {
    drawCard();
  }, [category]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSoundOn(!isSoundOn)}
          className="text-primary hover:text-primary/80"
        >
          {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-primary hover:text-primary/80"
        >
          <LogOut size={24} />
        </Button>
      </div>

      <div className="perspective-1000">
        <div
          className={`relative w-full transition-transform duration-500 transform-style-3d cursor-pointer ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Ön yüz */}
          <CardUI className="absolute w-full h-full backface-hidden bg-gradient-to-br from-primary to-secondary shadow-xl">
            <div className="w-full aspect-[3/4] flex items-center justify-center p-8 text-center">
              <div className="text-6xl">🎮</div>
            </div>
          </CardUI>

          {/* Arka yüz */}
          <CardUI className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-accent to-accent/80 shadow-xl">
            <div className="w-full aspect-[3/4] flex items-center justify-center p-8 text-center">
              <p className="text-2xl font-bold text-accent-foreground">
                {currentCard?.content}
              </p>
            </div>
          </CardUI>
        </div>
      </div>

      <Button 
        className="mt-8 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        onClick={drawCard}
      >
        <Shuffle className="mr-2 h-5 w-5" />
        Yeni Kart Çek
      </Button>
    </div>
  );
};