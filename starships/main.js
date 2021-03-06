import { starships } from "../data/starships.js"
import { getLastNumber, removeChildren } from "../utils/index.js"

//main, navList, and shipView
const main = document.querySelector("main")
const navList = document.querySelector(".navList")
const shipView = document.querySelector(".shipView")

//populateNav function
function populateNav() {
    starships.forEach((starship) => {
        let anchorWrap = document.createElement("a")
        anchorWrap.href = "#"
        anchorWrap.className = "navAnchor"
        anchorWrap.addEventListener("click", () => {populateShipView(starship)})
        let listItem = document.createElement("li")
        anchorWrap.textContent = starship.name
        listItem.appendChild(anchorWrap)
        navList.appendChild(listItem)
    })
}

//populateShipView function
function populateShipView(shipData) {
    removeChildren(shipView)
    let shipImage = document.createElement("img")
    let shipName = document.createElement("h2")
    shipName.className = "shipName"
    shipName.textContent = shipData.name

    let shipNum = getLastNumber(shipData.url)
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    shipImage.addEventListener("error", () => {
        console.log("No image available")
        shipImage.src = "../images/shipUnavailable.png"
    })

    shipView.appendChild(shipImage)
    shipView.appendChild(shipName)    
}

//allows nav to populate
populateNav()


//starField function
function addStarField(element, numStars) {
    element.style.setProperty('background-color', 'black')
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div')
        star.className = "star"
        star.style.setProperty('width', '2px')
        star.style.setProperty('height', '2px')
        star.style.setProperty('background-color', 'white')
    
        let xy = getRandomPosition()
        star.style.left = `${xy[0]}px`
        star.style.top = `${xy[1]}px`
        star.style.setProperty('position', 'absolute')
        element.appendChild(star)
    }
}

function getRandomPosition() {
    let y = document.body.scrollHeight
    let x = document.body.scrollWidth
    let randomY = Math.floor(Math.random() * y)
    let randomX = Math.floor(Math.random() * x)
    return [randomX, randomY]
}

let body = document.querySelector('body')
addStarField(body, 800)