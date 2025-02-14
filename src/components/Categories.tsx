import { useToast } from "@/components/ui/use-toast";
import { isPurchased, addPurchasedCategory } from "@/utils/storage";
import { Category } from "./card/CardBody";

export const categories = [
  {
    id: "friends_fun",
    title: "Arkadaş Ortamı",
    description: "Eğlenceli ve komik görevler",
    icon: "🎉",
    isPremium: false
  },
  {
    id: "friends_flirty",
    title: "Flörtöz Oyunlar",
    description: "Arkadaş ortamında flört",
    icon: "💫",
    isPremium: true,
    price: "₺29.99"
  },
  {
    id: "couples_fun",
    title: "Çiftler Eğlence",
    description: "Çiftler için eğlenceli görevler",
    icon: "💝",
    isPremium: true,
    price: "₺34.99"
  },
  {
    id: "couples_spicy",
    title: "Çiftler Özel",
    description: "Çiftler için romantik görevler",
    icon: "🔥",
    isPremium: true,
    price: "₺39.99"
  }
] as const;

export const Categories = ({ onSelectCategory }: { onSelectCategory: (category: Category) => void }) => {
  const { toast } = useToast();

  const handleCategoryClick = (category: typeof categories[number]) => {
    if (category.isPremium && !isPurchased(category.id)) {
      toast({
        title: "Premium Kategori",
        description: `Bu kategoriyi kullanmak için satın almanız gerekiyor. Fiyat: ${category.price}`,
      });
      return;
    }
    onSelectCategory(category.id as Category);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={`p-4 rounded-lg border ${
            category.isPremium && !isPurchased(category.id)
              ? "border-yellow-400 bg-yellow-400/10"
              : "border-primary bg-primary/10"
          } hover:bg-primary/20 transition-colors`}
        >
          <div className="text-2xl mb-2">{category.icon}</div>
          <h3 className="font-bold mb-1">{category.title}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
          {category.isPremium && !isPurchased(category.id) && (
            <div className="mt-2 text-sm font-medium text-yellow-400">
              {category.price}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};