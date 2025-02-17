import { Card as CardUI } from "@/components/ui/card";

export type Category = "friends_fun" | "friends_flirty" | "couples_fun" | "couples_spicy";

const cardThemes = {
  friends_fun: {
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    text: "text-white",
    border: "border-emerald-400/30",
    glow: "shadow-lg shadow-emerald-500/30",
    icon: "🎉"
  },
  friends_flirty: {
    gradient: "from-pink-600 via-fuchsia-600 to-purple-600",
    text: "text-white",
    border: "border-pink-400/30",
    glow: "shadow-lg shadow-pink-500/30",
    icon: "💫"
  },
  couples_fun: {
    gradient: "from-indigo-600 via-violet-600 to-purple-600",
    text: "text-white",
    border: "border-indigo-400/30",
    glow: "shadow-lg shadow-indigo-500/30",
    icon: "💝"
  },
  couples_spicy: {
    gradient: "from-rose-500 via-red-500 to-pink-500",
    text: "text-white",
    border: "border-rose-300/40",
    glow: "shadow-lg shadow-rose-400/40",
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
          ${category === 'couples_spicy' ? 'bg-white/30' : 'bg-white/20'} 
          backdrop-blur-md border border-white/30 shadow-inner`}>
          <span className={`${category === 'couples_spicy' ? 'text-6xl' : 'text-5xl'} 
            filter drop-shadow-lg animate-pulse 
            ${category === 'couples_spicy' ? 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]' : ''}`}>
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
