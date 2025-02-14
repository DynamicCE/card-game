import { Card as CardUI } from "@/components/ui/card";

interface CardBodyProps {
  content: string;
  alternativeTask?: string;
  timeLimit?: number;
  requiresProps?: boolean;
  theme?: {
    gradient: string;
    border: string;
    glow: string;
    icon: string;
  };
  dragDirection: string;
}

export const CardBody = ({
  content,
  alternativeTask,
  timeLimit,
  requiresProps,
  theme,
  dragDirection
}: CardBodyProps) => {
  return (
    <CardUI 
      className={`w-full h-full bg-gradient-to-br ${theme?.gradient || 'from-primary via-secondary to-primary'} 
        ${theme?.border} ${theme?.glow} shadow-xl transition-all duration-150
        ${dragDirection === "right" || dragDirection === "left" ? "border-blue-500 border-4 shadow-lg shadow-blue-500/50" : ""}
        ${dragDirection === "up" ? "border-yellow-500 border-4 shadow-lg shadow-yellow-500/50" : ""}
        ${dragDirection === "down" ? "border-purple-500 border-4 shadow-lg shadow-purple-500/50" : ""}`}
    >
      <div className="w-full h-full flex flex-col items-center justify-between p-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
          <span className="text-4xl">{theme?.icon}</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-white text-center mb-4">
            {content}
          </p>
          {alternativeTask && (
            <p className="mt-2 text-sm text-white/80">
              🔄 Alternatif: {alternativeTask}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          {timeLimit && (
            <p className="text-sm text-white/80">
              ⏱️ {timeLimit} saniye
            </p>
          )}
          {requiresProps && (
            <p className="text-sm text-white/80">
              📱 Telefon gerekli
            </p>
          )}
        </div>
      </div>
    </CardUI>
  );
}; 