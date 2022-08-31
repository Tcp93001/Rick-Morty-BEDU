
const apiFunctions = {
    characters: "https://rickandmortyapi.com/api/character",
    locations: "https://rickandmortyapi.com/api/location",
    episodes: "https://rickandmortyapi.com/api/episode"
}

const caracter = document.getElementById('caracter');
const locacion = document.getElementById('locacion');
const episodio = document.getElementById('episodio');

// En este punto armamos la informaci'on para presentarla en el DOM
// Caracter
const addCharacter = data => {
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
    contenedorTexto.classList.add('m-5')

    contenedorTexto.append(nombre)
    contenedorTexto.append(locacion)

    caracter.append(img)
    caracter.append(contenedorTexto)
}

//Locaciones
const addLocacion = data => {
    let nameText = data.name
    let location = data.dimension
    let residents = data.residents.length

    const name = document.createDocumentFragment();
    const nombre = name
        .appendChild(document.createElement('p'))
    nombre.textContent = nameText

    const locationFragment = document.createDocumentFragment();
    const ubicacion = locationFragment
        .appendChild(document.createElement('p'))
    ubicacion.textContent = `Dimension: ${location}`

    const residentsFragment = document.createDocumentFragment();
    const habitantes = residentsFragment
        .appendChild(document.createElement('p'))
    habitantes.textContent = `Habitantes: ${residents}`

    locacion.append(nombre)
    locacion.append(ubicacion)
    locacion.append(habitantes)
}

// Episodios
const addEpisode = (data) => {
    let episode = data.episode
    let nombreEpisodio = data.name
    let airDate = data.air_date
    let characters = data.characters

    // contruye el elemento que neceistamos para el texto del numero de episodio
    const datosEpisodio = document.createDocumentFragment();
    const episodeNumber = datosEpisodio
        .appendChild(document.createElement('p'))
    episodeNumber.textContent = `Número de episodio: ${episode}`

    const datoNombreEpisodio = document.createDocumentFragment();
    const nombre = datoNombreEpisodio
        .appendChild(document.createElement('p'))
    nombre.textContent = `Nombre del Episodio: ${nombreEpisodio}`

    const airDateFragment = document.createDocumentFragment();
    const diaDeTransmision = airDateFragment
        .appendChild(document.createElement('p'))
    diaDeTransmision.textContent = `Fecha al Aire: ${airDate}`



    const charactersFragment = document.createDocumentFragment();
    const nombresFragment = document.createDocumentFragment();
    const container = document.createDocumentFragment();
    const contenedorImagenesYNombres = container
        .appendChild(document.createElement('div'))
    contenedorImagenesYNombres.classList.add('grid-container')

    characters.forEach(async (elem) => {
        const respuesta = await addSeveralCharacter(elem)

        const container = document.createDocumentFragment();
        const imagenesConTexto = container
            .appendChild(document.createElement('div'))
        imagenesConTexto.classList.add('m-3')

        const participacionCaracteres = charactersFragment
            .appendChild(document.createElement('img'))
        // Dando formato a la imagen
        participacionCaracteres.src = respuesta.image
        participacionCaracteres.alt = respuesta.name
        participacionCaracteres.classList.add('size-image')
        participacionCaracteres.classList.add('m-2')

        const nombreCaracter = nombresFragment
            .appendChild(document.createElement('p'))
        nombreCaracter.textContent = respuesta.name

        imagenesConTexto.append(participacionCaracteres, nombreCaracter)
        contenedorImagenesYNombres.append(imagenesConTexto)
    })

    episodio.append(episodeNumber)
    episodio.append(nombre)
    episodio.append(diaDeTransmision)
    episodio.append(contenedorImagenesYNombres)
}

const addSeveralCharacter = async (elem) => {
    let respuesta;
    try {
        respuesta = await fetch(elem)
        .then(results => results.json())
        .then(data => {
            return data
        })
    }
    catch(error) {console.log(error)}
    return respuesta;
}

// ********   Lamadas a API   ********
// Caracter
const retrieveData = () => {
    fetch(`${apiFunctions.characters}/2`)
    .then(results => results.json())
    .then(info => {
       addCharacter(info)
    })
    .catch(error => console.log(error))
}


// locacion
const locationData = () => {
    fetch(`${apiFunctions.locations}/1`)
    .then(results => results.json())
    .then(info => {
        addLocacion(info)
    })
}

// episodios
const episodeData = () => {
    fetch(`${apiFunctions.episodes}/1`)
    .then(results => results.json())
    .then(info => {
        addEpisode(info)
    })
}

window.addEventListener('load', () => {
    retrieveData()
    locationData()
    episodeData()
})

export default {addCharacterModified};