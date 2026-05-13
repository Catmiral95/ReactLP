document.addEventListener('DOMContentLoaded', () => {
    
    // On Scroll Functionality
    window.addEventListener('scroll', () => {
        const windowTop = window.scrollY || document.documentElement.scrollTop;
        const nav = document.querySelector('nav');
        const ul = document.querySelector('ul');
        
        if (windowTop > 100) {
            nav.classList.add('navShadow');
            ul.style.top = '100px';
        } else {
            nav.classList.remove('navShadow');
            ul.style.top = '160px';
        }
    });
    
    // Click Logo To Scroll To Top
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth Scrolling Using Navigation Menu
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Toggle Menu
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const ul = document.querySelector('ul');
            menuToggle.classList.toggle('closeMenu');
            ul.classList.toggle('showMenu');
            
            // Add click event to list items
            document.querySelectorAll('li').forEach(li => {
                li.addEventListener('click', () => {
                    ul.classList.remove('showMenu');
                    menuToggle.classList.remove('closeMenu');
                });
            });
        });
    }
});