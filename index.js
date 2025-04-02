// const fechData = async(seahTerm)=> {
//     const response = await axios.get('http://omdbapi.com/', {
//         params:{
//             apikey: 4bd2499f',
//             s: 'avengers'
//         }
//     })

// if(response.data.Error){
//     return []
// }
// console.log(response.data)

// }

const fetchData = async (searchTerm) => {
    const response = await axios.get('https://omdbapi.com/',{
        params: {
            apikey: "4bd2499f",
            i: movie.imdbID
        }
    })
    console.log(response.data)
    summaryElement.innerHTML = movieTemplate(response.data)

        //preguntamos cual lado es?
    if(side === "left"){
        Leftmovie = response.data

    }else{
        rightMovie = response.data
    }
    //preguntamos si tenemos ambos lados
    if(Leftmovie && rightMovie){
        //entonces ejecutamos la funcion de comparacion
        runComparison()

    }

}

const runComparison = () => {
    console.log("comparacion de peliculas")
    const leftSideStats = document.querySelector("left-summary . notification")
    const rightSideStats = document.querySelector("rightft-summary . notification")
    leftSideStats.foreach((leftStat, index) =>{
        const rightStat = rightSideStats[index]
        const leftSideValue = parseInt(leftStat.dataset.value)
        const rightSideValue = parseInt(rightSideStats.dataset.value)
       
        if(rightSideValue > leftSideValue){
            leftStat.classList.remove("is-primary")
            leftStat.classList.add("is-danger")
        }else{
            rightStat.classList.remove("is-primary")
            rightStat.classList.add("is-danger")

        }
    })
}

const movieDetailsovieTemplate = (movieDetails) => {
    //Transformar a numeros los strings que llegan de los datos
    const dollars = parseInt(movieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
    console.log(dollars)
    const metascore = parseInt(movieDetails.Metascore)
    const imdbRating = parseFloat(movieDetails.imdbRating)
    const imdbVotes = parseInt(movieDetails.imdbVotes.replace(/,/g, ''))
    console.log(metascore, imdbRating, imdbVotes)
    const awards = movieDetails.Awards.split('').reduce((prev, word) => {
        const value = parseInt(word)

        if(isNaN(value)){
            return prev
        }else{
            return prev + value
        }
        }, 0)
        console.log('Awards', awards)
    }

    // Agregar la propiedad data-value a cada elemento del template

    return `
        <article class="media"
            <figure class="media-left"
                <p class="image"
                    <img src="${movieDetails.Poster}"/>
                </p>
            </figure>    
            <div class="media-content"
                <div class="content"
                    <h1>${movieDetails.Title}</h1>
                    <h4>${movieDetails.Genre}</h1>
                    <p>${movieDetails.Plot}<p>
                </div>
            </div>
        </article>
        <article>
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetails.Awards}
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetails.BoxOffice}
            <p class="subtitle">BoxOffice</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetails.Metascore}
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetails.imdRating}
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetails.imdbVotes}
            <p class="subtitle">IMDB Votes</p>
        </article>

    `


// fechData()
const root = document.querySelector('.autocomplete')
root.innerHTML = `
<label><b>Búsqueda de películas</b></label>
<input class="input">
<div class="dropdown">
    <div class="dropdown"-menu>
        <div class="dropdown-content results></div>
    </div>
</div>
`

const input = document.querySelector("input")
const dropdown = document.querySelector(".dropdown")
const resultsWrapper = document.querySelector(".results")

const debonce = (func, delay = 1000) => {
    let timeoutId
    return(...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

const onInput = async(event) => {
    const movies = await fechData(event,target,value)
    console.log("MOVIES", movies)

    if(movies.length) {
        dropdown.classList.remove('is-active')
        return
    }

    resultsWrapper.innerHTML = ''
    dropdown.classList.add('is-active')

    for(let movie of movies) {
        const option = document.createElement('a')
        const imgSrc = movie.Poster === 'N/A' ? '': movie.Poster

        option.classList.add('dropdown-item')
        option.innerHTML = `
        <img src="${imgSrc}" />
        ${movie.Title}
        `
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active')
            input.value = movie.Title
            onMovieSelect(movie)
        })
        resultsWrapper.appendChild(option)
    }
}

input.addEventListener('input', debonce(onInput, 1000))

document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})

const onMovieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey: '4bd2499f',
            i: movie.imdID
        }
    })


console.log(response.data)
document.querySelector('#sumary').innerHTML = movieTemplate()

}

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>        
    `
}