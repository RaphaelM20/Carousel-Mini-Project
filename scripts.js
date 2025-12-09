let currentIndex = 0;
const slides = document.querySelector(".slides");

function nextSlide() {
    const next = document.querySelector(".next");

    next.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= slides.children.length){
            currentIndex = 0;
        }
        showSlide();
    })
}

function previousSlide() {
    const previous = document.querySelector(".prev");

    previous.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0){
            currentIndex = slides.children.length - 1;
        }
        showSlide();
    })
}

function showSlide() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

//dots

function setupDots() {
    const dotsContainer = document.querySelector(".dots");
    dotsContainer.innerHTML = "";

    for (let i = 0; i < slides.children.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");

        dot.addEventListener("click", () => {
            currentIndex = i;
            showSlide();
        });

        dotsContainer.append(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    })
}

//dropdown

const dropdownButtons = document.querySelectorAll(".dropdown-btn");

dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.nextElementSibling;
        item.classList.toggle("hidden");
    })
})

let votes = JSON.parse(localStorage.getItem("votes")) ||
            [0, 0, 0, 0, 0];

const voteItems = document.querySelectorAll(".dropdown-menu li");
const voteSpans = document.querySelectorAll(".dropdown-menu .votes");

function renderVotes() {
    voteSpans.forEach((span, i) => {
        span.textContent = ` — ${votes[i]} votes`;
    });
}

// Handle click to vote
voteItems.forEach(item => {
    item.addEventListener("click", () => {
        const index = Number(item.getAttribute("data-index"));
        votes[index]++;
        localStorage.setItem("votes", JSON.stringify(votes));
        renderVotes();
    });
});

renderVotes();

//call functions

nextSlide();
previousSlide();
setupDots();
updateDots();