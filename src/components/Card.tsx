
import { useState, useEffect } from "react";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { UserProfile } from "./UserProfile";
import { categories } from "@/components/Categories";
import { isPurchased } from "@/utils/storage";
import { Sheet } from "@/components/ui/sheet";

interface CardData {
  id: string;
  content: string;
  category: string;
}

const cards: Record<string, CardData[]> = {
  basic: [
    { id: "1", content: "Telefonundaki en utanç verici fotoğrafı göster ya da iç", category: "basic" },
    { id: "2", content: "En son attığın mesajı yüksek sesle oku ya da iç", category: "basic" },
    { id: "3", content: "Gruptaki birinin taklidini yap ya da iç", category: "basic" },
    { id: "4", content: "En sevdiğin şarkıyı söyle ya da iç", category: "basic" },
    { id: "5", content: "10 şınav çek ya da iç", category: "basic" },
  ],
  party: [
    { id: "6", content: "En sevdiğin şarkıyı söyle", category: "party" },
    { id: "7", content: "Komik bir hikaye anlat", category: "party" },
    { id: "8", content: "Tavuk gibi ses çıkar", category: "party" },
  ],
  extreme: [
    { id: "9", content: "30 saniye planking yap", category: "extreme" },
    { id: "10", content: "20 şınav çek", category: "extreme" },
    { id: "11", content: "1 dakika durmadan dans et", category: "extreme" },
  ],
  couples: [
    { id: "12", content: "Partnerin için romantik bir şarkı söyle", category: "couples" },
    { id: "13", content: "Partnerine en güzel kompliman yap", category: "couples" },
    { id: "14", content: "Partnerin ile dans et", category: "couples" },
  ],
};

export const Card = ({ category }: { category: string }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const categoryCards = cards[category] || [];
  const currentCard = categoryCards[currentCardIndex];
  const purchasedCategories = categories.filter(cat => isPurchased(cat.id));

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [category]);

  if (!currentCard || categoryCards.length === 0) {
    return (
      <div className="fixed inset-0 w-full h-full max-w-md mx-auto flex flex-col items-center justify-center">
        <CardContent 
          noCards={true} 
          currentCard={null} 
          isFlipped={isFlipped} 
          setIsFlipped={setIsFlipped}
        />
      </div>
    );
  }

  return (
    <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <div className="fixed inset-0 w-full h-full max-w-md mx-auto flex flex-col overflow-hidden">
        <CardHeader onProfileClick={() => setIsProfileOpen(true)} />
        <UserProfile purchasedCategories={purchasedCategories} />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <CardContent
            noCards={false}
            currentCard={currentCard}
            isFlipped={isFlipped}
            setIsFlipped={setIsFlipped}
            currentCardIndex={currentCardIndex}
            setCurrentCardIndex={setCurrentCardIndex}
            totalCards={categoryCards.length}
            isSoundOn={isSoundOn}
          />
        </div>
      </div>
    </Sheet>
  );
};
