let slider = document.querySelector('.slider');

const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numberCheck = document.querySelector('#numbers');
const symbolCheck = document.querySelector('#symbols');


const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const copyBtn = document.querySelector("[data-copyBtn]");


let passwordDisplay = document.querySelector("[data-passwordDisplay]");

let copyMsg = document.querySelector("[data-copyMsg]");


let passwordLength = 10;
let checkCount = 0;

//setIndicator(#ccc);


let lengthDisplay = document.querySelector("[data-lengthNumber]");

function handleSlider(){
    slider.value = passwordLength;
    lengthDisplay.innerText = slider.value;
    
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ((passwordLength - min)*100/(max - min)) + "% 100%"
}

handleSlider();

let symbolsString = '!@#$%^&*()-_+=[{]}\\|;:\",<.>/~`';



function getRandomInteger(min, max)
{
    return Math.floor(Math.random()*(max - min)) + min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}


function generateLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
    
    let index = getRandomInteger(0, symbolsString.length);
    return symbolsString[index];
}

const indicator = document.querySelector("[data-indicator]");

function setIndicator(color){
    indicator.style.backgroundColor = color;
}


function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSym = false;
    let hasNum = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasUpper = true;
    if(symbolCheck.checked) hasUpper = true;
    if(numberCheck.checked) hasUpper = true;

    if(hasUpper && hasLower && (hasSym || hasNum) && passwordLength >= 8 ){
        setIndicator("#0f0")
    }

    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }

}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";

    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}


slider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});



copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value){
        copyContent();
    }
});


function handleCheckBoxChenge(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    console.log("check box clicked");
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChenge);
})

let password = "";

function shufflePassword(array){
    //finisher yets method
    for(let i = array.length - 1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

        let str = "";
        array.forEach((el) => (str += el));
        return str;
    }
}


let generateBtn = document.querySelector(".generate-button");

generateBtn.addEventListener('click', () => {
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider(); 
    }

    //remove password
    password = "";

    // if(uppercaseCheck.checked){
    //     password += generateUppercase;
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowercase;
    // }


    // if(numberCheck.checked){
    //     password += generateRandomNumber;
    // }


    // if(symbolCheck.checked){
    //     password += generateSymbol;
    // }

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }

    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }

    if(symbolCheck.checked){
        funcArr.push(generateSymbol);
    }

    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
        
    }


    for(let i=0; i<passwordLength - funcArr.length; i++){
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
        console.log("chal rha hai");
    }


    //shuffle password
    password = shufflePassword(Array.from(password));
    
    passwordDisplay.value = password;

    //calc strength
   
    calcStrength();



});
