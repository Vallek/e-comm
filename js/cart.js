// Плюс минус количество оп нажатию на кнопки
// Получаем все инпуты
const qtyInput = document.querySelectorAll('.qty__number');

// EВыполняем функцию для всех инпутов
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


