export enum GameType {
    FRIENDS_FUN = 'FRIENDS_FUN',           // Arkadaşlar Eğlence
    FRIENDS_FLIRT = 'FRIENDS_FLIRT',       // Arkadaşlar Flört
    COUPLES_FUN = 'COUPLES_FUN',           // Çiftler Eğlence
    COUPLES_EROTIC = 'COUPLES_EROTIC'      // Çiftler Özel
}

export enum GameMode {
    QUICK_PLAY = 'QUICK_PLAY',    // Hızlı Oyun (oturma düzensiz)
    ARRANGED = 'ARRANGED'         // Düzenli Oyun (oturma düzenli)
}

export interface Player {
    id: string;
    name: string;
    position?: number;  // Oturma düzeni için pozisyon (opsiyonel)
}

export interface GameSession {
    gameType: GameType;
    gameMode: GameMode;
    players: Player[];
    currentPlayerIndex: number;
}

export interface Card {
    id: string;
    text: string;
    gameType: GameType;
    requiresSeating: boolean;
    targetType?: 'LEFT' | 'RIGHT' | 'ACROSS' | 'ANY' | 'ALL';
}

// Oturma düzeni için tipler
export interface SeatingArrangement {
    players: Player[];
    totalSeats: number;
}

export interface PlayerPosition {
    x: number;
    y: number;
    angle: number;  // Masadaki açısal pozisyon
} 