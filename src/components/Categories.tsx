import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Category = {
  id: string;
  name: string;
  description: string;
  isLocked: boolean;
};

const categories: Category[] = [
  {
    id: "basic",
    name: "Temel Paket",
    description: "Eğlenceli başlangıç kartları",
    isLocked: false,
  },
  {
    id: "party",
    name: "Parti Paketi",
    description: "Parti ortamı için özel kartlar",
    isLocked: true,
  },
  {
    id: "extreme",
    name: "Ekstrem Paket",
    description: "Daha zorlu görevler",
    isLocked: true,
  },
];

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("basic");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {categories.map((category) => (
        <Card
          key={category.id}
          className={`p-4 cursor-pointer transition-all ${
            selectedCategory === category.id
              ? "border-primary border-2"
              : "border-gray-700"
          }`}
          onClick={() => setSelectedCategory(category.id)}
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{category.name}</h3>
            <p className="text-sm text-gray-400">{category.description}</p>
            {category.isLocked ? (
              <Button variant="secondary" className="mt-2">
                Kilidi Aç
              </Button>
            ) : (
              <Button variant="outline" className="mt-2">
                Seç
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};