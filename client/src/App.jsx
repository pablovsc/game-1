import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GameMasterPanel from './components/GameMasterPanel';
import PlayerSheet from './components/PlayerSheet';
import ChatLog from './components/ChatLog';

// Connect to backend
const socket = io('http://localhost:3001');

function App() {
  const [role, setRole] = useState(null); // 'GM' or 'PLAYER'
  const [gameState, setGameState] = useState({ enemies: [], logs: [] });
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    socket.on('update_gamestate', (newState) => {
      setGameState(newState);
    });

    return () => {
      socket.off('update_gamestate');
    };
  }, []);

  const joinGame = (selectedRole) => {
    setRole(selectedRole);
    const name = selectedRole === 'GM' ? 'Game Master' : (playerName || 'Adventurer');
    socket.emit('join_game', { role: selectedRole, name });
  };

  if (!role) {
    return (
      <div 
        className="min-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/rpg-background.jpg")',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Partículas flotantes decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-amber-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="relative z-10 max-w-lg w-full">
          {/* Tarjeta principal */}
          <div className="bg-black bg-opacity-80 p-10 rounded-3xl shadow-2xl text-center border border-purple-500 border-opacity-30" style={{backdropFilter: 'blur(10px)'}}>
            
            {/* Header con logo */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="text-8xl mb-4 filter drop-shadow-lg animate-pulse">🎲</div>
                <div className="absolute -top-2 -right-2 text-2xl">✨</div>
              </div>
              
              <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                RPG Tabletop
              </h1>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
                <span className="text-purple-300 text-sm font-medium px-3">AVENTURA ÉPICA</span>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent flex-1"></div>
              </div>
              
              <p className="text-gray-300 text-sm italic">"Donde las leyendas cobran vida"</p>
            </div>

            {/* Input del nombre */}
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <input
                  type="text"
                  placeholder="🧙♂️ Escribe tu nombre de aventurero..."
                  value={playerName}
                  className="relative w-full p-4 bg-gray-900 bg-opacity-90 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition-all text-center font-medium"
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>
            </div>

            {/* Botones de rol */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <button
                  onClick={() => joinGame('GM')}
                  className="relative w-full px-8 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-white shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  <span className="text-2xl">👑</span>
                  <div className="text-left">
                    <div>Game Master</div>
                    <div className="text-xs opacity-80">Controla el destino</div>
                  </div>
                  <span className="text-2xl">⚡</span>
                </button>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <button
                  onClick={() => joinGame('PLAYER')}
                  className="relative w-full px-8 py-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-xl font-bold text-white shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  <span className="text-2xl">⚔️</span>
                  <div className="text-left">
                    <div>Aventurero</div>
                    <div className="text-xs opacity-80">Forja tu leyenda</div>
                  </div>
                  <span className="text-2xl">🛡️</span>
                </button>
              </div>
            </div>

            {/* Footer decorativo */}
            <div className="mt-8 pt-6 border-t border-gray-700 border-opacity-50">
              <div className="flex justify-center items-center gap-4 text-gray-400 text-xs">
                <span className="flex items-center gap-1">
                  <span className="text-sm">🎯</span>
                  Estrategia
                </span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <span className="text-sm">🎭</span>
                  Roleplay
                </span>
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <span className="text-sm">🏆</span>
                  Gloria
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      <div className="relative z-10">
        <header className="mb-6 bg-slate-900/50 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-xl shadow-lg">
                <span className="text-3xl">🎲</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                  RPG Tabletop
                </h1>
                <p className="text-xs text-gray-400">Sistema de juego en tiempo real</p>
              </div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur px-5 py-3 rounded-xl border border-slate-600 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <span className="text-xs text-gray-400 block">Conectado como</span>
                  <span className="font-bold text-white text-sm">
                    {role === 'GM' ? '👑 Game Master' : '⚔️ ' + (playerName || 'Jugador')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {role === 'GM' ? (
              <GameMasterPanel socket={socket} enemies={gameState.enemies} />
            ) : (
              <PlayerSheet socket={socket} player={{ name: playerName || 'Aventurero', hp: 25 }} />
            )}
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-4">
              <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 border-b border-slate-700">
                  <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                    <span className="text-2xl">📜</span>
                    Registro de Aventuras
                    <span className="ml-auto text-xs bg-cyan-900/30 px-2 py-1 rounded-full text-cyan-400">
                      {gameState.logs.length} eventos
                    </span>
                  </h2>
                </div>
                <div className="p-4">
                  <ChatLog logs={gameState.logs} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
