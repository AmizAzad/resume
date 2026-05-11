document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const backToTop = document.getElementById("back-to-top");
    const navLinks = document.querySelectorAll(".primary-nav a, .mobile-nav a");
    const sections = Array.from(document.querySelectorAll("main section[id]"));

    /* --- Mobile backdrop element --- */
    let backdrop = document.querySelector(".mobile-backdrop");
    if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "mobile-backdrop";
        document.body.appendChild(backdrop);
    }

    /* --- Mobile menu toggle --- */
    function openMobileMenu() {
        hamburger.setAttribute("aria-expanded", "true");
        mobileNav.classList.add("is-open");
        backdrop.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        hamburger.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
        backdrop.classList.remove("is-open");
        document.body.style.overflow = "";
    }

    if (hamburger && mobileNav) {
        hamburger.addEventListener("click", function () {
            const isOpen = hamburger.getAttribute("aria-expanded") === "true";
            isOpen ? closeMobileMenu() : openMobileMenu();
        });

        backdrop.addEventListener("click", closeMobileMenu);

        // Close on Escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeMobileMenu();
        });
    }

    /* --- Smooth scrolling for all navigation links --- */
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            e.preventDefault();
            const section = document.getElementById(href.substring(1));
            if (!section) return;

            const top = section.getBoundingClientRect().top + window.pageYOffset - 24;
            window.scrollTo({ top: top, behavior: "smooth" });

            closeMobileMenu();
        });
    });

    /* --- Scrollspy: highlight active section --- */
    function updateActiveNav() {
        const scrollPosition = window.pageYOffset;
        let currentId = null;

        sections.forEach(function (section) {
            if (scrollPosition >= section.offsetTop - 100) {
                currentId = section.id;
            }
        });

        if (!currentId) return;

        navLinks.forEach(function (link) {
            const href = link.getAttribute("href") || "";
            if (href === "#" + currentId) {
                link.classList.add("is-active");
            } else {
                link.classList.remove("is-active");
            }
        });
    }

    updateActiveNav();
    window.addEventListener("scroll", updateActiveNav, { passive: true });

    /* --- Back-to-top button --- */
    if (backToTop) {
        function toggleBackToTop() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add("is-visible");
            } else {
                backToTop.classList.remove("is-visible");
            }
        }

        toggleBackToTop();
        window.addEventListener("scroll", toggleBackToTop, { passive: true });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* --- Reveal-on-scroll animation --- */
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        document.querySelectorAll(
            ".experience-entry, .education-entry, .project-entry, .skill-category"
        ).forEach(function (el) {
            el.style.opacity = "0";
            el.style.transform = "translateY(16px)";
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            observer.observe(el);
        });
    }
});
