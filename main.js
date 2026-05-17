/* =========================================
   Scroll Animations using Intersection Observer
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // Select all elements on the page that have the '.scroll-element' class
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    // Callback function that runs whenever an observed element enters the viewport
    const elementInView = (entries, observer) => {
        entries.forEach((entry) => {
            // Check if the element is currently intersecting with the viewport
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS transition
                entry.target.classList.add('is-visible');
                
                // Stop observing the element so the animation only happens once
                observer.unobserve(entry.target);
            }
        });
    };

    // Configuration for the observer
    const observerOptions = {
        root: null, // use the viewport
        rootMargin: '0px 0px -50px 0px', // trigger slightly before the element hits the very bottom of the screen
        threshold: 0.15 // trigger when 15% of the element is visible
    };

    // Initialize the Intersection Observer
    const scrollObserver = new IntersectionObserver(elementInView, observerOptions);

    // Tell the observer to watch every '.scroll-element' on the page
    scrollElements.forEach((el) => {
        scrollObserver.observe(el);
    });
});