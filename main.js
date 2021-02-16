let clickCount = 0;

function inflate() {
  clickCount++;
  let balloonElement = document.getElementById("balloon");
  balloonElement.style.height = "20px"

  let clickCountElement = document.getElementById("click-count");
  clickCountElement.innerText = clickCount.toString();
}