// Плюс минус количество по нажатию на кнопки
// Получаем все инпуты
const qtyInput = document.querySelectorAll('.qty__number');

// Выполняем функцию для каждого из инпутов
qtyInput.forEach(function handleQty(el) {
	// Получаем родителя, чтобы найти кнопки каждого
	let qtyUi = el.parentElement;
	// Получаем кнопки
	let minusButton = qtyUi.querySelector('.qty__minus');
	let plusButton = qtyUi.querySelector('.qty__plus');

	minusButton.addEventListener('click', minusQty);
	plusButton.addEventListener('click', plusQty);
	
	function minusQty() {
		// Минус один, но не меньше единицы
		if (el.value > 1) {
			el.value--;
		}
	}	

	function plusQty() {
		// Плюс один
		el.value++ ;
	}	
});

// Расчет итоговой стоимости
let cartItem = document.querySelectorAll('.cart__item');
const totalNode = document.querySelector('.total__price');
// Функция расчета итоговой стоимости
function calcPrice() {
	let itemPrices = document.querySelectorAll('.cart__item-price');
	// Создаем пустой массив с одним элементом заглушкой, чтобы удаление всех позиций не выводило ошибку
	let prices = [0];
	// Используем цикл for для каждой позиции
	for (let i = 0; i < itemPrices.length; i++) {
		// Извлекаем текстовое содержимое (саму цену)
		let eachPrice = itemPrices[i].textContent;
		// Переводим значение из строки в число
		let num = Number(eachPrice);
		// Помещаем каждое число в массив
		prices.push(num);
	}
	// Используем метод reduce и функцию с двумя аргументами для сложения всех цен
	let sum = (previousValue, currentValue) => previousValue + currentValue;
	let totalPrice = prices.reduce(sum);
	// Помещаем число в соотв. узел на странице
	totalNode.textContent = totalPrice;
}
// Выполняем функцию
calcPrice();

// Убираем позицию с пересчетом итоговой цены
cartItem.forEach(function handleRemove(el) {
	let closeButton = el.querySelector('.cart__remove');
	closeButton.addEventListener('click', removeItem);
	function removeItem() {
		el.remove();
		totalNode.textContent = 0;
		calcPrice();
	}
});

// Появление попапа
const checkoutButton = document.querySelector('.cart__checkout-button');
const checkoutPopup = document.querySelector('.cart__checkout');
const pageBody = document.querySelector('body');
checkoutButton.addEventListener('click', showCheckoutPopup);
function showCheckoutPopup(el) {
	checkoutPopup.classList.remove('visually-hidden');
	pageBody.classList.add('cart-page_dim');
}

// Закрыть попап
const closePopupButton = document.querySelector('.checkout__close-button');
closePopupButton.addEventListener('click', closePopup);
function closePopup() {
	checkoutPopup.classList.add('visually-hidden');
	pageBody.classList.remove('cart-page_dim');
}

// Предыдущий слайд по кнопке назад
const backButton = document.querySelector('.checkout__back-button');
let activeSlide = document.querySelector('.checkout__slide_active');
let allSlides = document.querySelectorAll('.checkout__slide');

backButton.addEventListener('click', prevSlide);

function prevSlide() {
	for (let i = 0; i < allSlides.length; i++) {
		let all = allSlides[i].classList.contains('checkout__slide_active');
		if (all == true) {
			let active = allSlides[i];
			let prev = allSlides[i - 1];
			if (prev == undefined ||
				i == 0) {
				closePopup();
			}
			else {
				active.classList.remove('checkout__slide_active');
				active.classList.add('visually-hidden');
				prev.classList.add('checkout__slide_active');
				prev.classList.remove('visually-hidden');
			}
		}
	}
}

// Следующий слайд по кнопке отправки (в реальности нужно еще отправить данные через js)
let submitButton = document.querySelectorAll('.checkout__submit');
submitButton.forEach(function handleNext(el) {
	el.addEventListener('click', nextSlide);
});

function nextSlide() {
	for (let i = 0; i < allSlides.length; i++) {
		let all = allSlides[i].classList.contains('checkout__slide_active');
		if (all == true) {
			let active = allSlides[i];
			let next = allSlides[++i];
			if (next == undefined) {
				closePopup();
			}
			else {
				active.classList.remove('checkout__slide_active');
				active.classList.add('visually-hidden');
				next.classList.add('checkout__slide_active');
				next.classList.remove('visually-hidden');
			}
		}
	}
}