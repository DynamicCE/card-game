import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardUI } from "@/components/ui/card";
import { 
  User,
  Volume2, 
  VolumeX, 
  LogOut,
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRightCircle
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
import { getStorageData, updateSettings } from "@/utils/storage";

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
    { id: "4", content: "10 Saniye zıpla", category: "basic" },
    { id: "5", content: "Arkadaşına sarıl", category: "basic" },
  ],
  party: [
    { id: "6", content: "En sevdiğin şarkıyı söyle", category: "party" },
    { id: "7", content: "Komik bir hikaye anlat", category: "party" },
    { id: "8", content: "Tavuk gibi ses çıkar", category: "party" },
    { id: "9", content: "Sevdiğin birini taklit et", category: "party" },
  ],
  extreme: [
    { id: "10", content: "30 saniye planking yap", category: "extreme" },
    { id: "11", content: "20 şınav çek", category: "extreme" },
    { id: "12", content: "1 dakika durmadan dans et", category: "extreme" },
  ],
  couples: [
    { id: "13", content: "Partnerin için romantik bir şarkı söyle", category: "couples" },
    { id: "14", content: "Partnerine en güzel kompliman yap", category: "couples" },
    { id: "15", content: "Partnerin ile dans et", category: "couples" },
  ],
};

export const Card = ({ category }: { category: string }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(getStorageData().settings);
  
  const categoryCards = cards[category] || [];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % categoryCards.length);
    if (isSoundOn) {
      const audio = new Audio("/card-shuffle.mp3");
      audio.play().catch(() => {});
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + categoryCards.length) % categoryCards.length);
    if (isSoundOn) {
      const audio = new Audio("/card-shuffle.mp3");
      audio.play().catch(() => {});
    }
  };

  const handleLogout = () => {
    toast({
      title: "Çıkış Yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    });
    navigate("/");
  };

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      const newValue = !settings[key];
      updateSettings(key, newValue);
      setSettings(prev => ({ ...prev, [key]: newValue }));
    }
  };

  const changeLanguage = () => {
    const newLang = settings.language === 'tr' ? 'en' : 'tr';
    updateSettings('language', newLang);
    setSettings(prev => ({ ...prev, language: newLang }));
  };

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [category]);

  const currentCard = categoryCards[currentCardIndex];

  if (!currentCard) {
    return (
      <div className="text-center">
        Bu kategoride kart bulunmamaktadır.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full max-w-md mx-auto flex flex-col overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="text-primary hover:text-primary/80"
        >
          <ArrowLeft size={24} />
        </Button>
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
              <SheetTitle>Ayarlar</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ses</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSoundOn(!isSoundOn);
                    toggleSetting('soundEffects');
                  }}
                >
                  {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bildirimler</span>
                <Button 
                  variant="outline"
                  onClick={() => toggleSetting('notifications')}
                >
                  {settings.notifications ? 'Açık' : 'Kapalı'}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dil</span>
                <Button 
                  variant="outline"
                  onClick={changeLanguage}
                >
                  {settings.language === 'tr' ? 'Türkçe' : 'English'}
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

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="relative w-full h-[70vh] perspective-1000">
          <div
            className={`w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {/* Ön yüz */}
            <div className="absolute w-full h-full backface-hidden">
              <CardUI className="w-full h-full bg-gradient-to-br from-primary via-secondary to-primary shadow-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-4xl font-bold text-white">
                    Do or Drink
                  </p>
                </div>
              </CardUI>
            </div>

            {/* Arka yüz */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <CardUI className="w-full h-full bg-gradient-to-br from-accent via-accent/90 to-accent shadow-xl">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <p className="text-2xl font-bold text-accent-foreground text-center">
                    {currentCard.content}
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
            {currentCardIndex + 1} / {cards[category].length}
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
      </div>
    </div>
  );
};
