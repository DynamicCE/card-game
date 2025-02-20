import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";

const Game: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, gameMode, players } = location.state || {};

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen w-full bg-background text-white flex flex-col">
            <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col">
                <Button
                    onClick={handleBack}
                    variant="outline"
                    className="mb-4 self-start"
                >
                    ← Geri
                </Button>

                <div className="flex-1 flex flex-col items-center justify-center">
                    <Card category={category} onBack={handleBack} />
                </div>
            </div>
        </div>
    );
};

export default Game; 