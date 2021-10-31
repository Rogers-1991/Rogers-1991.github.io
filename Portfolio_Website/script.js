// Sticky navbar with scrolling function
$(document).ready(function () {
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        if (this.scrollY > 500) {
            $('.scroll-up-button').addClass("show");
        } else {
            $('.scroll-up-button').removeClass("show");
        }
    })  
});




// SLIDE-UP SCRIPT
$('.scroll-up-button').click(function () {
    $('html').animate({
        scrollTop: 0
    });
});




// MOBILE MENU ICON
const menu = document.querySelector('#mobile-menu');
const mobileMenu = document.querySelector('.navbar-menu');
const links = [...document.querySelectorAll('.navbar-links')];
const navLogo = document.querySelector('#navbar-logo');

const toggleMenu = () => {
    menu.classList.toggle('is-active');
    mobileMenu.classList.toggle('active');
}

links.forEach((link) => {
    link.addEventListener('click', toggleMenu);
});

menu.addEventListener('click', toggleMenu);

const highlightMenu = () => {
    const elem = document.querySelector('.highlight')
    const homeMenu = document.querySelector('#home')
    const about = document.querySelector('#about')
    const service = document.querySelector('#project')
    const skills = document.querySelector('#skills')
    const qual = document.querySelector('#qualification')
    const contact = document.querySelector('#contact')

    let scrollPos = window.scrollY

    // adds 'highlight' class to menu items
    if (window.innerWidth > 1104 && scrollPos < 600) {
        homeMenu.classList.add('highlight')
    }
}




// TYPE-WRITING EFFECT

// ES6 TypeWriter Class
class TypeWriter {
    constructor(txtElement, words, wait = 1500) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    // Create a method within the class, called 'type'
    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        console.log(fullTxt);

        // Check if deleting
        if (this.isDeleting) {
            // Remove Character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add Character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 75;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // Check if the word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make Pause at end
            typeSpeed = this.wait;
            // Set delete to True
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to the next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.text-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // initialise typewriter
    new TypeWriter(txtElement, words, wait);
}




// QUALIFICATION SECTION TABS
(() => {
    const qualSection = document.querySelector(".qualification-content"),
        tabsContainer = document.querySelector(".qual-tabs");

    tabsContainer.addEventListener("click", (event) => {
        /* if event.target contains 'tab-item' class and doesn't contain 'active' class */
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            // deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("active");
            // activate new 'tab-item'
            event.target.classList.add("active");
            // deactivate existing active 'tab-content'
            qualSection.querySelector(".tab-content.active").classList.remove("active");
            // activate new 'tab-content'
            qualSection.querySelector(target).classList.add("active");
        }
    })
})();





// EMAIL SECTION FUNCTIONALITY

// const mailName = document.querySelector("#emailName");
// const mailUser = document.querySelector("#emailUser");
const sendInformation = document.querySelector("#submitInfo");
const mailSubject = document.querySelector("#emailSubject").value;
const mailMessage = document.querySelector("#emailMessage").value;

const myEmail = 'mailto:colmrogers91@gmail.com'

sendInformation.addEventListener('click', (e) => {

    const href = `${myEmail}?subject=${mailSubject}&body=${mailMessage}`

    sendInformation.setAttribute("href", href);

    console.log(href);
})

// mailMessage.addEventListener('onchange', (e) => {

//     mailMessage.value = 
// })