import { Card as CardUI } from "@/components/ui/card";

export type Category = "friends_fun" | "friends_flirty" | "couples_fun" | "couples_spicy";

const cardThemes = {
  friends_fun: {
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    text: "text-white",
    border: "border-yellow-400/50",
    glow: "shadow-xl shadow-yellow-500/50",
    icon: "🎉"
  },
  friends_flirty: {
    gradient: "from-purple-400 via-fuchsia-500 to-pink-500",
    text: "text-white",
    border: "border-purple-400/50",
    glow: "shadow-xl shadow-purple-500/50",
    icon: "💫"
  },
  couples_fun: {
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    text: "text-white",
    border: "border-sky-400/50",
    glow: "shadow-xl shadow-sky-500/50",
    icon: "💝"
  },
  couples_spicy: {
    gradient: "from-rose-400 via-red-500 to-pink-600",
    text: "text-white",
    border: "border-rose-400/50",
    glow: "shadow-xl shadow-rose-500/50",
    icon: "💋"
  }
} as const;

interface CardBodyProps {
  content: string;
  category: Category;
  dragDirection: string;
  isFirstCard?: boolean;
}

export const CardBody = ({
  content,
  category,
  dragDirection,
  isFirstCard = false
}: CardBodyProps) => {
  const theme = cardThemes[category];

  return (
    <CardUI 
      className={`relative w-full h-full overflow-hidden
        bg-gradient-to-br ${theme.gradient} 
        border border-white/20 ${theme.border}
        backdrop-blur-sm ${theme.glow}
        hover:shadow-xl hover:scale-[1.02] transition-all duration-300
        rounded-3xl
        ${dragDirection === "right" || dragDirection === "left" ? "border-blue-500/50 shadow-xl shadow-blue-500/30" : ""}
        ${dragDirection === "up" ? "border-yellow-500/50 shadow-xl shadow-yellow-500/30" : ""}
        ${dragDirection === "down" ? "border-purple-500/50 shadow-xl shadow-purple-500/30" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/5" />
      
      <div className="relative w-full h-full flex flex-col items-center justify-between p-8">
        <div className={`flex items-center justify-center w-24 h-24 rounded-full 
          ${category === 'couples_spicy' ? 'bg-gradient-to-br from-white/40 to-white/20' : 'bg-white/20'} 
          backdrop-blur-md border border-white/40 shadow-inner
          ${category === 'couples_spicy' ? 'shadow-lg shadow-white/20' : ''}`}>
          <span className={`${category === 'couples_spicy' ? 'text-6xl' : 'text-5xl'} 
            filter drop-shadow-lg
            ${category === 'couples_spicy' ? 'animate-pulse-fast drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]' : 'animate-pulse'}`}>
            {theme.icon}
          </span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className={`text-2xl font-bold ${theme.text} text-center leading-relaxed
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}>
            {content}
          </p>
        </div>

        {isFirstCard && (
          <div className="px-4 py-2 rounded-full bg-black/10 backdrop-blur-sm border border-white/20
            flex items-center gap-3">
            <span className="text-sm font-medium tracking-wide text-white">
              kaydır
            </span>
            <span className="text-lg text-white animate-bounce-x">
              →
            </span>
          </div>
        )}
      </div>
    </CardUI>
  );
}; 
