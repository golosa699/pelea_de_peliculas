const fechData = async(seahTerm)=> {
    const response = await axios.get('http://omdbapi.com/', {
        params:{
            apikey: '4bd2499f',
            s: 'avengers'
        }
    })

if(response.data.Error){
    return []
}
console.log(response.data)

}

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
            apikey: '',
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