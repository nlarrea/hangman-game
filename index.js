// https://rapidapi.com/sheharyar566/api/random-words5/                 -> obtener la palabra para enviársela a la otra API
// https://rapidapi.com/apininjas/api/dictionary-by-api-ninjas/         -> obtener definicion de una palabra concreta
const btnStart = document.querySelector("#start-game");
const btnBack = document.querySelector("#back-game");
const playingState = document.querySelectorAll(".not-playing");
const checkbox = document.querySelector("#enable-help-check");
const appID = "e87bd7e3";
const appKEY = "5d81efe46522f1b7ce2ddb816a50946f";

function togglePlayingState(){
    playingState.forEach(element => {
        element.classList.toggle("not-playing");
        element.classList.toggle("playing");
    })
}

function getData(url, definition){
    if(!definition){
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'de1b853a38msh48611b58d95aa51p1b2f15jsn3328164b2b9e',
                'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
            }
        };
        
        return fetch(url, options)
            .then(response => response.json())
            .catch(err => console.error(err));
    } else{
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'de1b853a38msh48611b58d95aa51p1b2f15jsn3328164b2b9e',
                'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
            }
        };
        
        return fetch(url, options)
            .then(response => response.json())
            .catch(err => console.error(err));
    }
}

async function hangmanGame(){
    const words = await getData("https://random-words5.p.rapidapi.com/getMultipleRandom?count=2", false);
    console.log(words);
    
    const wordInfo = await getData(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${words[0]}`, true);
    console.log(wordInfo);

    if(checkbox.checked){
        const wordDisplay = document.querySelector(".word-definition");
        //wordDisplay.textContent = wordInfo;
    }
}

btnStart.addEventListener("click", () => {
    togglePlayingState();
    hangmanGame();
});

btnBack.addEventListener("click", () => {
    togglePlayingState();
    // remove game data -> del()?
})