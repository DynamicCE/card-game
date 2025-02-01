import { useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-background text-white p-4">
      <div className="max-w-md mx-auto">
        {/* Header with Profile Button */}
        <div className="flex justify-end mb-4">
          <Avatar className="cursor-pointer hover:opacity-80">
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center">
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
      </div>
    </div>
  );
};

export default Index;