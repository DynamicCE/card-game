import { useState } from "react";
import { Card } from "@/components/Card";
import { Categories } from "@/components/Categories";
import { Button } from "@/components/ui/button";
import { Category } from "@/components/card/CardBody";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("friends_fun");

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setIsPlaying(true);
  };

  const handleBack = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    if (showCategories) {
      setShowCategories(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-white flex flex-col">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          {!isPlaying && !showCategories ? (
            <div className="text-center animate-fade-in w-full max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Do or Drink
              </h1>
              <div className="space-y-4">
                <Button
                  onClick={() => setShowCategories(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-lg text-lg"
                >
                  Kategori Seç
                </Button>
                <Button
                  onClick={() => {
                    setSelectedCategory("friends_fun");
                    setIsPlaying(true);
                  }}
                  variant="outline"
                  className="w-full px-8 py-6 rounded-lg text-lg hover:bg-primary/10 transition-colors"
                >
                  Hızlı Başla
                </Button>
              </div>
            </div>
          ) : showCategories ? (
            <div className="w-full animate-fade-in">
              <Categories onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <Card category={selectedCategory} onBack={handleBack} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;