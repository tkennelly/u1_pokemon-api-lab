console.log('working')

let form = document.querySelector("#searchForm")
let randomButton = document.querySelector("#randoButton")

// const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')

let randomPokeNumber = function() {
    return Math.floor(
        Math.random() * (1015 - 1 + 1) + 1
      )
}

const getRandomPokemon = async (e) => {
    e.preventDefault()


    let number = randomPokeNumber()

    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${number}`
    )

    let result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${number}`
    )

    pokeCommonSetter(response, result) 
}



const getPokemon = async (e) => {
    e.preventDefault()


    let textInput = document.querySelector("#inputBar").value

    let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${textInput}`
    )

    let result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${textInput}`
    )

    pokeCommonSetter(response, result) 
}

let pokeCommonSetter = function(response, result) {
    console.log(response)
    let pokemonName = document.querySelector("#pokemonName")
    let commonShineyHeader = document.querySelector("#shineyCheck")
    let pokemonImage = document.querySelector("#pokemonImage")
    let typeText = document.querySelector("#pokemonType")
    let moveText = document.querySelector("#pokemonMoves")
    let flavorText = document.querySelector("#flavorText")

    let name = response.data.name[0].toUpperCase() + response.data.name.substring(1, response.data.name.length)

    pokemonName.innerHTML = name
    commonShineyHeader.innerHTML = "Common"
    pokemonImage.setAttribute("src", `${response.data.sprites.other["official-artwork"].front_default}`)

    let types = []
    for (let i = 0; i < response.data.types.length; i++) {
        types.push(response.data.types[i].type.name)
    }

    let moves = []
    for (let i = 0; i < response.data.abilities.length; i++) {
        moves.push(response.data.abilities[i].ability.name)
    }


    typeText.innerHTML = `Types: ${types.join(", ")}`
    moveText.innerHTML = `Abilities: ${moves.join(",\r\n")}`

    if(result.data.flavor_text_entries[0]) {
        flavorText.innerHTML = `Fun Fact: ${result.data.flavor_text_entries[0].flavor_text}`
    } else {
        flavorText.innerHTML = `Fun Fact: There is no fun fact!`
    }
    

    // commonShineyHeader.addEventListener('click', pokeShineySetter(response, result))
}

// let pokeShineySetter = function(e) {
//     e.preventDefault()
// }

form.addEventListener('submit', getPokemon)
randomButton.addEventListener('click', getRandomPokemon)



