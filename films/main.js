import { films } from '../data/films.js';
import { getLastNumber } from '../utils/index.js'
import { removeChildren } from '../utils/index.js'

const message = "If you can see this message, you be smart!";

console.log(message);

/* let itemOne = document.querySelector("#item1");
let itemTwo = document.querySelector("#item2");

itemOne.textContent = films[2].title;
itemTwo.textContent = films[1].title; */

let movieList = document.querySelector(".movieList");

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1))
    let figure = document.createElement("figure")
    let newImage = document.createElement("img")
    let figCaption = document.createElement("figcaption")
    newImage.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    figCaption.textContent = foundFilm.title

    figure.appendChild(newImage)
    figure.appendChild(figCaption)
    movieList.append(figure)
}