// card - change product amount

const productInput = document.querySelector('.input-amount');
const productPlus = document.querySelector('.plus');
const productMinus = document.querySelector('.minus');

productPlus.addEventListener('click', () => productInput.value = +productInput.value + 1)
productMinus.addEventListener('click', () => {
    if (+productInput.value > 1) productInput.value = +productInput.value - 1;
})

// clear form input
const dataItems = document.querySelectorAll('.data__item');
dataItems.forEach((elem) => {
    const formInput = elem.querySelector('.form-input');
    const btnClear = elem.querySelector('.input-clear');
    btnClear.addEventListener('click', () => formInput.value = '');
})

const btnSubmit = document.querySelector('.btn-submit');
const checkBox = document.getElementById('agree');
console.log('checkBox: ', checkBox);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const checkInput = document.querySelector('.check-input');
    const inputs = form.querySelectorAll('.form-input[required]');

    const validateForm = () => {
        let isValid = true;
        inputs.forEach(input => {
            if (!input.validity.valid) {
                isValid = false;
            }
        });
        checkInput.disabled = !isValid;
    };

    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
        input.addEventListener('change', validateForm);
    });

    validateForm();
});

