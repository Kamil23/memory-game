import { cardColors } from '../utils/cardColors.js';
import { startTimer, stopTimer, getTime } from '../utils/timer.js';
import { countDown, redirectToMainPage, reload } from '../utils/utils.js';

/* Game */

let cards = document.querySelectorAll('.card');
cards = [...cards];

let gameTime = '';
let activeCard = '';
const activeCards = [];
const millisecondsToCountDown = 5000;

const gamePairs = cards.length/2;
let gameResult = 0;


const init = () => {
    window.localStorage.clear();
    gameWrapper.classList.remove("no-display");
    initInfo.classList.add("no-display");
    timer.classList.remove("no-display");

    cards.forEach(item => {
        const position = Math.floor(Math.random()*cardColors.length);
        item.classList.add(cardColors[position]);
        cardColors.splice(position, 1);
    })

    countDown(millisecondsToCountDown);

    setTimeout(() => {
        cards.forEach(item =>{
            item.classList.add("hidden");
            item.addEventListener("click", clickCard);
        });
        document.querySelector(".timer-title").innerHTML = "START!";
        startTimer();
        
    }, millisecondsToCountDown)
}

const clickCard = function() {
     
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove('hidden');

    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach(item => item.removeEventListener('click', clickCard));
        activeCards[1] = activeCard;

        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {
                console.log('wygrana');
                activeCards.forEach(activeCard => activeCard.classList.add('off'));
                gameResult++;
                cards = cards.filter(item => !item.classList.contains("off"));
                if (gameResult == gamePairs) {
                    stopTimer();
                    gameTime = getTime();
                    window.localStorage.setItem('default', gameTime);
                    window.location.replace('koniec-gry.html');
                }
            } else {
                console.log("przegrana");
                activeCards.forEach(activeCard => activeCard.classList.add('hidden'));
            }

            activeCard = '';
            activeCards.length = 0;
            cards.forEach(item => item.addEventListener('click', clickCard))

        }, 300)

    }
}

/* Start Game */
let gameWrapper = document.querySelector(".game-wrapper");
let initInfo = document.querySelector(".init-info");
let timer = document.querySelector(".timer");

const startBtn = document.querySelector("#startGameBtn");
startBtn.addEventListener("click", init);

const logoWrapper = document.querySelector("#logoWrapper");
logoWrapper.addEventListener("click", redirectToMainPage);

/* Navigation */

const homeBtn = document.querySelector("#home");
homeBtn.addEventListener("click", reload);

const showTableButton = document.querySelector("#showTable");
showTableButton.addEventListener("click", () => { window.location.href = "./tabela.html" });
