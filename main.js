
//#region GAME LOGIC AND DATA

//DATA
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 5000
let clockId = 0         //for stopping setInterval
let timeRemaining = 0
let currentPlayer = {}  //declaration for an object
let currentColor = "green"
let possibleColors = ["green", "red", "blue", "yellow", "pink"]

function startGame() {
  //add a hidden class to the main controls when the game starts and remove the hidden class from the game controls
  document.getElementById("game-controls").classList.remove("hidden");
  document.getElementById("main-controls").classList.add("hidden");

  startClock()
  //finish after "gameLength"ms 
  setTimeout(stopGame, gameLength)
}

function startClock() {
  timeRemaining = gameLength

  //when you start the game, you start the clock and with that you start counting the time left
  drawClock()

  //start repeating the counting every second
  clockId = setInterval(drawClock, 1000)
}

function stopClock() {
  clearInterval(clockId)
}

function drawClock() {
  let countDownElement = document.getElementById("countdown")

  countDownElement.innerText = (timeRemaining / 1000).toString() // dividing by 1000 so it shows seconds(1 instead of 1000)
  timeRemaining -= 1000
}

// update the date with this function
function inflate() {
  clickCount++;
  height += inflationRate
  width += inflationRate
  checkBalloonPop()
  draw()
}

function checkBalloonPop() {
  if (height >= maxSize) {
    let balloonElement = document.getElementById("balloon")
    balloonElement.classList.remove(currentColor)
    getRandomColor()
    balloonElement.classList.add(currentColor)

    currentPopCount++
    height = 40
    width = 0
  }
}

function getRandomColor() {

  //Math.floor to round it down
  let i = Math.floor(Math.random() * possibleColors.length);
  currentColor = possibleColors[i];
}

//expand the balloon
//update the click-count and pop-count
//update the high score/high-pop-count with this function
function draw() {
  let balloonElement = document.getElementById("balloon")
  let clickCountElement = document.getElementById("click-count")
  let popCountElement = document.getElementById("pop-count")
  let highPopCountElement = document.getElementById("high-pop-count")
  let playerNameElement = document.getElementById("player-name")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"

  clickCountElement.innerText = clickCount.toString()
  popCountElement.innerText = currentPopCount.toString();
  highPopCountElement.innerText = currentPlayer.topScore.toString();
  playerNameElement.innerText = currentPlayer.name;

}

function stopGame() {
  console.log("Game Over")

  //add a hidden class to the game controls when the game ends and remove the hidden class from the main controls
  document.getElementById("game-controls").classList.add("hidden");
  document.getElementById("main-controls").classList.remove("hidden");

  //reset the count and the size of the balloon after the 3 seconds
  clickCount = 0
  let height = 120
  let width = 100

  //Update the score for each individual player
  if (currentPopCount > currentPlayer.topScore) {
    currentPlayer.topScore = currentPopCount
    savePlayers()
  }

  currentPopCount = 0

  stopClock()
  draw()
}

//#endregion

let players = []

//you will load the saved players now, before entering a new one
//so you dont delete them from local storage after every refresh
loadPlayers()

function setPlayer(event) {
  //do this so when the form submits it wont show a 404 error page and it will not refresh the page
  event.preventDefault()

  let form = event.target
  //in playerName you will store the value(name) that the 
  //player will insert in the input element
  let playerName = form.playerName.value

  //this lambda expression will loop thru the array and will compare 
  //every individual player and their name with the name(playerName) that
  //we actually typed in the form. And the .find() finds someone it will 
  //return it.
  //If we dont find the typed in player name in the array, then
  //currentPlayer will be null / undefined
  currentPlayer = players.find(player => player.name == playerName)

  if (!currentPlayer) {
    currentPlayer = { name: playerName, topScore: 0 }
    //js uses push insed of add to insert items in an array
    players.push(currentPlayer)
    savePlayers()
  }

  //we now have the player name inside playerName and we no longer need it
  //so we can reset the form
  form.reset()

  //after you submit the form you remove the class named hidden in the section with the game, after that you draw it
  document.getElementById("game").classList.remove("hidden")

  //after you show the game, hide the form
  form.classList.add("hidden")

  //after you set the player and reset the form, also draw the info for the 
  //current player
  draw()
}

function changePlayer() {
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}

//convert the array player to a string using stringify
function savePlayers() {
  window.localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers() {
  //if we pull something from the local storage then insert it in playerData.
  //If not the function will be ignored
  let playersData = JSON.parse(window.localStorage.getItem("players"))

  if (playersData) {
    players = playersData
  }

}

