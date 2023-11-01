export const getPhoneNumber = (inputText: string) => `+${getNumbersFromText(inputText)}`
const getNumbersFromText = (inputText: string) => inputText.replace(/\D/g, '')

export const getValidatedPhoneNumber = (inputText: string, selectionStart: number | null): string => {
  const numbersFromText = getNumbersFromText(inputText)
  let formattedInputText = ''

  if (!numbersFromText && inputText[0] !== '+') {
    return ''
  }

  if (selectionStart !== inputText.length) {
    return inputText
  }

  if (numbersFromText[0] === '7' || numbersFromText[0] === '8') {
    formattedInputText += '+7'
  } else if (numbersFromText[0] === '9') {
    formattedInputText += '+7 (9'
  } else {
    return inputText
  }

  if (numbersFromText.length > 1) {
    formattedInputText += ' (' + numbersFromText.substring(1, 4) + ')'
  }

  if (numbersFromText.length > 4) {
    formattedInputText += ' ' + numbersFromText.substring(4, 7)
  }

  if (numbersFromText.length > 7) {
    formattedInputText += '-' + numbersFromText.substring(7, 9)
  }

  if (numbersFromText.length > 9) {
    formattedInputText += '-' + numbersFromText.substring(9, 11)
  }

  return formattedInputText
}
