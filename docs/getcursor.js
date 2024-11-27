let cursor_image = sessionStorage.getItem("image");


// Set the data URL as the cursor for the entire body
document.body.style.cursor = 'url(' + cursor_image + ') 12 12, auto';