document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");
    const menu = document.querySelector("nav ul");
    const menuToggle = document.querySelector(".menu-toggle");

    function setActiveLink() {
        let scrollPosition = window.scrollY + 100; 
    
        document.querySelectorAll("section").forEach(section => {
            const sectionTop = section.offsetTop - 120; 
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                let activeLink = document.querySelector(`nav ul li a[href="#${section.id}"]`);
                if (activeLink) {
                    document.querySelectorAll("nav ul li").forEach(link => link.classList.remove("active"));
                    activeLink.parentElement.classList.add("active");
                }
            }
        });
    }

    function toggleMenu() {
        menu.classList.toggle("active");
    }

    // Close menu on scroll
    window.addEventListener("scroll", () => {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
        }
        setActiveLink(); // Make sure active section updates correctly
    });

    // Smooth scrolling and close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Ensure active class updates immediately
                document.querySelectorAll("nav ul li").forEach(link => link.classList.remove("active"));
                this.parentElement.classList.add("active");

                // Close the menu on mobile
                menu.classList.remove("active");
            }
        });
    });

    menuToggle.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", setActiveLink);
    setActiveLink(); // Run on page load
});
