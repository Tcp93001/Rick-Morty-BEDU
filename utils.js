import {apiFunctions} from './constants.js'

const addCharacterModified = async (caracteres = [1,2,3], caracter) => {
    let data = await fetch(`${apiFunctions.characters}/${caracteres}`)
        .then(results => results.json())
        .then(info => info)
        .catch(error => console.log(error))

    data.forEach(data => {
        let img = document.createElement('img')
        img.src = data.image
        img.alt = data.name

        let nameText = data.name
        let location = data.location.name

        const nameFragment = document.createDocumentFragment();
        const nombre = nameFragment
            .appendChild(document.createElement('p'))
        nombre.textContent = nameText

        const locationFragment = document.createDocumentFragment();
        const locacion = locationFragment
            .appendChild(document.createElement('p'))
        locacion.textContent = location

        const container = document.createDocumentFragment();
        const contenedorTexto = container
            .appendChild(document.createElement('div'))
        contenedorTexto.classList.add('d-flex')
        contenedorTexto.classList.add('flex-column')
        contenedorTexto.classList.add('m-2')

        contenedorTexto.append(nombre)
        contenedorTexto.append(locacion)

        caracter.append(img)
        caracter.append(contenedorTexto)
    })

}

export default addCharacterModified;