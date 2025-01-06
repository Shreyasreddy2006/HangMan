const game = [
  {
    word: "cpu",
    hint : "The brain of the computer.",
  },
  {
    word: "ram",
    hint : "Temporary memory for running programs.",
  },
  {
    word: "antivirus",
    hint : "Protects your computer from malware.",
  },
  {
    word: "firewall",
    hint : "Blocks unauthorized access.",
  },
  {
    word: "algorithm",
    hint : "A set of instructions.",
  },
  {
    word: "variable",
    hint : "Stores data in programming.",
  },
  {
    word: "server",
    hint : "Stores and shares data online.",
  },
  {
    word: "encryption",
    hint : "Scrambles data for security.",
  },
  {
    word: "spreadsheet",
    hint : "Used to manage numbers and data.",
  },
  {
    word: "debugging",
    hint : "Fixing errors in programs.",
  },
];

let currentWord, correctLetters, wrongCount;
const max = 6;

const answer = document.querySelector(".word");
const keys = document.querySelector(".keyboard");
const hangmanImg = document.querySelector(".hangman img");
const guess = document.querySelector(".guesses b");
const popup = document.querySelector(".pop-up");

const resetGame = () => {
  correctLetters = [];
  wrongCount = 0;
  hangmanImg.src = "0.png";
  guess.innerText = `${wrongCount} / ${max}`;
  keys.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  answer.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  popup.classList.remove("show");
  body.style.background = "linear-gradient(45deg, #57f4ff, #025667)" ;
};

const getRandomWord = () => {
  const { word, hint } = game[Math.floor(Math.random() * game.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};
const gameOver = (isVictory) => {
  const modalText = isVictory
  ? ` YAYY !! You Win! You found the word:` : `You Lose ! :( The correct word was:`;
  popup.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
  popup.classList.add("show");
};
const body = document.querySelector('body')
const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        answer.querySelectorAll("li")[index].innerText = letter;
        answer.querySelectorAll("li")[index].classList.add("guessed");
        body.style.background = "linear-gradient(45deg,rgb(164, 246, 137),rgb(41, 162, 0))" ;
      }
    });
  } else {
    wrongCount++;
    if (wrongCount === 0) {
      hangmanImg.src = "0.png";
    }
    if (wrongCount === 1) {
      hangmanImg.src = "1.png";
    }
    if (wrongCount === 2) {
      hangmanImg.src =  "2.png";
    }
    if (wrongCount === 3) {
      hangmanImg.src = "3.png";
    }
    if (wrongCount == 4) {
      hangmanImg.src = "4.png";
    }
    if (wrongCount === 5) {
      hangmanImg.src = "5.png";
    }
    if (wrongCount === 6) {
      hangmanImg.src ="6.png";
    }
    body.style.background = "linear-gradient(45deg,rgb(255, 0, 0),rgb(129, 0, 0))" ;
  }

  button.disabled = true;
  guess.innerText = `${wrongCount} / ${max}`;

  if (wrongCount === max) 
  return gameOver(false);
  if (correctLetters.length === currentWord.length)
  return gameOver(true);
};
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keys.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
const playAgainBtn = document.querySelector(".playAgain");
playAgainBtn.addEventListener("click", getRandomWord);