import { useState, useEffect } from "react";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { UserProfile } from "./UserProfile";
import { categories } from "@/components/Categories";
import { isPurchased } from "@/utils/storage";
import { Sheet } from "@/components/ui/sheet";
import { Category } from "./card/CardBody";

interface CardData {
  id: string;
  content: string;
  category: Category;
  alternativeTask?: string;
  timeLimit?: number;
}

const cards: Record<Category, CardData[]> = {
  friends_fun: [
    { 
      id: "1", 
      content: "Gruptaki herkes sırayla en komik anısını anlatsın", 
      category: "friends_fun",
      timeLimit: 30
    },
    { 
      id: "2", 
      content: "Soldaki kişinin taklidini yap", 
      category: "friends_fun"
    },
    { 
      id: "3", 
      content: "Gruptaki birinin telefonundan rastgele bir fotoğraf seç ve hikayesini anlat", 
      category: "friends_fun",
      timeLimit: 45
    },
    { 
      id: "4", 
      content: "Sessiz sinema oyna: Rastgele bir film seç", 
      category: "friends_fun",
      timeLimit: 60,
      alternativeTask: "Bir şarkı mırıldan, grup tahmin etsin"
    }
  ],
  friends_flirty: [
    { 
      id: "5", 
      content: "Gruptaki birine en güzel kompliman yap", 
      category: "friends_flirty"
    },
    { 
      id: "6", 
      content: "Karşı cinsteki birinin gözlerine 30 saniye bak", 
      category: "friends_flirty",
      timeLimit: 30,
      alternativeTask: "En çekici bulduğun kişiye iltifat et"
    },
    { 
      id: "7", 
      content: "Sağındaki kişiyle dans et", 
      category: "friends_flirty",
      timeLimit: 45
    },
    { 
      id: "8", 
      content: "Gruptaki birine flörtöz bir mesaj at", 
      category: "friends_flirty"
    }
  ],
  couples_fun: [
    { 
      id: "9", 
      content: "Partnerinle rol değiştir: 2 dakika boyunca o sen, sen o ol", 
      category: "couples_fun",
      timeLimit: 120
    },
    { 
      id: "10", 
      content: "Partnerin gözleri kapalıyken ona üç şey koklat, tahmin etmeli", 
      category: "couples_fun",
      alternativeTask: "Üç şey tattır"
    },
    { 
      id: "11", 
      content: "Partnerin için komik bir dans performansı sergile", 
      category: "couples_fun",
      timeLimit: 30
    },
    { 
      id: "12", 
      content: "Partnerinle sırt sırta otur, sorulara aynı anda cevap verin", 
      category: "couples_fun",
      timeLimit: 60
    }
  ],
  couples_spicy: [
    { 
      id: "13", 
      content: "Partnerine romantik bir masaj yap", 
      category: "couples_spicy",
      timeLimit: 180
    },
    { 
      id: "14", 
      content: "Partnerinin kulağına en romantik anınızı fısılda", 
      category: "couples_spicy"
    },
    { 
      id: "15", 
      content: "Gözleri kapalı partnerinin yüzünün her yerini öp", 
      category: "couples_spicy",
      timeLimit: 45
    },
    { 
      id: "16", 
      content: "Partnerinle yavaş dans edin", 
      category: "couples_spicy",
      timeLimit: 120,
      alternativeTask: "Sarılarak müzik dinleyin"
    }
  ]
};

export const Card = ({ category }: { category: Category }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const categoryCards = cards[category] || [];
  const currentCard = categoryCards[currentCardIndex];
  const purchasedCategories = categories.filter(cat => isPurchased(cat.id));

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
          />
        </div>
      </div>
    </Sheet>
  );
}; 