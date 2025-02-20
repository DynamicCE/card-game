import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/Card";
import { Categories } from "@/components/Categories";
import { Button } from "@/components/ui/button";
import { Category } from "@/components/card/CardBody";
import { GameMode } from "../types/game";

const Index = () => {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [showGameModeButtons, setShowGameModeButtons] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("friends_fun");

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setShowCategories(false);
    setShowGameModeButtons(true);
  };

  const handleBack = () => {
    if (showGameModeButtons) {
      setShowGameModeButtons(false);
      setShowCategories(true);
    } else if (showCategories) {
      setShowCategories(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-white flex flex-col">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          {!showCategories && !showGameModeButtons ? (
            <div className="text-center animate-fade-in w-full max-w-md">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Do or Drink
              </h1>
              <Button
                onClick={() => setShowCategories(true)}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-lg text-lg"
              >
                Oyuna Başla
              </Button>
            </div>
          ) : showCategories ? (
            <div className="w-full animate-fade-in">
              <Button
                onClick={handleBack}
                variant="outline"
                className="mb-4"
              >
                ← Geri
              </Button>
              <Categories onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
            </div>
          ) : showGameModeButtons ? (
            <div className="w-full max-w-md animate-fade-in">
              <Button
                onClick={handleBack}
                variant="outline"
                className="mb-4"
              >
                ← Geri
              </Button>
              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/game', { 
                    state: { 
                      category: selectedCategory,
                      gameMode: GameMode.QUICK_PLAY 
                    }
                  })}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-lg text-lg"
                >
                  Hızlı Başla
                </Button>
                <Button
                  onClick={() => navigate('/setup', { 
                    state: { 
                      category: selectedCategory,
                      gameMode: GameMode.ARRANGED 
                    }
                  })}
                  variant="outline"
                  className="w-full px-8 py-6 rounded-lg text-lg hover:bg-primary/10 transition-colors"
                >
                  Oturma Düzeni ile Başla
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Index;