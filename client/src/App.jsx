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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <header className="mb-6 flex justify-between items-center border-b border-purple-500 border-opacity-30 pb-4" style={{backdropFilter: 'blur(4px)'}}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎲</span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            RPG Tabletop
          </h1>
        </div>
        <div className="bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full border border-gray-600">
          <span className="text-sm text-gray-400">Jugando como:</span>
          <span className="font-bold text-white ml-2">
            {role === 'GM' ? '👑 Game Master' : '⚔️ Jugador'}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Role Specific */}
        <div className="lg:col-span-2">
          {role === 'GM' ? (
            <GameMasterPanel socket={socket} enemies={gameState.enemies} />
          ) : (
            <PlayerSheet socket={socket} player={{ name: playerName || 'Aventurero', hp: 25 }} />
          )}
        </div>

        {/* Right Panel: Chat & Logs */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 bg-opacity-90 rounded-2xl border border-purple-500 border-opacity-20 p-6" style={{backdropFilter: 'blur(4px)'}}>
            <h2 className="text-xl font-bold mb-4 text-gray-300 flex items-center gap-2">
              <span className="text-2xl">📜</span>
              Registro de Aventuras
            </h2>
            <ChatLog logs={gameState.logs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
