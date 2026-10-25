// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

async function loadRoster() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");

        if (!response.ok) {
            throw new Error("Not a valid response.");
        }
        
        const data = await response.json();
        
        let sortedArray = data.results.filter(function (pokemon) {
            return pokemon.name.length <= 6;
        });
        sortedArray = sortedArray.sort(function (a,b) {
            return a.name.length - b.name.length;
        });
        
        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster={sortedArray} />)

    } catch (error) {
        console.log(error.message);
        document.querySelector("#root").innerHTML = <p>There was an error loading the roster.</p>
    }
}

function PokemonCard(props) {
    return (
        <div className = "pokemon-card">
            <div className = "image-frame">
                <img src={"https://placehold.co/150x150/4FC3F7/333333?text="+props.name}/>
            </div>
            <h3>{props.name}</h3>
            <p className="charLength">{props.name.length}</p>
            <p>{props.description}</p>
        </div>
    );
}

function PokemonRoster(props) {
    return (
        <div className="pokemon-roster">
            {props.pokemon.map(function (pokemon, index) {
                return (
                    <PokemonCard
                    key = {index}
                    name={pokemon.name}
                    description={pokemon.description}
                />
                );
            })}
        </div>
    );
}

function App(props) {
    return (
        <div><h1>Showing {props.roster.length} short-named Pokemon, shortest name first</h1> 
        <PokemonRoster pokemon={props.roster}></PokemonRoster></div>
    );
}

loadRoster();