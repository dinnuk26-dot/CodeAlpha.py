let currentImgIndex = 0;
let visibleImages = [];

// Track and sync initialization
document.addEventListener("DOMContentLoaded", () => {
    filterSelection("all");
    setupKeyboardControls();
});

// --- Dynamic Category Filtering ---
function filterSelection(category) {
    const columns = document.querySelectorAll(".column");
    
    columns.forEach(col => {
        // Clear active classes before evaluation
        col.classList.remove("show");
        
        if (category === "all" || col.classList.contains(category)) {
            col.classList.add("show");
        }
    });
}

// Handle active status visual styling on interface buttons
const btnContainer = document.querySelector(".filter-buttons");
const advertisers = btnContainer.getElementsByClassName("btn");

for (let i = 0; i < advertisers.length; i++) {
    advertisers[i].addEventListener("click", function() {
        document.querySelector(".btn.active").classList.remove("active");
        this.classList.add("active");
    });
}

// --- Lightbox Functional Controller Logic ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");

function openLightbox(element) {
    // Dynamically query only items currently displayed on screen
    visibleImages = Array.from(document.querySelectorAll(".column.show img"));
    currentImgIndex = visibleImages.indexOf(element);

    lightbox.style.display = "block";
    updateLightboxContent();
}

function closeLightbox() {
    lightbox.style.display = "none";
}

function changeImage(direction) {
    if (visibleImages.length === 0) return;
    
    currentImgIndex += direction;
    
    // Boundary structural loops
    if (currentImgIndex >= visibleImages.length) currentImgIndex = 0;
    if (currentImgIndex < 0) currentImgIndex = visibleImages.length - 1;
    
    updateLightboxContent();
}

function updateLightboxContent() {
    const targetImg = visibleImages[currentImgIndex];
    lightboxImg.src = targetImg.src;
    captionText.innerHTML = targetImg.alt;
}

// Accessibility and Input Utilities
function setupKeyboardControls() {
    window.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "block") {
            if (e.key === "ArrowRight") changeImage(1);
            if (e.key === "ArrowLeft") changeImage(-1);
            if (e.key === "Escape") closeLightbox();
        }
    });
}

// Focus control fallback when viewport clicks outside bounding layout frame
window.onclick = function(event) {
    if (event.target === lightbox) closeLightbox();
}
