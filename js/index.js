// Functions

const clearButton = () => {
  firstValue = ''
  operation = ''
  secondValue = ''
  input.textContent = '0'
  resultado.textContent = '0'
}

// oneDataOperation is a parameter just in case the user press an operation that only recieves one number, so it will print the number right after the operator
const addToFirstValue = (n, oneDataOperation = false) => {
  firstValue += n

  if (oneDataOperation){
    input.textContent = `${operation}${firstValue}`
    return
  }

  input.textContent = `${firstValue}`
}

const addToSecondValue = (n) => {
  secondValue += n
  input.textContent = `${firstValue}${operation}${secondValue}`
}

// The user will set the angle in degress, and this function will convert it into radians, as the Math.<trigonometric_function> recieve the angle in radians
const degreesToRadians = n => {
  return ((n * Math.PI) / 180)
}

const buttonBehaviour = (button) => {
  const textValue = button.textContent

    // This means that we won't have values in the variables, so we'll asign the content of the button pressed (if it's a number) in the first value
    if (button.classList.contains('btn-n')){
      // if a one-data operation is selected, it will add the number after the symbol
      if (oneDataOperations.some(oneDataOperation => operation === oneDataOperation)) {
        addToFirstValue(textValue, true)
        return
      }


      if (firstValue && operation) {
        addToSecondValue(textValue)
        return
      }

      addToFirstValue(textValue)
    }

    // If a button with the class 'two-data-operation' is pressed, we will set the variable 'operation' as the value of the operation

    if (button.classList.contains('two-data-operation') && firstValue) {
      if (operation) return
      operation = textValue

      input.textContent = `${firstValue}${operation}`
    }

    // to select an operation that only receives one number, it'll have to be selected before the number
    if (button.classList.contains('one-data-operation') && !firstValue) {
      input.textContent = `${textValue}`
      operation = textValue
    }
}

const equalBehaviour = () => {
  if (!firstValue || !operation) return

  const operate = {
    '+': (a, b) => {return +a + +b},
    '-': (a, b) => {return +a - +b},
    '*': (a, b) => {return +a * +b},
    '/': (a, b) => {return +a / +b},
    '%': (a, b) => {return +a % +b},
    '^': (a, b) => {return a ** +b},
    '√': (a) => {return Math.sqrt(a)},
    'sin': (a) => {return Math.sin(degreesToRadians(a)).toFixed(4)},
    'cos': (a) => {return Math.cos(degreesToRadians(a)).toFixed(4)},
    'tan': (a) => {return Math.tan(degreesToRadians(a)).toFixed(4)},
    'log': (a) => {return Math.log10(a)}
  }

  

  result = operate[operation](firstValue, secondValue)

  resultado.textContent = result

  // Set the result to the first value so multiple operations can be done
  firstValue = result
  operation = ''
  secondValue = ''
}

// Variables

const buttons = document.querySelectorAll('.button')
const buttonClear = document.querySelector('.button-cls')
const buttonEquals = document.querySelector('.button-equals')

const input = document.querySelector('.input p')
const resultado = document.querySelector('.input .resultado')

const oneDataOperations = ['√', 'sin', 'cos', 'tan', 'log']

let firstValue = '', operation = '', secondValue = ''

// Event listeners

buttonClear.addEventListener('click', () => clearButton())

buttons.forEach(button => button.addEventListener('click', () => buttonBehaviour(button)))

buttonEquals.addEventListener('click', () => equalBehaviour())
