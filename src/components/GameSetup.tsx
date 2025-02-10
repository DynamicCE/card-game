
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Users } from "lucide-react";

interface GameSetupProps {
  onStart: (playerCount: number) => void;
}

export const GameSetup = ({ onStart }: GameSetupProps) => {
  const [playerCount, setPlayerCount] = useState(2);

  const handleIncrement = () => {
    if (playerCount < 8) {
      setPlayerCount(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (playerCount > 2) {
      setPlayerCount(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Oyuncu Sayısı</h2>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={playerCount <= 2}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-lg">
            <Users className="h-5 w-5" />
            <span className="text-xl font-semibold">{playerCount}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={playerCount >= 8}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button 
        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        onClick={() => onStart(playerCount)}
      >
        Oyunu Başlat
      </Button>
    </div>
  );
};
