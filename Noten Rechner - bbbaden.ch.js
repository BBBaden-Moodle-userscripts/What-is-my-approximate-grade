// ==UserScript==
// @name        Noten Rechner - bbbaden.ch
// @namespace   Violentmonkey Scripts
// @match       https://moodle.bbbaden.ch/mod/quiz/review.php*
// @version     1.1
// @description 18.9.2023, 08:51:00
// @icon        https://uploads-ssl.webflow.com/61add382915b0a19b218de1e/64726a127f34ac9eb1149e84_test-score-sheet-with-answers-grade-a-and-pencil-2021-09-02-21-27-37-utc%20(1).jpg
//
// @author          Pianonic (https://github.com/Pianonic)
// @namespace       https://github.com/black-backdoor/BBBaden-Moodle-userscripts/
// @supportURL      https://github.com/black-backdoor/BBBaden-Moodle-userscripts/issues
// @homepageURL     https://github.com/black-backdoor/BBBaden-Moodle-userscripts/
// @downloadURL     https://raw.githubusercontent.com/black-backdoor/BBBaden-Moodle-userscripts/main/scripts/Noten%20Rechner%20-%20bbbaden.ch.js
// @updateURL       https://raw.githubusercontent.com/black-backdoor/BBBaden-Moodle-userscripts/main/scripts/Noten%20Rechner%20-%20bbbaden.ch.js
//
// @compatible      firefox
// @grant           GM_getValue
//
// ==/UserScript==

var tableClass = document.querySelector(".generaltable.generalbox.quizreviewsummary");
var table = tableClass.querySelector("tbody");

if (table) {
  let yourPoint = 0;
  let maxPoints = 0;

  function Scrape(cellValue = 1) {
    var allColumnTextElements = table.querySelectorAll("tr");
    var lastColumnElement = allColumnTextElements[allColumnTextElements.length - cellValue];
    var lastColumnElementScore = lastColumnElement.querySelector("td");
    var lastColumnText = lastColumnElementScore.textContent;
    var textArray = lastColumnText.split(" ");
    return textArray;
  }

  try {
    var scrapeArray = Scrape();
    yourPoint = parseFloat(scrapeArray[0]);
    maxPoints = parseFloat(scrapeArray[2]);
  } catch (error) {
    var scrapeArray = Scrape(2);
    yourPoint = parseFloat(scrapeArray[0]);
    maxPoints = parseFloat(scrapeArray[2]);
  }

  var newRow = document.createElement("tr");
  var cell1 = document.createElement("th");
  cell1.textContent = "Note";
  cell1.className = "cell";

  var cell2 = document.createElement("td");
  var note = ((yourPoint / maxPoints) * 5 + 1).toFixed(2);
  cell2.textContent = note;
  cell2.className = "cell";

  newRow.appendChild(cell1);
  newRow.appendChild(cell2);

  table.appendChild(newRow);
}
