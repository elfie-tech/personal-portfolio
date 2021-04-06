const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')

loadButton.addEventListener('click', () => {
    loadPage()
})

async function getAPIData(url) {
    try {
        const response = await fetch(url) //try getting data from the API at the url provided
        const data = await response.json() // convert the response into JSON
        return data // return the data from the function to whoever called it
    } catch (error) { // must have been an error
        console.log(error)
    }
}

function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/1`).then(
        (data) => {
            for (const singlePokemon of data.results) {
                console.log(singlePokemon)
                populatePokeCard(singlePokemon)
            }
        }
    )
}

function populatePokeCard(singlePokemon) {
    // use the same html as in the CodePen Card flip example
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'

    pokeCard.appendChild(populateCardFront(singlePokemon))

    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'    
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = 'images/001.png'
    pokeFront.appendChild(frontLabel)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('p')
    backLabel.textContent = 'Back of Card'
    pokeBack.appendChild(backLabel)
    return pokeBack
}