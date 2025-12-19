const numberEl = document.getElementById("number");
const actionBtn = document.getElementById("action");
const resetBtn = document.getElementById("reset");
const statusEl = document.getElementById("status");
const scoreEl = document.getElementById("score");
const missesEl = document.getElementById("misses");
 

const MIN = 1;
const MAX = 100;
const INTERVAL_MS = 3000;
 
let current = null;
let timerId = null;
 
let score = 0;
let misses = 0;
 
let target = false;        
let clickedThisRound = false;
 
function randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function has7(n){
  return String(n).includes("7");
}
 
function isTargetNumber(n){
  return (n % 7 === 0) || has7(n);
}
 
function updateUI(){
  numberEl.textContent = current ?? "—";
  scoreEl.textContent = String(score);
  missesEl.textContent = String(misses);
}
 
function setStatus(msg){
  statusEl.textContent = msg;
}
 
function nextNumber(){
  if (target && !clickedThisRound) {
    misses++;
    setStatus("Nie trafiono Diddy.");
  } else {
    setStatus("");
  }
 
  current = randomInt(MIN, MAX);
  target = isTargetNumber(current);
  clickedThisRound = false;
 
  updateUI();
}
 
function start(){
  nextNumber();
  timerId = setInterval(nextNumber, INTERVAL_MS);
}
 
actionBtn.addEventListener("click", () => {
  if (clickedThisRound) {
    setStatus("Już użyto.");
    return;
  }
 
  clickedThisRound = true;
 
  if (target) {
    score++;
    setStatus("Dobrze.");
  } else {
    misses++;
    setStatus("Żle.");
  }
 
  updateUI();
});
 
resetBtn.addEventListener("click", () => {
  score = 0;
  misses = 0;
  target = false;
  clickedThisRound = false;
  setStatus("");
 
  clearInterval(timerId);
  current = null;
  updateUI();
  start();
});
 
start();