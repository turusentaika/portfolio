

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. OTSIKON ANIMAATIO (Anime.js) ---
    const textWrapper = document.querySelector('.ml11 .letters');
    if (textWrapper) {
        // Pilkotaan teksti: huom! \S tarkoittaa kaikkia merkkejä paitsi välilyöntejä
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: false})
          .add({
            targets: '.ml11 .letter',
            translateX: [-50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1200,
            delay: (el, i) => 30 * i
          });
    }

    // --- 2. PEHMEÄ SKROLLAUS ---
    const scrollLinks = document.querySelectorAll('.nav-link, .scroll-down-container');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- 3. INTERSECTION OBSERVER (Fade-in & Navigaatio) ---
    const sections = document.querySelectorAll('.full-page, .fade-in-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Fade-in logiikka
            if (entry.target.classList.contains('fade-in-section')) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            }

            // Navigaatio logiikka
            if (entry.isIntersecting && entry.target.classList.contains('full-page')) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));



    // --- 4. KURSORIA SEURAAVA PALLO ---
    const follower = document.querySelector('.cursor-follower');

    // Tarkistetaan, onko laitteessa hiiri (ei ajeta mobiililla)
    if (matchMedia('(pointer: fine)').matches) {
        
        // Päivitetään pallon sijainti hiiren mukaan
        window.addEventListener('mousemove', (e) => {
            // Käytetään requestAnimationFramea suorituskyvyn parantamiseksi
            requestAnimationFrame(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            });
        });

        // Lisätään suurenne-efekti, kun hiiri on linkkien päällä
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .scroll-down-container, .footer-link');
        
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                follower.classList.add('cursor-hover');
            });
            target.addEventListener('mouseleave', () => {
                follower.classList.remove('cursor-hover');
            });
        });

    } else {
        // Jos on kosketusnäyttö, piilotetaan pallo kokonaan
        follower.style.display = 'none';
    }
});

