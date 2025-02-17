import { Card as CardUI } from "@/components/ui/card";

export type Category = "friends_fun" | "friends_flirty" | "couples_fun" | "couples_spicy";

const cardThemes = {
  friends_fun: {
    gradient: "from-teal-400 via-cyan-400 to-teal-400",
    text: "text-white",
    border: "border-teal-300",
    glow: "shadow-teal-400/30",
    icon: "🎉"
  },
  friends_flirty: {
    gradient: "from-pink-400 via-fuchsia-400 to-pink-400",
    text: "text-white",
    border: "border-pink-300",
    glow: "shadow-pink-400/30",
    icon: "💫"
  },
  couples_fun: {
    gradient: "from-violet-400 via-purple-400 to-violet-400",
    text: "text-white",
    border: "border-violet-300",
    glow: "shadow-violet-400/30",
    icon: "💝"
  },
  couples_spicy: {
    gradient: "from-rose-500 via-red-500 to-rose-500",
    text: "text-white",
    border: "border-rose-400",
    glow: "shadow-rose-400/30",
    icon: "🔥"
  }
} as const;

interface CardBodyProps {
  content: string;
  category: Category;
  dragDirection: string;
}

export const CardBody = ({
  content,
  category,
  dragDirection
}: CardBodyProps) => {
  const theme = cardThemes[category];

  return (
    <CardUI 
      className={`w-full h-full bg-gradient-to-br ${theme.gradient} 
        border-2 ${theme.border} ${theme.glow}
        hover:shadow-lg hover:scale-105 transition-all duration-300
        ${dragDirection === "right" || dragDirection === "left" ? "border-blue-500 shadow-lg shadow-blue-500/50" : ""}
        ${dragDirection === "up" ? "border-yellow-500 shadow-lg shadow-yellow-500/50" : ""}
        ${dragDirection === "down" ? "border-purple-500 shadow-lg shadow-purple-500/50" : ""}`}
    >
      <div className="w-full h-full flex flex-col items-center justify-between p-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
          <span className="text-4xl">{theme.icon}</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className={`text-2xl font-bold ${theme.text} text-center mb-4`}>
            {content}
          </p>
        </div>
      </div>
    </CardUI>
  );
}; 