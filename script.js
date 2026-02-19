document.addEventListener('DOMContentLoaded', () => {

    // Load Dynamic Content
    async function loadContent() {
        try {
            // Cache buster to ensure the latest data is always fetched
            const response = await fetch(`./data/content.json?t=${new Date().getTime()}`);
            const data = await response.json();

            // Hero
            if (data.hero) {
                document.getElementById('cms-hero-subtitle').textContent = data.hero.subtitle;
                document.getElementById('cms-hero-title').innerHTML = `${data.hero.title_line1}<br> <em>${data.hero.title_line2}</em>`;
                document.getElementById('cms-hero-desc').textContent = data.hero.description;
                document.getElementById('cms-hero-btn-primary').textContent = data.hero.btn_primary_text;
                document.getElementById('cms-hero-btn-outline').textContent = data.hero.btn_outline_text;
            }

            // Services
            if (data.services) {
                document.getElementById('cms-services-title').textContent = data.services.title;
                document.getElementById('cms-services-subtitle').textContent = data.services.subtitle;

                const servicesGrid = document.getElementById('cms-services-grid');
                if (servicesGrid) {
                    servicesGrid.innerHTML = data.services.cards.map((card, index) => `
                        <article class="service-card ${index === 1 ? 'featured' : ''}">
                            <div class="service-icon">
                                <i class="ph ${card.title.includes('Vida') ? 'ph-shield-check' : card.title.includes('Médicos') ? 'ph-heartbeat' : 'ph-piggy-bank'}"></i>
                            </div>
                            <h3>${card.title}</h3>
                            <p>${card.description}</p>
                            <a href="${card.title.includes('Médicos') ? '#gastos-medicos' : '#contacto'}" class="link-arrow">${card.link_text} <i class="ph ph-arrow-right"></i></a>
                        </article>
                    `).join('');
                }
            }

            // Comparison
            if (data.comparison) {
                document.getElementById('cms-comparison-title').textContent = data.comparison.title;
                document.getElementById('cms-comparison-lead').textContent = data.comparison.lead;
                document.getElementById('cms-comparison-explanation').innerHTML = data.comparison.explanation.replace('una sola noche', '<strong>una sola noche</strong>');

                // Update counter target
                window.counterTargetValue = parseInt(data.comparison.counter_amount.replace(/,/g, ''));
                startCounter(); // Re-trigger if observer already fired
            }

            // FAQ
            if (data.faq) {
                document.getElementById('cms-faq-title').textContent = data.faq.title;
                const faqGrid = document.getElementById('cms-faq-grid');
                if (faqGrid) {
                    faqGrid.innerHTML = data.faq.items.map(item => `
                        <div class="faq-item">
                            <button class="faq-question">
                                ${item.question}
                                <i class="ph ph-caret-down"></i>
                            </button>
                            <div class="faq-answer">
                                <p>${item.answer}</p>
                            </div>
                        </div>
                    `).join('');

                    // Re-attach listeners for new FAQ items
                    setupFAQ();
                }
            }

            // Footer
            if (data.footer) {
                document.getElementById('cms-footer-contact-title').textContent = data.footer.contact_title;
                document.getElementById('cms-footer-contact-desc').textContent = data.footer.contact_desc;
                document.getElementById('cms-footer-copyright').textContent = data.footer.copyright;
            }

            // Calendly Initialization
            if (data.hero && data.hero.calendly_url && window.Calendly) {
                // Clear existing widget if any
                const widgetContainer = document.getElementById('calendly-widget');
                if (widgetContainer) {
                    widgetContainer.innerHTML = '';
                    Calendly.initInlineWidget({
                        url: `${data.hero.calendly_url}?locale=es`,
                        parentElement: widgetContainer,
                        prefill: {},
                        utm: {},
                        text_color: '#0B3D33',
                        primary_color: '#C5A065',
                        locale: 'es',
                        embed_locale: 'es'
                    });
                }
            }

        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    // Call loadContent
    loadContent();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
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
    window.counterTargetValue = 220295;
    function startCounter() {
        const counterElement = document.getElementById('counter');
        if (counterElement && !counterElement.dataset.animated) {
            const targetValue = window.counterTargetValue;
            const duration = 2000;
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            const easeOutQuad = t => t * (2 - t);

            let frame = 0;
            const animateCount = () => {
                frame++;
                const progress = easeOutQuad(frame / totalFrames);
                const currentCount = Math.round(targetValue * progress);
                counterElement.textContent = currentCount.toLocaleString();

                if (frame < totalFrames) {
                    requestAnimationFrame(animateCount);
                } else {
                    counterElement.textContent = targetValue.toLocaleString();
                    counterElement.dataset.animated = "true";
                }
            };
            requestAnimationFrame(animateCount);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter();
            }
        });
    }, { threshold: 0.5 });

    const observerTarget = document.querySelector('.comparison-text');
    if (observerTarget) observer.observe(observerTarget);

    // FAQ Accordion Setup
    function setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
});
