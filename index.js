// https://rapidapi.com/sheharyar566/api/random-words5/                 -> obtener la palabra para enviársela a la otra API
// https://rapidapi.com/apininjas/api/dictionary-by-api-ninjas/         -> obtener definicion de una palabra concreta

const btnStart = document.querySelector("#start-game");
const btnBack = document.querySelector("#back-game");

const hangmanBody = document.querySelectorAll(".hangman-body-part");

const playingState = document.querySelectorAll(".not-playing");
const checkbox = document.querySelector("#enable-help-check");

const wordDisplay = document.querySelector(".word-definition");
const unknownDisplay = document.querySelector(".display-word-wrapper");

const playerInput = document.querySelector("#player-input");
const inputWrapper = document.querySelector(".player-input-wrapper");

function togglePlayingState(){
    playingState.forEach(element => {
        element.classList.toggle("not-playing");
        element.classList.toggle("playing");
    })
}

function updateBody(counter){
    for(let i=0; i<counter; i++){
        hangmanBody[i].style.backgroundColor = "red";
    }
}

function getData(url){
    return fetch(url)
        .then(response => response.json())
        .catch(err => console.error(err));
}

async function hangmanGame(){
    const takeRandom = (num) => {
        return Math.floor(Math.random()*num);
    }

    const getKeyByValue = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    }

    const wordsObj = await getData("./dictionary_alpha_arrays.json");
    
    const randChar = takeRandom(26);
    const randWord = takeRandom(Object.keys(randChar).length);

    const definition = wordsObj[randChar][Object.keys(wordsObj[randChar])[randWord]];
    const word = getKeyByValue(wordsObj[randChar], definition);
    //console.log(`${word}: ${definition}`);

    // display word info if requested and a messege if it's not
    if(checkbox.checked){
        wordDisplay.textContent = definition;
    } else{
        wordDisplay.textContent = "";
        wordDisplay.innerHTML = `<p>You have decided to play without help...</p>
        <p>¡GOOD LUCK!</p>`;
    }

    gameSequence(word);
}

function gameSequence(word){
    // initialize game
    let unknown = [];
    for(let i=0; i<word.length; i++){
        unknown[i] = "_";
    }
    unknownDisplay.textContent = unknown.join(" ");
    let wordLength = unknown.filter(char => char === "_").length;

    let counter = 0, appears = false;
    
    playerInput.addEventListener("keypress", event => {
        if(event.key === "Enter"){
            
            const inputData = playerInput.value.toLowerCase();
            playerInput.value = "";
            if(inputData.length > 1){
                alert("Please, enter just one letter.");
            } else{
                appears = false;

                for(let j=0; j < unknown.length; j++){
                    // if char is already setted, don't take in count
                    if(inputData === unknown[j]){
                        appears = true;
                        continue;
                    } else if(inputData === word[j]){
                        appears = true;
                        unknown[j] = inputData;
                        wordLength--;
                    }

                }

                if(!appears){
                    counter++;
                    updateBody(counter);
                    if(counter === 6){
                        alert("Ohh..\n..better luck next time!")
                        stopPlaying();
                    }
                }
            }
        }

        unknownDisplay.textContent = unknown.join(" ");

        if(wordLength === 0){
            inputWrapper.style.visibility = "hidden";
            alert("CONGRATULATIONS!\n\nYOU HAVE WON!");
        }
    })
}

btnStart.addEventListener("click", () => {
    togglePlayingState();
    hangmanGame();
});

function stopPlaying(){
    togglePlayingState();
    // remove game data
    wordDisplay.textContent = "This is going to tell you something to make it easier!";
    unknownDisplay.textContent = "";
    location.reload();
}

btnBack.addEventListener("click", () => {
    stopPlaying();
})