let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let popCount = 0
let gameLength = 5000
let clockId = 0         //for stopping setInterval

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
  clockId = setInterval(drawClock, 1000)
}

function stopClock() {
  clearInterval(clockId)
}

// update the date with this function
function inflate() {
  clickCount++;
  height += inflationRate
  width += inflationRate

  if (height >= maxSize) {
    console.log("pop the balloon")
    popCount++
    height = 0
    width = 0
  }

  draw()
}

// expand the balloon and update the click-count and pop-count with this function
function draw() {
  let balloonElement = document.getElementById("balloon")
  let clickCountElement = document.getElementById("click-count")
  let popCountElement = document.getElementById("pop-count")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"

  clickCountElement.innerText = clickCount.toString()
  popCountElement.innerText = popCount.toString();

}

function stopGame() {
  console.log("Game Over")

  inflateButton.setAttribute("disabled", "true")
  startButton.removeAttribute("disabled")

  //reset the count and the size of the balloon after the 3 seconds
  clickCount = 0
  let height = 120
  let width = 100
  stopClock()
  draw()

}