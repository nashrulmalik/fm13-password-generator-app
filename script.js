const passwordDisplay = document.getElementById("passwordDisplay");
const lengthInput = document.getElementById("length");
const lengthVal = document.getElementById("lengthVal");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const strengthText = document.getElementById("strengthText");

const bars = document.querySelectorAll(".bar");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));


lengthInput.oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, var(--neon-green) 0%, var(--neon-green) ' + value + '%, #fff ' + value + '%, white 100%)'
    lengthVal.innerText = parseInt(value / 5);
  };

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

function generatePassword() {
    const password = generatePasswordFun(
        lengthInput.value,
        uppercaseCheck.checked,
        lowercaseCheck.checked,
        numbersCheck.checked,
        symbolsCheck.checked
    );

    passwordDisplay.value = password;
    calculateStrength(password);
}

function generatePasswordFun(passLen, upper, lower, num, symbol) {
    let charCodes = [];
    if (upper) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (lower) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
    if (num) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if (symbol) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

    const result = [];
    for (let i = 0; i < passLen; i++) {
        const ch = charCodes[Math.floor(Math.random() * charCodes.length)];
        result.push(String.fromCharCode(ch));
    }

    return result.join("");
}


function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

function calculateStrength(password) {
    let strength = 0;

    if (password.length >= 8) {
        strength++;
      }
    
      if (/[A-Z]/.test(password)) {
        strength++;
      }
    
      if (/[a-z]/.test(password)) {
        strength++;
      }
    
      if (/[0-9]/.test(password)) {
        strength++;
      }
    
      if (/[^A-Za-z0-9]/.test(password)) {
        strength++;
      }
      
      if (strength > 0) strength--;
      
      const strengthClasses = ["too-weak", "weak", "medium", "strong"];
      const strengthTexts = ["TOO WEAK", "WEAK", "MEDIUM", "STRONG"];

      bars.forEach((bar, i) => {
          bar.className = '';
          bar.classList.add(i < strength ? strengthClasses[strength - 1] : 'bar');
      });

      strengthText.textContent = strengthTexts[strength - 1];
      copyMsg.textContent = '';
}

function copyPassword() {
    navigator.clipboard
    .writeText(passwordDisplay.value)
    .then(() => {
        copyMsg.innerText = "COPIED";
        calculateStrength

        setTimetout(() => {
            copyMsg.innerText = "";
        }, 1000);
    });
}