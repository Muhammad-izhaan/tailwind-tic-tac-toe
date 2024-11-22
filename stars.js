function createStar() {
    const star = document.createElement('div');
    star.className = `star ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;
    
    // Random horizontal position
    star.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration between 3 and 7 seconds
    const duration = 3 + Math.random() * 4;
    star.style.animationDuration = `${duration}s`;
    
    // Random delay
    star.style.animationDelay = `${Math.random() * 3}s`;
    
    // Random Z translation for 3D effect
    const zTranslate = Math.random() * 200;
    star.style.transform = `translateZ(${zTranslate}px)`;
    
    return star;
}

function initStars() {
    const container = document.querySelector('.stars-container');
    const numStars = 200; // Adjust number of stars

    // Initial stars
    for (let i = 0; i < numStars; i++) {
        const star = createStar();
        container.appendChild(star);
    }

    // Continuously add new stars and remove old ones
    setInterval(() => {
        const stars = container.getElementsByClassName('star');
        if (stars.length < numStars) {
            const star = createStar();
            container.appendChild(star);
        }
        
        // Remove stars that have completed their animation
        Array.from(stars).forEach(star => {
            const animationState = getComputedStyle(star).animationName;
            if (animationState === 'none') {
                star.remove();
            }
        });
    }, 100);
}

// Initialize stars when the page loads
window.addEventListener('load', initStars);
