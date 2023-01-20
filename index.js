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
    console.log(counter);
    for(let i=0; i<counter; i++){
        hangmanBody[i].style.backgroundColor = "red";
    }
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
    // returns a list with 2 words
    const words = await getData("https://random-words5.p.rapidapi.com/getMultipleRandom?count=1", false);
    console.log(words);
    
    // display word info if requested and a messege if it's not
    if(checkbox.checked){
        // send the first word of the list 'words'
        const wordInfo = await getData(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${words}`, true);
        console.log(wordInfo);

        if(wordInfo.definition !== ""){
            let wordDef = wordInfo.definition.split(" 2. ");
            wordDef = wordDef[0];
            
            wordDisplay.textContent = wordDef;
        } else{
            wordDisplay.textContent = "Sorry, definition not found!";
        }
    } else{
        wordDisplay.textContent = "";
        wordDisplay.innerHTML = `<p>You have decided to play without help...</p>
        <p>¡GOOD LUCK!</p>`;
    }

    gameSequence(words[0]);
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
            
            console.log(wordLength);
            console.log(unknown);
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