const text = document.querySelector(".text");
const key = document.querySelector(".key");
const resultText = document.querySelector(".result-text");
const decryptBtn = document.querySelector(".decrypt-button");
const encryptBtn = document.querySelector(".encrypt-button");
const huckBtn = document.querySelector(".huck-button");
const alphabet = ["а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","п","р","с","т","у","ф","х","ц","ч","ш","щ","ъ","ы","ь","э","ю","я"];
let directions = document.querySelectorAll("input[type='radio']");
const clearBtn = document.querySelector(".clear-button");

decryptBtn.addEventListener("click", getDecryptedText);
encryptBtn.addEventListener("click", getEncryptedText);
huckBtn.addEventListener("click", getHuckText);
clearBtn.addEventListener("click", clear);

function clear() {
    resultText.innerHTML = "";
    resultText.style.opacity = "0";

}

function getHuckText() {
    resultText.innerHTML = "";
    let textValue = text.value;

    for (let shift = 1; shift < 33; shift++) {
        let huckText = "";
        for (let char of textValue) {
            if (char.match(/[а-я]/)) {
                const code = char.charCodeAt(0);
                const base = 1072;
                huckText += String.fromCharCode(((code - base + shift + 32) % 32) + base);
            } else {
                huckText += char;
            }
        }
        resultText.innerHTML = resultText.innerHTML + huckText + `<br>`;
        resultText.style.opacity = "1";
    }
}

function getEncryptedText() {
    resultText.innerHTML = "";
    let textValue = text.value;
    let keyValue = key.value;

    for (let val of directions) {
        if (val.checked && val.value === "left") {
            keyValue *= -1;
        }
    }

    let res = "";

    for (let i = 0; i < textValue.length; i++) {
        let indexNew = Number(alphabet.indexOf(textValue[i])) - Number(keyValue);
        if (textValue[i] === " ") {
            res = res + " ";
        } else {
            if (indexNew >= alphabet.length) {
                indexNew = indexNew - alphabet.length;
            }
            if (indexNew < 0) {
                indexNew = indexNew + alphabet.length;
            }
            res = res + alphabet[indexNew];
        }
    }
    resultText.innerHTML = resultText.innerHTML + res + `<br>`;
    resultText.style.opacity = "1";
}

function getDecryptedText() {
    resultText.innerHTML = "";
    let textValue = text.value;
    let keyValue = key.value;

    for (let val of directions) {
        if (val.checked && val.value == "left") {
            keyValue *= -1;
        }
    }

    let res = "";

    for (let i = 0; i < textValue.length; i++) {
        let indexNew = Number(alphabet.indexOf(textValue[i])) + Number(keyValue);
        if (textValue[i] == " ") {
            res = res + " ";
        } else {
            if (indexNew >= alphabet.length) {
                indexNew = alphabet.length - indexNew;
            }
            console.log(indexNew);
            if (indexNew < 0) {
                indexNew = indexNew + alphabet.length;
            }
            res = res + alphabet[indexNew];
        }
    }
    resultText.innerHTML = res;
    resultText.style.opacity = "1";
}