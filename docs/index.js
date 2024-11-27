/** @format */

let amount = 0;
const canvas = document.getElementById("drawingCanvas");
const width = canvas.width;
const height = canvas.height;

// If we have a stored image, set it as the cursor (if we navigated back from whatever.html)
let dict = {};

try {
	let data = document.URL.split("?")[1];

	data = data.split("&");
	for (let pair of data) {
		split_pair = pair.split("=");
		key = split_pair[0];
		value = split_pair[1];
		dict[key] = value;
	}

	let cursor_image = sessionStorage.getItem("image");

	if (dict["norefresh"] == "true" && cursor_image) {
		amount = sessionStorage.getItem("amount");
		document.body.style.cursor = "url(" + cursor_image + ") 12 12, auto";
	}

	console.log(dict);
	console.info(cursor_image);
} catch (e) {
	console.warn(e);
	console.warn("No data in URL");
}

window.onload = function () {
	var ctx = canvas.getContext("2d");

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
		var dataURL = canvas.toDataURL("image/png");

		sessionStorage.setItem("image", dataURL);
		sessionStorage.setItem("amount", amount);

		// Set the data URL as the cursor for the entire body
		document.body.style.cursor = `url(${dataURL}) ${width / 2} ${
			height / 2
		}, auto`;

		// Increase the amount for more chaos
		amount++;
	}

	// Function to get a random color
	function getRandomColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	// Initial draw
	if (dict["norefresh"] != "true") {
		drawChaoticShape();
	}

	// Add click event listener to draw a new shape on click

	document.body.addEventListener("click", function (event) {
		// Prevent drawing a new cursor if an <a> element is clicked
		if (event.target.tagName.toLowerCase() === "a") {
			return;
		}
		drawChaoticShape();
	});
};
