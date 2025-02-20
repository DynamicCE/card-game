import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameType, GameMode } from '../types/game';
import type { Player } from '../types/game';
import SeatingArrangement from '../components/seating/SeatingArrangement';

const GameSetup: React.FC = () => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState<Player[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [gameType, setGameType] = useState<GameType>(GameType.FRIENDS_FUN);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.QUICK_PLAY);

    const handleAddPlayer = () => {
        if (playerName.trim()) {
            setPlayers([...players, {
                id: Date.now().toString(),
                name: playerName.trim()
            }]);
            setPlayerName('');
        }
    };

    const handleSeatingComplete = (arrangedPlayers: Player[]) => {
        // Oyuncuların oturma düzeni tamamlandığında
        console.log('Arranged players:', arrangedPlayers);
        // Oyun sayfasına yönlendir
        navigate('/game', { state: { players: arrangedPlayers, gameType, gameMode } });
    };

    return (
        <div className="game-setup">
            <h1>Oyun Kurulumu</h1>
            
            {/* Oyun tipi seçimi */}
            <div className="game-type-selection">
                <h2>Oyun Tipi</h2>
                <select 
                    value={gameType} 
                    onChange={(e) => setGameType(e.target.value as GameType)}
                >
                    <option value={GameType.FRIENDS_FUN}>Arkadaşlar Eğlence</option>
                    <option value={GameType.FRIENDS_FLIRT}>Arkadaşlar Flört</option>
                    <option value={GameType.COUPLES_FUN}>Çiftler Eğlence</option>
                    <option value={GameType.COUPLES_EROTIC}>Çiftler Özel</option>
                </select>
            </div>

            {/* Oyun modu seçimi (sadece arkadaşlar kategorisi için) */}
            {gameType.startsWith('FRIENDS_') && (
                <div className="game-mode-selection">
                    <h2>Oyun Modu</h2>
                    <select 
                        value={gameMode} 
                        onChange={(e) => setGameMode(e.target.value as GameMode)}
                    >
                        <option value={GameMode.QUICK_PLAY}>Hızlı Oyun</option>
                        <option value={GameMode.ARRANGED}>Düzenli Oyun</option>
                    </select>
                </div>
            )}

            {/* Oyuncu ekleme */}
            <div className="player-input">
                <h2>Oyuncular</h2>
                <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Oyuncu adı"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                />
                <button onClick={handleAddPlayer}>Ekle</button>
            </div>

            {/* Oyuncu listesi */}
            <div className="player-list">
                {players.map(player => (
                    <div key={player.id} className="player-item">
                        {player.name}
                        <button 
                            onClick={() => setPlayers(players.filter(p => p.id !== player.id))}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {/* Oturma düzeni (sadece düzenli oyun modu için) */}
            {gameMode === GameMode.ARRANGED && players.length >= 3 && (
                <SeatingArrangement
                    players={players}
                    onSeatingComplete={handleSeatingComplete}
                />
            )}

            {/* Oyuna başla butonu */}
            {gameMode === GameMode.QUICK_PLAY && players.length >= 3 && (
                <button 
                    className="start-game"
                    onClick={() => handleSeatingComplete(players)}
                >
                    Oyuna Başla
                </button>
            )}
        </div>
    );
};

export default GameSetup; 