document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.classList.add("js");
    const hamburger = document.querySelector(".hamburger-menu");
    const dropdown = document.querySelector(".dropdown");
    const backToTop = document.getElementById("back-to-top");
    const sectionCards = document.querySelectorAll(".section-card");
    const navLinks = document.querySelectorAll(".primary-nav a, .dropdown li a");

    /* Mobile hamburger dropdown */
    if (hamburger && dropdown) {
        hamburger.addEventListener("click", function () {
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });

        // Close the dropdown if clicked outside
        window.addEventListener("click", function (e) {
            if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });
    }

    /* Smooth scrolling for all navigation links */
    navLinks.forEach((item) => {
        item.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            e.preventDefault();
            const sectionId = href.substring(1);
            const section = document.getElementById(sectionId);
            if (!section) return;

            const top = section.getBoundingClientRect().top + window.pageYOffset - 16;

            window.scrollTo({
                top,
                behavior: "smooth",
            });

            if (dropdown) {
                dropdown.style.display = "none";
            }
        });
    });

    /* Section reveal on scroll (classic fade-in) */
    if ("IntersectionObserver" in window && sectionCards.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
            }
        );

        sectionCards.forEach((card) => observer.observe(card));
    } else {
        // Fallback: show all if IntersectionObserver is unavailable
        sectionCards.forEach((card) => card.classList.add("in-view"));
    }

    /* Scrollspy: highlight active section in navigation */
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    function updateActiveNav() {
        const scrollPosition = window.pageYOffset;
        let currentId = null;

        sections.forEach((section) => {
            const offsetTop = section.offsetTop - 80;
            if (scrollPosition >= offsetTop) {
                currentId = section.id;
            }
        });

        if (!currentId) return;

        navLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            if (href === `#${currentId}`) {
                link.classList.add("is-active");
            } else {
                link.classList.remove("is-active");
            }
        });
    }

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav);

    /* Back-to-top button behaviour */
    if (backToTop) {
        function toggleBackToTop() {
            if (window.pageYOffset > 220) {
                backToTop.classList.add("is-visible");
            } else {
                backToTop.classList.remove("is-visible");
            }
        }

        toggleBackToTop();

        window.addEventListener("scroll", toggleBackToTop);

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
});
