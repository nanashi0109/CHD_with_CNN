const backendURL = 'http://127.0.0.1:8000';

const resultLabel = document.getElementById('result');
const fullPredictContainer = document.getElementById('full-predict');


document.getElementById('predict-button').onclick = updatePredict;
document.getElementById('clear-button').onclick = clearCanvas;



function updatePredict(){
    const imageData = canvas.toDataURL('image/png')

    fetch(backendURL + '/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({image: imageData})
    })
    .then(response => response.json())
    .then(response => {
        resultLabel.textContent = response.digit;
        updateFullPredict(response.full_predict);
        console.log(response.digit);
        console.log(response.full_predict);
    })
    .catch(error => console.log(error));
}

function clearCanvas() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    resultLabel.textContent = 'Нарисуйте цифру';
    fullPredictContainer.innerHTML = '';
}

function updateFullPredict(probs) {
    fullPredictContainer.innerHTML = '';
    
    probs.forEach((prob, digit) => {
        const predictContainer = document.createElement('div');
        predictContainer.className = 'full-predoct-container';

        const digitLabel = document.createElement('div');
        digitLabel.className = 'digit-label';
        digitLabel.textContent = `${digit}:`;

        const predictBarOut = document.createElement('div');
        predictBarOut.className = 'predict-bar-out';

        const predictBarIn = document.createElement('div');
        predictBarIn.className = 'predict-bar-in';
        predictBarIn.style.width = `${prob * 100}%`;

        const predictPercent = document.createElement('div');
        predictPercent.className = 'predict-percent';
        predictPercent.textContent = `${(prob * 100).toFixed(1)}%`;

        predictBarOut.appendChild(predictBarIn);
        predictBarOut.appendChild(predictPercent);

        predictContainer.appendChild(digitLabel);
        predictContainer.appendChild(predictBarOut);

        fullPredictContainer.appendChild(predictContainer);
    });
}