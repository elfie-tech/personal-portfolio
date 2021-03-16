import { starships } from "../data/starships.js"

//main, navList, and shipView
const main = document.querySelector("main")
const navList = document.querySelector(".navList")
const shipView = document.querySelector(".shipView")

//populateNav function
function populateNav() {
    starships.forEach((starship) => {
        let listItem = document.createElement("li")
        listItem.textContent = starship.name

        navList.appendChild(listItem)
    })
}

//populateShipView function
function populateShipView(shipData) {
    let shipImage = document.createElement("img")
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/5.jpg`
    shipView.appendChild(shipImage)
}

//allows nav to populate
populateNav()
//allows shipview to populate
populateShipView()