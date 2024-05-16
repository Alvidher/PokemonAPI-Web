let pokemones = [];
let Team = [];
let squadRecord = [];

async function getPokemon(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.json();
}

async function displayPokemon(pokemonName) {
    const container = document.getElementById("pokemon-container");
    const pokemon = await getPokemon(pokemonName);

    pokemones.push(pokemon);

    container.innerHTML = '';

    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.innerHTML = `
        <div>
            <strong>Name:</strong> ${capitalizeFirst(pokemon.name)} <br>
            <strong>EXP:</strong> ${pokemon.base_experience} <br>
            <strong>Type:</strong> ${capitalizeFirst(pokemon.types[0].type.name)} <br>
            <img src="${pokemon.sprites.front_default}"> <br> 
            <button class="add-btn">Add</button>
        </div>
    `;
    container.appendChild(card);

    document.getElementById('nombre').value = "";

    const addButton = card.querySelector('.add-btn');

    if (isPokemonInTeam(pokemon)) {
        addButton.disabled = true;
        addButton.innerText = "Added";
        addButton.style.backgroundColor = "gray";
        addButton.style.color = "white";
        addButton.style.cursor = "not-allowed";
    } else if (Team.length >= 3) {
        addButton.disabled = true;
        addButton.innerText = "Team Full";
        addButton.style.backgroundColor = "gray";
        addButton.style.color = "white";
        addButton.style.cursor = "not-allowed";
        nombre.disabled = true;
    } else {
        addButton.disabled = false;
        addButton.addEventListener('click', function() {
            addToTeam(pokemon);
            addButton.disabled = true;
            addButton.innerText = "Added";
            addButton.style.backgroundColor = "gray";
            addButton.style.color = "white";
            addButton.style.cursor = "not-allowed";
        });
    }
}

function isPokemonInTeam(pokemon) {
    return Team.some(p => p.name === pokemon.name);
}

function addToTeam(pokemon) {
    if (Team.length < 3 && !isPokemonInTeam(pokemon)) {
        Team.push(pokemon);
        console.log('Pokemon added to list:', capitalizeFirst(pokemon.name));
    } else {
        console.log('Cant add more pokemons to the team or the pokemon is already in the team.');
    }
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displaySquadRecord() {
    const container = document.getElementById("pokemon-container");
    container.innerHTML = '';
    
    for (let i = 0; i < squadRecord.length; i++) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('squad-group');
        groupDiv.innerHTML = `<h2>Team #${i + 1}</h2>`;

        squadRecord[i].forEach(pokemon => {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');
            card.innerHTML = `
                <div>
                    <strong>Name:</strong> ${capitalizeFirst(pokemon.name)} <br>
                    <strong>EXP:</strong> ${pokemon.base_experience} <br>
                    <strong>Type:</strong> ${capitalizeFirst(pokemon.types[0].type.name)} <br>
                    <img src="${pokemon.sprites.front_default}"> <br> 
                </div>
            `;
            groupDiv.appendChild(card);
        });

        container.appendChild(groupDiv);
    }
}

document.getElementById('buscar').addEventListener('click', function() {
    const pokemonName = document.getElementById('nombre').value;
    displayPokemon(pokemonName);
});

document.getElementById('historial').addEventListener('click', async function() {
    const container = document.getElementById("pokemon-container");

    container.innerHTML = '';

    for (let i = pokemones.length - 1; i >= 0; i--) {
        const pokemon = pokemones[i];
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <div>
                <strong>Name:</strong> ${capitalizeFirst(pokemon.name)} <br>
                <strong>EXP:</strong> ${pokemon.base_experience} <br>
                <strong>Type:</strong> ${capitalizeFirst(pokemon.types[0].type.name)} <br>
                <img src="${pokemon.sprites.front_default}"> <br> 
                <button class="add-btn">Add</button>
            </div>
        `;
        container.appendChild(card);

        const addButton = card.querySelector('.add-btn');
        addButton.addEventListener('click', function() {
            addToTeam(pokemon);
            addButton.disabled = true;
            addButton.innerText = "Added";
            addButton.style.backgroundColor = "gray";
            addButton.style.color = "white";
            addButton.style.cursor = "not-allowed";
        });

        displaySquadRecord();
    }

    document.getElementById('nombre').value = "";
});

async function showSquad() {
    const container = document.getElementById("pokemon-container");

    container.innerHTML = '';

    Team.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <div>
                <strong>Name:</strong> ${capitalizeFirst(pokemon.name)} <br>
                <strong>EXP:</strong> ${pokemon.base_experience} <br>
                <strong>Type:</strong> ${capitalizeFirst(pokemon.types[0].type.name)} <br>
                <img src="${pokemon.sprites.front_default}"> <br> 
            </div>
        `;
        container.appendChild(card);
    });
}

document.getElementById('equipo').addEventListener('click', function() {
    showSquad();
});


function clearTeam() {
    squadRecord.push([...Team]);
    Team = [];
    showSquad();
    console.log('Team cleared.');
}

document.getElementById('borrar-equipo').addEventListener('click', function() {
    nombre.disabled = false;
    
    if (Team.length > 0) {
        clearTeam();
    } else {
        console.log('Team is empty.');
        showSquad();
    }
    
});
