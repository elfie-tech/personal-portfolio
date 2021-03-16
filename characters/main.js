import { people } from "../data/people.js"

//misc.
const mainContent = document.querySelector("main")

const mainHeader = document.createElement("header")

document.body.insertBefore(mainHeader, mainContent)

//maleButton
const maleButton = document.createElement("button")
maleButton.textContent = "Male Characters"
maleButton.addEventListener("click", () => populateDOM(maleCharacters))

mainHeader.appendChild(maleButton)

//femaleButton
const femaleButton = document.createElement("button")
femaleButton.textContent = "Female Characters"
femaleButton.addEventListener("click", () => populateDOM(femaleCharacters))

mainHeader.appendChild(femaleButton)

//otherButton
const otherButton = document.createElement("button")
otherButton.textContent = "Other Characters"
otherButton.addEventListener("click", () => populateDOM(otherCharacters))

mainHeader.appendChild(otherButton)

//maleCharacters
const maleCharacters = people.filter(person => person.gender === "male")
console.log(maleCharacters)

//femaleCharacters
const femaleCharacters = people.filter(person => person.gender === "female")
console.log(femaleCharacters)

//otherCharacters
const otherCharacters = people.filter(person => {
    if (person.gender === "n/a" || person.gender === "none" || person.gender === "hermaphrodite") {
        return person
    }
})

//Included Jabba's gender in the otherCharacters 'if' condition :)

//populateDOM function
function populateDOM(characters) {
    removeChildren(mainContent)
    characters.forEach(person => {
        const charFigure = document.createElement("figure")
        const charImg = document.createElement("img")
        let charNum = getLastNumber(person.url)

        charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
        const charCaption = document.createElement("figcaption")

        charCaption.textContent = person.name

        charFigure.appendChild(charImg)
        charFigure.appendChild(charCaption)
        mainContent.appendChild(charFigure)
    })
}

//getLastNumber function
function getLastNumber(url) {
    let end = url.lastIndexOf("/")
    let start = end - 2
    if (url.charAt(start) === "/") {
        start++
    }
    return url.slice(start, end)
}

//removeChildren function
function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

