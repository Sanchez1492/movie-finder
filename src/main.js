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


async function getTrendingMoviesPreview () {
    const { data } = await api('trending/movie/day')

    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
    trendingPreviewMoviesContainer.innerHTML = ''

    const movies = data.results
    movies.forEach(movie => {

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
            )

        movieContainer.appendChild(movieImg)
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    });
}

async function getCategoriesPreview () {
    const { data } = await api('genre/movie/list')

    categoriesPreviewList.innerHTML = ''

    const categories = data.genres

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
        categoriesPreviewList.appendChild(categoryContainer)
    });
}

async function getMoviesByCategory (id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id
        }
    })

    genericSection.innerHTML = ''

    const movies = data.results
    movies.forEach(movie => {

        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
            )

        movieContainer.appendChild(movieImg)
        genericSection.appendChild(movieContainer)
    });
}
