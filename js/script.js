// Show/hide search bar in header
// Get search bar
const searchBar = document.querySelector('.header__search-input');
// Get search button
const searchButton = document.querySelector('.header__search-button');
// Execute function when user clicks button
searchButton.addEventListener('click', handleSearchBar);
// Function that hides/shows search bar
function handleSearchBar() {
	searchBar.classList.toggle('visually-hidden');
}
