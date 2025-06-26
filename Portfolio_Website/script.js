// script.js — Updated for Modern Use & Page-Safe Execution

// Sticky navbar on scroll
$(document).ready(function () {
    $(window).scroll(function () {
        $('.navbar').toggleClass("sticky", this.scrollY > 20);
        $('.scroll-up-button').toggleClass("show", this.scrollY > 500);
    });

    // Slide-up scroll button
    $('.scroll-up-button').click(function () {
        $('html').animate({ scrollTop: 0 });
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
const highlightMenu = () => {
    const homeMenu = document.querySelector('#home');
    if (window.innerWidth > 1104 && window.scrollY < 600) {
        homeMenu?.classList.add('highlight');
    }
};

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

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

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

    if (!form || !status) return;

    function success() {
        form.reset();
        status.classList.add('success');
        status.innerHTML = "Thanks! Message successfully sent!";
    }

    function error() {
        status.classList.add('error');
        status.innerHTML = "Oops! There was a problem.";
    }

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        const data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

function ajax(method, url, data, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        xhr.status === 200 ? success(xhr.response, xhr.responseType)
                           : error(xhr.status, xhr.response, xhr.responseType);
    };
    xhr.send(data);
}
