const canvas = document.getElementById('drawing-field');
const context = canvas.getContext('2d');
let isDrawing = false;

context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = 'black';
context.lineWidth =25;
context.lineCap = 'round';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);


function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) 
        return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}