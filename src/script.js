const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

let interval;
let remainingTime = 1500; // 25 minutes in seconds

const display50Seconds = () => {
    for (let i = 0; i < 50; i++){
        setInterval(() => console.log(i), 1000);
    }
}

start.addEventListener("click", () => display50Seconds());


