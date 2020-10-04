/* Form validation */

const printError = (elemId, msg) => {
    const element = document.getElementById(elemId);
    element.classList.add('error');
    element.innerHTML = msg;
    element.removeAttribute("hidden");
}

const printSuccess = (elemId, msg) => {
    const element = document.getElementById(elemId);
    element.classList.add('success');
    element.innerHTML = msg;
    element.removeAttribute("hidden");
}

const validateForm = () => {
    const name = document.userDataForm.name.value;
    const email = document.userDataForm.email.value;

    let nameErr = true;
    let emailErr = true;

    if (name == "") {
        printError('nameErr', 'Wpisz swoje imię');
    } else {
        const regex = /[a-zA-Z0-9]+/g
        if (regex.test(name) === false) {
            printError('nameErr', 'Możesz podać jedynie litery i cyfry');
        } else {
            printError('nameErr', '');
            nameErr = false;
        }
    }

    if (email == "") {
        printError('emailErr', 'Wpisz adres email');
    } else {
        const regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            printError('emailErr', 'Wpisz poprawny adres email');
        } else {
            printError('emailErr', '');
            emailErr = false;
        }
    }

    if (!nameErr && !emailErr) {
        return true;
    }
}

const encryptData = (time) => {
    time = time.toString();
    let hash = CryptoJS.MD5(time);
    hash = hash.toString(CryptoJS.enc.Base64);
    let encryptedTime = CryptoJS.AES.encrypt(time, hash).toString();
    window.localStorage.setItem('key', hash);
    return encryptedTime;
}

const decryptData = (encryptedTime, key) => {
    const decryptedTime = CryptoJS.AES.decrypt(encryptedTime, key);
    const time = decryptedTime.toString(CryptoJS.enc.Utf8);
    return time;
}

export { validateForm, printSuccess, printError, encryptData, decryptData }