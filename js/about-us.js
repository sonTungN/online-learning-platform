// Step 1: Get DOM elements
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

let seeMoreButtons = document.querySelectorAll(".see-more");

let timeRunning = 3000; // Animation duration
let timeAutoNext = 7000; // Time before auto-next

// Append the first thumbnail item
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

let runNextAuto;

// Event listeners for buttons
nextDom.onclick = function() {
    showSlider('next');
    resetAutoSlide();
}

prevDom.onclick = function() {
    showSlider('prev');
    resetAutoSlide();
}

// Function to show the slider
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if(type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }

    // Allow the buttons to be clicked immediately by using a shorter timeout for removing the classes
    setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, 50); // This ensures the animation classes are removed almost immediately, allowing further clicks
}

// Function to reset the auto-slide timer
function resetAutoSlide() {
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

// Start the auto-slide initially
resetAutoSlide();


// Add click event to all "SEE MORE" buttons
seeMoreButtons.forEach(button => {
    button.onclick = function() {
        // Get the corresponding modal id from the data-modal attribute
        let modalId = button.getAttribute("data-modal");
        let modal = document.getElementById(modalId);

        // Display the corresponding modal
        modal.style.display = "flex";

        // Close the modal when the user clicks anywhere within the modal
        modal.onclick = function() {
            modal.style.display = "none";
        }

        // Close the modal when the user clicks the close button (X)
        let closeBtn = modal.querySelector(".close");
        closeBtn.onmouseover = function() {
            closeBtn.style.color = "red"; // Change color to red on hover
        };

        closeBtn.onmouseout = function() {
            closeBtn.style.color = "black"; // Revert to default color when not hovering
        };
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        // Prevent closing when clicking inside the modal content
        modal.querySelector(".modal-content").onclick = function(event) {
            event.stopPropagation();
        };
    }
});
