import { films } from '../data/films.js';

const message = "If you can see this message, you be smart!";

console.log(message);

/* let itemOne = document.querySelector("#item1");
let itemTwo = document.querySelector("#item2");

itemOne.textContent = films[2].title;
itemTwo.textContent = films[1].title; */

let titleList = document.querySelector(".titleList");

for (let i = 0; i < films.length; i++) {
    let title = films[i].title
    let newItem = document.createElement("li")
    newItem.textContent = title
    titleList.appendChild(newItem)
    getLastNumber(films[i].url)
}

function getLastNumber(url) {
    let end = url.length - 2
    let end2 = url[url.length - 2]
    let end3 = url.charAt(url.length - 2)
    console.log(end, end2, end3)
}

