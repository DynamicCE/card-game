import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Star, Users, Sparkles, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { isPurchased, addPurchasedCategory } from "@/utils/storage";

export type Category = {
  id: string;
  name: string;
  description: string;
  isLocked: boolean;
  icon: React.ReactNode;
  price?: string;
};

export const categories: Category[] = [
  {
    id: "basic",
    name: "Temel Paket",
    description: "Eğlenceli başlangıç kartları",
    isLocked: false,
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "party",
    name: "Parti Paketi",
    description: "Parti ortamı için özel kartlar",
    isLocked: true,
    icon: <Sparkles className="w-6 h-6" />,
    price: "₺29.99",
  },
  {
    id: "extreme",
    name: "Ekstrem Paket",
    description: "Daha zorlu görevler",
    isLocked: true,
    icon: <Zap className="w-6 h-6" />,
    price: "₺39.99",
  },
  {
    id: "couples",
    name: "Çiftler Paketi",
    description: "Çiftler için özel kartlar",
    isLocked: true,
    icon: <Star className="w-6 h-6" />,
    price: "₺34.99",
  },
];

export const Categories = ({ onSelectCategory }: { onSelectCategory: (category: string) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("basic");
  const { toast } = useToast();

  const handlePurchase = (categoryId: string) => {
    // Simüle edilmiş satın alma işlemi
    addPurchasedCategory(categoryId);
    toast({
      title: "Paket Satın Alındı",
      description: "Yeni kategori başarıyla satın alındı!",
    });
  };

  const handleCategorySelect = (categoryId: string, isLocked: boolean) => {
    if (isLocked && !isPurchased(categoryId)) {
      toast({
        title: "Kategori Kilitli",
        description: "Bu kategoriyi kullanmak için satın almanız gerekiyor.",
        variant: "destructive",
      });
      return;
    }
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 max-w-4xl mx-auto">
      {categories.map((category) => {
        const purchased = isPurchased(category.id);
        return (
          <Card
            key={category.id}
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedCategory === category.id
                ? "border-primary border-2"
                : "border-gray-700"
            }`}
            onClick={() => handleCategorySelect(category.id, category.isLocked)}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                {category.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  {category.isLocked && !purchased && (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-400">{category.description}</p>
                {category.isLocked && !purchased && category.price && (
                  <Button 
                    variant="secondary" 
                    className="mt-2 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(category.id);
                    }}
                  >
                    Kilidi Aç ({category.price})
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      )}
    </div>
  );
};