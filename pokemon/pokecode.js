const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonById')

loadButton.addEventListener('click', () => {
    loadPage()
    loadButton.style.display = 'none'
    fetchButton.style.display = 'none'
})


//fetch by id - play with this if you want to
fetchButton.addEventListener('click', () => {
    let pokeId = prompt("Pokemon ID or Name:")
    console.log(pokeId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(
        data => populatePokeCard(data)
    ).catch(error => console.log(error))
    fetchButton.style.display = 'none'
    loadButton.style.display = 'none'
})

async function getAPIData(url) {
    try {
        const response = await fetch(url) // try getting data from the API at the url provided
        const data = await response.json() //convert the response into JSON
        return data //return the data from the function to whoever called it
    } catch (error) {
        console.log(error)
        alert('Could Not Find Data')
    }
}

function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=50`).then(
        async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => populatePokeCard(pokeData)
                )
            }
        }
    )
}

function populatePokeCard(singlePokemon) {
    //use the same html as in the CodePen Card flip example
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    //make the card front
    pokeCard.appendChild(populateCardFront(singlePokemon))
    //make the card back
    pokeCard.appendChild(populateCardBack(singlePokemon))
    //append them all to pokeGrid
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
    pokeFront.appendChild(frontImage)
    pokeFront.appendChild(frontLabel)
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
    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokemon.id

    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}