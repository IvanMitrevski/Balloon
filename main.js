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


//getting reference from the two buttons
let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

function startGame() {
  startButton.setAttribute("disabled", "true")
  inflateButton.removeAttribute("disabled")
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

  if (height >= maxSize) {
    console.log("pop the balloon")
    currentPopCount++
    height = 0
    width = 0
  }

  draw()
}

//expand the balloon
//update the click-count and pop-count
//update the high score/high-pop-count with this function
function draw() {
  let balloonElement = document.getElementById("balloon")
  let clickCountElement = document.getElementById("click-count")
  let popCountElement = document.getElementById("pop-count")
  let highPopCountElement = document.getElementById("high-pop-count")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"

  clickCountElement.innerText = clickCount.toString()
  popCountElement.innerText = currentPopCount.toString();
  highPopCountElement.innerText = highestPopCount.toString();

}

function stopGame() {
  console.log("Game Over")

  inflateButton.setAttribute("disabled", "true")
  startButton.removeAttribute("disabled")

  //reset the count and the size of the balloon after the 3 seconds
  clickCount = 0
  let height = 120
  let width = 100

  if (highestPopCount < currentPopCount) {
    highestPopCount = currentPopCount
  }
  currentPopCount = 0

  stopClock()
  draw()
}