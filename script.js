// vars initialisation
import { words } from './words.js';

let secretWord = words[Math.floor(Math.random() * words.length)];
let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let p = document.querySelector("p");
let userInput = document.querySelector("input");
let checkButton = document.querySelector(".buttons").children[0];
let newButton = document.querySelector(".buttons").children[1];
let image = document.querySelector("img");
let imageNumber = 0;
let usedLetters = "";

// fill with asterisks the secret word heading
h2.innerHTML = "*".repeat(secretWord.length);
image.src = "hangman" + imageNumber + ".png";
// focus on input at once
userInput.select();

// function to check the letter
checkButton.onclick = function () {
    let letter = userInput.value[0] || "a";
    userInput.value = '';
    userInput.select();

    // check if secret word includes user's letter or not
    if (secretWord.includes(letter) == true) {
        let newWord = '';
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] == letter) {
                newWord = newWord + letter;

            } else {
                newWord += h2.innerHTML[i];
            }
        }
        h2.innerHTML = newWord;
        if (h2.innerHTML == secretWord) {
            h1.innerHTML = "Виселица. Ты победил! Загаданное слово - " + secretWord;
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

newButton.onclick = function () {
    h1.innerHTML = "Виселица";
    imageNumber = 0;
    image.src = "hangman" + imageNumber + ".png";
    secretWord = words[Math.floor(Math.random() * words.length)];
    h2.innerHTML = "*".repeat(secretWord.length);
    userInput.value = '';
    userInput.select();
    checkButton.disabled = false;
    checkButton.style.opacity = 1;
    usedLetters = "";
    p.innerHTML = "Использованные буквы: " + usedLetters;
}