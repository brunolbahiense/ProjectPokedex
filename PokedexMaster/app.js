const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(251).fill().map((_, index) =>
     fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHtml = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
        <button class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
        <h2 class="card-title">${name}</h2>
        
        </button>`
    return accumulator

    }, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = pokemons
}


const pokemonPromisses = generatePokemonPromisses()
Promise.all(pokemonPromisses)
    .then(generateHtml)
    .then(insertPokemonsIntoPage)
