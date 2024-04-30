window.onload = function() {
    var canvas = document.getElementById("drawCanvas");
    var ctx = canvas.getContext("2d");
    var isDrawing = false;
    var startX, startY; // Początkowe współrzędne rysowania

    var brushSizeInput = document.getElementById("brushSize");
    var brushModeSelect = document.getElementById("brushMode");
    var brushColorInput = document.getElementById("brushColor");

    canvas.addEventListener('mousedown', function(event) {
        if (event.button === 0) { // Sprawdza, czy naciśnięty jest lewy przycisk myszy
            isDrawing = true;
            startX = event.clientX - canvas.offsetLeft;
            startY = event.clientY - canvas.offsetTop;
            startDrawing(event);
        }
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    document.getElementById('clearBtn').addEventListener('click', clearCanvas);
    document.getElementById('downloadBtn').addEventListener('click', downloadDrawing);

    function startDrawing(event) {
        ctx.lineWidth = brushSizeInput.value;
        ctx.lineCap = 'round';

        // Zmiana koloru na biały, jeśli tryb to "gumka"
        if (brushModeSelect.value === 'eraser') {
            ctx.strokeStyle = '#ffffff'; // Biały kolor
        } else {
            ctx.strokeStyle = brushColorInput.value; // Kolor wybrany przez użytkownika
        }

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop); // Użyj bieżącej pozycji kursora
        ctx.stroke();
    }

    function draw(event) {
        if (!isDrawing) return;

        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;

        ctx.lineWidth = brushSizeInput.value;

        // Zmiana koloru na biały, jeśli tryb to "gumka"
        if (brushModeSelect.value === 'eraser') {
            ctx.strokeStyle = '#ffffff'; // Biały kolor
        } else {
            ctx.strokeStyle = brushColorInput.value; // Kolor wybrany przez użytkownika
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadDrawing() {
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = 'drawing.png';
        link.href = image;
        link.click();
    }

    brushSizeInput.addEventListener('input', function() {
        // Aktualizuje wartość wielkości pióra podczas zmiany
        ctx.lineWidth = this.value;
    });

    brushModeSelect.addEventListener('change', function() {
        // Aktualizuje tryb rysowania
        if (this.value === 'pencil') {
            ctx.lineCap = 'round';
        } else if (this.value === 'pen') {
            ctx.lineCap = 'butt';
        }
    });

    brushColorInput.addEventListener('input', function() {
        // Aktualizuje kolor pióra podczas zmiany
        ctx.strokeStyle = this.value;
    });
};
