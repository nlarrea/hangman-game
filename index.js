// https://dictionaryapi.dev/                   -> obtener definicion de una palabra concreta
// http://random-word-api.herokuapp.com/home    -> obtener la palabra para enviársela a la otra API
const btnStart = document.querySelector("#start-game");
const btnBack = document.querySelector("#back-game");
const playingState = document.querySelectorAll(".not-playing");

btnStart.addEventListener("click", () => {
    playingState.forEach(element => {
        element.classList.toggle("not-playing");
        element.classList.toggle("playing");
    })
});