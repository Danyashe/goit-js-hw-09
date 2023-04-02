import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const amountRef = document.querySelector("[name = 'amount']");
const delayRef = document.querySelector("[name = 'delay']");
const stepRef = document.querySelector("[name = 'step']");

formRef.addEventListener('submit', activeCreatePromise);

function activeCreatePromise(e) {
  let delay = Number(delayRef.value);
  const amount = Number(amountRef.value);
  const step = Number(stepRef.value);
  e.preventDefault();
  for (let i = 1; i <= amount; i++) {
    if (i > 1) {
      delay += step;
    }
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
