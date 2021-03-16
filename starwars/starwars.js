import { films } from '../data/films.js';

const message = "If you can see this message, you be smart!";

console.log(message);

/* let itemOne = document.querySelector("#item1");
let itemTwo = document.querySelector("#item2");

itemOne.textContent = films[2].title;
itemTwo.textContent = films[1].title; */

let titleList = document.querySelector(".titleList");

for (var i = 0; i < films.length; i++) {
    let title = films[i].title
    let newItem = document.createElement("li")
    newItem.textContent = title
    titleList.appendChild(newItem)

}