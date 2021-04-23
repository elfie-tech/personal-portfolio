import { removeChildren } from '../utils/index.js'

const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonById')
const newButton = document.querySelector('.newPokemon')

let offset = 0
let limit = 25

loadButton.addEventListener('click', () => {
    loadPage(offset, limit)
    offset = offset + limit
    loadButton.textContent = `Load More Pokemon`
})

fetchButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
    let pokeId = prompt("Pokemon ID or Name:").toLowerCase()
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then((data) => populatePokeCard(data))
    .catch((error) => console.log(error))
})

class Pokemon {
  constructor(name, height, weight, abilities, moves, types, stats) {
    this.id = 900
    this.name = name
    this.height = height
    this.weight = weight
    this.abilities = abilities
    this.moves = moves
    this.types = types
    this.stats = stats
  }
}

newButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  let pokeName = prompt('What is the name of your new Pokemon?')
  //let pokeHeight = prompt('Pokemon height?')
  //let pokeWeight = prompt('Pokemon weight?')
  let pokeAbilities = prompt(
    'What are your Pokemon abilities? (use a comma separated list',
  )
  let abilitiesArray = getAbilitiesArray(pokeAbilities)
  let newPokemon = new Pokemon(
    pokeName,
    234,
    3000,
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
  populatePokeCard(newPokemon)
})
  
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

function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)
/*     frontImage.addEventListener('error', () => (frontImage.src = 'https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png'),) */
    pokeFront.appendChild(frontImage)
    pokeFront.appendChild(frontLabel)
    
    
    /* pokeFront.classList.add('pokemon.types[0].type.name') */

    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('div')
    let backLabelMoves = document.createElement('p')
    let backLabelAbilities = document.createElement('p')
    let backLabelHeight = document.createElement('p')

    backLabelMoves.textContent = `Moves: ${pokemon.moves.length}`
    backLabelAbilities.textContent = `Abilities: ${pokemon.abilities.length}`
    backLabelHeight.textContent = `Height: ${pokemon.height}`

    backLabel.appendChild(backLabelMoves)
    backLabel.appendChild(backLabelAbilities)
    backLabel.appendChild(backLabelHeight)
    pokeBack.appendChild(backLabel)

    pokemon.types.forEach((pokeType) => {
        console.log(pokeType)
        let backType = document.createElement('p')
        backType.textContent = pokeType.type.name
        pokeBack.appendChild(backType)
        backLabel.appendChild(backType)
    })

    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokemon.id
    if (pokemon.id === 900) {
        return `https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_1280.png`
    }

    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}




/* 
- Figure out how to get rid of loaded page when you've clicked other buttons
  - Maybe this could be done with a click event that says:
    When clicked, removed loadPage()??
- When creating your own pokemon, the abilities and moves don't insert the amount of moves and abilities that they should.  How can I fix this?
*/

