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
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG  = 8;
var spelStatus = SPELEN;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 100;  // health van speler

var vijandX = 600; // x-positie van de vijand
var vijandY = 600; // y-positie van de vijand


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
    if (keyIsDown(65)) {
      spelerX = spelerX -2;
    }
    if (keyIsDown(68)) {
      spelerX = spelerX +2;
    }
     if (keyIsDown(87)){
       spelerY = spelerY -2;
     }
     if (keyIsDown(83)){
       spelerY = spelerY +2;
     }
  
  // vijand
   if (keyIsDown(LEFT_ARROW)) {
     vijandX = vijandX -2;
   }
   if (keyIsDown(RIGHT_ARROW)) {
     vijandX = vijandX +2;
   }
    if (keyIsDown(UP_ARROW)){
      vijandY = vijandY -2;
    }
    if (keyIsDown(DOWN_ARROW)){
      vijandY = vijandY +2;
    }
  // kogel
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
    console.log("botsing");
    }
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("green");
  rect(0,0, width, height);
  // vijand
  fill("red");
  rect(vijandX - 25 ,vijandY - 25 , 50, 50);
  fill("black");
  ellipse(vijandX, vijandY , 10, 10);
  // kogel

  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

  // punten en health

};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
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
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
       console.log("spelen");
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("game over");
    textSize(60);
    fill("white");
    text("game over, druk spatie voor start", 600, 400);
    if (keyIsDown(32)) { //spatie
    spelerX = 400;
    spelStatus = SPELEN;
    }
  }
  
   if (spelStatus === UITLEG) {
     // teken uitleg scherm
     console.log("uitleg");
     textSize(60);
     fill("green");
     rect(0, 0, 1280, 720);
     fill("white");
     text("uitleg: doe je ding en druk op enter", 600 ,400);
     if (keyIsDown(13)) { //enter}
       spelerX = 400;
       spelStatus = SPELEN;
  }

}