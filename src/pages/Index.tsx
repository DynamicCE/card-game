import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-background text-white p-4 flex flex-col items-center justify-center">
      {!isPlaying ? (
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-8 text-primary">Do or Drink</h1>
          <p className="text-lg mb-8 text-gray-300">
            Kartı çevir, ya yap ya da iç!
          </p>
          <Button
            onClick={() => setIsPlaying(true)}
            className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Oyuna Başla
          </Button>
        </div>
      ) : (
        <Card />
      )}
    </div>
  );
};

export default Index;