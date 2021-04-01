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
    let pokeCard = document.createElement('div')
    // make card front
    // make card back
    // append them all to pokeGrid
    console.log(singlePokemon)
}

