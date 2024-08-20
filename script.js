
const resultEL = document.getElementById('result')
const lengthEL = document.getElementById('length')
const uppercaseEL = document.getElementById('uppercase')
const lowercaseEL = document.getElementById('lowercase')
const numbersEL = document.getElementById('numbers')
const symbolsEL = document.getElementById('symbols')
const generateEL = document.getElementById('generate')
const clipboardEL = document.getElementById('clipboard')

const randonFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

generateEL.addEventListener('click', () => {
  const length = +lengthEL.value
  const hasLower = lowercaseEL.checked
  const hasUpper = uppercaseEL.checked
  const hasNumber = numbersEL.checked
  const hasSymbol = symbolsEL.checked

  resultEL.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
  let generatePassword = ''
  let typeCount = lower + upper + number + symbol
  const typeArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0] === true)

  if (typeCount === 0) {
    return ''
  }

  while (generatePassword.length < length) {
    typeArr.forEach((type) => {
      const keyFromRandomFun = Object.keys(type)[0]
      generatePassword += randonFunc[keyFromRandomFun]()
    })
  }

  const finalPassword = shuffleString(generatePassword).substring(0, length)
  console.log(finalPassword)

  return finalPassword
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)]
}

function shuffleString(str) {
  let arr = str.split('');
  let n = arr.length;

  for(let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
  }

  return arr.join('');
}