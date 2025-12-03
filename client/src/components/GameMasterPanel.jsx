import React, { useState } from 'react';

const GameMasterPanel = ({ socket, enemies }) => {
    const [newEnemy, setNewEnemy] = useState({ name: '', hp: 10, ac: 10, atk: 0 });

    const spawnEnemy = (e) => {
        e.preventDefault();
        socket.emit('dm_spawn_enemy', newEnemy);
        setNewEnemy({ name: '', hp: 10, ac: 10, atk: 0 });
    };

    const totalEnemyHP = enemies.reduce((sum, e) => sum + e.hp, 0);

    return (
        <div className="space-y-6">
            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 px-6 py-4 border-b border-amber-500/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
                                <span className="text-2xl">👑</span>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-amber-300">Panel del Game Master</h2>
                                <p className="text-xs text-amber-400/70">Control total del campo de batalla</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-400">Enemigos activos</div>
                            <div className="text-2xl font-bold text-amber-400">{enemies.length}</div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <form onSubmit={spawnEnemy} className="space-y-4">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">👾</span>
                            <h3 className="font-semibold text-gray-300">Invocar Nuevo Enemigo</h3>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-2 block">Nombre del enemigo</label>
                            <input
                                type="text"
                                placeholder="Ej: Dragón Carmesí, Orco Guerrero..."
                                value={newEnemy.name}
                                onChange={e => setNewEnemy({ ...newEnemy, name: e.target.value })}
                                className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 mb-2 flex items-center gap-1 block">
                                    <span>❤️</span> Puntos de Vida
                                </label>
                                <input
                                    type="number"
                                    value={newEnemy.hp}
                                    onChange={e => setNewEnemy({ ...newEnemy, hp: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all outline-none text-center font-bold"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-2 flex items-center gap-1 block">
                                    <span>🛡️</span> Clase de Armadura
                                </label>
                                <input
                                    type="number"
                                    value={newEnemy.ac}
                                    onChange={e => setNewEnemy({ ...newEnemy, ac: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-center font-bold"
                                    min="1"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 mb-2 flex items-center gap-1 block">
                                    <span>⚔️</span> Bonificador ATK
                                </label>
                                <input
                                    type="number"
                                    value={newEnemy.atk}
                                    onChange={e => setNewEnemy({ ...newEnemy, atk: parseInt(e.target.value) || 0 })}
                                    className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none text-center font-bold"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 py-4 rounded-xl font-bold text-white shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">✨</span>
                            Invocar Enemigo
                            <span className="text-xl group-hover:scale-110 transition-transform">✨</span>
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-red-500/30 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 px-6 py-4 border-b border-red-500/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">👿</span>
                            <h3 className="font-bold text-red-300">Campo de Batalla</h3>
                        </div>
                        {enemies.length > 0 && (
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-400">HP Total:</span>
                                <span className="text-red-400 font-bold">{totalEnemyHP}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    <div className="space-y-3">
                        {enemies.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <div className="text-5xl mb-4 opacity-50">🌫️</div>
                                <p className="text-lg font-medium">Campo de batalla vacío</p>
                                <p className="text-sm text-gray-600">Invoca enemigos para comenzar el combate</p>
                            </div>
                        ) : (
                            enemies.map((enemy, index) => (
                                <div
                                    key={enemy.id}
                                    className="bg-gradient-to-r from-red-950/50 to-orange-950/30 backdrop-blur-sm p-4 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-red-900/50 p-2 rounded-lg group-hover:scale-110 transition-transform">
                                                <span className="text-2xl">👾</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-200 text-lg">{enemy.name}</h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs bg-red-900/30 px-2 py-1 rounded text-red-400">
                                                        Nivel de amenaza: {Math.ceil((enemy.hp + enemy.ac + enemy.atk) / 10)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="bg-red-900/30 px-4 py-2 rounded-lg text-center border border-red-500/20">
                                                <div className="text-xs text-red-400/70">❤️ HP</div>
                                                <div className="text-xl font-bold text-red-300">{enemy.hp}</div>
                                            </div>
                                            <div className="bg-blue-900/30 px-4 py-2 rounded-lg text-center border border-blue-500/20">
                                                <div className="text-xs text-blue-400/70">🛡️ AC</div>
                                                <div className="text-xl font-bold text-blue-300">{enemy.ac}</div>
                                            </div>
                                            <div className="bg-green-900/30 px-4 py-2 rounded-lg text-center border border-green-500/20">
                                                <div className="text-xs text-green-400/70">⚔️ ATK</div>
                                                <div className="text-xl font-bold text-green-300">+{enemy.atk}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameMasterPanel;
