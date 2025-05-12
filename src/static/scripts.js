const backendURL = 'http://127.0.0.1:8000';

const resultLabel = document.getElementById('result');
const fullPredict = document.getElementById('full-predict');


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
        console.log(response.digit);
    })
    .catch(error => console.log(error));
}

function clearCanvas() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    resultLabel.textContent = 'Нарисуйте цифру';
    fullPredict.innerHTML = '';
}