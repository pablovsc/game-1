import React, { useState } from 'react';
import { DiceRoller, rollDice } from './DiceRoller';

const PlayerSheet = ({ socket, player }) => {
    const maxHp = player.hp || 25;
    const [hp, setHp] = useState(maxHp);
    const hpPercentage = (hp / maxHp) * 100;

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

    const getHpColor = () => {
        if (hpPercentage > 70) return 'from-green-500 to-emerald-600';
        if (hpPercentage > 30) return 'from-yellow-500 to-orange-600';
        return 'from-red-500 to-red-700';
    };

    const getHpBgColor = () => {
        if (hpPercentage > 70) return 'border-green-500/30 bg-green-900/20';
        if (hpPercentage > 30) return 'border-yellow-500/30 bg-yellow-900/20';
        return 'border-red-500/30 bg-red-900/20';
    };

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 px-6 py-4 border-b border-cyan-500/20">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-lg">
                            <span className="text-2xl">⚔️</span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-cyan-300">{player.name}</h2>
                            <p className="text-xs text-cyan-400/70">Aventurero - Nivel 1</p>
                        </div>
                        <span className="text-xs bg-cyan-900/30 px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-300">
                            JUGADOR
                        </span>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className={`p-5 rounded-xl border-2 ${getHpBgColor()} transition-all duration-300`}>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <span className="text-xl">❤️</span>
                                Puntos de Vida
                            </label>
                            <div className="text-3xl font-bold text-white font-mono">
                                {hp} <span className="text-lg text-gray-400">/ {maxHp}</span>
                            </div>
                        </div>

                        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700">
                            <div
                                className={`h-full bg-gradient-to-r ${getHpColor()} transition-all duration-500 relative`}
                                style={{ width: `${hpPercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => setHp(Math.max(0, hp - 5))}
                                className="flex-1 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 py-2 rounded-lg text-xs font-semibold text-red-300 transition-all"
                            >
                                - 5 HP
                            </button>
                            <button
                                onClick={() => setHp(Math.min(maxHp, hp + 5))}
                                className="flex-1 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 py-2 rounded-lg text-xs font-semibold text-green-300 transition-all"
                            >
                                + 5 HP
                            </button>
                            <button
                                onClick={() => setHp(maxHp)}
                                className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 py-2 rounded-lg text-xs font-semibold text-blue-300 transition-all"
                            >
                                Curar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 text-center">
                            <div className="text-2xl mb-1">🛡️</div>
                            <div className="text-xs text-gray-400">Armadura</div>
                            <div className="text-2xl font-bold text-blue-400">15</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 text-center">
                            <div className="text-2xl mb-1">⚔️</div>
                            <div className="text-xs text-gray-400">Ataque</div>
                            <div className="text-2xl font-bold text-red-400">+3</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600 text-center">
                            <div className="text-2xl mb-1">🎯</div>
                            <div className="text-xs text-gray-400">Iniciativa</div>
                            <div className="text-2xl font-bold text-yellow-400">+2</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-red-500/30 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 px-6 py-4 border-b border-red-500/20">
                    <h3 className="font-bold text-red-300 flex items-center gap-2">
                        <span className="text-xl">⚙️</span>
                        Acciones de Combate
                    </h3>
                </div>
                <div className="p-6">
                    <button
                        onClick={handleAttack}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 py-5 rounded-xl font-bold text-white shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                        <span className="text-3xl group-hover:rotate-12 transition-transform">⚔️</span>
                        <div className="text-left">
                            <div className="text-lg">Atacar Enemigo</div>
                            <div className="text-xs opacity-80">Tirada de ataque (d20)</div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-slate-700">
                    <h3 className="font-bold text-gray-300 flex items-center gap-2">
                        <span className="text-xl">🎲</span>
                        Bolsa de Dados
                    </h3>
                </div>
                <div className="p-6">
                    <DiceRoller onRoll={handleRoll} />
                </div>
            </div>
        </div>
    );
};

export default PlayerSheet;
