// https://dictionaryapi.dev/                   -> obtener definicion de una palabra concreta
// http://random-word-api.herokuapp.com/home    -> obtener la palabra para enviársela a la otra API
const btnStart = document.querySelector("#start-game");
const btnBack = document.querySelector("#back-game");
const playingState = document.querySelectorAll(".not-playing");

function togglePlayingState(){
    playingState.forEach(element => {
        element.classList.toggle("not-playing");
        element.classList.toggle("playing");
    })
}

function getData(url){
    return fetch(url)
    .then(response => response.json());
}

function hangmanGame(){
    const wordPromise = getData("https://random-word-api.herokuapp.com/word");
    console.log(wordPromise.then());
    
    // const definitionPromise = getData();
}

btnStart.addEventListener("click", () => {
    togglePlayingState();
    hangmanGame();
});

btnBack.addEventListener("click", () => {
    togglePlayingState();
    // remove game data
})