// IC17 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

console.log('React version:', React.version);
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');

const TamagotchiPet = () => {
    const [hunger, setHunger] = React.useState(50);
    const [energy, setEnergy] = React.useState(50);

    const feedPet = () => {
        setHunger(Math.max(0, hunger-15));
    };

    const playWithPet = () => {
        setEnergy(Math.max(0, energy-10));
        setHunger(Math.min(100, hunger +5));
    };

    const restPet = () => {
        setEnergy(Math.min(100, energy + 20));
        setHunger(Math.min(100, hunger + 8));
    };

    const getPetMood = () => {
        if (hunger > 75) return 'Starving!';
        if (energy < 25) return 'Exhausted!';
        if (hunger<30 && energy > 70) return 'Thriving!';
        return 'Okay';
    };

    return (
        <div className='pet-card'>
            <h1>Pixel</h1>
            <div className="stats">
                <p className="stat">Hunger: {hunger}</p>
                <p className="stat">Energy: {energy}</p>
            </div>

            <div className="mood">{getPetMood()}</div>

            <div className="controls">
                <button onClick={feedPet}>Feed</button>
                <button onClick={playWithPet}>Play</button>
                <button onClick={restPet}>Rest</button>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TamagotchiPet />)