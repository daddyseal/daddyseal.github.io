document.addEventListener('DOMContentLoaded', () => {
    const pyramidLayers = document.querySelectorAll('.pyramid-layer');
    const modal = document.getElementById('pyramidModal');
    const closeButton = document.querySelector('.close-button');
    
    const modalTitle = document.getElementById('modalTitle');
    const modalDetails = document.getElementById('modalDetails');
    const modalLevel = document.getElementById('modalLevel');

    // --- 1. Event Listeners for Pyramid Layers ---
    pyramidLayers.forEach(layer => {
        layer.addEventListener('click', function() {
            // Get data from the clicked layer's attributes
            const title = this.getAttribute('data-title');
            const details = this.getAttribute('data-details');
            const level = this.getAttribute('data-level');

            // Populate the modal content
            modalTitle.textContent = title;
            modalDetails.textContent = details;
            modalLevel.textContent = level;

            // KEY CHANGE: Display the modal and add the 'open' class to slide it out
            modal.style.display = 'block'; 
            // Small delay is sometimes needed to ensure the 'width' transition fires correctly
            setTimeout(() => {
                 modal.classList.add('open'); 
            }, 10);
           
        });
    });
    
    // Function to close the panel
    const closePanel = () => {
        modal.classList.remove('open');
        // KEY CHANGE: Hide the modal entirely AFTER the transition finishes (0.3s)
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); 
    };

    // --- 2. Close Panel Listeners ---

    // Close when the 'x' button is clicked
    closeButton.addEventListener('click', closePanel);

    // Close when the user clicks anywhere outside the modal-content (on the transparent overlay)
    window.addEventListener('click', (event) => {
        // Ensure the click target is the modal itself, but NOT the modal-content
        if (event.target === modal) {
            closePanel();
        }
    });

    // Close when the ESC key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closePanel();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // ... all your existing event listeners and functions ...

    // --- Date Injector for Navigation Bar ---
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        // Format the date as: Month Day, Year (e.g., Oct 03, 2025)
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
});