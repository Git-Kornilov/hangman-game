"use strict";

const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong_letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard", "catman"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
// console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
const displayWord = function () {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
	<span class="letter">
	${correctLetters.includes(letter) ? letter : ""}
	</span>
  `
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
};

// Update wrong letters
const updateWrongLettersEl = function () {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  //   Display parts of man
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lost!";
    popup.style.display = "flex";
  }
};

// Show notification - already entered
const showNotification = function () {
  notification.classList.add("show");

  setTimeout(() => notification.classList.remove("show"), 1500);
};

// Key down letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// PLay again
playAgainButton.addEventListener("click", () => {
  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();

  popup.style.display = "none";
});

displayWord();
