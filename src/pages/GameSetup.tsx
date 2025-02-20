import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Player } from '../types/game';
import { Button } from "@/components/ui/button";
import './GameSetup.css';

const GameSetup: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { category, gameMode } = location.state || {};
    
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayerName, setCurrentPlayerName] = useState('');
    const [currentPosition, setCurrentPosition] = useState(1);

    const handleAddPlayer = () => {
        if (currentPlayerName.trim()) {
            setPlayers([...players, {
                id: Date.now().toString(),
                name: currentPlayerName.trim(),
                position: currentPosition
            }]);
            setCurrentPlayerName('');
            setCurrentPosition(prev => prev + 1);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleStartGame = () => {
        navigate('/game', { 
            state: { 
                players,
                category,
                gameMode
            }
        });
    };

    return (
        <div className="game-setup">
            <Button
                onClick={handleBack}
                variant="outline"
                className="mb-4"
            >
                ← Geri
            </Button>

            <h1>Oturma Düzeni</h1>
            <p className="setup-description">
                Masada oturan oyuncuları saat yönünde sırayla giriniz.
                Minimum 3 oyuncu gereklidir.
            </p>
            
            {/* Oyuncu ekleme */}
            <div className="player-input">
                <h2>{currentPosition}. Oyuncu</h2>
                <div className="input-group">
                    <input
                        type="text"
                        value={currentPlayerName}
                        onChange={(e) => setCurrentPlayerName(e.target.value)}
                        placeholder="Oyuncu adı"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                    />
                    <Button 
                        onClick={handleAddPlayer}
                        className="add-button"
                    >
                        Ekle
                    </Button>
                </div>
            </div>

            {/* Oyuncu listesi */}
            <div className="players-list">
                <h2>Eklenen Oyuncular</h2>
                {players.map((player, index) => (
                    <div key={player.id} className="player-item">
                        <span className="player-number">{index + 1}.</span>
                        <span className="player-name">{player.name}</span>
                        <Button
                            variant="ghost" 
                            onClick={() => {
                                setPlayers(players.filter(p => p.id !== player.id));
                                setCurrentPosition(players.length);
                            }}
                            className="remove-button"
                        >
                            ✕
                        </Button>
                    </div>
                ))}
            </div>

            {/* Oyuna başla butonu */}
            {players.length >= 3 && (
                <Button 
                    onClick={handleStartGame}
                    className="start-game"
                >
                    Oyuna Başla ({players.length} Oyuncu)
                </Button>
            )}
        </div>
    );
};

export default GameSetup; 