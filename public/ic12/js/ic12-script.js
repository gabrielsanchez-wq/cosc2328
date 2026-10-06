// IC12 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

const statusBox = document.getElementById("status-box");
statusBox.textContent = "DOM is ready!";
console.log("Status Box: ", statusBox);

const firstCard = document.querySelector(".card");

firstCard.querySelector("p").textContent = "Different text";

firstCard.classList.add("highlight");
statusBox.classList.add("active");

const listItems = document.querySelectorAll(".list-item");

listItems.forEach((item, index) => {
    if (index % 2 === 0) {
        item.classList.add("highlight");
    }
});

const thirdCard = document.querySelector("#card-3");
thirdCard.classList.toggle("hidden");

const secondCard = document.querySelector("#card-2");
secondCard.classList.remove("card");

const secondCardParagraph = secondCard.querySelector("p");
secondCardParagraph.textContent = "Safe update: <script>alert('hack')</script> renders as plain characters, not real HTML.";