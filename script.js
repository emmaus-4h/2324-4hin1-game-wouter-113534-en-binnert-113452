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
var snelheid = 2;  // snelhied van de speler en vijand

var img; // plaatjes
var img2; // plaatjes
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
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health
};



var tekenAlles = function() {

  // achtergrond
  fill("green");
  rect(0, 0, width, height);
  // vijand
  fill("red");
  rect(vijandX - 25, vijandY - 25, 50, 50);
  fill("black");
  ellipse(vijandX, vijandY, 10, 10);
  image(img2,vijandX-25 ,vijandY-25, 50, 50);
  // kogel

  // speler
  image(img,spelerX-25 ,spelerY-25, 50, 50);
  
  // punten en health

};

var checkGameOver = function() {
  if (spelerX - vijandX < 50 &&
    spelerX - vijandX > -50 &&
    spelerY - vijandY < 50 &&
    spelerY - vijandY > -50) {
    aantal = aantal + 1
    console.log("botsing" + aantal);
    return true;
  }

  return false;
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('green');
}
/**
 * preload
 * deze functie wordt 1keer uitgevoerd voor de setup
 * hier worden de plaatjes geladen
 */
function preload(){
  img = loadImage('spiderman.png');
  img2 = loadImage('mortisbrawlstars.png');
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
     background('green');
    console.log("game over");
    textSize(60);
    fill("white");
    text("game over, druk spatie voor start", tekstX, tekstY);
    if (keyIsDown(32)) { //spatie
      spelStatus = UITLEG;
    }
  }

  if (spelStatus === UITLEG) {
    // teken uitleg scherm
     background('green');
    console.log("uitleg");
    textSize(60);
    fill("green");
    rect(0, 0, 1280, 720);
    fill("white");
    text("uitleg: doe je ding en druk op enter", tekstX ,tekstY);
    if (keyIsDown(13)) { //enter
      spelerX = 400;
      spelStatus = SPELEN;
    };
  }
}