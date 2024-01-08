// ==UserScript==
// @name            What is my approximate grade?
// @namespace       Violentmonkey Scripts
// @match           https://moodle.bbbaden.ch/mod/quiz/review.php*
// @version         0.1
// @author          PianoNic
// @description     This user script is designed to calculate and display an approximate grade based on the points achieved in a Moodle quiz review.
// @icon            https://github.com/BBBaden-Moodle-userscripts/What-is-my-approximate-grade/blob/main/icon/icon.png?raw=true
//
// @namespace       https://github.com/BBBaden-Moodle-userscripts/What-is-my-approximate-grade/
// @supportURL      https://github.com/BBBaden-Moodle-userscripts/What-is-my-approximate-grade/issues
// @homepageURL     https://github.com/BBBaden-Moodle-userscripts/What-is-my-approximate-grade/
// @downloadURL     https://github.com/BBBaden-Moodle-userscripts/What-is-my-approximate-grade/raw/main/approximate_grade.user.js
// @updateURL       https://github.com/BBBaden-Moodle-userscripts/What-is-my-approximate-grade/raw/main/approximate_grade.user.js
//
// @grant           GM_getValue
// ==/UserScript==

// Function to scrape the table and extract relevant data
function scrapeTable() {
  var allColumnTextElements = table.querySelectorAll("tr");
  var textArray = [];

  allColumnTextElements.forEach(function(row) {
    var columnElement = row.querySelector("td:last-child");
    if (columnElement) {
      var columnText = columnElement.textContent;
      textArray.push(columnText);
    }
  });

  return textArray;
}

// Function to extract numerical values from the scraped data
function extractValues(data) {
  var values = [];

  data.forEach(item => {
    if (item.includes("out of") || item.includes("von")) {
      var cuttedStrings = item.split(" ");

      cuttedStrings.forEach(string => {
        var tempVal = parseFloat(string.replace(',', '.'));
        if (!isNaN(tempVal)) {
          values.push(tempVal);
        }
      });
    }
  });

  return values;
}

// Main script logic
var tableClass = document.querySelector(".generaltable.generalbox.quizreviewsummary");
var table = tableClass.querySelector("tbody");

if (table) {
  let yourPoint = 0;
  let maxPoints = 0;

  var values = extractValues(scrapeTable());

  // console.log(values);

  yourPoint = values[0];
  maxPoints = values[1];

  // Create and append a new row with the calculated grade
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
