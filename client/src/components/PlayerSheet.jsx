import React, { useState } from 'react';
import { DiceRoller, rollDice } from './DiceRoller';

const PlayerSheet = ({ socket, player }) => {
    const [hp, setHp] = useState(player.hp || 20);

    const handleRoll = (sides) => {
        const result = rollDice(sides);
        socket.emit('player_action', {
            type: 'ROLL',
            roll: result,
            sides: sides,
            playerName: player.name
        });
    };

    const handleAttack = () => {
        const result = rollDice(20);
        socket.emit('player_action', {
            type: 'ATTACK',
            roll: result,
            playerName: player.name
        });
    };

    return (
        <div className="p-6 bg-gray-800 bg-opacity-90 rounded-2xl text-white border border-purple-500 border-opacity-20" style={{backdropFilter: 'blur(4px)'}}>
            <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-3">
                <span className="text-3xl">⚔️</span>
                {player.name}
                <span className="text-sm bg-purple-500 bg-opacity-20 px-3 py-1 rounded-full border border-purple-500 border-opacity-30">Jugador</span>
            </h2>
            <div className="mb-6 bg-green-900 bg-opacity-30 p-4 rounded-xl border border-green-500 border-opacity-20">
                <label className="block text-gray-300 text-sm mb-2 flex items-center gap-2">
                    <span className="text-lg">❤️</span>
                    Puntos de Vida
                </label>
                <div className="text-4xl font-bold text-green-400 font-mono">{hp}</div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-4 text-gray-300 flex items-center gap-2">
                        <span className="text-xl">⚙️</span>
                        Acciones de Combate
                    </h3>
                    <button
                        onClick={handleAttack}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 py-4 rounded-xl font-bold text-white shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
                    >
                        <span className="text-2xl">⚔️</span>
                        <div>
                            <div>Atacar</div>
                            <div className="text-xs opacity-80">(Tirada d20)</div>
                        </div>
                    </button>
                </div>

                <div>
                    <h3 className="font-semibold mb-4 text-gray-300 flex items-center gap-2">
                        <span className="text-xl">🎲</span>
                        Bolsa de Dados
                    </h3>
                    <DiceRoller onRoll={handleRoll} />
                </div>
            </div>
        </div>
    );
};

export default PlayerSheet;
