/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var aantal = 0;

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 8;
var spelStatus = UITLEG;

var tekstX = 200; // x-coordinaat van de tekst
var tekstY = 400; // y-coordinaat van de tekst
var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler

var vijandX = 600; // x-positie van de vijand
var vijandY = 600; // y-positie van de vijand
var snelheid = 2;  // snelheid van de speler en vijand

var img; // plaatjes
var img2; // plaatjes
var achtergrondImg; // achtergrond plaatje
var gameOverImg; // game-over plaatje

var kogelX = 400; // x-positie van de kogel
var kogelY = 300; // y-positie van de kogel
var kogelVliegt = false;

var health = 3;  // gezondheid van de speler
var punten = 0;  // punten die de speler heeft verzameld

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(65)) {
    spelerX = spelerX - snelheid;
  }
  if (keyIsDown(68)) {
    spelerX = spelerX + snelheid;
  }
  if (keyIsDown(87)) {
    spelerY = spelerY - snelheid;
  }
  if (keyIsDown(83)) {
    spelerY = spelerY + snelheid;
  }

  // vijand
  if (keyIsDown(LEFT_ARROW)) {
    vijandX = vijandX - snelheid;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    vijandX = vijandX + snelheid;
  }
  if (keyIsDown(UP_ARROW)) {
    vijandY = vijandY - snelheid;
  }
  if (keyIsDown(DOWN_ARROW)) {
    vijandY = vijandY + snelheid;
  }

  // kogel
  if (kogelVliegt === false && keyIsDown(32)) { // start met schieten
    kogelVliegt = true;
    kogelX = spelerX;
    kogelY = spelerY;
  }
  if (kogelVliegt === true) { // kogel vliegt
    kogelY = kogelY - 3;
  }
  if (kogelVliegt === true && kogelY < 0) { // kogel verdwijnt
    kogelVliegt = false;
  }
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand
  if (spelerX - vijandX < 50 &&
    spelerX - vijandX > -50 &&
    spelerY - vijandY < 50 &&
    spelerY - vijandY > -50) {
    health -= 1; // gezondheid gaat omlaag bij botsing met vijand
    vijandX = random(50, width - 50); // verplaats vijand naar een random locatie
    vijandY = random(50, height - 50);
  }

  // botsing kogel tegen vijand
  if (kogelX - vijandX < 25 &&
    kogelX - vijandX > -25 &&
    kogelY - vijandY < 25 &&
    kogelY - vijandY > -25) {
    punten += 1; // punten omhoog bij raken van vijand
    health -= 1; // gezondheid gaat omlaag bij geraakt worden door kogel
    kogelVliegt = false; // kogel stopt met vliegen
    vijandX = random(50, width - 50); // verplaats vijand naar een random locatie
    vijandY = random(50, height - 50);
    kogelX = -100; // verplaats kogel buiten beeld
    kogelY = -100;
  
  }
};

var tekenAlles = function() {
  // achtergrond
  background(achtergrondImg);

  // vijand
  fill("red");
  rect(vijandX - 25, vijandY - 25, 50, 50);
  fill("black");
  ellipse(vijandX, vijandY, 10, 10);
  image(img2, vijandX - 25, vijandY - 25, 50, 50);

  // kogel
  fill("black");
  ellipse(kogelX, kogelY, 20, 20);

  // speler
  image(img, spelerX - 25, spelerY - 25, 50, 50);

  // punten en health
  fill(255, 255, 255);
  textSize(30);
  text("Health: " + health, 10, 30);
  text("Punten: " + punten, 10, 60);
};

var checkGameOver = function() {
  if (health <= 0) {
    return true;
  }
  return false;
};

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond groen, zodat je het kunt zien
  background('green');
}

/**
 * preload
 * deze functie wordt 1 keer uitgevoerd voor de setup
 * hier worden de plaatjes geladen
 */
function preload() {
  img = loadImage('spiderman.png');
  img2 = loadImage('mortisbrawlstars.png');
  achtergrondImg = loadImage('achtergrond.png'); // vervang 'achtergrond.png' door je eigen afbeelding
  gameOverImg = loadImage('gameover.png'); // vervang 'gameover.png' door je eigen game-over afbeelding
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    background(gameOverImg);
    console.log("game over");
    textSize(60);
    fill("black");
    text("GAME OVER, druk spatie voor start", tekstX, tekstY);
    if (keyIsDown(32)) { // spatie
      spelStatus = UITLEG;
    }
  }

  if (spelStatus === UITLEG) {
    // teken uitleg scherm
    background('orange');
    console.log("uitleg");
    textSize(60);
    fill("orange");
    rect(0, 0, 1280, 720);
    fill("white");
    text("uitleg: doe je ding en druk op enter", tekstX, tekstY);
    if (keyIsDown(13)) { // enter
      spelerX = 400;
      health = 3; // reset health
      punten = 0; // reset punten
      spelStatus = SPELEN;
    }
  }
}
