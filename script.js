// ===============================
// HERO IMAGE SLIDER
// ===============================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;

function showSlide(index){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

function nextSlide(){

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

}

function previousSlide(){

    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    showSlide(current);

}

next.addEventListener("click", nextSlide);

prev.addEventListener("click", previousSlide);

// Automatic slideshow every 5 seconds

setInterval(nextSlide, 5000);

// Click a navigation dot

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        current = index;

        showSlide(current);

    });

});