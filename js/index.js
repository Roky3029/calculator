const buttons = document.querySelectorAll('.button')
const buttonClear = document.querySelector('.button-cls')
const buttonEquals = document.querySelector('.button-equals')

const input = document.querySelector('.input p')
const resultado = document.querySelector('.input .resultado')

let firstValue = '', operation = '', secondValue = ''

buttonClear.addEventListener('click', () => {
  firstValue = ''
  operation = ''
  secondValue = ''
  input.textContent = '0'
  resultado.textContent = '0'
})

const addToFirstValue = (n) => {
  firstValue += n
  input.textContent = `${firstValue}`
}

const addToSecondValue = (n) => {
  secondValue += n
  input.textContent = `${firstValue}${operation}${secondValue}`
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const textValue = button.textContent

    // This means that we won't have values in the variables, so we'll asign the content of the button pressed (if it's a number) in the first value
    if (button.classList.contains('btn-n')){
      if (operation) {
        addToSecondValue(textValue)
        console.log(secondValue)
        return
      }
      
      addToFirstValue(textValue)
      console.log(firstValue)
    }

    // if (button.classList.contains)

    // If a button with the class 'two-data-operation' is pressed, we will set the variable 'operation' as the value of the operation, except for the special case of the power (^)

    if (button.classList.contains('two-data-operation') && firstValue) {
      if (operation) return
      operation = textValue

      input.textContent = `${firstValue}${operation}`
    }

    if (button.classList.contains('one-data-operation') && firstValue) {
      input.textContent = `√${firstValue}`
      resultado.textContent = Math.sqrt(firstValue)
    }
  })
})

buttonEquals.addEventListener('click', () => {
  if (!firstValue || !operation || !secondValue) return

  const operate = {
    '+': (a, b) => {return +a + +b},
    '-': (a, b) => {return +a - +b},
    '*': (a, b) => {return +a * +b},
    '/': (a, b) => {return +a / +b},
    '%': (a, b) => {return +a % +b},
    '^': (a, b) => {return a ** +b}
  }

  result = operate[operation](firstValue, secondValue)

  resultado.textContent = result
})

// TODO: 
/* 
* Add the decimal functionality
* Add the posibility to create a combined operation
* Responsive mode
* Adjust the parameters in the footer
* Add links to the footer
* Add sine, cosine and tangent
* Add logarithm
*/
