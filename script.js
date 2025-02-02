const carouselContainer = document.querySelector(".carousel-container");
const carousel = document.querySelector(".carousel");
const cards = Array.from(document.querySelectorAll(".card")); // Преобразуем NodeList в массив
const cardWidth = cards[0].offsetWidth + 20; // ширина карточки с учетом margin
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let autoMoveSpeed = 0; // Скорость автоматического движения (пикселей на кадр)
let lastTime = 0;

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

// Дублирование карточек для непрерывного скроллинга
function initializeCarousel() {
  // Дублируем элементы в начале и в конце
  for (let i = 0; i < cards.length; i++) {
    const cloneFirst = cards[i].cloneNode(true);
    const cloneLast = cards[cards.length - 1 - i].cloneNode(true);
    carousel.appendChild(cloneFirst);
    carousel.insertBefore(cloneLast, carousel.firstChild);
  }
}

// Автоматическое непрерывное движение
function continuousScroll(timestamp) {
  if (lastTime === 0) lastTime = timestamp;
  const elapsed = timestamp - lastTime;

  if (elapsed > 16) { // приблизительно 60 FPS
    currentTranslate -= autoMoveSpeed;
    if (Math.abs(currentTranslate) >= cardWidth) {
      currentTranslate += cardWidth;
      carousel.appendChild(carousel.firstElementChild);
      carousel.style.transition = 'none'; // Убираем анимацию при вставке элементов
      setCarouselPosition();
      requestAnimationFrame(() => carousel.style.transition = ''); // Возвращаем анимацию
    } else {
      setCarouselPosition();
    }
    lastTime = timestamp;
  }

  animationID = requestAnimationFrame(continuousScroll);
}

function setCarouselPosition() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function adjustCarousel() {
  if (currentTranslate < -cardWidth * cards.length) {
    currentTranslate += cardWidth * cards.length;
    for (let i = 0; i < cards.length; i++) {
      carousel.appendChild(carousel.firstElementChild);
    }
    carousel.style.transition = 'none'; // Убираем анимацию при вставке элементов
    setCarouselPosition();
    requestAnimationFrame(() => carousel.style.transition = ''); // Возвращаем анимацию
  } else if (currentTranslate > 0) {
    currentTranslate -= cardWidth * cards.length;
    for (let i = 0; i < cards.length; i++) {
      carousel.prepend(carousel.lastElementChild);
    }
    carousel.style.transition = 'none'; // Убираем анимацию при вставке элементов
    setCarouselPosition();
    requestAnimationFrame(() => carousel.style.transition = ''); // Возвращаем анимацию
  }
}

// Обработчики событий для перетаскивания
carouselContainer.addEventListener("mousedown", startDrag);
carouselContainer.addEventListener("mouseup", endDrag);
carouselContainer.addEventListener("mousemove", drag);
carouselContainer.addEventListener("mouseleave", endDrag);
carouselContainer.addEventListener("touchstart", startDrag); // поддержка для touch устройств
carouselContainer.addEventListener("touchend", endDrag); // поддержка для touch устройств
carouselContainer.addEventListener("touchmove", drag); // поддержка для touch устройств

// Остановка автопрокрутки при наведении
carouselContainer.addEventListener("mouseenter", () => cancelAnimationFrame(animationID));
carouselContainer.addEventListener("mouseleave", () => requestAnimationFrame(continuousScroll));

function startDrag(event) {
  isDragging = true;
  startPos = (event.pageX || event.touches[0].pageX) - currentTranslate;
  cancelAnimationFrame(animationID);
  carouselContainer.style.cursor = "grabbing";
  carousel.style.transition = 'none'; // Убираем анимацию при перетаскивании
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  prevTranslate = currentTranslate;
  carouselContainer.style.cursor = "grab";
  requestAnimationFrame(continuousScroll);
  carousel.style.transition = ''; // Возвращаем анимацию
}

function drag(event) {
  if (isDragging) {
    const currentPosition = (event.pageX || event.touches[0].pageX) - startPos;
    currentTranslate = currentPosition;
    setCarouselPosition();
    adjustCarousel();
  }
}

// Инициализация карусели и запуск автопрокрутки
initializeCarousel();
requestAnimationFrame(continuousScroll);

btnPrev.addEventListener('click', () => {
    currentTranslate += cardWidth; // Сдвигаем карусель влево (предыдущая карточка)
    adjustCarousel(); // Корректируем позицию карусели
    setCarouselPosition(); // Применяем новое положение;
})

btnNext.addEventListener('click', () => {
    currentTranslate -= cardWidth; // Сдвигаем карусель вправо (следующая карточка)
    adjustCarousel(); // Корректируем позицию карусели
    setCarouselPosition(); // Применяем новое положение
});

// carousel end

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

// form validation

const form = document.querySelector('.form');

document.addEventListener('DOMContentLoaded', () => {
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

// popup

const btnSubmit = document.querySelector('.btn-submit');
const checkBox = document.getElementById('agree');
const popupWrapper = document.querySelector('.popup-wrapper');
const btnClose = popupWrapper.querySelector('.btn-close');
const btnPopup = popupWrapper.querySelector('.btn-popup');
const body = document.querySelector('body');

btnSubmit.addEventListener('click', (e) => {
    if(checkBox.checked) {
    e.preventDefault()
    popupWrapper.style.display = 'block';
    body.style.overflow = 'hidden';
    form.reset()
    }
})

function close () {
    popupWrapper.style.display = 'none';
    body.style.overflow = 'auto';
}
    
btnClose.addEventListener('click', close)
btnPopup.addEventListener('click', close)





