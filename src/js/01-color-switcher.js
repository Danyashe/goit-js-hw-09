const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');
let intervalId = null;
buttonStart.addEventListener('click', changeColorBody);

function changeColorBody() {
    buttonStart.disabled = true
    function bodyColor() {
        bodyRef.style.backgroundColor = getRandomHexColor()
    }
   intervalId = setInterval(bodyColor, 1000)
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  buttonStop.addEventListener('click', stopChangeColor);

  function stopChangeColor() {
    clearInterval(intervalId)
    buttonStart.disabled = false
  }