/* =========================================
   Scroll Animations using Intersection Observer
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    const scrollElements = document.querySelectorAll('.scroll-element');
    
    const elementInView = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        root: null, 
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver(elementInView, observerOptions);

    scrollElements.forEach((el) => {
        scrollObserver.observe(el);
    });
});