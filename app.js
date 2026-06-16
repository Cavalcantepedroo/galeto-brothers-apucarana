/**
 * GALETO BROTHERS JIU-JITSU - APP.JS
 * Lógica da Single Page Application (SPA)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito do Scroll no Header
    const header = document.getElementById('header');
    
    function toggleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Executa no carregamento e ao rolar
    window.addEventListener('scroll', toggleHeaderScroll);
    toggleHeaderScroll();

    // 2. Menu Responsivo (Mobile)
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu mobile ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 3. Rotação / Rolagem Suave com Correção de Altura do Header Fixo
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignora âncoras vazias
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calcula a altura do header dinamicamente para compensar
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Destaque Automático de Links Ativos (Intersection Observer)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Aciona quando a seção ocupa a parte central do viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove classe active de todos
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
