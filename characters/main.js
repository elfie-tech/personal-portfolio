import { people } from "../data/people.js"

const mainContent = document.querySelector("main")

const mainHeader = document.createElement("header")

const maleButton = document.createElement("button")
maleButton.textContent = "Male Characters"
maleButton.addEventListener("click", () => {
    populateDOM(maleCharacters)
})

mainHeader.appendChild(maleButton)
document.body.insertBefore(mainHeader, mainContent)

/*      IDEAS FOR FEMALE BUTTON
const femaleButton = document.createElement("button")
femaleButton.textContent = "Female Characters"
femaleButton.addEventListener("click", () => {
    populateDOM(femaleCharacters)
})

mainHeader.appendChild(femaleButton)
document.body.insertBefore(mainHeader, mainContent) */

const maleCharacters = people.filter(person => person.gender === "male")
console.log(maleCharacters)

const femaleCharacters = people.filter(person => person.gender === "female")
console.log(femaleCharacters)

const otherCharacters = people.filter(person => {
    if (person.gender === "n/a" || person.gender === "none") {
        return person
    }
})

console.log(otherCharacters)


function populateDOM(characters) {
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

function getLastNumber(url) {
    let end = url.lastIndexOf("/")
    let start = end - 2
    if (url.charAt(start) === "/") {
        start++
    }
    return url.slice(start, end)
}