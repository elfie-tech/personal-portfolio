import { senators } from "../data/senators.js"
import { representatives } from "../data/representatives.js"

const congressGrid = document.querySelector(".congressGrid")
const seniorityButton = document.querySelector("#seniorityButton")
const birthdayButton = document.querySelector("#birthdayButton")

function populateCongressDiv(simplifiedList) {
    simplifiedList.forEach(person => {
        let personDiv = document.createElement("div")
        let personFig = document.createElement("figure")
        let figImg = document.createElement("img")
        let figCaption = document.createElement("figcaption")

        figImg.src = person.imgURL /* = `https:www.govtrack.us/static/legislator-photos/41295-100px.jpeg` */

        figCaption.textContent = person.name


        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)
        congressGrid.appendChild(personDiv)
    })
}

function getSimplifiedPeople(PeopleList) {
    return PeopleList.map(person => {
        let middleName = person.middleName ? `${person.middle_name}` : `` 
        return {
            id: person.id,
            name: `${person.first_name} ${middleName} ${person.last_name}`
        }
    })
}

populateCongressDiv(getSimplifiedPeople(representatives))




/* const repubButton = document.querySelector("#republicans")

repubButton.addEventListener("click", () => {
    showRepublicans()
})

function showRepublicans() {
    //const repubs = representatives.filter(rep => rep.party === 'R')
    const repubs = representatives.map(rep => {
        let smallRepub = {}
        if (rep.party === "R") {
            smallRepub.id = rep.id,
            smallRepub.name = `${rep.first_name} ${rep.middle_name} ${rep.last_name}`
        }
        return smallRepub
    })
    console.log(repubs)
}

 */