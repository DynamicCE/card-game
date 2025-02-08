
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => navigate('/')}
        className="text-primary hover:text-primary/80"
      >
        <ArrowLeft size={24} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary hover:text-primary/80"
      >
        <User size={24} />
      </Button>
    </div>
  );
};
