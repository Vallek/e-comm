'use strict';
// Внимание! Комментарии оставлены в учебных целях. В реальном коде не нужно комментировать каждую строку таким образом.
// Убавить/прибавить количество по нажатию на кнопки
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

	let thisPrice = qtyUi.closest('.cart__item').querySelector('.cart__item-price');
	let unitPrice = qtyUi.closest('.cart__item').querySelector('.cart__unit-price').textContent;
	let unitPriceNum = Number(unitPrice);

	function minusQty() {
		// Минус один, но не меньше единицы
		if (el.value > 1) {
			el.value--;
			// Изменить цену при изменении количества. Для расчетов переводим тип в числа, а затем обратно в строку.
			let valueNum = Number(el.value);
			let finalPriceNum = unitPriceNum * valueNum;
			let finalPrice = String(finalPriceNum);
			thisPrice.textContent = finalPrice;
			calcPrice();
		}
	}	

	function plusQty() {
		// Плюс один
		el.value++ ;
		let valueNum = Number(el.value);
		let finalPriceNum = unitPriceNum * valueNum;
		let finalPrice = String(finalPriceNum);
		thisPrice.textContent = finalPrice;
		calcPrice();
	}	

});

// Расчет итоговой стоимости (в реальности ее тоже нужно отправить вместе с данными форм)
const cartItem = document.querySelectorAll('.cart__item');
const totalNode = document.querySelector('.total__price');

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
function showCheckoutPopup() {
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

// Предыдущий слайд по кнопке назад (в даном случае переключение слайдов можно сделать и вручную для каждого, но здесь сделано через циклы просто для демонстрации)
const backButton = document.querySelector('.checkout__back-button');
const allSlides = document.querySelectorAll('.checkout__slide');

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

// Включение нативной валидации через JS во время ввода (в реальности все это обязательно нужно проверять на сервере, а в клиенте можно добавлять свою валидацию, а не нативную)
const activeSlide = document.querySelector('.checkout__slide_active');
const inputs = activeSlide.querySelectorAll('input');
inputs.forEach(
	function runValidation(el) {
		el.addEventListener("input", function() {
			if (el.checkValidity() == false) {
				el.reportValidity();
			} 
			else {
			el.setCustomValidity("");
			}
		});
	}
);

const submitButton = document.querySelectorAll('.checkout__submit');
submitButton.forEach(function handleValidation(el) {
	el.addEventListener('click', validateData);
});

// Проверяем, все ли инпуты валидные
function validateData() {
	let activeSlide = document.querySelector('.checkout__slide_active');
	let inputs = activeSlide.querySelectorAll('input');
	let invalidInputs = activeSlide.querySelector('input:invalid');
	let emptyInputs = activeSlide.querySelector('input').value == "";
	if (! invalidInputs &&
		emptyInputs != true) {
		// Если да, то собираем данные и показываем следующий слайд
		getData();
		nextSlide();
	}
	else {
		// Если нет, то еще раз по нажатию выводим нативные сообщения для инпутов
		inputs.forEach(
			function validate(el) {
					el.reportValidity();
			}
		);	
	}
}
// Сбор данных (в реальности они сразу отправляются разными способами, а здесь помещаются в объект для демонстрации)
// Создаем пустой объект 
let dataObject = {};
function getData() {
	// Сбор данных с помощью formData() 
	let formElement = document.querySelector(".checkout__slide_active");
	let formData = new FormData(formElement);
	// Помещаем данные в объект
	formData.forEach((value, key) => dataObject[key] = value);
	console.log(dataObject);
}

// Следующий слайд
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

// Закрываем последний слайд
const completeButton = document.querySelector('.checkout__complete');
completeButton.addEventListener('click', closePopup);