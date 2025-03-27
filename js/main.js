document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const surpriseButton = document.getElementById('surprise-button');
    const modal = document.getElementById('surprise-modal');
    const closeButton = document.querySelector('.close-button');
    const birthdayMessage = document.getElementById('birthday-message');
    const funFactElement = document.getElementById('fun-fact');
    const pizzaIcon = document.getElementById('pizza-icon');
    const backgroundMusic = document.getElementById('background-music');
    
    // Fun facts about Jake
    const funFacts = [
        "Jake can debug a stack trace AND sand down a table leg with finesse.",
        "Jake's woodworking projects are as elegant as his code.",
        "Legend says Jake can catch fish with just a witty comment.",
        "Jake's Pizza Fridays have become the stuff of legend.",
        "Jake once brewed a beer so good, it fixed a production bug."
    ];
    
    // Birthday message
    const message = "Happy Birthday to a person who can debug a stack trace *and* sand down a table leg with finesse. You make tech more human and Fridays more delicious. Cheers to another trip around the sun, full of side projects and slow pours. 🎉🍻";
    
    // Launch confetti when page loads
    launchConfetti();
    
    // Play background music (with user interaction required by browsers)
    surpriseButton.addEventListener('click', function() {
        backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        openModal();
    });
    
    // Modal functionality
    function openModal() {
        modal.style.display = 'block';
        birthdayMessage.textContent = message;
        showRandomFunFact();
        
        // More subtle confetti on mobile
        const isMobile = window.innerWidth < 768;
        launchConfetti(isMobile ? 50 : 100);
    }
    
    // Close modal when X is clicked
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Show a random fun fact and rotate every few seconds
    function showRandomFunFact() {
        let currentIndex = 0;
        
        // Show initial fun fact
        funFactElement.textContent = funFacts[currentIndex];
        
        // Rotate fun facts every 5 seconds
        setInterval(function() {
            currentIndex = (currentIndex + 1) % funFacts.length;
            funFactElement.textContent = funFacts[currentIndex];
        }, 5000);
    }
    
    // Pizza icon Easter egg
    pizzaIcon.addEventListener('click', function() {
        alert("It's Pizza Friday, every day for you, Jake!");
        launchConfetti();
    });
    
    // Confetti function - adjusted for mobile
    function launchConfetti(particleCount = 100) {
        const isMobile = window.innerWidth < 768;
        
        confetti({
            particleCount: isMobile ? Math.min(particleCount, 50) : particleCount,
            spread: isMobile ? 50 : 70,
            origin: { y: 0.6 }
        });
    }
    
    // Handle orientation changes for better mobile experience
    window.addEventListener('orientationchange', function() {
        // Adjust layout if needed after orientation change
        setTimeout(function() {
            if (modal.style.display === 'block') {
                // Re-center modal content
                const modalContent = document.querySelector('.modal-content');
                modalContent.style.marginTop = '10%';
            }
        }, 300);
    });
});
