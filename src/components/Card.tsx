import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardUI } from "@/components/ui/card";
import { 
  Shuffle, 
  User,
  Volume2, 
  VolumeX, 
  LogOut,
  Settings
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
      <div className="flex justify-end mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/80"
            >
              <User size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Hesap</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ses</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSoundOn(!isSoundOn)}
                >
                  {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Ayarlar</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/profile')}
                >
                  <Settings size={20} />
                </Button>
              </div>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="relative perspective-1000">
        <div
          className={`relative w-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Ön yüz */}
          <div className="absolute w-full backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
            <CardUI className="w-full aspect-[3/4] bg-gradient-to-br from-primary via-secondary to-primary shadow-xl">
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-4xl font-bold text-white">
                  Do or Drink
                </p>
              </div>
            </CardUI>
          </div>

          {/* Arka yüz */}
          <div 
            className="absolute w-full backface-hidden rotate-y-180" 
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <CardUI className="w-full aspect-[3/4] bg-gradient-to-br from-accent via-accent/90 to-accent shadow-xl">
              <div className="w-full h-full flex items-center justify-center p-8">
                <p className="text-2xl font-bold text-accent-foreground">
                  {currentCard?.content}
                </p>
              </div>
            </CardUI>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          onClick={drawCard}
        >
          <Shuffle className="mr-2 h-5 w-5" />
          Yeni Kart Çek
        </Button>
      </div>
    </div>
  );
};