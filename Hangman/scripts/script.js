const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;

    hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>` <li class="letter"></li>`).join("");
   
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //React ES6 Destructuring. Destructuring makes it easy to extract only what is needed.
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    
}

const gameOver = (isVictory) => {
    setTimeout(()=>{
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'Victory' : 'Lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        
        gameModal.classList.add("show");
    },300);
}

const initGame = (button, clickedLetter) => {
    // console.log(button, clickedLetter);

    if(currentWord.includes(clickedLetter)){
        // console.log(clickedLetter, "Exists");
        //showing all correct letters on the display screen
        //if currentWord is "apple", [...currentWord] would result in ['a', 'p', 'p', 'l', 'e'].
        //.forEach((letter, index) => { ... }) iterates over each letter in the array, with letter representing the current character and index representing the position of that character in the word.
        //[index] accesses the specific <li> element corresponding to the current position (index) of the letter in currentWord.

        [...currentWord].forEach((letter, index) => {
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else{
        wrongGuessCount++;
        hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled=true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    //calling gameover function if any of these conditions are met
    if(wrongGuessCount===maxGuesses){
        return gameOver(false);
    }
    if(correctLetters.length===currentWord.length){
        return gameOver(true);
    }
}

//Creating keyboard buttons
//The for loop iterates over the ASCII values corresponding to the lowercase letters of the alphabet. 
//The ASCII value for 'a' is 97, and for 'z' it is 122.
for(let i=97; i<=122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    //element.addEventListener(event, function, useCapture);
    // button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
    // });
    
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);





// wordDisplay.innerHTML = word.split("").map(() => <li class="letter"></li>).join("");:

//     word.split("") splits the word string into an array of its individual characters.
//     .map(() => <li class="letter"></li>) creates a new array where each character of the word is replaced by a string representing an empty <li> element with the class letter. The arrow function () => <li class="letter"></li>` is executed for each character in the word, but the character itself isn't used, which is why the function doesn't take any parameters.
//     .join("") combines all the <li> elements into a single string, without any separators between them.