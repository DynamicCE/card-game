
import { Card as CardUI } from "@/components/ui/card";

export type Category = "friends_fun" | "friends_flirty" | "couples_fun" | "couples_spicy";

const cardThemes = {
  friends_fun: {
    gradient: "from-cyan-400 via-teal-400 to-emerald-400",
    overlay: "bg-gradient-to-br from-white/10 to-transparent",
    text: "text-white",
    border: "border-teal-300/30",
    glow: "shadow-lg shadow-teal-500/20",
    pattern: "bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.2)_100%)] bg-[length:15px_15px]",
    icon: "🎉"
  },
  friends_flirty: {
    gradient: "from-pink-400 via-fuchsia-400 to-purple-400",
    overlay: "bg-gradient-to-br from-white/10 to-transparent",
    text: "text-white",
    border: "border-pink-300/30",
    glow: "shadow-lg shadow-pink-500/20",
    pattern: "bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.2)_100%)] bg-[length:15px_15px]",
    icon: "💫"
  },
  couples_fun: {
    gradient: "from-violet-400 via-purple-400 to-indigo-400",
    overlay: "bg-gradient-to-br from-white/10 to-transparent",
    text: "text-white",
    border: "border-violet-300/30",
    glow: "shadow-lg shadow-violet-500/20",
    pattern: "bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.2)_100%)] bg-[length:15px_15px]",
    icon: "💝"
  },
  couples_spicy: {
    gradient: "from-rose-500 via-red-500 to-pink-500",
    overlay: "bg-gradient-to-br from-white/10 to-transparent",
    text: "text-white",
    border: "border-rose-300/30",
    glow: "shadow-lg shadow-rose-500/20",
    pattern: "bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.2)_100%)] bg-[length:15px_15px]",
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
      className={`relative w-full h-full overflow-hidden
        bg-gradient-to-br ${theme.gradient} 
        border-2 ${theme.border} ${theme.glow}
        backdrop-blur-sm
        ${theme.pattern}
        hover:shadow-xl hover:scale-[1.02] transition-all duration-300
        ${dragDirection === "right" || dragDirection === "left" ? "border-blue-500/50 shadow-xl shadow-blue-500/30" : ""}
        ${dragDirection === "up" ? "border-yellow-500/50 shadow-xl shadow-yellow-500/30" : ""}
        ${dragDirection === "down" ? "border-purple-500/50 shadow-xl shadow-purple-500/30" : ""}`}
    >
      <div className={`absolute inset-0 ${theme.overlay}`} />
      
      <div className="relative w-full h-full flex flex-col items-center justify-between p-8">
        {/* Üst Kısım */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md
          border border-white/20 shadow-inner">
          <span className="text-5xl filter drop-shadow-lg">{theme.icon}</span>
        </div>
        
        {/* Orta Kısım */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
            <p className={`text-2xl font-bold ${theme.text} text-center leading-relaxed
              drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]`}>
              {content}
            </p>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="text-sm text-white/70 backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full">
          Kaydır veya Dokun
        </div>
      </div>
    </CardUI>
  );
}; 
