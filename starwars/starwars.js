import { films } from '../data/films.js';

const message = "If you can see this message, you be smart!";

console.log(message);

/* let itemOne = document.querySelector("#item1");
let itemTwo = document.querySelector("#item2");

itemOne.textContent = films[2].title;
itemTwo.textContent = films[1].title; */

let movieList = document.querySelector(".movieList");

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1))

    let newImage = document.createElement("img")
    newImage.src = "https://starwars-visualguide.com/assets/img/films/4.jpg"
    
    movieList.appendChild(newImage)
}

function getLastNumber(url) {
    let end = url[url.length - 2]
    return parseInt(end, 10)
}

