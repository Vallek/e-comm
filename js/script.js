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

// Show\hide dropdown menu 
const headerLine = document.querySelector('.header__main');
const dropdownMenu = document.querySelector('.menu__dropdown');

// Separate event listeners for mouse in and out 
headerLine.addEventListener('mouseenter', ShowDropdownMenu);
headerLine.addEventListener('mouseleave', HideDropdownMenu);

function ShowDropdownMenu() {
	dropdownMenu.classList.remove('visually-hidden');
}

function HideDropdownMenu(el) {
	// Check if user not hover dropdown menu
	if (el != dropdownMenu) {
		dropdownMenu.classList.add('visually-hidden');
	}
}