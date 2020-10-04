import { validateForm as validate, printSuccess, printError, decryptData } from '../utils/validation.js';
import { formatTime, getTimeFromStorage } from '../utils/utils.js';

const init = () => {
    const timerSelector = document.querySelector("#timer");
    const encryptedTime = getTimeFromStorage('default');
    if (encryptedTime) {
        const key = getTimeFromStorage('key');
        const time = decryptData(encryptedTime, key);
        timerSelector.innerHTML = formatTime(time);
    } else {
        window.location.replace('/');
    }
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
            } else if (response.status == "fail") {
                printError('containerInfo', 'Coś poszło nie tak. Spróbuj ponownie za chwilę lub skontaktuj się z nami');
            }
        })
    };

}

const prepareData = () => {
    let formData = new FormData();
    const name = document.userDataForm.name.value;
    const email = document.userDataForm.email.value;

    const encryptedTime = getTimeFromStorage('default');
    const key = getTimeFromStorage('key');
    const time = decryptData(encryptedTime, key);
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

/* Navigation */

const homeBtn = document.querySelector("#home");
homeBtn.addEventListener("click", () => { window.location.href = "./" });

const showTableButton = document.querySelector("#showTable");
showTableButton.addEventListener("click", () => { window.location.href = "./tabela.html" });

const containerInfo = document.querySelector("#containerInfo");
containerInfo.addEventListener("click", () => { window.location.href = "./tabela.html" });

init();