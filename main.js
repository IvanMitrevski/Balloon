let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let popCount = 0

function inflate() {
  clickCount++;
  let balloonElement = document.getElementById("balloon")
  height += inflationRate
  width += inflationRate

  if (height >= maxSize) {
    console.log("pop the balloon")
    popCount++
    height = 0
    width = 0
    document.getElementById("pop-count").innerText = popCount.toString();
  }

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"

  let clickCountElement = document.getElementById("click-count")
  clickCountElement.innerText = clickCount.toString()
}