const goBack = () => {
    window.location.href('./src');
}

const formatTime = (time) => {
    const parseTime = parseInt(time)
    time = new Date(parseTime);
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();

    minutes.length < 2 ? minutes = '0' + minutes : '';
    seconds.length < 2 ? seconds = '0' + seconds : '';
    let hundredths = (time.getMilliseconds()).toFixed(0);
        if(hundredths.length == 2) {
            hundredths = "0" + hundredths;
        } else if (hundredths.length == 1) {
            hundredths = "00" + hundredths;
        }

    return `${minutes}:${seconds}:${hundredths}`;
}

const getTimeFromStorage = () => {
    return window.localStorage.getItem("default");
}

const variantOfSecond = (distanceInSeconds) => {
    let variant;
    switch(distanceInSeconds) {
        case 1:
            variant = "sekunda";
            break;
        case 2:
        case 3:
        case 4:
            variant = "sekundy";
            break;
        default:
            variant = "sekund"
            break;
    }
    return variant;
}

const countDown = (milliseconds) => {
    const second = 1000;
    const timeToCountDown = milliseconds;
    const countDown = new Date().getTime() + timeToCountDown;

    let timerSelector = document.querySelector("#timer");
    timerSelector.innerText = `Czas do rozpoczęcia: ${milliseconds/second} sekund`;

    const x = setInterval(() => {
        let now  = new Date().getTime();
        let distanceInSeconds = Math.round((countDown - now)/1000);
        let variant = variantOfSecond(distanceInSeconds);
        
        timerSelector.innerText = `Czas do rozpoczęcia: ${distanceInSeconds} ${variant}`;

        if (distanceInSeconds < 0) {
            clearInterval(x);
        }
    }, second);

}



export { goBack, formatTime, getTimeFromStorage, countDown }