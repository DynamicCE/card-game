
import { CreditCard } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PurchasedPackagesProps {
  purchasedCategories: Category[];
}

export const PurchasedPackages = ({ purchasedCategories }: PurchasedPackagesProps) => {
  return (
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
  );
};
