"use strict";

// // Game Control :
let dice = document.querySelector(".dice");
let new_game_btn = document.querySelector(".btn--new");
let roll_btn = document.querySelector(".btn--roll");
let hold_btn = document.querySelector(".btn--hold");
let score = document.querySelector(".player--active .score").textContent;

// // get Players :
let players = document.querySelectorAll(".player");

// By default setting :
dice.style.display = "none";
document.querySelectorAll(".score").forEach((elm) => {
  elm.textContent = 0;
});
document.querySelector(".player--0 .score").textContent = localStorage.getItem(
  "score_Player-1"
);
document.querySelector(".player--1 .score").textContent = localStorage.getItem(
  "score_Player-2"
);
// rolling dice :

function roll_event() {
  dice.style.display = "block";
  let random_number = Math.trunc(Math.random() * 6 + 1);
  dice.src = `dice-${random_number}.png`;
  console.log(random_number);
  if (random_number === 1) {
    document.querySelector(".player--active .current-score").textContent = 0;
    players.forEach((elm) => {
      if (elm.classList.contains("player--active")) {
        elm.classList.remove("player--active");
      } else if (!elm.classList.contains("player--active")) {
        elm.classList.add("player--active");
      }
    });
  } else {
    players.forEach((elm) => {
      if (elm.classList.contains("player--active")) {
        elm.querySelector(".current-score").textContent =
          Number(elm.querySelector(".current-score").textContent) +
          random_number;
      }
    });
  }
}
roll_btn.addEventListener("click", roll_event);

function hold_event() {
  document.querySelector(".player--active .score").textContent =
    Number(document.querySelector(".player--active .score").textContent) +
    Number(
      document.querySelector(".player--active .current-score").textContent
    );
  document.querySelector(".player--active .current-score").textContent = 0;
  if (
    Number(document.querySelector(".player--active .score").textContent) >= 100
  ) {
    document.querySelector(".player--active").classList.add("player--winner");
    dice.style.display = "none";
    roll_btn.removeEventListener("click", roll_event);
    hold_btn.removeEventListener("click", hold_event);
  }
  players.forEach((elm) => {
    if (elm.classList.contains("player--active")) {
      elm.classList.remove("player--active");
    } else if (!elm.classList.contains("player--active")) {
      elm.classList.add("player--active");
    }
  });
  localStorage.setItem(
    "score_Player-1",
    document.querySelector(".player--0 .score").textContent
  );
  localStorage.setItem(
    "score_Player-2",
    document.querySelector(".player--1 .score").textContent
  );
}
hold_btn.addEventListener("click", hold_event);

// reset Game
new_game_btn.addEventListener("click", () => {
  roll_btn.addEventListener("click", roll_event);
  hold_btn.addEventListener("click", hold_event);
  console.log("object");
  players.forEach((Element) => {
    Element.classList.remove("player--active");
    Element.querySelector(".current-score").textContent = 0;
    Element.querySelector(".score").textContent = 0;
    localStorage.setItem(
      "score_Player-1",
      document.querySelector(".player--0 .score").textContent
    );
    localStorage.setItem(
      "score_Player-2",
      document.querySelector(".player--1 .score").textContent
    );
    if (Element.classList.contains("player--winner")) {
      Element.classList.remove("player--winner");
    }
  });
  players[0].classList.add("player--active");
});
