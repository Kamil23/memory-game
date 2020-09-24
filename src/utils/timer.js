let time = 0;

function Stopwatch(elem) {
    let offset;
    let interval;

    function update() {
        if (this.isOn) {
            time += delta();
            elem.textContent = timeFormatter(time);
        }
    }

    function delta() {
        let now = Date.now();
        let timePassed = now - offset;

        offset = now;

        return timePassed;
    }

    function timeFormatter(time) {
        time = new Date(time);

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

        return `Czas gry: ${minutes} : ${seconds} : ${hundredths}`;
    }

    this.start = function() {
        interval = setInterval(update.bind(this), 10);
        offset = Date.now();
        this.isOn = true;
    }

    this.stop = function() {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
        elem.textContent = timeFormatter(time);
    }

    this.reset = function() {
        time = 0;
        update();
    }

    this.isOn = false;
}

const timer = document.querySelector("#timer");
const watch = new Stopwatch(timer);

const startTimer = () => {
    watch.start()
}

const stopTimer = () => {
    watch.stop();
}

const getTime = () => {
    return time;
}

export { startTimer, stopTimer, getTime}