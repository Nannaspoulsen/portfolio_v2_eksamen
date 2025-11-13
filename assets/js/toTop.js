// Venter på at hele HTML'en er indlæst
document.addEventListener('DOMContentLoaded', function() {

    // Finder scroll-knappen
    const button = document.querySelector('.to-top');
    
    // Kører kun hvis knappen findes
    if (button) {

        // Når man klikker på knappen
        button.onclick = function() {

            // Smooth scroll til toppen
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Fallback efter 300 ms, hvis smooth scroll ikke virker
            setTimeout(function() {
                window.scrollTo(0, 0);               
                document.body.scrollTop = 0;         
                document.documentElement.scrollTop = 0; 
            }, 300);

            // Forhindrer evt. standard-handling
            return false;
        };
    }
});
