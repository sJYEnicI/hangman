function getGuess () {
    return prompt(`Guess a letter, or write ":q" to stop playing.`).toLowerCase();
}//gets input from user

function pickWord() {
    const words = ["meow", "purr", "whiskers", "feline", "catnap", "monkey", "banana", "tree", "river", "sky", "cloud", "mountain", "ocean", "desert", "forest", "flower", "grass", "stone", "wind", "fire", "earth", "star", "moon", "sun", "rain", "snow", "ice", "storm", "lightning", "thunder", "wave", "island", "cave", "valley", "hill", "field", "path", "faggot", "gay", "queer", ];
    return words[Math.floor(Math.random() * words.length)];
} //picks a random word out of an array w words

function setupAnswerArray(word) {
    let array = [];
    for (let i = 0; i < word.length; i++) {
        array[i] = "_";
    }
    return array;
} //makes an array that we will display to user to show progress

function checkInput(guess) {
    const english = /^[A-Za-z]$/;
    if (guess === ":q" || guess === null) {
        gameOver = true;
        return(false);
    } else if (!english.test(guess)) {
        alert(`Enter an english letter!`);
        return(false);
    } else {
        return(true);
    }
} //checks the input for quitting or being an english letter

function checkIsIn(guess, guessedArray){
    for(let i = 0; i < guessedArray.length; i++) {
        if (guess.toLowerCase() === guessedArray[i]) {
            alert(`You've already tried the letter '${guess.toLowerCase()}'`);
            return(false);
        } 
    }
    return(true);
} //checks whether the letter has already been tried

function addLetter(guess, word, answerArray){
    let isItIn = false;
    for(let i = 0; i < word.length; i++){
        if (guess.toLowerCase() === word[i]){
            answerArray[i] = guess.toLowerCase();
            lettersLeft--;
            isItIn = true;
        }
    }
    if (isItIn === false) {
        attemptsLeft--;
    }
    attemptsCount++; 
} //corrects the answer array to display the guessed letter

function showPlayerProgress(answerArray, attemptsLeft) {
    if(gameOver === false && lettersLeft > 0 && attemptsLeft > 0) {
        alert(`Current progress: \n${answerArray.join(" ")} \nYou have ${attemptsLeft} guesses left.`);
    }
} //shows user the progress

function showAndCongradulatePlayer(word){
    if (!gameOver && attemptsLeft > 0) {
        return alert(`You won in ${attemptsCount} attempts! The word was: ${word}`)
    } else if (gameOver){
        alert(`Game quitted.`);
    } else {
        return alert(`You've lost! The word was: ${word}`)
    }
} //displays the final msgs


let chosenWord = pickWord();
let answerArray = setupAnswerArray(chosenWord); //the main array that we display to the user
let guessedArray = []; //array of letters that user has already guessed
let lettersLeft = chosenWord.length;  
let gameOver = false;
let attemptsLeft = 10;
let attemptsCount = 0;

while (!gameOver && lettersLeft > 0 && attemptsLeft > 0) {
    let inputUser = getGuess();
    if (checkInput(inputUser)) {
        if (checkIsIn(inputUser, guessedArray)) {
            guessedArray.push(inputUser.toLowerCase());
            addLetter(inputUser, chosenWord, answerArray);
            showPlayerProgress(answerArray, attemptsLeft);
        }
    } 
}

showAndCongradulatePlayer(chosenWord, attemptsCount);