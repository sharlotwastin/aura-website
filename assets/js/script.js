document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        // Optional: prevent body scrolling when menu is open
        body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Copy to Clipboard Logic
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.dataset.clipboardText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const icon = button.querySelector('i');
                const textSpan = button.querySelector('span');
                const originalText = textSpan.textContent;
                
                icon.classList.remove('fa-copy');
                icon.classList.add('fa-check');
                textSpan.textContent = 'Copied!';
                button.classList.add('copied');

                setTimeout(() => {
                    textSpan.textContent = originalText;
                    icon.classList.remove('fa-check');
                    icon.classList.add('fa-copy');
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Also close mobile nav if it's open
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    body.style.overflow = 'auto';
                }

                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for sticky header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            // Close other open answers for a cleaner experience
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = '0';
                    const otherIcon = otherQuestion.querySelector('i');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });

            // Toggle current answer
            question.classList.toggle('active');

            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                answer.style.maxHeight = '0';
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });

    // Simple animation for elements on scroll
    const animatedElements = document.querySelectorAll('.feature-item, .testimonial-card, .faq-item, .leagues-logos img, .payment-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Hide elements initially
        observer.observe(el);
    });
});