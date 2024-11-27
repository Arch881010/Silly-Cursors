window.onload = function() {
    const canvas = document.getElementById('drawingCanvas');
    const exportButton = document.getElementById('exportButton');

    let cursor_image = sessionStorage.getItem("image");

    // Function to export the cursor image
    function exportCursor() {
        const link = document.createElement('a');
        link.href = cursor_image;
        link.download = 'cursor.png';
        link.click();
    }

    // Add click event listener to the export button
    exportButton.addEventListener('click', exportCursor);


    // Set the data URL as the cursor for the entire body
    document.body.style.cursor = 'url(' + cursor_image + ') 12 12, auto';

};