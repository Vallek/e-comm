let minInput = document.querySelector('.price-range__input_min');
let maxInput = document.querySelector('.price-range__input_max');
let range = document.querySelector('.price-range__fill');
let priceMin = document.querySelector('.price-range__price_min');
let priceMax = document.querySelector('.price-range__price_max');

// Link two sliders in one and style color fill
function setMinValue() {
  let inputValue = minInput;
  let min = parseFloat(inputValue.min);
  let max = parseFloat(inputValue.max);

  inputValue.value = Math.min(
    parseFloat(inputValue.value),
    parseFloat(maxInput.value) - 10
  );

  priceMin.value = inputValue.value;

  let percent = ((inputValue.value - min) / (max - min)) * 100;
  range.style.left = percent + "%";
}

setMinValue();

function setMaxValue() {
  let inputValue = maxInput;
	let min = parseFloat(inputValue.min);
  let max = parseFloat(inputValue.max);

  inputValue.value = Math.max(
		parseFloat(inputValue.value), 
		parseFloat(minInput.value) + 10
	);

  priceMax.value = inputValue.value;

  let percent = ((inputValue.value - min) / (max - min)) * 100;
  range.style.right = 100 - percent + "%";
}

setMaxValue();

minInput.addEventListener('input', setMinValue);
maxInput.addEventListener('input', setMaxValue);

// Adjust inputs width on value length change
let priceInputs = document.querySelectorAll('.price-range__price');
let rangeInputs = document.querySelectorAll('.price-range__input');

priceInputs.forEach((el) => {
  el.style.minWidth = el.value.length + 'ch';
  el.addEventListener('input', adjust);
});

function adjust(key) {
  let el = key.target;
  el.style.minWidth = el.value.length + 'ch';
  el.style.width = el.value.length + 'ch';
}

rangeInputs.forEach((el) => {
  el.addEventListener('input', adjustRange);
});

function adjustRange() {
  priceInputs.forEach((el) => {
    el.style.minWidth = el.value.length + 'ch';
    el.addEventListener('input', adjust);
  });
}