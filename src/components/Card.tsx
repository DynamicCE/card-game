import { useState, useEffect } from "react";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { UserProfile } from "./UserProfile";
import { categories } from "@/components/Categories";
import { isPurchased } from "@/utils/storage";
import { Sheet } from "@/components/ui/sheet";

export type CoupleCardType = "intimate" | "romantic";
export type GroupCardType = "fun" | "flirty" | "dare";
export type GameMode = "couples_intimate" | "couples_fun" | "group_casual" | "group_party" | "mixed";

export const cardThemes = {
  // Çift Kartları
  intimate: {
    gradient: "from-red-600 via-pink-600 to-purple-600",
    border: "border-red-400",
    glow: "shadow-red-500/50",
    icon: "🔥"
  },
  romantic: {
    gradient: "from-pink-400 via-purple-400 to-indigo-400",
    border: "border-pink-300",
    glow: "shadow-pink-400/50",
    icon: "💝"
  },
  // Grup Kartları
  fun: {
    gradient: "from-blue-400 via-green-400 to-teal-400",
    border: "border-blue-300",
    glow: "shadow-blue-400/50",
    icon: "🎉"
  },
  flirty: {
    gradient: "from-purple-400 via-fuchsia-400 to-pink-400",
    border: "border-purple-300",
    glow: "shadow-purple-400/50",
    icon: "💫"
  },
  dare: {
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    border: "border-orange-300",
    glow: "shadow-orange-400/50",
    icon: "⚡"
  }
} as const;

interface CardData {
  id: string;
  content: string;
  category: string;
  type: CoupleCardType | GroupCardType;
  intensity: 1 | 2 | 3;
  alcoholLevel?: 1 | 2 | 3;
  requiresProps?: boolean;
  timeLimit?: number;
  alternativeTask?: string;
}

const cards: Record<string, CardData[]> = {
  basic: [
    { 
      id: "1", 
      content: "Telefonundaki en utanç verici fotoğrafı göster ya da iç", 
      category: "basic",
      type: "dare",
      intensity: 2
    },
    { 
      id: "2", 
      content: "En son attığın mesajı yüksek sesle oku ya da iç", 
      category: "basic",
      type: "fun",
      intensity: 1
    },
    { 
      id: "3", 
      content: "Gruptaki birinin taklidini yap ya da iç", 
      category: "basic",
      type: "fun",
      intensity: 1
    },
    { 
      id: "4", 
      content: "En sevdiğin şarkıyı söyle ya da iç", 
      category: "basic",
      type: "fun",
      intensity: 1
    },
    { 
      id: "5", 
      content: "10 şınav çek ya da iç", 
      category: "basic",
      type: "dare",
      intensity: 2
    },
  ],
  party: [
    { 
      id: "6", 
      content: "Karşı cinsteki birinin gözlerine 30 saniye bak", 
      category: "party",
      type: "flirty",
      intensity: 2,
      timeLimit: 30
    },
    { 
      id: "7", 
      content: "Gruptaki birine en güzel kompliman yap", 
      category: "party",
      type: "flirty",
      intensity: 1
    },
    { 
      id: "8", 
      content: "1 dakika boyunca dans et", 
      category: "party",
      type: "fun",
      intensity: 1,
      timeLimit: 60
    },
  ],
  couples: [
    { 
      id: "9", 
      content: "Partnerin için romantik bir şarkı söyle", 
      category: "couples",
      type: "romantic",
      intensity: 2
    },
    { 
      id: "10", 
      content: "Partnerine en güzel anınızı anlat", 
      category: "couples",
      type: "romantic",
      intensity: 1
    },
    { 
      id: "11", 
      content: "Partnerinle 1 dakika göz göze kal", 
      category: "couples",
      type: "intimate",
      intensity: 2,
      timeLimit: 60
    },
  ],
  extreme: [
    { 
      id: "12", 
      content: "Instagram hikayene komik bir video çek", 
      category: "extreme",
      type: "dare",
      intensity: 3,
      requiresProps: true
    },
    { 
      id: "13", 
      content: "Gruptaki birinin telefonundan story at", 
      category: "extreme",
      type: "dare",
      intensity: 3,
      requiresProps: true
    },
    { 
      id: "14", 
      content: "Son aradığın kişiyi ara ve şarkı söyle", 
      category: "extreme",
      type: "dare",
      intensity: 3,
      requiresProps: true
    },
  ],
};

export const Card = ({ category }: { category: string }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const categoryCards = cards[category] || [];
  const currentCard = categoryCards[currentCardIndex];
  const purchasedCategories = categories.filter(cat => isPurchased(cat.id));

  const getCardTheme = (type: CoupleCardType | GroupCardType) => {
    return cardThemes[type];
  };

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [category]);

  if (!currentCard || categoryCards.length === 0) {
    return (
      <div className="fixed inset-0 w-full h-full max-w-md mx-auto flex flex-col items-center justify-center">
        <CardContent 
          noCards={true} 
          currentCard={null}
        />
      </div>
    );
  }

  const theme = getCardTheme(currentCard.type);

  return (
    <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <div className="fixed inset-0 w-full h-full max-w-md mx-auto flex flex-col overflow-hidden">
        <CardHeader onProfileClick={() => setIsProfileOpen(true)} />
        <UserProfile purchasedCategories={purchasedCategories} />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <CardContent
            noCards={false}
            currentCard={currentCard}
            currentCardIndex={currentCardIndex}
            setCurrentCardIndex={setCurrentCardIndex}
            totalCards={categoryCards.length}
            isSoundOn={isSoundOn}
            theme={theme}
          />
        </div>
      </div>
    </Sheet>
  );
}; 