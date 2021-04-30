import { removeChildren } from '../utils/index.js'

const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonById')
const newButton = document.querySelector('.newPokemon')

let offset = 0
let limit = 25

//this click event allows the user to load more Pokemon each time the button is clicked
loadButton.addEventListener('click', () => {
    loadPage(offset, limit)
    offset = offset + limit
    loadButton.textContent = `Load More Pokemon`
})

//this click event allows the user to fetch a Pokemon by ID or Name
//it also stops executing code if the cancel button is clicked
fetchButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  let pokeId = prompt("Pokemon ID or Name:")
  if (pokeId && pokeId.length > 0) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId.toLowerCase()}`)
    .then((data) => populatePokeCard(data))
    .catch((error) => console.log(error))
  }
})

class Pokemon {
  constructor(name, id, height, weight, abilities, moves, types, stats) {
    this.id = 900
    this.name = name
    this.id = id
    this.height = height
    this.weight = weight
    this.abilities = abilities
    this.moves = moves
    this.types = types
    this.stats = stats
  }
}

//this click event prompts the user to insert data to create a new Pokemon
newButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  let pokeName = prompt('What is the name of your new Pokemon?')
    if (pokeName != undefined) {
  let pokeId = 900
  let pokeAbilities = prompt('What are your Pokemon abilities? (use a comma separated list',)
  let pokeHeight = prompt('What is the height of your new Pokemon?')
  let pokeWeight = prompt('What is the weight of your new Pokemon?')
  let abilitiesArray = getAbilitiesArray(pokeAbilities)
  let newPokemon = new Pokemon(
    pokeName,
    pokeId,
    pokeHeight,
    pokeWeight,
    abilitiesArray,
    ['study', 'code', 'silence'],
    [
      {
        type: {
          name: 'normal',
        },
      },
    ],
    [{
      base_stat: 100,
      stat: {
        name: "hp"
      }
    }]
  )
  populatePokeCard(newPokemon)}
})

//this function allows the user to use commas to separate the abilities inserted in the prompt that shows up when you click on the new pokemon button.
//it then returns how many abilities your new pokemon has.
function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      },
    }
  })
}

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        alert('Could Not Find Data')
    }
}

//this function gets the API data
function loadPage(offset, limit) {
  removeChildren(pokeGrid)
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  ).then(async (data) => {
    for (const singlePokemon of data.results) {
      await getAPIData(singlePokemon.url).then((pokeData) =>
        populatePokeCard(pokeData),
      )
    }
  })
}

//this function creates the pokemon card
function populatePokeCard(singlePokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    pokeCard.appendChild(populateCardFront(singlePokemon))
    pokeCard.appendChild(populateCardBack(singlePokemon))
    
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

//this function defines the pokemon card front
function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)
    frontImage.addEventListener(
      'error', 
      () => (frontImage.src = 'https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png'),
      )

    pokeFront.appendChild(frontImage)
    pokeFront.appendChild(frontLabel)
    
    return pokeFront
}

//this function defines the pokemon card back
function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('div')
    let backLabelMoves = document.createElement('p')
    let backLabelAbilities = document.createElement('p')
    let pokeHeight = document.createElement('p')
    pokeHeight.textContent = `Height: ${pokemon.height / 10}m`
    let pokeWeight = document.createElement('p')
    pokeWeight.textContent = `Weight: ${pokemon.weight / 10} kg`
    let pokeBackId = document.createElement('p')
    pokeBackId.textContent = `ID: 0${pokemon.id}`

    backLabelMoves.textContent = `Moves: ${pokemon.moves.length}`
    backLabelAbilities.textContent = `Abilities: ${pokemon.abilities.length}`
    
    pokeBack.appendChild(pokeBackId)
    backLabel.appendChild(pokeBackId)
    backLabel.appendChild(backLabelMoves)
    backLabel.appendChild(backLabelAbilities)
    pokeBack.appendChild(backLabel)
    pokeBack.appendChild(pokeHeight)
    backLabel.appendChild(pokeHeight)
    pokeBack.appendChild(pokeWeight)
    backLabel.appendChild(pokeWeight)

    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    if (pokemon.id === 900) {
        return `https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png`
    }

    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}