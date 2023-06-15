searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='
})

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})

arrowBtn.addEventListener('click', () => {
    location.hash = '#home'
})



window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    const hash = location.hash

    if(hash.startsWith('#trends')) {
        trendsPage();
    } else if (hash.startsWith('#search=')){
        searchPage();
    } else if (hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (hash.startsWith('#category=')) {
        categoryPage();
    } else {
        homePage();
    }

    window.scrollTo(0, window.offsetTop)
}

function trendsPage () {
    console.log('TRENDS');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
}

function searchPage () {
    console.log('SEARCH');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')
}

function movieDetailsPage () {
    console.log('MOVIE');

    headerSection.classList.add('header-container--long')
    // headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')
}

function categoryPage () {
    console.log('CATEGORY');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryData] = location.hash.split('=')
    const [categoryId, categoryName] = categoryData.split('-')
    
    const newName = decodeURI(categoryName)

    headerCategoryTitle.innerText = newName
    getMoviesByCategory(categoryId)
}

function homePage () {
    console.log('HOME');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMoviesPreview()
    getCategoriesPreview()
}