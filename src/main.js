const API_KEY = '4a8c17d81315b168bae62a0dbe29bdf6'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
})

function createMovies (movies, container) {
    container.innerText = ''

    movies.forEach(movie => {

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`
        })

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
            )

        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
    });    
}

function createCategories (categories, container) {
    container.innerText = ''

    categories.forEach(category => {
        const categoriesPreviewList = document.querySelector('.categoriesPreview-list')
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3')
        categoryTitle.classList.add('category-title')
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })
        categoryTitle.innerText = category.name
        categoryTitle.setAttribute('id', `id${category.id}`)

        categoryContainer.appendChild(categoryTitle)
        container.appendChild(categoryContainer)
    });
}


async function getTrendingMoviesPreview () {
    const { data } = await api('trending/movie/day')

    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

    const movies = data.results
    
    createMovies(movies, trendingPreviewMoviesContainer)
}

async function getCategoriesPreview () {
    const { data } = await api('genre/movie/list')
    const categories = data.genres

    createCategories (categories, categoriesPreviewList)
}

async function getMoviesByCategory (id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id
        }
    })

    const movies = data.results
    createMovies(movies, genericSection)
}

async function getMoviesBySearch (query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    })

    const movies = data.results
    createMovies(movies, genericSection)
}

async function getTrendingMovies() {
    const{ data } = await api('trending/movie/day')
    const movies = data.results

    createMovies(movies, genericSection)
}

async function getMovieById(id) {
    const{ data: movie } = await api(`movie/${id}`)

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
    headerSection.style.background = `
        linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
        url(${movieImgUrl})
    `

    movieDetailTitle.innerText = movie.original_title
    movieDetailDescription.innerText = movie.overview

    const movieScore = parseFloat(movie.vote_average.toFixed(1))
    movieDetailScore.innerText = movieScore

    createCategories(movie.genres, movieDetailCategoriesList)

    getRecommendedMoviesById(id)
}

async function getRecommendedMoviesById(id) {
    const { data } = await api(`movie/${id}/similar`)
    const movies = data.results
    
    createMovies(movies, relatedMoviesContainer)
    relatedMoviesContainer.scrollTo(0, 0)
    
}