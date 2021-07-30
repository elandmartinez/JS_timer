const timerButtons = document.querySelectorAll(".timer__button");
const timeLeft = document.querySelector(".display__time-left");
const timeEnd = document.querySelector(".display__end-time");
const minuteBox = document.querySelector("[name=minutes]");
const form = document.querySelector("#custom");
const timerEndedSound = document.querySelector(".timerEndedSound")
const StopButton = document.querySelector(".Stop-timer-button")
let intervalIdTimeOn;
let intervalIdTimeOver;
let actualHours;
let actualMinutes;
let actualSeconds;
const secondsInDay = (60 * 60) * 24;

StopButton.onclick = () => {
    clearInterval(intervalIdTimeOver)
    timerEndedSound.pause();
    timeLeft.style.color = "white";
    StopButton.classList.remove("visible")
    timeLeft.classList.remove("over")
}
function handleMinuteBox(event) {
    if(event.keyCode == 13){
        
        //with the next code until the line 24 we're creating the algorithm that will filter invalid numbers
        //from the valid ones, like numbers with a "+",".",etc
        let number = parseInt(event.target.value)
        const isInvalidNumber = Number.isNaN(number)
        
        if (isInvalidNumber) {
            alert("Invalid number, please use a valid one.")
            return
        }
        
        number = Math.abs(number)
        console.log("number entered", number)
        
        const time = (number * 60);
        console.log(time);
        if(typeof(time) === typeof(1)) {
            console.log("is a number");
            timer(time)
        }
        else{
            console.log("you must enter a number!")
        }
    }
}

minuteBox.addEventListener("keypress", handleMinuteBox)
form.addEventListener("submit", (event) => event.preventDefault())

timerButtons.forEach(button => {
    button.addEventListener("click", () => {
        timer(parseFloat(button.dataset.time))
    })
})

function timer(time) {
    clearInterval(intervalIdTimeOn);
    clearInterval(intervalIdTimeOver)
    timerEndedSound.pause();
    timeLeft.style.color = "white";
    StopButton.classList.remove("visible")

    if(time > secondsInDay) {
        alert("the max amount of time for the timer is 24 minutes (1440 minutes)")
        timeEnd.innerText = "";
        timeLeft.innerText = "";
        return;
    }

    console.log("time", time);
    const date = new Date();
    let totalHour;
    let totalMinutes;
    let hours;
    let minutes;
    let seconds;
    let actualHours = date.getHours();
    let actualMinutes = date.getMinutes();
    intervalIdTimeOn = setInterval(() => {

        if(time == 0) {
            clearInterval(intervalIdTimeOn);
            console.log("time over")
            timeLeft.style.color = "red";
            StopButton.classList.add("visible")
            timerEndedSound.play();
            intervalIdTimeOver = setInterval(() => {
                if(timerEndedSound.ended) timerEndedSound.play();
                timeLeft.classList.add("over")
                setTimeout(() => {
                    timeLeft.classList.remove("over")
                },500)
            },1000)
        }

        hours = Math.floor(time / 3600);
        minutes = Math.floor((time % 3600) / 60);
        seconds = Math.floor((time % 3600) % 60);

        timeLeft.innerText = `${hours} hr(s) : ${minutes} min(s) : ${seconds} sec(s)`;
        time = time - 1;

    }, 1000);

    setTimeout(() => {
        totalHour = actualHours + hours;
        totalMinutes = actualMinutes + minutes;

        if(totalMinutes > 59){
            console.log(totalHour)
            totalHour++;
            totalMinutes = (actualMinutes + minutes) % 60;
            console.log("total minutes",    totalMinutes)
        }

        console.log(totalHour)

        if(totalHour > 23) {
            console.log(totalHour)
            totalHour = (actualHours + hours) % 24;
            console.log(totalHour)

            if(actualMinutes + minutes >= 10){
                timeEnd.innerText = `Be back tomorrow at ${parseInt(totalHour)}:${actualMinutes + minutes}  ( military schedule )`
            }
            else {
                timeEnd.innerText = `Be back tomorrow at ${parseInt(totalHour)}:0${actualMinutes + minutes} ( military schedule )`
            }
            return
        }

        if(actualMinutes + minutes >= 10){
            timeEnd.innerText = `Be back at ${totalHour}:${totalMinutes} (military schedule)`
        }
        else {
            timeEnd.innerText = `Be back at ${totalHour}:0${totalMinutes} (military schedule)`
        }
    }, 1000)
}