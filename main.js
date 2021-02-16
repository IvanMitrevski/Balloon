let clickCount = 0;
let height = 120;
let width = 100;
let inflationRate = 20;

function inflate() {
  clickCount++;
  let balloonElement = document.getElementById("balloon");
  height += inflationRate;
  width += inflationRate;
  balloonElement.style.height = height + "px";
  balloonElement.style.width = width + "px";

  let clickCountElement = document.getElementById("click-count");
  clickCountElement.innerText = clickCount.toString();
}