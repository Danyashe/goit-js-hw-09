import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const buttonStart = document.querySelector("button[data-start]");
const inputDate = document.querySelector("#datetime-picker");

const refs = {
  hours: document.querySelector("[data-hours]"),
  days: document.querySelector("[data-days]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

buttonStart.disabled = true;
const date = new Date();
let intervalId = null;
let deadLineTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadLineTimer = selectedDates[0];
    if (selectedDates[0] < date) {
      Notify.failure("Please choose a date in the future");
    } else {
      buttonStart.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

const start = (refs, deadLineTimer) => {
  if (deadLineTimer) {
    intervalId = setInterval(() => {
      const delta = deadLineTimer.getTime() - Date.now();

      if (delta <= 1000) {
        clearInterval(intervalId);
      }

      const data = convertMs(delta);
      Object.entries(data).forEach(([name, value]) => {
        refs[name].textContent = String(value).padStart(2, "0");
      });
    }, 1000);
  }
};

buttonStart.addEventListener("click", () => {
  start(refs, deadLineTimer);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
