let amount = 0;
const canvas = document.getElementById('drawingCanvas');
const width = canvas.width;
const height = canvas.height;

window.onload = function() {
    var ctx = canvas.getContext('2d');

    // Function to draw a chaotic shape
    function drawChaoticShape() {
        // Clear the canvas
        ctx.clearRect(0, 0, width, height);

        // Draw a chaotic shape
        ctx.fillStyle = getRandomColor();
        ctx.beginPath();
        for (let i = 0; i < 2 + amount; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Convert the canvas drawing to a data URL
        var dataURL = canvas.toDataURL('image/png');
        sessionStorage.setItem("image", dataURL);
        sessionStorage.setItem("amount", amount);

        // Set the data URL as the cursor for the entire body
        document.body.style.cursor = `url(${dataURL}) ${width / 2} ${height / 2}, auto`;

        // Increase the amount for more chaos
        amount++;
    }

    // Function to get a random color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Initial draw (as long as norefresh is not true)
    if (dict["norefresh"] !== "true") drawChaoticShape();

    // Add click event listener to draw a new shape on click
    document.body.addEventListener('click', function(event) {
        // Prevent drawing a new cursor if an <a> element is clicked
        if (event.target.tagName.toLowerCase() === 'a') {
            return;
        }

        drawChaoticShape();
    });
};