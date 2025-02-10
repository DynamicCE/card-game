
import { useState } from "react";
import { Card } from "@/components/Card";
import { Categories } from "@/components/Categories";
import { GameSetup } from "@/components/GameSetup";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface GameState {
  currentPlayer: number;
  playerCount: number;
  scores: number[];
  round: number;
}

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("basic");
  const [showSetup, setShowSetup] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
    if (!gameState) {
      setShowSetup(true);
    } else {
      setIsPlaying(true);
    }
  };

  const handleGameStart = (playerCount: number) => {
    setGameState({
      currentPlayer: 1,
      playerCount,
      scores: Array(playerCount).fill(0),
      round: 1
    });
    setShowSetup(false);
    setIsPlaying(true);
  };

  const handleNextTurn = () => {
    if (!gameState) return;

    const nextPlayer = gameState.currentPlayer % gameState.playerCount + 1;
    const isNewRound = nextPlayer === 1;

    setGameState(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        currentPlayer: nextPlayer,
        round: isNewRound ? prev.round + 1 : prev.round
      };
    });
  };

  const resetGame = () => {
    setIsPlaying(false);
    setShowCategories(false);
    setShowSetup(false);
    setGameState(null);
  };

  return (
    <div className="min-h-screen w-full bg-background text-white flex flex-col">
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          {(isPlaying || showCategories || showSetup) && (
            <Button 
              variant="ghost" 
              onClick={() => {
                if (isPlaying) {
                  setIsPlaying(false);
                  setShowCategories(true);
                } else if (showSetup) {
                  setShowSetup(false);
                  setShowCategories(true);
                } else {
                  resetGame();
                }
              }}
              className="flex items-center gap-2 animate-fade-in"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri
            </Button>
          )}
          {gameState && (
            <div className="text-sm text-muted-foreground animate-fade-in">
              Tur {gameState.round} • Oyuncu {gameState.currentPlayer}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {!isPlaying && !showCategories && !showSetup ? (
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
                    setSelectedCategory("basic");
                    setShowSetup(true);
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
              <Categories onSelectCategory={handleCategorySelect} />
            </div>
          ) : showSetup ? (
            <div className="w-full max-w-md mx-auto animate-fade-in">
              <GameSetup onStart={handleGameStart} />
            </div>
          ) : (
            <div className="w-full animate-fade-in">
              <Card 
                category={selectedCategory}
                onNextTurn={handleNextTurn}
                currentPlayer={gameState?.currentPlayer}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
