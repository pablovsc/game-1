export const rollDice = (sides) => {
    return Math.floor(Math.random() * sides) + 1;
};

export const DiceRoller = ({ onRoll }) => {
    const dice = [
        { sides: 4, color: 'from-emerald-500 to-teal-500', emoji: '🔸' },
        { sides: 6, color: 'from-blue-500 to-cyan-500', emoji: '🎲' },
        { sides: 8, color: 'from-purple-500 to-violet-500', emoji: '🔷' },
        { sides: 10, color: 'from-orange-500 to-amber-500', emoji: '🔶' },
        { sides: 12, color: 'from-pink-500 to-rose-500', emoji: '🔵' },
        { sides: 20, color: 'from-red-500 to-pink-500', emoji: '✨' }
    ];

    return (
        <div className="grid grid-cols-3 gap-3 p-4 bg-gray-900 bg-opacity-50 rounded-xl border border-gray-700">
            {dice.map((d) => (
                <button
                    key={d.sides}
                    onClick={() => onRoll(d.sides)}
                    className={`px-4 py-3 bg-gradient-to-r ${d.color} hover:scale-110 text-white rounded-xl font-bold transition-all duration-200 shadow-lg flex flex-col items-center gap-1`}
                >
                    <span className="text-lg">{d.emoji}</span>
                    <span className="text-sm">d{d.sides}</span>
                </button>
            ))}
        </div>
    );
};
