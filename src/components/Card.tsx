import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card as CardUI } from "@/components/ui/card";
import { 
  User,
  Volume2, 
  VolumeX, 
  LogOut,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  ArrowLeftCircle,
  ArrowRightCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getStorageData, updateSettings, isPurchased } from "@/utils/storage";
import { categories } from "@/components/Categories";

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
  const purchasedCategories = categories.filter(cat => isPurchased(cat.id));
  
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

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [category]);

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
              <SheetTitle className="mb-4">Profil</SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col items-center mb-8">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="text-4xl">
                  <User />
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">Misafir Kullanıcı</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Satın Alınan Paketler
                </h3>
                {purchasedCategories.length > 0 ? (
                  <div className="grid gap-2">
                    {purchasedCategories.map(category => (
                      <div key={category.id} className="flex items-center gap-2 p-2 bg-secondary/10 rounded-lg">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    Henüz satın alınmış paket bulunmuyor.
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Ayarlar</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ses Efektleri</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSetting('soundEffects')}
                    >
                      {settings.soundEffects ? 'Açık' : 'Kapalı'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bildirimler</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSetting('notifications')}
                    >
                      {settings.notifications ? 'Açık' : 'Kapalı'}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dil</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={changeLanguage}
                    >
                      {settings.language === 'tr' ? 'Türkçe' : 'English'}
                    </Button>
                  </div>
                </div>
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
            <div className="absolute w-full h-full backface-hidden">
              <CardUI className="w-full h-full bg-gradient-to-br from-primary via-secondary to-primary shadow-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-4xl font-bold text-white">
                    Do or Drink
                  </p>
                </div>
              </CardUI>
            </div>

            <div 
              className="absolute w-full h-full backface-hidden rotate-y-180"
            >
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
            {currentCardIndex + 1} / {categoryCards.length}
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
