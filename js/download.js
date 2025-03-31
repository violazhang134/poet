document.getElementById('download-btn').addEventListener('click', function() {
    const poemCard = document.getElementById('poem-card');
    
    // Add a class to indicate download preparation
    poemCard.classList.add('download-preparing');
    
    // Create a clone of the card to avoid affecting the visual display
    const clonedCard = poemCard.cloneNode(true);
    clonedCard.style.position = 'absolute';
    clonedCard.style.left = '-9999px';
    document.body.appendChild(clonedCard);
    
    // Use html2canvas to capture the card as an image
    html2canvas(poemCard, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null,
        logging: false
    }).then(function(canvas) {
        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL('image/png');
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'poetic-moment.png';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Remove the cloned element
        document.body.removeChild(clonedCard);
        
        // Remove the download preparing class
        poemCard.classList.remove('download-preparing');
    }).catch(function(error) {
        console.error('Error generating image:', error);
        poemCard.classList.remove('download-preparing');
    });
});