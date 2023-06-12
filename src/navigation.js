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
}

function trendsPage () {
    console.log('TRENDS');
}

function searchPage () {
    console.log('SEARCH');
}

function movieDetailsPage () {
    console.log('MOVIE');
}

function categoryPage () {
    console.log('CATEGORY');
}

function homePage () {
    console.log('HOME');

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    getTrendingMoviesPreview()
    getCategoriesPreview()
}