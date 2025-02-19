import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";

interface CardHeaderProps {
  onProfileClick: () => void;
  onBack: () => void;
}

export const CardHeader = ({ onProfileClick, onBack }: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-4">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onBack}
        className="text-primary hover:text-primary/80"
      >
        <ArrowLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onProfileClick}
        className="text-primary hover:text-primary/80"
      >
        <User size={24} />
      </Button>
    </div>
  );
};
