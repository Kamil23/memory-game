import { formatTime } from '../utils/utils.js';

const init = () => {
    downloadData();
}

const downloadData = async () => {
    const fetchData = await fetch('https://api.cieplicki.dev/api', {method: "GET"});
    const response = await fetchData.json();
    const users = Object.values(response.data);
    renderData(users);
}

const renderData = (data) => {

    data.sort((a, b) => { return a.gameTime - b.gameTime });

    let container = document.querySelector(".table-wrapper");
    let position = 0;

    data.map(({ name, gameTime }) => {

        let row = document.createElement('div');
        row.classList.add("row");
        container.appendChild(row);

        let positionContainer = document.createElement('div');
        positionContainer.classList.add("person-pos");
        positionContainer.textContent = ++position;
        row.appendChild(positionContainer);

        let nameContainer = document.createElement('div');
        nameContainer.classList.add("person-name");
        nameContainer.textContent = name;
        row.appendChild(nameContainer);

        let timeContainer = document.createElement('div');
        timeContainer.classList.add("person-time");
        timeContainer.textContent = formatTime(gameTime);
        row.appendChild(timeContainer);
    })
}

const backButton = document.querySelector("#returnBtn");
backButton.addEventListener("click", () => { window.location.href = "./"});

const homeBtn = document.querySelector("#home");
homeBtn.addEventListener("click", () => { window.location.href = "./"});

init();