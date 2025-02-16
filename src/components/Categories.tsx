
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
    isPremium: false
  },
  {
    id: "couples_fun",
    title: "Çiftler Eğlence",
    description: "Çiftler için eğlenceli görevler",
    icon: "💝",
    isPremium: false
  },
  {
    id: "couples_spicy",
    title: "Çiftler Özel",
    description: "Çiftler için romantik görevler",
    icon: "🔥",
    isPremium: false
  }
] as const;

export const Categories = ({ onSelectCategory }: { onSelectCategory: (category: Category) => void }) => {
  const handleCategoryClick = (category: typeof categories[number]) => {
    onSelectCategory(category.id as Category);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className="p-4 rounded-lg border border-primary bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <div className="text-2xl mb-2">{category.icon}</div>
          <h3 className="font-bold mb-1">{category.title}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </button>
      ))}
    </div>
  );
};
