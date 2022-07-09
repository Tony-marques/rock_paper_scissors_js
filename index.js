const scissors = document.querySelector(".scissors");
const buttons = document.querySelectorAll(".container-game .btn");
const resultHTML = document.querySelector(".resultHTML");
const containerGame = document.querySelector(".container-game");
const playAgainBtn = document.querySelector(".retry button");
const retry = document.querySelector(".retry");
const rules = document.querySelector(".rules");
const overlayContainer = document.querySelector(".overlay-container");
const overlay = document.querySelector(".overlay-container .overlay");
const closeOverlay = document.querySelector(".close-overlay");
const defaultCircle = document.querySelector(".default-circle");
const resultGame = document.querySelector(".result-game");

const circle1 = document.createElement("div");
const circle2 = document.createElement("div");
const circle3 = document.createElement("div");

overlayContainer.style.display = "none";
resultGame.style.display = "none";
retry.style.display = "none";
// retry.style.opacity = 0

// En test a supprimer
// containerGame.style.display = "none"

let score = 0;
const scoreHTML = document.querySelector(".score-display");

function randomChoiceComputer() {
  const choice = ["rock", "paper", "scissors"];
  const random = Math.ceil(Math.random() * 3 - 1);
  return choice[random];
}

buttons.forEach((button) => {
  button.addEventListener("click", nextPartGame);
});

function nextPartGame(e) {
  resultGame.style.display = "flex";
  const playerChoice = e.target.closest(".btn").classList[0];
  const playerChoiceHTML = document.querySelector(".player-choice");
  const computerChoiceHTML = document.querySelector(".computer-choice");
  const computerChoice = randomChoiceComputer();
  const result = gameResult(playerChoice, computerChoice);
  const playerChoiceResult = document.querySelector(
    ".result-game .player-choice .btn"
  );
  const playerChoiceImg = document.querySelector(
    ".result-game .player-choice .btn img"
  );
  const computerChoiceResult = document.querySelector(
    ".result-game .computer-choice .btn"
  );
  const computerChoiceImg = document.querySelector(
    ".result-game .computer-choice .btn img"
  );

  if (result == "loose") {
    score > 0 ? score-- : (score = 0);
    resultHTML.innerHTML = "YOU LOOSE";
  } else if (result == "equality") {
    resultHTML.innerHTML = "EQUALITY";
  } else {
    setTimeout(() => {});
    score++;
    resultHTML.innerHTML = "YOU WIN";
  }
  setTimeout(() => {

    circle1.setAttribute("class", "circle circle-one");
    circle2.setAttribute("class", "circle circle-two");
    circle3.setAttribute("class", "circle circle-three");
    scoreHTML.innerHTML = score;
    if (result == "loose") {
      computerChoiceHTML.appendChild(circle1);
      computerChoiceHTML.appendChild(circle2);
      computerChoiceHTML.appendChild(circle3);
    } else if (result == "win") {
      playerChoiceHTML.appendChild(circle1);
      playerChoiceHTML.appendChild(circle2);
      playerChoiceHTML.appendChild(circle3);

      // circle1.setAttribute("class", "circle-one");
    }
  }, 1000);

  switchDisplay();
  displayPlayerResult(playerChoiceResult, playerChoiceImg, playerChoice);
  setTimeout(() => {
    defaultCircle.style.display = "none";
    displayComputerResult(
      computerChoiceResult,
      computerChoiceImg,
      computerChoice
    );
  }, 500);

  setTimeout(() => {
    retry.style.display = "flex";
    // retry.style.opacity = 1
  }, 1000);

  playAgainBtn.addEventListener("click", () => {
    containerGame.style.display = "flex";
    defaultCircle.style.display = "flex";
    retry.style.display = "none";
    resultGame.style.display = "none";
    circle1.removeAttribute("class");
    circle2.removeAttribute("class");
    circle3.removeAttribute("class");

    playerChoiceResult.classList.remove(playerChoice);
    computerChoiceResult.classList.remove(computerChoice);
    computerChoiceImg.removeAttribute("src");
  });
}

function switchDisplay() {
  containerGame.style.display = "none";
}

function displayPlayerResult(
  playerChoiceResult,
  playerChoiceImg,
  playerChoice
) {
  playerChoiceResult.classList.add(playerChoice);
  playerChoiceImg.setAttribute("src", `./images/icon-${playerChoice}.svg`);
}

function displayComputerResult(
  computerChoiceResult,
  computerChoiceImg,
  computerChoice
) {
  computerChoiceResult.classList.add(computerChoice);
  computerChoiceImg.setAttribute("src", `./images/icon-${computerChoice}.svg`);
}

function gameResult(playerChoice, computerChoice) {
  switch (playerChoice) {
    case "rock": {
      if (computerChoice == "paper") {
        return "loose";
      } else if (computerChoice == playerChoice) {
        return "equality";
      } else if (computerChoice == "scissors") {
        return "win";
      }
      break;
    }
    case "paper": {
      if (computerChoice == "scissors") {
        return "loose";
      } else if (computerChoice == playerChoice) {
        return "equality";
      } else if (computerChoice == "rock") {
        return "win";
      }
      break;
    }
    case "scissors": {
      if (computerChoice == "rock") {
        return "loose";
      } else if (computerChoice == playerChoice) {
        return "equality";
      } else if (computerChoice == "paper") {
        return "win";
      }
      break;
    }
    default:
      break;
  }
}

function displayRules() {}

rules.addEventListener("click", () => {
  console.log("test");
  overlayContainer.style.display = "flex";
});

closeOverlay.addEventListener("click", () => {
  overlayContainer.style.display = "none";
});
overlayContainer.addEventListener("click", (e) => {
  // e.stopPropagation();
  overlayContainer.style.display = "none";
});
overlay.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("overlay");
});

// 