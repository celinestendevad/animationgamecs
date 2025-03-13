window.addEventListener("load", start);
//Erklærer variabler
let mine_point;
let mine_liv;
let rndNum;
let slutpoint;

const cupcake_container = document.querySelector("#cupcake_container");
const cupcake_sprite = document.querySelector("#cupcake_sprite");
const lagkage_container = document.querySelector("#lagkage_container");
const lagkage_sprite = document.querySelector("#lagkage_sprite");
const tekande_container = document.querySelector("#tekande_container");
const tekande_sprite = document.querySelector("#tekande_sprite");

const lagkage_bad_container = document.querySelector("#lagkage_bad_container");
const lagkage_bad_sprite = document.querySelector("#lagkage_bad_sprite");
const timeglas = document.querySelector("#time_sprite");

function start() {
  hideAllScreens();
  document.querySelector("#start").classList.remove("hide");
  document.querySelector("#play").addEventListener("click", startGame);
}

function startGame() {
  console.log("startGame");
  //gem alle skærme
  hideAllScreens();

  // start baggrundsmusikken
  playMySound();

  //Nustil liv og point
  mine_point = 0;
  mine_liv = 3;

  //Opdater liv og point på siden
  document.querySelector("#point").textContent = mine_point;
  //opdaterer liv i spillet (hvis du viser liv som et tal)
  // document.querySelector("#liv").textContent = mine_liv;

  //nulstiller liv i spillet
  document.querySelector("#heart1").classList.remove("hide");
  document.querySelector("#heart2").classList.remove("hide");
  document.querySelector("#heart3").classList.remove("hide");

  //starter timer
  document.querySelector("#time_sprite").classList.add("shrink");
  //går til endGame når timer slutter
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", endGame);

  // ***********  lav random pos til gode elementer ***********

  rndNum = generateRandomNumber(5);
  let rndFaldPos = "faldpos" + rndNum;
  cupcake_container.classList.add(rndFaldPos);

  rndNum = generateRandomNumber(5);
  rndFaldPos = "faldpos" + rndNum;
  lagkage_container.classList.add(rndFaldPos);

  rndNum = generateRandomNumber(5);
  rndFaldPos = "faldpos" + rndNum;
  tekande_container.classList.add(rndFaldPos);

  // ****************** lav random delay til gode elementer ***************

  rndNum = generateRandomNumber(3);
  let rndDelay = "delay" + rndNum;
  cupcake_container.classList.add(rndDelay);

  rndNum = generateRandomNumber(3);
  rndDelay = "delay" + rndNum;
  lagkage_container.classList.add(rndDelay);

  rndNum = generateRandomNumber(3);
  rndDelay = "delay" + rndNum;
  tekande_container.classList.add(rndDelay);

  // ***********  lav random speed til gode elementer ***********
  rndNum = generateRandomNumber(2);
  let rndSpeed = "speed" + rndNum;
  cupcake_container.classList.add(rndSpeed);

  rndNum = generateRandomNumber(2);
  rndSpeed = "speed" + rndNum;
  lagkage_container.classList.add(rndSpeed);

  rndNum = generateRandomNumber(2);
  rndSpeed = "speed" + rndNum;
  tekande_container.classList.add(rndSpeed);

  //start faldeanimation på cupcake
  cupcake_container.classList.add("fald");
  lagkage_container.classList.add("fald");
  tekande_container.classList.add("fald");

  //Lav pos en random startposition
  lagkage_bad_container.classList.add(rndFaldPos);

  //start faldeanimation på dårlig lagkage
  lagkage_bad_container.classList.add("fald");

  // ***********  EVENTLISTNERE ***********

  //lyt efter om der bliver klikket på gode elementer - gå til functionen click*** når der bliver klikket

  cupcake_container.addEventListener("mousedown", clickCupcake);
  lagkage_container.addEventListener("mousedown", clickCupcake);
  tekande_container.addEventListener("mousedown", clickCupcake);

  //lyt efter om der bliver klikket på dårlig element - gå til functionen clickLagkageBad når der bliver klikket
  lagkage_bad_container.addEventListener("mousedown", clickLagkageBad);
}

function clickCupcake() {
  console.log("clickCupcake");

  playMyClick();

  //fjern eventlistneren så man ikke længere kan klikke
  this.removeEventListener("mousedown", clickCupcake);

  //tæller op på point
  mine_point = mine_point + 1;
  //opdater point i spillet
  document.querySelector("#point").textContent = mine_point;

  //put klassen frys på Cupcake container
  this.classList.add("frys");

  //put klassen forsvind på Cupcake sprite
  this.firstElementChild.classList.add("forsvind");

  //lytter efter animationen på cupcake_sprite, når den er færdig så kaldes funktionen resetCupcake
  document;
  this.addEventListener("animationend", resetCupcake);
}

function clickLagkageBad() {
  console.log("clickLagkageBad");
  //Tilføjer lyd til dårlig element
  myClickBad.play();

  //fjern eventlistneren så man ikke længere kan klikke
  lagkage_bad_container.removeEventListener("mousedown", clickLagkageBad);

  //put klassen frys på Fluesvamp container
  lagkage_bad_container.classList.add("frys");
  //put klassen forsvind på Fluesvamp sprite
  lagkage_bad_sprite.classList.add("forsvind");

  //fjern hjerter:
  let mit_hjerte = "#heart" + mine_liv;
  console.log(document.querySelector(mit_hjerte));
  document.querySelector(mit_hjerte).classList.add("hide");

  //tæller ned på liv
  mine_liv = mine_liv - 1;

  /* // hvis du viser liv som et tal:
  //opdaterer liv i spillet
  document.querySelector("#liv").textContent = mine_liv; */

  console.log(mine_liv);

  if (mine_liv === 0) {
    endGame();
  } else {
    // hvis der er liv tilbage, så lytter vi efter animationen på lagkagen_bad,
    // når animationen er færdig, så kaldes funktionenresetLagkageBad
    lagkage_bad_container.addEventListener("animationend", resetLagkageBad);
  }
}

function resetCupcake() {
  console.log("CupcakeReset");

  //fjern klasserne fald, frys og pos fra carljohans container
  this.classList = "";
  // rydder carljohans_sprite's classList
  this.firstElementChild.classList = "";

  // ny random position (i første omgang faker vi en "tilfældig" position = pos3)
  rndNum = generateRandomNumber();
  let rndFaldPos = "faldpos" + rndNum;
  console.log(rndFaldPos);

  //giv Cupcake en start position
  this.classList.add(rndFaldPos);

  // ny random speed
  rndNum = generateRandomNumber(2);
  let rndSpeed = "speed" + rndNum;
  this.classList.add(rndSpeed);

  // force reflow på cupcake og sæt faldeanimation på igen
  this.offsetHeight;
  this.classList.add("fald");

  // lyt igen efter klik på cupcake, gå til funktionen clickCupcake hvis der klikkes
  this.addEventListener("mousedown", clickCupcake);
}

function resetLagkageBad() {
  console.log("lagkageReset");

  // rydder lagkage_container's classList (frys og pos)
  lagkage_bad_container.classList = "";
  // rydder fluesvamp_sprite's classList
  lagkage_bad_sprite.classList = "";

  // ny random position
  rndNum = generateRandomNumber(5);
  let rndPos = "pos" + rndNum;

  // giv positionen til dårlig lagkage
  lagkage_bad_container.classList.add(rndPos);

  // force reflow på fluesvamp og sæt hoppeanimation på igen
  lagkage_bad_container.offsetHeight;
  lagkage_bad_container.classList.add("fald");

  // lyt efter klik på lagkage, gå til funktionen clickLagkageBad hvis der klikkes
  lagkage_bad_container.addEventListener("mousedown", clickLagkageBad);
}

function endGame() {
  console.log("endGame");

  mySound.pause();

  //Fjern alle animationer
  cupcake_container.classList = "";
  lagkage_bad_container.classList = "";
  lagkage_container.classList = "";
  tekande_container.classList = "";

  //Nulstil timer
  timeglas.classList = "";
  timeglas.removeEventListener("animationed", endGame);

  //Tjek om spillet er vundet
  if (mine_point < 15 || mine_liv === 0) {
    gameOver();
  } else {
    levelComplete();
  }
}

function gameOver() {
  console.log("gameOver");

  //vis gameover skærm
  hideAllScreens();
  document.querySelector("#game_over").classList.remove("hide");
  // lyt efter om der bliver klikket på spil-igen-knappen
  document.querySelector("#spiligen_1").addEventListener("click", startGame);
  document.querySelector("#gaatilmenu_1").addEventListener("click", menupage);
}

function levelComplete() {
  console.log("levelComplete");

  //vis level complete skræm
  hideAllScreens();
  document.querySelector("#level_complete").classList.remove("hide");

  //vis slut point
  document.querySelector("#slutpoint").textContent = mine_point;
  // lyt efter om der bliver klikket på spil-igen-knappen
  document.querySelector("#spiligen_2").addEventListener("click", startGame);
  // lyt efter om der bliver klikket på spil-igen-knappen
  document.querySelector("#gaatilmenu_2").addEventListener("click", menupage);
  document.querySelector("#gaatilmenu_2").addEventListener("click", menupage);
}
function menupage() {
  window.location.assign("http://127.0.0.1:5500/website/index.html");
}

//Hjælpefunktioner
function generateRandomNumber() {
  //generer et tilfædigt tal mellem 1 og 5
  let number = Math.floor(Math.random() * 5) + 1;
  //returnerer tallet
  return number;
}

function hideAllScreens() {
  //skjuler alle skærme ved at tilføje klassen hide
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start").classList.add("hide");
}

// ***********  MUSIK ***********

let mySound = document.querySelector("#bg_snd");

function playMySound() {
  mySound.play();
  mySound.pause();

  mySound.currentTime = 0;
  mySound.play();

  if (mySound.paused) {
    mySound.currentTime = 0;
    mySound.play();
  }
}

const myClick = document.querySelector("#clickgod");

function playMyClick() {
  console.log("playMyClick");

  myClick.currentTime = 0;
  myClick.play();
}

const myClickBad = document.querySelector("#clickbad");

function playMyClickBad() {
  myClickBad.currentTime = 0;
  myClickBad.play();
}

/* if (mySound.paused === true) {
  mySound.play();
} else {
  mySound.pause();
}

mySound.addEventlistener("ended", playMySound);
function playMySound() {
  mySound.play();
}
 */
