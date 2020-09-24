import { validateForm as validate, printSuccess, printError } from '../utils/validation.js';
import { formatTime, getTimeFromStorage } from '../utils/utils.js';

const init = () => {
    const timerSelector = document.querySelector("#timer");
    const time = getTimeFromStorage();
    timerSelector.innerHTML = formatTime(time);
}

const registerData = (e) => {
    e.preventDefault();
    if (validate() == true) {
        const data = prepareData();
        fetch('https://api.cieplicki.dev/api', {
            method: "POST",
            body: data
        })
        .then(response => response.json())
        .then(response => {
            if (response.status == 'success') {
                printSuccess('containerInfo', 'Udało się! Sprawdź swoją pozycję');
            } else if (response.status == "failed") {
                printError('containerInfo', 'Coś poszło nie tak. Spróbuj ponownie za chwilę lub skontaktuj się z nami');
            }
        })
    };

}

const prepareData = () => {
    let formData = new FormData();
    const name = document.userDataForm.name.value;
    const email = document.userDataForm.email.value;
    const time = parseInt(window.localStorage.getItem('default'));
    if (!time) {
        return;
    }

    formData.append('email', email);
    formData.append('name', name);
    formData.append('time', time);

    return formData;
}


/* call Validation after submit */
const form = document.querySelector('[name=userDataForm]');
form.addEventListener("submit", registerData);

const showTableButton = document.querySelector("#showTable");
showTableButton.addEventListener("click", () => { window.location.href = "./tabela.html" });

const backButton = document.querySelector("#returnBtn");
backButton.addEventListener("click", () => { window.location.href = "./"});

init();





