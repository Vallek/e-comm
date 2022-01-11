// Скрыть показать поиск в шапке
// Находим инпут и присваиваем узел переменной
const searchBar = document.querySelector('.header__search-input');
// Находим кнопку
const searchButton = document.querySelector('.header__search-button');
// Выполнить функцию по клику на кнопку
searchButton.addEventListener('click', handleSearchBar);
// Функция скрытия/показа поиска
function handleSearchBar() {
	searchBar.classList.toggle('visually-hidden');
}

// Показать скрыть выпадающее меню 
const headerLine = document.querySelector('.header__main');
const dropdownMenu = document.querySelector('.menu__dropdown');

// Отдельные функции на события наведения и ухода курсора 
headerLine.addEventListener('mouseenter', ShowDropdownMenu);
headerLine.addEventListener('mouseleave', HideDropdownMenu);

function ShowDropdownMenu() {
	dropdownMenu.classList.remove('visually-hidden');
}

function HideDropdownMenu(el) {
	// Проверить, что курсор не над меню
	if (el != dropdownMenu) {
		dropdownMenu.classList.add('visually-hidden');
	}
}
