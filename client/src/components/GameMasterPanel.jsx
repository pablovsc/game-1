import React, { useState } from 'react';

const GameMasterPanel = ({ socket, enemies }) => {
    const [newEnemy, setNewEnemy] = useState({ name: '', hp: 10, ac: 10, atk: 0 });

    const spawnEnemy = (e) => {
        e.preventDefault();
        socket.emit('dm_spawn_enemy', newEnemy);
        setNewEnemy({ name: '', hp: 10, ac: 10, atk: 0 });
    };

    return (
        <div className="p-6 bg-gray-800 bg-opacity-90 rounded-2xl text-white border border-purple-500 border-opacity-20" style={{backdropFilter: 'blur(4px)'}}>
            <h2 className="text-2xl font-bold mb-6 text-amber-400 flex items-center gap-3">
                <span className="text-3xl">👑</span>
                Panel del Game Master
            </h2>

            <form onSubmit={spawnEnemy} className="mb-8 space-y-4 bg-gray-900 bg-opacity-80 p-6 rounded-xl border border-gray-700">
                <h3 className="font-semibold text-gray-300 flex items-center gap-2">
                    <span className="text-xl">👾</span>
                    Invocar Enemigo
                </h3>
                <input
                    type="text"
                    placeholder="Nombre (ej. Goblin Salvaje)"
                    value={newEnemy.name}
                    onChange={e => setNewEnemy({ ...newEnemy, name: e.target.value })}
                    className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:ring-opacity-20 transition-all"
                    required
                />
                <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 flex items-center gap-1">
                            <span>❤️</span> HP
                        </label>
                        <input
                            type="number"
                            placeholder="25"
                            value={newEnemy.hp}
                            onChange={e => setNewEnemy({ ...newEnemy, hp: parseInt(e.target.value) })}
                            className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-20 transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 flex items-center gap-1">
                            <span>🛡️</span> AC
                        </label>
                        <input
                            type="number"
                            placeholder="15"
                            value={newEnemy.ac}
                            onChange={e => setNewEnemy({ ...newEnemy, ac: parseInt(e.target.value) })}
                            className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-400 flex items-center gap-1">
                            <span>⚔️</span> ATK
                        </label>
                        <input
                            type="number"
                            placeholder="+3"
                            value={newEnemy.atk}
                            onChange={e => setNewEnemy({ ...newEnemy, atk: parseInt(e.target.value) })}
                            className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-20 transition-all"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-3 rounded-xl font-bold text-white shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                    <span className="text-xl">✨</span>
                    Invocar Enemigo
                </button>
            </form>

            <div>
                <h3 className="font-semibold mb-4 text-gray-300 flex items-center gap-2">
                    <span className="text-xl">👿</span>
                    Enemigos Activos
                </h3>
                <div className="space-y-3">
                    {enemies.map(enemy => (
                        <div key={enemy.id} className="bg-red-900 bg-opacity-30 p-4 rounded-xl border border-red-500 border-opacity-20" style={{backdropFilter: 'blur(4px)'}}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">👾</span>
                                    <span className="font-bold text-red-300">{enemy.name}</span>
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <span className="text-red-400 flex items-center gap-1">
                                        <span>❤️</span> {enemy.hp}
                                    </span>
                                    <span className="text-blue-400 flex items-center gap-1">
                                        <span>🛡️</span> {enemy.ac}
                                    </span>
                                    <span className="text-green-400 flex items-center gap-1">
                                        <span>⚔️</span> +{enemy.atk}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {enemies.length === 0 && (
                        <div className="text-center py-8 text-gray-500 italic bg-gray-800 bg-opacity-30 rounded-xl border border-gray-700 border-dashed">
                            <span className="text-3xl block mb-2">🌫️</span>
                            No hay enemigos en el campo de batalla
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameMasterPanel;
