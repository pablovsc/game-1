import React, { useEffect, useRef } from 'react';

const ChatLog = ({ logs }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const getLogStyle = (log) => {
        const isAction = log.includes('rolled') || log.includes('attack');
        const isSpawn = log.includes('spawned');
        const isJoin = log.includes('joined');

        if (isAction) {
            return {
                bg: 'bg-gradient-to-r from-red-950/80 to-orange-950/40',
                border: 'border-red-500/40',
                text: 'text-red-200',
                icon: '⚔️',
                badge: 'Combate'
            };
        }
        if (isSpawn) {
            return {
                bg: 'bg-gradient-to-r from-orange-950/80 to-amber-950/40',
                border: 'border-orange-500/40',
                text: 'text-orange-200',
                icon: '👾',
                badge: 'Invocación'
            };
        }
        if (isJoin) {
            return {
                bg: 'bg-gradient-to-r from-green-950/80 to-emerald-950/40',
                border: 'border-green-500/40',
                text: 'text-green-200',
                icon: '👤',
                badge: 'Conexión'
            };
        }
        return {
            bg: 'bg-gradient-to-r from-slate-900/80 to-slate-800/40',
            border: 'border-slate-600/40',
            text: 'text-gray-300',
            icon: '📜',
            badge: 'Sistema'
        };
    };

    const getTimestamp = () => {
        const now = new Date();
        return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="h-96 overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
                {logs.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <div className="relative inline-block mb-4">
                            <span className="text-6xl opacity-30">🌌</span>
                            <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full"></div>
                        </div>
                        <p className="text-lg font-medium text-gray-400">Esperando eventos...</p>
                        <p className="text-sm text-gray-600 mt-2">La aventura está por comenzar</p>
                    </div>
                ) : (
                    logs.map((log, index) => {
                        const style = getLogStyle(log);
                        return (
                            <div
                                key={index}
                                className={`${style.bg} backdrop-blur-sm p-4 rounded-lg border-l-4 ${style.border} transition-all duration-300 hover:scale-[1.02] group animate-fade-in`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="bg-slate-900/50 p-2 rounded-lg group-hover:scale-110 transition-transform">
                                        <span className="text-xl">{style.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs bg-slate-900/50 px-2 py-1 rounded text-gray-400 font-mono">
                                                {getTimestamp()}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded ${style.border} ${style.text} border font-semibold`}>
                                                {style.badge}
                                            </span>
                                        </div>
                                        <p className={`text-sm ${style.text} leading-relaxed break-words`}>
                                            {log}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatLog;
