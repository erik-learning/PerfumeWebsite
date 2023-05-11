var selectedBottle = 0;  // Initialize with 0 instead of null
var selectedBottleSrc = "";  // Initialize with "" instead of null
var selectedBottleSrc = "1.png";

function selectBottle(index) {
    selectedBottle = index;
    // Update the selected bottle source
    selectedBottleSrc = document.getElementsByClassName('bottle-option')[index].querySelector('img').src;
    // Highlight the selected bottle
    var bottles = document.getElementsByClassName('bottle-option');
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
    // Check if the current question is valid
    if (currentQuestion === 1) {
        // For question 1, check if a bottle is selected
        if (selectedBottle === null) {
            document.getElementById('error').innerText = 'Please select a bottle before proceeding.';
            return;
        }
    }
    if (currentQuestion === 2) {
        // For question 2, check if the input field is not empty
        var perfumeName = document.getElementById('perfumeName').value;
        if (!perfumeName) {
            document.getElementById('error').innerText = 'Please enter a name for your perfume before proceeding.';
            return;
        }
    }
    if (currentQuestion === 3) {
        // For question 3, check if a radio button is selected
        var radios = document.getElementsByName('skin');
        var isChecked = false;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                isChecked = true;
                break;
            }
        }

        if (!isChecked) {
            document.getElementById('error').innerText = 'Please select an option before proceeding.';
            return;
        }
    }

    // Clear the error message
    document.getElementById('error').innerText = '';

    // Hide the current question
    document.getElementById('question' + currentQuestion).style.display = 'none';

    // Show the next question or the result
    if (nextQuestion === 'result') {
        showResult();
    } else {
        document.getElementById('question' + nextQuestion).style.display = 'block';
    }
}



function showResult() {
    // Display the perfume name
    var perfumeName = document.getElementById('perfumeName').value;

    // Set the result image source to the selected bottle image
    document.querySelector('#result img').src = selectedBottleSrc;

    // Set the text on the curved path to the perfume name
    document.getElementById('curvedText').textContent = perfumeName;

    // Show the result
    document.getElementById('result').style.display = 'block';
}

