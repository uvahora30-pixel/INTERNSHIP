// Scroll animation for service cards

const cards = document.querySelectorAll(".service-card");

const animateCards = () => {
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        if (position < window.innerHeight - 80) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener("scroll", animateCards);
window.addEventListener("load", animateCards);




function openPopup() {
    document.getElementById("bookingPopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("bookingPopup").style.display = "none";
}







