export const rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
};

export const DiceRoller = ({ onRoll }) => {
    const dice = [
        { sides: 4, color: 'from-emerald-500 to-teal-600', border: 'border-emerald-500/40', shadow: 'shadow-emerald-500/50', emoji: '🔸', name: 'Tetraedro' },
        { sides: 6, color: 'from-blue-500 to-cyan-600', border: 'border-blue-500/40', shadow: 'shadow-blue-500/50', emoji: '��', name: 'Cubo' },
        { sides: 8, color: 'from-violet-500 to-fuchsia-600', border: 'border-violet-500/40', shadow: 'shadow-violet-500/50', emoji: '🔷', name: 'Octaedro' },
        { sides: 10, color: 'from-orange-500 to-amber-600', border: 'border-orange-500/40', shadow: 'shadow-orange-500/50', emoji: '🔶', name: 'Decaedro' },
        { sides: 12, color: 'from-pink-500 to-rose-600', border: 'border-pink-500/40', shadow: 'shadow-pink-500/50', emoji: '🔵', name: 'Dodecaedro' },
        { sides: 20, color: 'from-red-500 to-rose-600', border: 'border-red-500/40', shadow: 'shadow-red-500/50', emoji: '✨', name: 'Icosaedro' }
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {dice.map((d, index) => (
                <button
                    key={d.sides}
                    onClick={() => onRoll(d.sides)}
                    className={`group relative bg-gradient-to-br ${d.color} hover:scale-105 active:scale-95 text-white rounded-xl font-bold transition-all duration-300 ${d.shadow} hover:shadow-lg overflow-hidden border ${d.border}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>

                    <div className="relative p-4 flex flex-col items-center gap-2">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                            {d.emoji}
                        </span>
                        <div className="text-center">
                            <div className="text-lg font-black">d{d.sides}</div>
                            <div className="text-[10px] opacity-70 font-medium">{d.name}</div>
                        </div>
                    </div>

                    <div className="absolute top-1 right-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                        1-{d.sides}
                    </div>
                </button>
            ))}
        </div>
    );
};
