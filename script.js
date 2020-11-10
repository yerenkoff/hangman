// vars initialisation
import { ruswords } from './words.js';
import { engwords } from './engwords.js';
import { emojis } from './emojis.js';

let words = ruswords;
let secretWord = words[Math.floor(Math.random() * words.length)];
let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let p = document.querySelector("p");
let userInput = document.querySelector("#userInput");
let rusButton = document.querySelector("#rusButton");
let engButton = document.querySelector("#engButton");
let checkButton = document.querySelector("#checkButton");
let newButton = document.querySelector("#newButton");
let setButton = document.querySelector("#setButton");
let wordButton = document.querySelector("#wordButton");
let single = document.querySelector("#single");
let multiplayer = document.querySelector("#multiplayer");
let wordInput = document.querySelector("#wordInput");
let modal = document.querySelector(".modal");
let wordModal = document.querySelector(".wordModal");
let image = document.querySelector("img");
let imageNumber = 0;
let usedLetters = "";
let singleMode = true;
let secretArray = [];
let emoji = emojis[Math.floor(Math.random() * emojis.length)];

for (let letter = 0; letter < secretWord.length; letter++) {
    secretArray.push(emoji);
}
h2.innerHTML = secretArray.join("");
image.src = "hangman" + imageNumber + ".png";
// userInput.select();

function getFontSize() {
    h2.style.fontSize = "25px";
    while (h2.offsetHeight > 40) {
        h2.style.fontSize = parseInt(window.getComputedStyle(h2).fontSize) - 1 + "px";
    }
}

function newGame() {
        emoji = emojis[Math.floor(Math.random() * emojis.length)];
        h1.innerHTML = "Виселица" + (singleMode ? "" : ". Мультиплеер");
        imageNumber = 0;
        image.src = "hangman" + imageNumber + ".png";
        
        secretArray = [];
        for (let letter = 0; letter < secretWord.length; letter++) {
            secretArray.push(emoji);
        }
        h2.innerHTML = secretArray.join("");
        userInput.value = '';
        userInput.select();
        checkButton.disabled = false;
        checkButton.style.opacity = 1;
        usedLetters = "";
        p.innerHTML = "Использованные буквы: " + usedLetters;
        getFontSize();
}

getFontSize();

window.onresize = getFontSize;

wordButton.onclick = function (event) {
    event.preventDefault();
    wordModal.style.display = "none";
    secretWord = wordInput.value || words[Math.floor(Math.random() * words.length)];
    secretWord = secretWord.toLowerCase();
    wordInput.value = '';
    newGame();
}

multiplayer.onclick = function (event) {
    event.preventDefault();
    modal.style.display = "none";
    singleMode = false;
    h1.innerHTML = "Виселица. Мультиплеер";
    wordModal.style.display = "block";
    wordInput.select();
}

single.onclick = function (event) {
    event.preventDefault();
    modal.style.display = "none";
    singleMode = true;
    h1.innerHTML = "Виселица";
    newGame();
}

setButton.onclick = function (event) {
    event.preventDefault();
    modal.style.display = "block";
}

modal.onclick = function () {
    modal.style.display = "none";
}

modal.children[0].onclick = function (event) {
    event.stopPropagation();
}

// function to check the letter
checkButton.onclick = function (event) {
    event.preventDefault();
    let letter = userInput.value[0] || "a";
    letter = letter.toLowerCase();
    userInput.value = '';
    userInput.select();

    // check if secret word includes user's letter or not
    if (secretWord.includes(letter) == true) {
        let newArray = [];
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] == letter) {
                newArray.push(letter);

            } else {
                newArray.push(secretArray[i]);
            }
        }
        secretArray = newArray;
        h2.innerHTML = secretArray.join("");
        console.log(secretArray);
        if (h2.innerHTML == secretWord) {
            h1.innerHTML = "Виселица. Ты победил!"
            checkButton.disabled = true;
            checkButton.style.opacity = 0.5;
        }
    } else {
        imageNumber++;
        image.src = "hangman" + imageNumber + ".png";

        if (imageNumber == 6) {
            h1.innerHTML = "Виселица. Ты проиграл! Загаданное слово - " + secretWord;
            checkButton.disabled = true;
            checkButton.style.opacity = 0.5;
        }
    }

    // add letter to used letters list
    if (usedLetters.length < 100 && !usedLetters.includes(letter)) {
        usedLetters += " " + letter;
        p.innerHTML = "Использованные буквы: " + usedLetters;
    }
}

newButton.onclick = function (event) {
    event.preventDefault();
    newGame();
    if (singleMode) {
        secretWord = words[Math.floor(Math.random() * words.length)];
        newGame();
    } else {
        wordModal.style.display = "block";
        // wordInput.value = '';
        wordInput.select();
    }
}