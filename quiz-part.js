var selectedBottle = 0;  // Инициализируем с 0 вместо null
var selectedBottleSrc = "1.png";
var selectedBottlePrice = document.getElementsByClassName('bottle-option')[0].dataset.price;
var selectedSkinType = null;
var selectedAroma = null; 
var selectedBottleML = document.getElementsByClassName('bottle-option')[0].dataset.ml;

function selectBottle(index) {
    selectedBottle = index;
    var selectedOption = document.getElementsByClassName('bottle-option')[index];
    selectedBottleSrc = selectedOption.querySelector('img').src;
    selectedBottlePrice = selectedOption.dataset.price;
    var bottles = document.getElementsByClassName('bottle-option');
    selectedBottleML = selectedOption.dataset.ml;
    for (var i = 0; i < bottles.length; i++) {
        if (i === index) {
            bottles[i].classList.add('active');
        } else {
            bottles[i].classList.remove('active');
        }
    }
    
}

function slideBottles(direction) {
    var newSelection = selectedBottle + direction;
    var bottles = document.getElementsByClassName('bottle-option');
    if (newSelection >= 0 && newSelection < bottles.length) {
        selectBottle(newSelection);
    }
}

function validateAndProceed(currentQuestion, nextQuestion) {
    // Проверяем, является ли текущий вопрос допустимым
    if (currentQuestion === 1) {
        // Для вопроса 1 проверяем, выбрана ли бутылка
        if (selectedBottle === null) {
            document.getElementById('error').innerText = 'Пожалуйста, выберите бутылку перед продолжением.';
            return;
        }
    }
    if (currentQuestion === 2) {
        // Для вопроса 2 проверяем, не является ли поле ввода пустым
        var perfumeName = document.getElementById('perfumeName').value;
        if (!perfumeName) {
            document.getElementById('error').innerText = 'Пожалуйста, введите название своего парфюма перед продолжением.';
            return;
        }
    }
    if (currentQuestion === 3) {
        // Для вопроса 3 проверяем, выбрана ли радио-кнопка
        var radios = document.getElementsByName('skin');
        var isChecked = false;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                isChecked = true;
                selectedSkinType = radios[i].value;
                break;
            }
        }

        if (!isChecked) {
            document.getElementById('error').innerText = 'Пожалуйста, выберите один из вариантов перед продолжением.';
            return;
        }
    }

    // Очищаем сообщение об ошибке
    document.getElementById('error').innerText = '';

    // Скрываем текущий вопрос
    document.getElementById('question' + currentQuestion).style.display = 'none';

    // Показываем следующий вопрос или результат
    if (nextQuestion === 'result') {
        showResult();
    } else if (nextQuestion === 4) {
        showQuestion4();
    } else {
        document.getElementById('question' + nextQuestion).style.display = 'block';
    }
}

function showQuestion4() {
    // Определяем, какие варианты показывать на основе выбранного типа кожи
    var options;
    if (selectedSkinType === 'oily') {
        options = [
            'Цитрусовые ароматы, такие как лимон, грейпфрут, лайм и бергамот',
            'Зеленые ароматы, такие как мята, базилик, эстрагон, можжевельник и петитгрейн',
            'Фруктовые ароматы, такие как яблоко, груша и персик',
            'Ароматы лаванды и розмарина',
            'Цветочные ароматы, такие как жасмин, роза и иланг-иланг'
        ];
    } else if (selectedSkinType === 'dry') {
        options = [
            'Ароматы ванили, кокоса и меда',
            'Ароматы жасмина, лаванды и розы',
            'Ароматы молока, овсянки и мандарина',
            'Ароматы сандала, пачули и ветивера',
            'Ароматы герани и розмарина',
        ];
    } else if (selectedSkinType === 'combination') {
        options = [
            'Ароматы бергамота, лимона и грейпфрута',
            'Ароматы мяты, базилика, можжевельника и петитгрейна',
            'Ароматы лаванды, розмарина и герани',
            'Ароматы розы, жасмина и иланг-иланг',
            'Ароматы кедра, сандала и пачули',
        ];
    }

    // Создаем кнопки для каждого варианта
    var optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    options.forEach(function(option, index) {
        var btn = document.createElement('button');
        btn.className = 'aroma-option'; // Добавляем класс кнопке
        btn.textContent = option;
        btn.onclick = function() {
            selectedAroma = option; 
            // Удаляем класс selected у всех вариантов
            var options = document.getElementsByClassName('aroma-option');
            for (var i = 0; i < options.length; i++) {
                options[i].classList.remove('selected');
            }
            // Добавляем класс selected для выбранного варианта
            this.classList.add('selected');
        };
        optionsContainer.appendChild(btn);
    });

    // Показываем вопрос
    document.getElementById('question4').style.display = 'block';
}

function showResult() {
    // Скрываем все вопросы
    var questions = document.getElementsByClassName('question');
    for (var i = 0; i < questions.length; i++) {
        questions[i].style.display = 'none';
    }

    // Показываем результат
    document.getElementById('result').style.display = 'block';

    // Отображаем изображение парфюма
    var resultImg = document.getElementById('resultImg');
    console.log(selectedBottleSrc); // Отладка
    resultImg.src = selectedBottleSrc;

    // Отображаем название парфюма на бутылке
    var perfumeNameOnBottle = document.getElementById('perfumeNameOnBottle');
    var perfumeName = document.getElementById('perfumeName').value;
    perfumeNameOnBottle.textContent = perfumeName;

    // Отображаем описание парфюма
    var description = document.getElementById('perfumeDescription');
    description.textContent = 'Вы выбрали бутылку с ароматом ' + selectedAroma + '.';

    // Отображаем цену и объем парфюма
    var price = document.getElementById('perfumePrice');
    var ml = document.getElementById('perfumeML');
    price.textContent = 'Цена: ' + selectedBottlePrice + '₸';
    ml.textContent = 'Объем: ' + selectedBottleML + ' мл';
}


