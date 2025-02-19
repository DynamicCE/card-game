import { useState, useEffect } from "react";
import { CardHeader } from "./CardHeader";
import { CardContent } from "./CardContent";
import { UserProfile } from "./UserProfile";
import { categories } from "@/components/Categories";
import { isPurchased } from "@/utils/storage";
import { Sheet } from "@/components/ui/sheet";
import { Category } from "./card/CardBody";

interface CardProps {
  category: Category;
  onBack: () => void;
}

interface CardData {
  id: string;
  content: string;
  category: Category;
}

const cards: Record<Category, CardData[]> = {
  friends_fun: [
    { 
      id: "1", 
      content: "Gruptaki herkes sırayla en komik anısını anlatsın", 
      category: "friends_fun"
    },
    { 
      id: "2", 
      content: "Soldaki kişinin taklidini yap", 
      category: "friends_fun"
    },
    { 
      id: "3", 
      content: "Gruptaki birinin telefonundan rastgele bir fotoğraf seç ve hikayesini anlat", 
      category: "friends_fun"
    },
    { 
      id: "4", 
      content: "Sessiz sinema oyna: Rastgele bir film seç", 
      category: "friends_fun"
    },
    { 
      id: "5", 
      content: "En sevdiğin şarkıyı söyle, grup eşlik etsin", 
      category: "friends_fun"
    },
    { 
      id: "6", 
      content: "Gruptaki herkesi tek kelimeyle tarif et", 
      category: "friends_fun"
    }
  ],
  friends_flirty: [
    { 
      id: "7", 
      content: "Gruptaki birine en güzel kompliman yap", 
      category: "friends_flirty"
    },
    { 
      id: "8", 
      content: "Karşı cinsteki birinin gözlerine bak", 
      category: "friends_flirty"
    },
    { 
      id: "9", 
      content: "Sağındaki kişiyle dans et", 
      category: "friends_flirty"
    },
    { 
      id: "10", 
      content: "Gruptaki birine flörtöz bir mesaj at", 
      category: "friends_flirty"
    },
    { 
      id: "11", 
      content: "En çekici bulduğun kişiye sarıl", 
      category: "friends_flirty"
    },
    { 
      id: "12", 
      content: "Gruptaki birinin dudağına yakın bir yerden öp", 
      category: "friends_flirty"
    }
  ],
  couples_fun: [
    { 
      id: "13", 
      content: "Partnerinle rol değiştir: O sen, sen o ol", 
      category: "couples_fun"
    },
    { 
      id: "14", 
      content: "Partnerin gözleri kapalıyken ona üç şey koklat, tahmin etmeli", 
      category: "couples_fun"
    },
    { 
      id: "15", 
      content: "Partnerin için komik bir dans performansı sergile", 
      category: "couples_fun"
    },
    { 
      id: "16", 
      content: "Partnerinle sırt sırta otur, sorulara aynı anda cevap verin", 
      category: "couples_fun"
    },
    { 
      id: "17", 
      content: "Partnerine en sevdiğin özelliğini söyle", 
      category: "couples_fun"
    },
    { 
      id: "18", 
      content: "Partnerinle birlikte komik bir fotoğraf çekin", 
      category: "couples_fun"
    }
  ],
  couples_spicy: [
    { 
      id: "19", 
      content: "Partnerine romantik bir masaj yap", 
      category: "couples_spicy"
    },
    { 
      id: "20", 
      content: "Partnerinin kulağına en romantik anınızı fısılda", 
      category: "couples_spicy"
    },
    { 
      id: "21", 
      content: "Gözleri kapalı partnerinin yüzünün her yerini öp", 
      category: "couples_spicy"
    },
    { 
      id: "22", 
      content: "Partnerinle yavaş dans edin", 
      category: "couples_spicy"
    },
    { 
      id: "23", 
      content: "Partnerinin boynunu nazikçe öp", 
      category: "couples_spicy"
    },
    { 
      id: "24", 
      content: "Partnerine en çok sevdiğin fiziksel özelliğini söyle", 
      category: "couples_spicy"
    }
  ]
};

export const Card = ({ category, onBack }: CardProps) => {
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
          onBack={onBack}
        />
      </div>
    );
  }

  return (
    <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <div className="fixed inset-0 w-full h-full max-w-md mx-auto flex flex-col overflow-hidden">
        <CardHeader onProfileClick={() => setIsProfileOpen(true)} onBack={onBack} />
        <UserProfile purchasedCategories={purchasedCategories} />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <CardContent
            noCards={false}
            currentCard={currentCard}
            currentCardIndex={currentCardIndex}
            setCurrentCardIndex={setCurrentCardIndex}
            totalCards={categoryCards.length}
            isSoundOn={isSoundOn}
            onBack={onBack}
          />
        </div>
      </div>
    </Sheet>
  );
}; 