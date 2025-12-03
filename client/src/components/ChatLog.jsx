import React, { useEffect, useRef } from 'react';

const ChatLog = ({ logs }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="h-80 overflow-y-auto bg-gray-900 bg-opacity-80 p-4 rounded-xl border border-gray-700" style={{backdropFilter: 'blur(4px)'}}>
            <div className="space-y-2">
                {logs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 italic">
                        <span className="text-3xl block mb-2">🌌</span>
                        La aventura está por comenzar...
                    </div>
                ) : (
                    logs.map((log, index) => {
                        const isAction = log.includes('rolled') || log.includes('attack');
                        const isSpawn = log.includes('spawned');
                        const isJoin = log.includes('joined');
                        
                        return (
                            <div 
                                key={index} 
                                className={`p-3 rounded-lg border-l-4 transition-all duration-300 ${
                                    isAction ? 'bg-red-900 bg-opacity-20 border-red-500 text-red-200' :
                                    isSpawn ? 'bg-orange-900 bg-opacity-20 border-orange-500 text-orange-200' :
                                    isJoin ? 'bg-green-900 bg-opacity-20 border-green-500 text-green-200' :
                                    'bg-gray-800 bg-opacity-30 border-gray-600 text-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-lg">
                                        {isAction ? '⚔️' : isSpawn ? '👾' : isJoin ? '👤' : '📜'}
                                    </span>
                                    <span className="font-mono">{log}</span>
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
