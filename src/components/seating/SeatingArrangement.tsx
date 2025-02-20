import React, { useEffect, useState } from 'react';
import type { Player, PlayerPosition } from '../../types/game';

interface SeatingArrangementProps {
    players: Player[];
    onSeatingComplete: (arrangedPlayers: Player[]) => void;
}

const SeatingArrangement: React.FC<SeatingArrangementProps> = ({ players, onSeatingComplete }) => {
    const [positions, setPositions] = useState<PlayerPosition[]>([]);
    const [arrangedPlayers, setArrangedPlayers] = useState<Player[]>([]);

    // Oyuncu sayısına göre pozisyonları hesapla
    useEffect(() => {
        const calculatePositions = () => {
            const centerX = 150; // Masa merkezi X
            const centerY = 150; // Masa merkezi Y
            const radius = 100;  // Masa yarıçapı
            
            const newPositions: PlayerPosition[] = players.map((_, index) => {
                const angle = (index * 360) / players.length;
                const radian = (angle * Math.PI) / 180;
                
                return {
                    x: centerX + radius * Math.cos(radian),
                    y: centerY + radius * Math.sin(radian),
                    angle: angle
                };
            });
            
            setPositions(newPositions);
        };

        calculatePositions();
    }, [players]);

    // Oyuncu pozisyonunu güncelle
    const handlePlayerDrop = (playerId: string, positionIndex: number) => {
        const updatedPlayers = [...arrangedPlayers];
        const player = players.find(p => p.id === playerId);
        
        if (player) {
            updatedPlayers[positionIndex] = { ...player, position: positionIndex };
            setArrangedPlayers(updatedPlayers);
            
            // Tüm oyuncular yerleştirildi mi kontrol et
            if (updatedPlayers.filter(Boolean).length === players.length) {
                onSeatingComplete(updatedPlayers);
            }
        }
    };

    return (
        <div className="seating-arrangement" style={{ width: '300px', height: '300px', position: 'relative' }}>
            {/* Masa */}
            <div className="table" style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#8B4513',
                position: 'absolute',
                top: '100px',
                left: '100px'
            }} />
            
            {/* Oturma pozisyonları */}
            {positions.map((pos, index) => (
                <div
                    key={index}
                    className="seat"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px dashed #666',
                        position: 'absolute',
                        top: pos.y - 20,
                        left: pos.x - 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: arrangedPlayers[index] ? '#4CAF50' : 'transparent'
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const playerId = e.dataTransfer.getData('player');
                        handlePlayerDrop(playerId, index);
                    }}
                >
                    {arrangedPlayers[index]?.name}
                </div>
            ))}
            
            {/* Oyuncu listesi */}
            <div className="player-list" style={{ position: 'absolute', top: '320px' }}>
                {players.map((player) => (
                    <div
                        key={player.id}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('player', player.id)}
                        style={{
                            padding: '8px',
                            margin: '4px',
                            backgroundColor: '#ddd',
                            cursor: 'move',
                            display: 'inline-block'
                        }}
                    >
                        {player.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeatingArrangement; 