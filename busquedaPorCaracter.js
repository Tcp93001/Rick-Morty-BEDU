import addCharacterModified from './utils.js'

const imagenCaracter = document.getElementById('caracterContainer');
const input = document.getElementsByTagName('input')[0]
const button = document.getElementById('busquedaBoton')

const callback = () => {
    if (input.value) addCharacterModified(input.value.replaceAll(' ', ''), imagenCaracter)
}
button.addEventListener('click', callback)
console.log(button)

