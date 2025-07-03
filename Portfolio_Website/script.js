// script.js — Updated for Modern Use & Page-Safe Execution

// Sticky navbar on scroll and scroll button
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", () => {
//         document.querySelector('.navbar')?.classList.toggle("sticky", window.scrollY > 20);
        document.querySelector('.scroll-up-button')?.classList.toggle("show", window.scrollY > 500);
    });

    document.querySelector('.scroll-up-button')?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Mobile Navigation Menu Toggle
const menu = document.querySelector('#mobile-menu');
const mobileMenu = document.querySelector('.navbar-menu');
const navLinks = [...document.querySelectorAll('.navbar-links')];
const navButton = document.querySelector('.button');

const toggleMenu = () => {
    menu?.classList.toggle('is-active');
    mobileMenu?.classList.toggle('active');
};

navLinks.forEach((link) => {
    link?.addEventListener('click', toggleMenu);
});

navButton?.addEventListener('click', toggleMenu);
menu?.addEventListener('click', toggleMenu);

// Highlight menu (partially disabled for simplicity)
// const highlightMenu = () => {
//     const homeMenu = document.querySelector('#home');
//     if (window.innerWidth > 1104 && window.scrollY < 600) {
//         homeMenu?.classList.add('highlight');
//     }
// };

// TypeWriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 1500) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1)
                                   : fullTxt.substring(0, this.txt.length + 1);

        this.txtElement.innerHTML = this.txt;

        let typeSpeed = this.isDeleting ? 37 : 75;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.text-type');
    if (!txtElement) return;
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
});

// Qualification Tabs Toggle
(() => {
    const qualSection = document.querySelector(".qualification-content");
    const tabsContainer = document.querySelector(".qual-tabs");

    if (!qualSection || !tabsContainer) return;

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active")?.classList.remove("active");
            event.target.classList.add("active");
            qualSection.querySelector(".tab-content.active")?.classList.remove("active");
            qualSection.querySelector(target)?.classList.add("active");
        }
    });
})();

// Email Form Submission
window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("my-form");
    const status = document.getElementById("status");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = new FormData(form);

            try {
                await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    Accept: "application/json",
                },
                });
                status.textContent = "Thanks for your message!";
                status.style.color = "green";
                form.reset();
            } catch (error) {
                status.textContent = "Oops! Something went wrong.";
                status.style.color = "red";
            }
        });
    }
});
