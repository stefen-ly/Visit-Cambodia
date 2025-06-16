// Updated script.js for your carousel page
// Sample data for carousel slides
const carouselData = [{
    id: 1,
    title: "Highlight Events",
    name: "Khmer New Year",
    date: "April 13-14-15 or 14-15-16 Every Years",
    image: "https://i.pinimg.com/736x/f9/00/f3/f900f309f362a91b344384ba87a1d86e.jpg"
}, {
    id: 2,
    title: "Cultural Celebration",
    name: "Angkor Wat Equinox",
    date: "March 21st or 23rd Every Years",
    image: "https://i.pinimg.com/736x/65/0c/0b/650c0bbf2aeb53e8290b30763ed04bea.jpg"
}, {
    id: 3,
    title: "Music & Arts",
    name: "CAMBODIA NATIONAL CULTURE DAY",
    date: "March 3rd Every Years",
    image: "https://i.pinimg.com/736x/54/71/dd/5471dd7852b2eceb243eaf8bb24aa429.jpg"
}, {
    id: 4,
    title: "Community Gathering",
    name: "Pchum Ben Festival",
    date: "October Every Years",
    image: "https://i.pinimg.com/736x/0f/62/53/0f62531d4f4e6d8d825ad61352e711c3.jpg"
}, {
    id: 5,
    title: "Youth Festival",
    name: "Khmer Water Festival",
    date: "November Every Years",
    image: "https://i.pinimg.com/736x/31/f9/d4/31f9d443e660b9ce9aded6ee6b0c3011.jpg"
}];

// Current slide index tracker
let currentSlideIndex = 0;

// DOM element references
const slidesContainer = document.getElementById('slidesContainer');
const eventName = document.getElementById('eventName');
const eventDate = document.getElementById('eventDate');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Function to create HTML for a single slide
function createSlideElement(data, className = '') {
    const slideDiv = document.createElement('div');
    slideDiv.className = `slide-item ${className}`;
    slideDiv.innerHTML = `
        <img src="${data.image}" alt="${data.name}" class="slide-image">
    `;
    return slideDiv;
}

// Function to update the text content based on current slide
function updateEventDetails() {
    const currentEvent = carouselData[currentSlideIndex];

    // Smooth transition effect for text changes (only for p tags)
    eventName.style.opacity = '0';
    eventDate.style.opacity = '0';

    setTimeout(() => {
        eventName.textContent = currentEvent.name;
        eventDate.textContent = currentEvent.date;

        eventName.style.opacity = '1';
        eventDate.style.opacity = '1';
    }, 200);
}

// Function to render all visible slides
function renderSlides() {
    slidesContainer.innerHTML = '';

    const totalSlides = carouselData.length;
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentSlideIndex + 1) % totalSlides;

    // Create and append slides
    const prevSlide = createSlideElement(carouselData[prevIndex], 'side-slide left');
    slidesContainer.appendChild(prevSlide);

    const currentSlide = createSlideElement(carouselData[currentSlideIndex], 'center-slide');
    slidesContainer.appendChild(currentSlide);

    const nextSlide = createSlideElement(carouselData[nextIndex], 'side-slide right');
    slidesContainer.appendChild(nextSlide);

    updateEventDetails();
}

// Navigation functions
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % carouselData.length;
    renderSlides();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + carouselData.length) % carouselData.length;
    renderSlides();
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        prevSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

slidesContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
});

slidesContainer.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    }
}

// Auto-play functionality
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Pause auto-play on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

// Initialize the carousel
function initCarousel() {
    renderSlides();
    startAutoPlay();
}

// Start when page loads
document.addEventListener('DOMContentLoaded', initCarousel);

// UPDATED: Modified handleViewMore function to link to exhibition page
function handleViewMore(eventId) {
    // Get the current event ID from the carousel
    const currentEventId = carouselData[currentSlideIndex].id;
    
    // Navigate to the exhibition page with the current event as parameter
    window.location.href = `view/index.html?event=${currentEventId}`;
    
    // Alternative: If you want to use the eventId parameter instead
    // window.location.href = `view/index.html?event=${eventId}`;
}