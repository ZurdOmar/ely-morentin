document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Icon toggle logic (optional, if using specific icons for open/close)
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    });

    // Cost Counter Animation
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        const targetValue = 220295;
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutQuad = t => t * (2 - t);

        let frame = 0;
        
        // Intersection Observer to start animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animateCount = () => {
                        frame++;
                        const progress = easeOutQuad(frame / totalFrames);
                        const currentCount = Math.round(targetValue * progress);

                        if (counterElement) {
                            counterElement.textContent = currentCount.toLocaleString();
                        }

                        if (frame < totalFrames) {
                            requestAnimationFrame(animateCount);
                        } else {
                            counterElement.textContent = targetValue.toLocaleString();
                        }
                    };
                    requestAnimationFrame(animateCount);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(document.querySelector('.comparison-text'));
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all others
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
