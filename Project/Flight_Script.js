
const tripInputs = document.querySelectorAll("input[name='trip']");
const returnDate = document.querySelector(".return-date");

tripInputs.forEach(input => {
    input.addEventListener("change", () => {
        if(input.value === "oneway") {
            returnDate.style.display = "none";
        } else {
            returnDate.style.display = "block";
        }
    });
});

// Hide return date by default
returnDate.style.display = "none";



// select for question
const question = document.querySelectorAll(".faq-question");
question.forEach(q => {
    q.addEventListener("click", () => {
        let answer = q.nextElementSibling;
        let icon = q.querySelector("span");

        //Toggle answer
        if(answer.style.display==="block"){
            answer.style.display="none";
            icon.textContent="▶";
        }
        else {
            answer.style.display="block";
            icon.textContent="▶";
        }

    });
});



// No JS needed for slider — CSS handles animation
console.log("Airline slider running...");
